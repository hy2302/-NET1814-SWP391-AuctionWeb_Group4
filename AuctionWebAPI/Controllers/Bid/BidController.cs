using AuctionWebAPI.Models.Bid;
using AuctionWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Controllers.Bid
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {

        private readonly MyDbContext _dbContext;

        public BidController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Bid
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BidDTO>>> GetBids()
        {
            var bids = await _dbContext.Bids
                .Select(b => new BidDTO
                {
                    BidId = b.BidId,
                    CustomerId = b.CustomerId,
                    AuctionId = b.AuctionId,
                    BidTime = b.BidTime,
                    BidAmount = b.BidAmount,
                    BidStatus = b.BidStatus
                })
                .ToListAsync();

            return Ok(bids);
        }

        // GET: api/Bid/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BidDTO>> GetBid(int id)
        {
            var bid = await _dbContext.Bids.FindAsync(id);

            if (bid == null)
            {
                return NotFound();
            }

            var bidDTO = new BidDTO
            {
                BidId = bid.BidId,
                CustomerId = bid.CustomerId,
                AuctionId = bid.AuctionId,
                BidTime = bid.BidTime,
                BidAmount = bid.BidAmount,
                BidStatus = bid.BidStatus
            };

            return Ok(bidDTO);
        }

        // POST: api/Bid
        [HttpPost]
        public async Task<ActionResult<BidDTO>> PostBid(BidDTO bidDTO)
        {
            var bid = new Bids
            {
                CustomerId = bidDTO.CustomerId,
                AuctionId = bidDTO.AuctionId,
                BidTime = bidDTO.BidTime,
                BidAmount = bidDTO.BidAmount,
                BidStatus = bidDTO.BidStatus
            };

            _dbContext.Bids.Add(bid);
            await _dbContext.SaveChangesAsync();

            bidDTO.BidId = bid.BidId; // Update bidDTO with the generated BidId

            return CreatedAtAction(nameof(GetBid), new { id = bidDTO.BidId }, bidDTO);
        }

        // PUT: api/Bid/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBid(int id, BidDTO bidDTO)
        {
            if (id != bidDTO.BidId)
            {
                return BadRequest();
            }

            var bid = await _dbContext.Bids.FindAsync(id);

            if (bid == null)
            {
                return NotFound();
            }

            bid.CustomerId = bidDTO.CustomerId;
            bid.AuctionId = bidDTO.AuctionId;
            bid.BidTime = bidDTO.BidTime;
            bid.BidAmount = bidDTO.BidAmount;
            bid.BidStatus = bidDTO.BidStatus;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BidExists(id))
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

        // DELETE: api/Bid/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBid(int id)
        {
            var bid = await _dbContext.Bids.FindAsync(id);

            if (bid == null)
            {
                return NotFound();
            }

            _dbContext.Bids.Remove(bid);
            await _dbContext.SaveChangesAsync();

            return Ok($"Bid with ID {id} successfully deleted.");
        }

        private bool BidExists(int id)
        {
            return _dbContext.Bids.Any(b => b.BidId == id);
        }
    }
}
