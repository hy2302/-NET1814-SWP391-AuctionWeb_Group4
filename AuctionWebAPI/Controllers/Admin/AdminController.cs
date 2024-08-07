﻿using System;
using AuctionWebAPI.Models;
using AuctionWebAPI.Models.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AuctionWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AdminController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/dashboard
        [HttpGet("dashboard")]
        public async Task<ActionResult<object>> GetDashboard()
        {
            var userCount = await _context.Users.CountAsync();
            var jewelryCount = await _context.Jewelries.CountAsync();

            // Current month totals
            // Current month totals
            var totalAmountNow = await _context.Transactions
                .Where(t => t.TransactionDate.HasValue &&
                            t.TransactionDate.Value.Month == DateTime.Now.Month &&
                            t.TransactionDate.Value.Year == DateTime.Now.Year)
                .SumAsync(t => t.TotalAmount ?? 0);

            var transactionFeeNow = await _context.Transactions
                .Where(t => t.TransactionDate.HasValue &&
                            t.TransactionDate.Value.Month == DateTime.Now.Month &&
                            t.TransactionDate.Value.Year == DateTime.Now.Year)
                .SumAsync(t => t.TransactionFee ?? 0);

            var finalPriceNow = await _context.Auctions
                .Where(a => a.EndTime.HasValue &&
                            a.EndTime.Value.Month == DateTime.Now.Month &&
                            a.EndTime.Value.Year == DateTime.Now.Year)
                .SumAsync(a => a.FinalPrice);

            // Last month totals
            var lastMonth = DateTime.Now.AddMonths(-1);
            var totalAmountLastMonth = await _context.Transactions
                .Where(t => t.TransactionDate.HasValue &&
                            t.TransactionDate.Value.Month == lastMonth.Month &&
                            t.TransactionDate.Value.Year == lastMonth.Year)
                .SumAsync(t => t.TotalAmount ?? 0);

            var transactionFeeLastMonth = await _context.Transactions
                .Where(t => t.TransactionDate.HasValue &&
                            t.TransactionDate.Value.Month == lastMonth.Month &&
                            t.TransactionDate.Value.Year == lastMonth.Year)
                .SumAsync(t => t.TransactionFee ?? 0);

            var finalPriceLastMonth = await _context.Auctions
                .Where(a => a.EndTime.HasValue &&
                            a.EndTime.Value.Month == lastMonth.Month &&
                            a.EndTime.Value.Year == lastMonth.Year)
                .SumAsync(a => a.FinalPrice);





            return new
            {
                UserCount = userCount,
                JewelryCount = jewelryCount,
                TotalAmountNow = totalAmountNow,
                TransactionFeeNow = transactionFeeNow,
                FinalPriceNow = finalPriceNow,
                TotalAmountLastMonth = totalAmountLastMonth,
                TransactionFeeLastMonth = transactionFeeLastMonth,
                FinalPriceLastMonth = finalPriceLastMonth
            };
        }

        // GET: api/admin/users
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/admin/users/5
        [HttpGet("users/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/admin/users
        [HttpPost("users")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // PUT: api/admin/users/5
        [HttpPut("users/{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/admin/users/5
        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
