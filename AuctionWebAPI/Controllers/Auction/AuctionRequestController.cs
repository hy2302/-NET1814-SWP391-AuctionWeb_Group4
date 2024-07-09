using AuctionWebAPI.Models;
using AuctionWebAPI.Models.Auction;
using AuctionWebAPI.Models.Jewelry;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionRequestController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AuctionRequestController(MyDbContext context)
        {
            _context = context;
        }

        // User: Create Request with Image Upload
        [HttpPost("{userId}/create")]
        public async Task<IActionResult> CreateRequest([FromForm] AuctionRequestDTO arDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            byte[] imageData;
            string imageName;

            if (arDto.JewelryImage != null && arDto.JewelryImage.Length > 0)
            {
                using (var ms = new MemoryStream())
                {
                    await arDto.JewelryImage.CopyToAsync(ms);
                    imageData = ms.ToArray();
                }

                imageName = arDto.JewelryImage.FileName;

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
                OwnerId = arDto.SellerId,
                JewelryName = arDto.JewelryName,
                JewelryDescription = arDto.JewelryDescription,
                JewelryImageName = imageName,
                JewelryImage = imageData,
                JewelryStatus = "Auction Request Created",
                JewelryTypeId = arDto.JewelryTypeId // Assign JewelryTypeId to the new jewel
            };
            _context.Jewelries.Add(jewelry);
            await _context.SaveChangesAsync();

            var auctionRequest = new AuctionRequest
            {
                SellerId = arDto.SellerId,
                JewelryId = jewelry.JewelryId,
                RequestDate = DateTime.Now,
                RequestStatus = "Auction Request Created",
                InitialValuation = 0,
                FinalValuation = 0
            };
            _context.AuctionRequests.Add(auctionRequest);
            await _context.SaveChangesAsync();

            return Ok(auctionRequest);
        }

        // User: View All Requests
        [HttpGet("{userId}/requests")]
        public async Task<IActionResult> ViewRequests(int userId)
        {
            var requests = await _context.AuctionRequests
                                         .Include(ar => ar.Jewelry)
                                         .Where(ar => ar.SellerId == userId)
                                         .Select(ar => new AuctionRequestDTO
                                         {
                                             RequestId = ar.RequestId,
                                             SellerId = ar.SellerId,
                                             JewelryId = ar.JewelryId,
                                             RequestDate = ar.RequestDate,
                                             RequestStatus = ar.RequestStatus,
                                             InitialValuation = ar.InitialValuation,
                                             FinalValuation = ar.FinalValuation,
                                             JewelryName = ar.Jewelry.JewelryName,
                                             JewelryDescription = ar.Jewelry.JewelryDescription
                                         })
                                         .ToListAsync();
            return Ok(requests);
        }

        // User: Approve/Decline Initial Valuation
        [HttpPut("{userId}/approve-initial/{id}")]
        public async Task<IActionResult> ApproveInitialValuation(int id, [FromBody] bool approve)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

            if (approve)
            {
                request.RequestStatus = "Initial Valuation Accepted";
            }
            else
            {
                request.RequestStatus = "Declined";
            }
            await _context.SaveChangesAsync();

            return Ok(request);
        }
        // User: Accept/Declined Final Valuation
        [HttpPut("{userId}/accept-final-valuation/{id}")]
        public async Task<IActionResult> AcceptFinalValuation(int id, [FromBody] bool approve)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

          
            if (approve)
            {
                request.RequestStatus = "Auction Request Completed";
            }
            else
            {
                request.RequestStatus = "Declined";
            }
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // Staff: Send Initial Valuation
        [HttpPut("staff/send-initial-valuation/{id}")]
        public async Task<IActionResult> SendInitialValuation(int id, [FromBody] decimal initialValuation)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

            if (request.RequestStatus != "Auction Request Created")
            {
                return BadRequest("Initial valuation can only be sent when status is 'Auction Request Created'.");
            }

            request.InitialValuation = initialValuation;
            request.RequestStatus = "Initial Valuation Created";
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // Staff: Request User to Send Jewelry
        [HttpPut("staff/request-jewelry/{id}")]
        public async Task<IActionResult> RequestJewelry(int id)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

            if (request.RequestStatus != "Initial Valuation Accepted")
            {
                return BadRequest("Jewelry request can only be sent when initial valuation is accepted.");
            }

            request.RequestStatus = "Request Jewelry";
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // User: Send Jewelry for Valuation
        [HttpPut("{userId}/send-jewelry/{id}")]
        public async Task<IActionResult> SendJewelry(int id)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

            request.RequestStatus = "Jewelry Being Delivered";
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // Staff: Confirm Receipt of Jewelry
        [HttpPut("staff/confirm-receipt/{id}")]
        public async Task<IActionResult> ConfirmReceipt(int id)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

            request.RequestStatus = "Jewelry Received";
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // Staff: Provide Final Valuation for Manager Approval
        [HttpPut("staff/provide-final-valuation/{id}")]
        public async Task<IActionResult> ProvideFinalValuation(int id, [FromBody] decimal finalValuation)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

            request.FinalValuation = finalValuation;
            request.RequestStatus = "Final Valuation Created";
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // Manager: Verify Final Valuation
        [HttpPut("manager/verify-final-valuation/{id}")]
        public async Task<IActionResult> VerifyFinalValuation(int id, [FromBody] bool approve)
        {
            var request = await _context.AuctionRequests.FindAsync(id);
            if (request == null) return NotFound();

            if (approve)
            {
                request.RequestStatus = "Final Valuation Verified";
            }
            else
            {
                request.RequestStatus = "Declined";
            }
            await _context.SaveChangesAsync();

            return Ok(request);
        }

     

        // Staff: View Auction Requests with Statuses "Auction Request Created" and "Jewelry Being Delivered"
        [HttpGet("staff/requests")]
        public async Task<IActionResult> StaffViewRequests()
        {
            var requests = await _context.AuctionRequests
                                         .Include(ar => ar.Jewelry)
                                         .Include(ar => ar.Seller)
                                         .Where(ar => ar.RequestStatus == "Auction Request Created" || ar.RequestStatus == "Jewelry Being Delivered" || ar.RequestStatus == "Initial Valuation Accepted" || ar.RequestStatus == "Jewelry Received")
                                         .Select(ar => new AuctionRequestDTO
                                         {
                                             RequestId = ar.RequestId,
                                             SellerId = ar.SellerId,
                                             JewelryId = ar.JewelryId,
                                             RequestDate = ar.RequestDate,
                                             RequestStatus = ar.RequestStatus,
                                             InitialValuation = ar.InitialValuation,
                                             FinalValuation = ar.FinalValuation,
                                             JewelryName = ar.Jewelry.JewelryName,
                                             JewelryDescription = ar.Jewelry.JewelryDescription
                                         })
                                         .ToListAsync();
            return Ok(requests);
        }


        // Manager: View Auction Requests with Statuses "Auction Request Completed", "Declined", and "Final Valuation Created"
        [HttpGet("manager/requests")]
        public async Task<IActionResult> ManagerViewRequests()
        {
            var requests = await _context.AuctionRequests
                                         .Include(ar => ar.Jewelry)
                                         .Include(ar => ar.Seller)
                                         .Where(ar => ar.RequestStatus == "Auction Request Completed" || ar.RequestStatus == "Declined" || ar.RequestStatus == "Final Valuation Created")
                                         .Select(ar => new AuctionRequestDTO
                                         {
                                             RequestId = ar.RequestId,
                                             SellerId = ar.SellerId,
                                             JewelryId = ar.JewelryId,
                                             RequestDate = ar.RequestDate,
                                             RequestStatus = ar.RequestStatus,
                                             InitialValuation = ar.InitialValuation,
                                             FinalValuation = ar.FinalValuation,
                                             JewelryName = ar.Jewelry.JewelryName,
                                             JewelryDescription = ar.Jewelry.JewelryDescription
                                         })
                                         .ToListAsync();
            return Ok(requests);
        }

        private bool IsValidImage(byte[] imageData)
        {
            try
            {
                using (var ms = new MemoryStream(imageData))
                using (var img = System.Drawing.Image.FromStream(ms))
                {
                    if (img.RawFormat.Equals(ImageFormat.Png) || img.RawFormat.Equals(ImageFormat.Jpeg))
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
