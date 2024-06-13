import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../layouts/Policy.css';

const Policy = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      
      <div className="policy-container">
        <h1>Policy Page</h1>

        <section className="policy-section">
          <h2>Terms of Service</h2>
          <p>Welcome to our auction platform. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.</p>
          <p><strong>Acceptance of Terms</strong><br />By accessing or using our website, you agree to be legally bound by these Terms of Service and all terms incorporated by reference.</p>
          <p><strong>Changes to Terms</strong><br />We reserve the right to change or modify these terms at any time and in our sole discretion. Any changes will be effective immediately upon posting the revisions to our website.</p>
          <p><strong>User Accounts</strong><br />You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
        </section>

        <section className="policy-section">
          <h2>Privacy Policy</h2>
          <p>Your privacy is important to us. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
          <p><strong>Information Collection</strong><br />We may collect personal information such as your name, email address, and payment information when you register on our site or place an order.</p>
          <p><strong>Use of Information</strong><br />We use the information we collect to provide, maintain, and improve our services, to process transactions, and to communicate with you.</p>
          <p><strong>Information Sharing</strong><br />We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as required by law.</p>
          <p><strong>Cookies</strong><br />We use cookies to enhance your experience and gather information about visits to our website.</p>
        </section>

        <section className="policy-section">
          <h2>Auction Rules</h2>
          <p><strong>Bidding Process</strong><br />To participate in an auction, you must first register and create an account. Bidding begins at the starting price and increases by the specified bid increment. You can place a bid at any time before the auction closes.</p>
          <p><strong>Reserve Prices</strong><br />Some auctions may have a reserve price, which is the minimum price the seller is willing to accept. If the reserve price is not met, the item will not be sold.</p>
          <p><strong>Winning Bids</strong><br />When an auction ends, the highest bid that meets or exceeds the reserve price wins. The winning bidder will receive an email confirmation and instructions for completing the purchase.</p>
        </section>

        <section className="policy-section">
          <h2>Seller Policy</h2>
          <p><strong>Listing Items</strong><br />Sellers must provide accurate and complete information about the items they list, including clear photographs and descriptions.</p>
          <p><strong>Seller Fees</strong><br />We charge a listing fee and a final value fee for each item sold. The fees are calculated as a percentage of the final sale price.</p>
          <p><strong>Seller Responsibilities</strong><br />Sellers are responsible for shipping the items promptly after receiving payment and ensuring that the items are as described in the listing.</p>
          <p><strong>Prohibited Items</strong><br />The following items are prohibited from being sold on our platform: illegal items, counterfeit goods, stolen property, hazardous materials, and any items that violate our terms of service.</p>
        </section>

        <section className="policy-section">
          <h2>Buyer Policy</h2>
          <p><strong>Bidding Etiquette</strong><br />Buyers should place bids only if they intend to purchase the item. Retraction of bids is not allowed unless permitted by our auction rules.</p>
          <p><strong>Payment Requirements</strong><br />Winning bidders are expected to complete the payment within 48 hours of the auction's end. Failure to do so may result in cancellation of the transaction and suspension of the buyer's account.</p>
        </section>

        <section className="policy-section">
          <h2>Contact Information</h2>
          <p>If you have any questions or concerns regarding these policies, please contact us at:</p>
          <p><strong>Email:</strong> support@auctionplatform.com</p>
          <p><strong>Phone:</strong> +1 (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Auction Street, Bid City, Auction State, 12345</p>
        </section>
        <button onClick={() => navigate('/')}>Back to Main</button>
      </div>
     
    </div>
  );
};

export default Policy;
