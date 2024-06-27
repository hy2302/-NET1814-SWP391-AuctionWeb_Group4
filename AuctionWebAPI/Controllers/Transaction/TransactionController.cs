using AuctionWebAPI.Models.Transaction;
using AuctionWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuctionWebAPI.Models.Auction;

namespace AuctionWebAPI.Controllers.Transaction
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly MyDbContext dbContext;

        public TransactionController(MyDbContext context)
        {
            dbContext = context;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDTO>>> GetTransactions()
        {
            var transactions = await dbContext.Transactions
                .Select(t => new TransactionDTO
                {
                    TransactionId = t.TransactionId,
                    AuctionId = t.AuctionId,
                    UserId = t.UserId,
                    TotalAmount = t.TotalAmount,
                    TransactionFee = t.TransactionFee
                })
                .ToListAsync();

            return Ok(transactions);
        }

        // GET: api/Transaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDTO>> GetTransaction(int id)
        {
            var transaction = await dbContext.Transactions
                .Where(t => t.TransactionId == id)
                .Select(t => new TransactionDTO
                {
                    TransactionId = t.TransactionId,
                    AuctionId = t.AuctionId,
                    UserId = t.UserId,
                    TotalAmount = t.TotalAmount,
                    TransactionFee = t.TransactionFee
                })
                .FirstOrDefaultAsync();

            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
        }

        // POST: api/Transaction
        [HttpPost]
        public async Task<ActionResult<TransactionDTO>> PostTransaction(TransactionDTO transactionDto)
        {
            var transaction = new Transactions
            {
                AuctionId = transactionDto.AuctionId,
                UserId = transactionDto.UserId,
                TotalAmount = transactionDto.TotalAmount,
                TransactionFee = transactionDto.TransactionFee
            };

            dbContext.Transactions.Add(transaction);
            await dbContext.SaveChangesAsync();

            transactionDto.TransactionId = transaction.TransactionId;

            return Ok("Trasaction Successfully Created");
        }

        // PUT: api/Transaction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, TransactionDTO transactionDto)
        {
            if (id != transactionDto.TransactionId)
            {
                return BadRequest();
            }

            var transaction = await dbContext.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            transaction.AuctionId = transactionDto.AuctionId;
            transaction.UserId = transactionDto.UserId;
            transaction.TotalAmount = transactionDto.TotalAmount;
            transaction.TransactionFee = transactionDto.TransactionFee;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Trasaction Successfully Updated");
        }

        // DELETE: api/Transaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await dbContext.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            dbContext.Transactions.Remove(transaction);
            await dbContext.SaveChangesAsync();

            var TransactionID = transaction.TransactionId;

            return Ok(new
            {
                Message = $"Transaction ID:{TransactionID} successfully deleted"
            });
        }

        private bool TransactionExists(int id)
        {
            return dbContext.Transactions.Any(e => e.TransactionId == id);
        }
    }
}
