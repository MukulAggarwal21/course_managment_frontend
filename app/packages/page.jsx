'use client';
import { useEffect, useState } from 'react';
import PackageForm from '../components/PackageForm';

const API_BASE = 'https://course-managment-5.onrender.com/api';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/packages`).then(r => r.json()).then(data => setPackages(data.data || []));
    fetch(`${API_BASE}/users`).then(r => r.json()).then(data => setUsers(data.data || []));
    fetch(`${API_BASE}/courses`).then(r => r.json()).then(data => setCourses(data.data || []));
  }, [refresh]);

  const createPackage = async (pkg) => {
    const res = await fetch(`${API_BASE}/packages/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pkg)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed');
    setRefresh(r => !r);
  };

  const deletePackage = async (id) => {
    if (!window.confirm('Delete package?')) return;
    await fetch(`${API_BASE}/packages/${id}`, { method: 'DELETE' });
    setRefresh(r => !r);
  };

  return (
    <div>
      <PackageForm onSubmit={createPackage} users={users} courses={courses} submitText="Create Package" />
      <h2>Packages</h2>
      <table>
        <thead>
          <tr><th>Title</th><th>Creator</th><th>Courses</th><th>Discount</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {packages.map(p => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.creatorId?.name}</td>
              <td>{p.courses?.map(c => c.title).join(', ')}</td>
              <td>{p.discount}%</td>
              <td>
                <button className="danger" onClick={() => deletePackage(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}