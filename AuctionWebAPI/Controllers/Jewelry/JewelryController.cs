using AuctionWebAPI.Models;
using AuctionWebAPI.Models.Jewelry;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryController : ControllerBase
    {
        private readonly MyDbContext _context;

        public JewelryController(MyDbContext context)
        {
            _context = context;
        }

        // Get all jewelry
        [HttpGet]
        public async Task<IActionResult> GetAllJewelry()
        {
            var jewelry = await _context.Jewelries.ToListAsync();
            return Ok(jewelry);
        }

        // Get jewelry by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJewelryById(int id)
        {
            var jewelry = await _context.Jewelries.FindAsync(id);

            if (jewelry == null)
            {
                return NotFound();
            }

            return Ok(jewelry);
        }

        // Add new jewelry
        [HttpPost]
        public async Task<IActionResult> CreateJewelry([FromForm] JewelryDTO jewelryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            byte[] imageData;
            string imageName;

            if (jewelryDto.JewelryImage != null && jewelryDto.JewelryImage.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    await jewelryDto.JewelryImage.CopyToAsync(ms);
                    imageData = ms.ToArray();
                }

                imageName = jewelryDto.JewelryImage.FileName;

                if (!IsValidImage(imageData))
                {
                    return BadRequest("Invalid image format. Only PNG and JPEG are supported.");
                }
            }
            else
            {
                return BadRequest("Image is required.");
            }

            var jewelry = new Jewel
            {
                OwnerId = jewelryDto.OwnerId,
                JewelryName = jewelryDto.JewelryName,
                JewelryDescription = jewelryDto.JewelryDescription,
                JewelryImageName = imageName,
                JewelryImage = imageData,
                JewelryStatus = "Available",
                JewelryTypeId = jewelryDto.JewelryTypeId // Assign JewelryTypeId to the new jewel
            };

            _context.Jewelries.Add(jewelry);
            await _context.SaveChangesAsync();

            return Ok(jewelry);
        }

        // Update jewelry
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJewelry(int id, [FromForm] JewelryDTO jewelryDto)
        {
            if (id != jewelryDto.JewelryId)
            {
                return BadRequest("Jewelry ID mismatch.");
            }

            var jewelry = await _context.Jewelries.FindAsync(id);
            if (jewelry == null)
            {
                return NotFound();
            }

            byte[] imageData = jewelry.JewelryImage;
            string imageName = jewelry.JewelryImageName;

            if (jewelryDto.JewelryImage != null && jewelryDto.JewelryImage.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    await jewelryDto.JewelryImage.CopyToAsync(ms);
                    imageData = ms.ToArray();
                }

                imageName = jewelryDto.JewelryImage.FileName;

                if (!IsValidImage(imageData))
                {
                    return BadRequest("Invalid image format. Only PNG and JPEG are supported.");
                }
            }

            jewelry.JewelryName = jewelryDto.JewelryName;
            jewelry.JewelryDescription = jewelryDto.JewelryDescription;
            jewelry.JewelryImageName = imageName;
            jewelry.JewelryImage = imageData;
            jewelry.JewelryTypeId = jewelryDto.JewelryTypeId; // Update JewelryTypeId

            await _context.SaveChangesAsync();

            return Ok(jewelry);
        }

        // Delete jewelry
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJewelry(int id)
        {
            var jewelry = await _context.Jewelries.FindAsync(id);
            if (jewelry == null)
            {
                return NotFound();
            }

            _context.Jewelries.Remove(jewelry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IsValidImage(byte[] imageData)
        {
            try
            {
                using (var ms = new MemoryStream(imageData))
                using (var img = System.Drawing.Image.FromStream(ms))
                {
                    if (img.RawFormat.Equals(System.Drawing.Imaging.ImageFormat.Png) || img.RawFormat.Equals(System.Drawing.Imaging.ImageFormat.Jpeg))
                    {
                        return true;
                    }
                }
            }
            catch
            {
                return false;
            }

            return false;
        }
    }
}
