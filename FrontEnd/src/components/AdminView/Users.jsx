import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Layouts/Users.css';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: null,
        role_id: '',
        user_name: '',
        password: '',
        user_email: '',
        contact_number: '',
        user_address: '',
        status: 'Active',
        role: 'User'
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5074/api/Admin/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreate = async (user) => {
        try {
            const response = await fetch('http://localhost:5074/api/Admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const newUser = await response.json();
                setUsers([...users, newUser]);
                setIsModalOpen(false);
            } else {
                console.error('Error creating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleEdit = async (user) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Admin/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
                setIsEditing(false);
                setIsModalOpen(false);
            } else {
                console.error('Error updating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5074/api/Admin/users/${userId}`, { 
                method: 'DELETE' 
            });
            if (response.ok) {
                setUsers(users.filter(user => user.id !== userId));
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const openEditModal = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setCurrentUser({
            id: null,
            role_id: '',
            user_name: '',
            password: '',
            user_email: '',
            contact_number: '',
            user_address: '',
            status: 'Active',
            role: 'User'
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    return (
        <div className='users-container'>
            <div className="users">
                <h1>Users</h1>
                <button className="back-button" onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
                <button className="create-button" onClick={openCreateModal}>Create User</button>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Role ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.number}</td>
                                <td>{user.address}</td>
                                <td>{user.isActive}</td>
                                <td>{user.roleId}</td>
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
        </div>
    );
};

const UserModal = ({ user, isEditing, onSave, onClose }) => {
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

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
                        Role ID:
                        <input type="text" name="role_id" value={formData.role_id} onChange={handleChange} required />
                    </label>
                    <label>
                        Username:
                        <input type="text" name="user_name" value={formData.user_name} onChange={handleChange} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} required />
                    </label>
                    <label>
                        Contact Number:
                        <input type="tel" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
                    </label>
                    <label>
                        Address:
                        <input type="text" name="user_address" value={formData.user_address} onChange={handleChange} required />
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
                            <option value="Staff">Staff</option>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
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
