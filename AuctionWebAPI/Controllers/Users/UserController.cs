using AuctionWebAPI.Models;
using AuctionWebAPI.Models.Users;
using AuctionWebAPI.Service.Models;
using AuctionWebAPI.Services.Emails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AuctionWebAPI.Controllers.Users
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        private readonly IConfiguration configuration;
        private readonly IEmailService emailService;
        public UserController(MyDbContext dbContext, IConfiguration configuration, IEmailService emailService)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
            this.emailService = emailService;
        }

        [HttpPost]
        [Route("Registration")]
        public async Task<IActionResult> Registration([FromBody] RegistrationModel registrationDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingUserByUsername = await dbContext.Users.FirstOrDefaultAsync(x => x.Username == registrationDTO.Username);
                var existingUserByEmail = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == registrationDTO.Email);

                if (existingUserByUsername != null)
                {
                    return BadRequest("Username already exists.");
                }

                if (existingUserByEmail != null)
                {
                    return BadRequest("Email already exists.");
                }

                var newUser = new User
                {
                    Username = registrationDTO.Username,
                    Password = registrationDTO.Password,
                    Email = registrationDTO.Email,
                    Number = registrationDTO.Number,
                    Address = registrationDTO.Address,
                    ResetPasswordToken = null, // Initialize to null or appropriate value
                    ResetPasswordTokenExpiration = null // Initialize to null or appropriate value
                };

                dbContext.Users.Add(newUser);
                await dbContext.SaveChangesAsync();

                return Ok("User registered successfully");
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here using a logging framework such as Serilog, NLog, etc.
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Username == loginDTO.Username && x.Password == loginDTO.Password);

                if (user != null)
                {
                    var claims = new[]
                    {
                new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserId", user.UserId.ToString()),
                new Claim("Username", user.Username.ToString()),
            };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        configuration["Jwt:Issuer"],
                        configuration["Jwt:Audience"],
                        claims,
                        expires: loginDTO.RememberMe ? DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddMinutes(60),
                        signingCredentials: signIn
                    );
                    string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
                    return Ok(new { Token = tokenValue, User = user });
                }

                return Unauthorized("Invalid username or password.");
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here using a logging framework such as Serilog, NLog, etc.
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet]
        [Route("GetUsers")]
        public IActionResult GetUsers()
        {
            try
            {
                var users = dbContext.Users.ToList();
                return Ok(users);
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, "An error occurred while retrieving users.");
            }
        }


        
        [HttpGet]
        [Route("GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(x => x.UserId == id);
                if (user != null)
                {
                    return Ok(user);
                }
                return NotFound("User not found.");
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, "An error occurred while retrieving the user.");
            }
        }




        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(int id, [FromBody] User updateUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(x => x.UserId == id);
                if (user != null)
                {
                    user.Username = updateUser.Username;
                    user.Password = updateUser.Password;
                    user.Email = updateUser.Email;
                    user.Number = updateUser.Number;
                    user.Address = updateUser.Address;

                    await dbContext.SaveChangesAsync();
                    return Ok(user);
                }
                return NotFound("User not found.");
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, "An error occurred while updating the user.");
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(x => x.UserId == id);
                if (user != null)
                {
                    dbContext.Users.Remove(user);
                    await dbContext.SaveChangesAsync();
                    return Ok(dbContext.Users.ToList());
                }
                return NotFound("User not found.");
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, "An error occurred while deleting the user.");
            }
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == model.Email);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var token = Guid.NewGuid().ToString();
                user.ResetPasswordToken = token;
                user.ResetPasswordTokenExpiration = DateTime.UtcNow.AddHours(1);

                await dbContext.SaveChangesAsync();

                var resetLink = Url.Action("ResetPassword", "User", new { token }, Request.Scheme);
                var message = new Message(new string[] { user.Email }, "Password Reset Request", $"Here is your token to reset password: {token}");

                emailService.SendEmail(message);

                return Ok("Password reset token sent.");
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, "An error occurred while processing the password reset request.");
            }
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(x => x.ResetPasswordToken == model.Token && x.ResetPasswordTokenExpiration > DateTime.UtcNow);
                if (user == null)
                {
                    return BadRequest("Invalid token or token expired.");
                }

                user.Password = model.NewPassword;
                user.ResetPasswordToken = null;
                user.ResetPasswordTokenExpiration = null;

                await dbContext.SaveChangesAsync();
                return Ok("Password has been reset successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, "An error occurred while resetting the password.");
            }
        }

    }
}
