using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionWebAPI.Controllers.Auction
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionRequestController : ControllerBase
    {
        private readonly MyDbContext dbContext;

        public AuctionRequestController(MyDbContext context)
        {
            dbContext = context;
        }

        // GET: api/AuctionRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AuctionRequestDTO>>> GetAuctionRequests()
        {
            if (dbContext.AuctionRequests == null)
            {
                return NotFound();
            }

            var auctionRequests = await dbContext.AuctionRequests
                .Select(ar => new AuctionRequestDTO
                {
                    RequestId = ar.RequestId,
                    SellerId = ar.SellerId,
                    JewelryId = ar.JewelryId,
                    RequestDate = ar.RequestDate,
                    RequestStatus = ar.RequestStatus,
                    InitialValuation = ar.InitialValuation,
                    FinalValuation = ar.FinalValuation
                })
                .ToListAsync();

            return Ok(auctionRequests);
        }

        // GET: api/AuctionRequest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionRequestDTO>> GetAuctionRequest(int id)
        {
            if (dbContext.AuctionRequests == null)
            {
                return NotFound();
            }

            var auctionRequest = await dbContext.AuctionRequests
                .Select(ar => new AuctionRequestDTO
                {
                    RequestId = ar.RequestId,
                    SellerId = ar.SellerId,
                    JewelryId = ar.JewelryId,
                    RequestDate = ar.RequestDate,
                    RequestStatus = ar.RequestStatus,
                    InitialValuation = ar.InitialValuation,
                    FinalValuation = ar.FinalValuation
                })
                .FirstOrDefaultAsync(ar => ar.RequestId == id);

            if (auctionRequest == null)
            {
                return NotFound();
            }

            return Ok(auctionRequest);
        }

        // POST: api/AuctionRequest
        [HttpPost]
        public async Task<ActionResult<AuctionRequestDTO>> PostAuctionRequest(AuctionRequestDTO auctionRequestDto)
        {
            var auctionRequest = new AuctionRequest
            {
                SellerId = auctionRequestDto.SellerId,
                JewelryId = auctionRequestDto.JewelryId,
                RequestDate = auctionRequestDto.RequestDate ?? DateTime.Now,
                RequestStatus = auctionRequestDto.RequestStatus,
                InitialValuation = auctionRequestDto.InitialValuation,
                FinalValuation = auctionRequestDto.FinalValuation
            };

            dbContext.AuctionRequests.Add(auctionRequest);
            await dbContext.SaveChangesAsync();

            auctionRequestDto.RequestId = auctionRequest.RequestId;

           return Ok("Auction Request successfully deleted");
        }

        // PUT: api/AuctionRequest/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuctionRequest(int id, AuctionRequestDTO auctionRequestDto)
        {
            if (id != auctionRequestDto.RequestId)
            {
                return BadRequest();
            }

            var auctionRequest = await dbContext.AuctionRequests.FindAsync(id);
            if (auctionRequest == null)
            {
                return NotFound();
            }

            auctionRequest.SellerId = auctionRequestDto.SellerId;
            auctionRequest.JewelryId = auctionRequestDto.JewelryId;
            auctionRequest.RequestDate = auctionRequestDto.RequestDate ?? auctionRequest.RequestDate;
            auctionRequest.RequestStatus = auctionRequestDto.RequestStatus;
            auctionRequest.InitialValuation = auctionRequestDto.InitialValuation;
            auctionRequest.FinalValuation = auctionRequestDto.FinalValuation;

            dbContext.Entry(auctionRequest).State = EntityState.Modified;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuctionRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Auction Request successfully updated");
        }

        // DELETE: api/AuctionRequest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuctionRequest(int id)
        {
            if (dbContext.AuctionRequests == null)
            {
                return NotFound();
            }

            var auctionRequest = await dbContext.AuctionRequests.FindAsync(id);
            if (auctionRequest == null)
            {
                return NotFound();
            }

            dbContext.AuctionRequests.Remove(auctionRequest);
            await dbContext.SaveChangesAsync();

            var auctionRequestID = auctionRequest.RequestId;



            return Ok(new
            {
                Message = $"Auction Request id:{auctionRequestID} successfully deleted"
            });
        }

        private bool AuctionRequestExists(int id)
        {
            return dbContext.AuctionRequests.Any(e => e.RequestId == id);
        }
    }
}
