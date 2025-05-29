'use client';
import { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';

const API_BASE = 'https://course-managment-5.onrender.com/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/users`)
      .then(r => r.json())
      .then(data => setUsers(data.data || []));
  }, [refresh]);

  const createUser = async (user) => {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed');
    setRefresh(r => !r);
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete user?')) return;
    await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
    setRefresh(r => !r);
  };

  return (
    <div>
      <UserForm onSubmit={createUser} submitText="Create User" />
      <h2>Users</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Location</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.location}</td>
              <td>
                <button className="danger" onClick={() => deleteUser(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
