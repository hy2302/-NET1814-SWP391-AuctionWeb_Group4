import React from 'react';

const EmployeeManagement = ({ employees, onEmployeeUpdate, onEmployeeDelete }) => {
    return (
        <div className="employee-management">
            <h2>Employee Management</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.EmployeeId}>
                        {employee.Name} - {employee.Role}
                        <button onClick={() => onEmployeeUpdate(employee)}>Update</button>
                        <button onClick={() => onEmployeeDelete(employee.EmployeeId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeManagement;
