// apiService.js
const API_BASE_URL = 'http://localhost:5074/api/AuctionRequest';

const apiService = {
  createRequest: async (userId, formData) => {
    const response = await fetch(`${API_BASE_URL}/${userId}/create`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to create request');
    }
    return response.json();
  },

  viewRequests: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/${userId}/requests`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch requests');
    }
    return response.json();
  },

  sendInitialValuation: async (id, initialValuation) => {
    const response = await fetch(`${API_BASE_URL}/staff/send-initial-valuation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initialValuation),
    });
    if (!response.ok) {
      throw new Error('Failed to send initial valuation');
    }
    return response.json();
  },

  approveInitialValuation: async (userId, id, approve) => {
    const response = await fetch(`${API_BASE_URL}/${userId}/approve-initial/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approve),
    });
    if (!response.ok) {
      throw new Error('Failed to approve initial valuation');
    }
    return response.json();
  },

  approveFinalValuation: async (userId, id, approve) => {
    const response = await fetch(`${API_BASE_URL}/${userId}/approve-final-valuation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approve),
    });
    if (!response.ok) {
      throw new Error('Failed to approve final valuation');
    }
    return response.json();
  },

  requestJewelry: async (id) => {
    const response = await fetch(`${API_BASE_URL}/staff/request-jewelry/${id}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to request jewelry');
    }
    return response.json();
  },

  sendJewelry: async (userId, id) => {
    const response = await fetch(`${API_BASE_URL}/${userId}/send-jewelry/${id}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to send jewelry');
    }
    return response.json();
  },

  confirmReceipt: async (id) => {
    const response = await fetch(`${API_BASE_URL}/staff/confirm-receipt/${id}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to confirm receipt');
    }
    return response.json();
  },

  provideFinalValuation: async (id, finalValuation) => {
    const response = await fetch(`${API_BASE_URL}/staff/provide-final-valuation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalValuation),
    });
    if (!response.ok) {
      throw new Error('Failed to provide final valuation');
    }
    return response.json();
  },

  verifyFinalValuation: async (id, approve) => {
    const response = await fetch(`${API_BASE_URL}/manager/verify-final-valuation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(approve),
    });
    if (!response.ok) {
      throw new Error('Failed to verify final valuation');
    }
    return response.json();
  },

  staffViewRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/staff/requests`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch staff requests');
    }
    return response.json();
  },

  managerViewRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/manager/requests`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch manager requests');
    }
    return response.json();
  },
};

export default apiService;
