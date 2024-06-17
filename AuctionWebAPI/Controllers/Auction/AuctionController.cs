using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AuctionWebAPI.Models.Jewelry;

namespace AuctionWebAPI.Controllers.Auction
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private readonly MyDbContext dbContext;

        public AuctionController(MyDbContext context)
        {
            dbContext = context;
        }

        // GET: api/Auction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionDTO>>> GetAuctions()
        {
            if (dbContext.Auctions == null)
            {
                return NotFound();
            }

            var auctions = await dbContext.Auctions
                .Select(a => new AuctionDTO
                {
                    AuctionId = a.AuctionId,
                    JewelryId = a.JewelryId,
                    StaffId = a.StaffId,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    AuctionStatus = a.AuctionStatus,
                    StartingPrice = a.StartingPrice,
                    FinalPrice = a.FinalPrice
                })
                .ToListAsync();

            return Ok(auctions);
        }

        // GET: api/Auction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDTO>> GetAuction(int id)
        {
            if (dbContext.Auctions == null)
            {
                return NotFound();
            }

            var auction = await dbContext.Auctions
                .Select(a => new AuctionDTO
                {
                    AuctionId = a.AuctionId,
                    JewelryId = a.JewelryId,
                    StaffId = a.StaffId,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    AuctionStatus = a.AuctionStatus,
                    StartingPrice = a.StartingPrice,
                    FinalPrice = a.FinalPrice
                })
                .FirstOrDefaultAsync(a => a.AuctionId == id);

            if (auction == null)
            {
                return NotFound();
            }

            return Ok(auction);
        }

        // POST: api/Auction
        [HttpPost]
        public async Task<ActionResult<AuctionDTO>> PostAuction(AuctionDTO auctionDto)
        {
            var auction = new Auction_Model
            {
                JewelryId = auctionDto.JewelryId,
                StaffId = auctionDto.StaffId,
                StartTime = auctionDto.StartTime ?? DateTime.Now,
                EndTime = auctionDto.EndTime ?? DateTime.Now.AddHours(1),
                AuctionStatus = auctionDto.AuctionStatus,
                StartingPrice = auctionDto.StartingPrice,
                FinalPrice = auctionDto.FinalPrice
            };

            dbContext.Auctions.Add(auction);
            await dbContext.SaveChangesAsync();

            auctionDto.AuctionId = auction.AuctionId;

            return Ok("Auction Successfully Created");
        }

        // PUT: api/Auction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuction(int id, AuctionDTO auctionDto)
        {
            if (id != auctionDto.AuctionId)
            {
                return BadRequest();
            }

            var auction = await dbContext.Auctions.FindAsync(id);
            if (auction == null)
            {
                return NotFound();
            }

            auction.JewelryId = auctionDto.JewelryId;
            auction.StaffId = auctionDto.StaffId;
            auction.StartTime = auctionDto.StartTime ?? auction.StartTime;
            auction.EndTime = auctionDto.EndTime ?? auction.EndTime;
            auction.AuctionStatus = auctionDto.AuctionStatus;
            auction.StartingPrice = auctionDto.StartingPrice;
            auction.FinalPrice = auctionDto.FinalPrice;

            dbContext.Entry(auction).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuctionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Auction Successfully Updated");
        }

        // DELETE: api/Auction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction(int id)
        {
            if (dbContext.Auctions == null)
            {
                return NotFound();
            }

            var auction = await dbContext.Auctions.FindAsync(id);
            if (auction == null)
            {
                return NotFound();
            }

            dbContext.Auctions.Remove(auction);
            await dbContext.SaveChangesAsync();



            var Auction_Id = auction.AuctionId;



            return Ok(new
            {
                Message = $"Auction id:{Auction_Id} successfully deleted"
            });
        }

        private bool AuctionExists(int id)
        {
            return dbContext.Auctions.Any(e => e.AuctionId == id);
        }
    }
}
