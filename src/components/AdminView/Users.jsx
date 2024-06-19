import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header & Footer/Header';
import Footer from '../Header & Footer/Footer';
import '../Layouts/Users.css';

const Users = () => {
  const navigate = useNavigate();
  // Mock data for users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', role: 'User' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', status: 'Active', role: 'User' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
    setIsModalOpen(false);
  };

  const handleEdit = (user) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)));
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setCurrentUser({ id: null, name: '', email: '', status: 'Active', role: 'User' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Header />
      <div className="users">
        <h1>Users</h1>
        <button className="back-button" onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
        <button className="create-button" onClick={openCreateModal}>Create User</button>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-button" onClick={() => openEditModal(user)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <UserModal
            user={currentUser}
            isEditing={isEditing}
            onSave={isEditing ? handleEdit : handleCreate}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

const UserModal = ({ user, isEditing, onSave, onClose }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Status:
            <select name="status" value={formData.status} onChange={handleChange} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
          <label>
            Role:
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Guest">Guest</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit">{isEditing ? 'Save Changes' : 'Create User'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Users;
