// apiService.js
const API_BASE_URL = 'http://localhost:5074/api';

const apiService = {
  // Auction API methods...

  // Bid API methods
  getBids: async () => {
    const response = await fetch(`${API_BASE_URL}/Bid`);
    if (!response.ok) {
      throw new Error('Failed to fetch bids');
    }
    return response.json();
  },

  createBid: async (bid) => {
    const response = await fetch(`${API_BASE_URL}/Bid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bid)
    });
    if (!response.ok) {
      throw new Error('Failed to create bid');
    }
    return response.json();
  },

  getBidById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/Bid/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch bid');
    }
    return response.json();
  },

  updateBid: async (id, bid) => {
    const response = await fetch(`${API_BASE_URL}/Bid/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bid)
    });
    if (!response.ok) {
      throw new Error('Failed to update bid');
    }
    return response.json();
  },

  deleteBid: async (id) => {
    const response = await fetch(`${API_BASE_URL}/Bid/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete bid');
    }
    return response.json();
  }
};

export default apiService;
