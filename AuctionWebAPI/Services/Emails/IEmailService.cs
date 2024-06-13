using AuctionWebAPI.Service.Models;

namespace AuctionWebAPI.Services.Emails
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
