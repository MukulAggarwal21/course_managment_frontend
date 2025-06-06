'use client';
import { useEffect, useState } from 'react';
import CourseForm from '../components/CourseForm';

const API_BASE = 'https://course-managment-5.onrender.com/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/courses`).then(r => r.json()).then(data => setCourses(data.data || []));
    fetch(`${API_BASE}/users`).then(r => r.json()).then(data => setUsers(data.data || []));
  }, [refresh]);

  const createCourse = async (course) => {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Failed');
    setRefresh(r => !r);
  };

  const deleteCourse = async (id) => {
    if (!window.confirm('Delete course?')) return;
    await fetch(`${API_BASE}/courses/${id}`, { method: 'DELETE' });
    setRefresh(r => !r);
  };

  return (
    <div>
      <CourseForm onSubmit={createCourse} users={users} submitText="Create Course" />
      <h2>Courses</h2>
      <table>
        <thead>
          <tr><th>Title</th><th>Creator</th><th>Category</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c._id}>
              <td>{c.title}</td>
              <td>{c.creatorId?.name}</td>
              <td>{c.category}</td>
              <td>{c.price}</td>
              <td>
                <button className="danger" onClick={() => deleteCourse(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}