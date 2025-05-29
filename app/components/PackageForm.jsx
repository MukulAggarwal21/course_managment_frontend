// 'use client';
// import { useState } from 'react';

// export default function PackageForm({ onSubmit, users = [], courses = [], submitText = "Create Package" }) {
//   const [form, setForm] = useState({
//     title: 'Basic Pack',
//     courses: [],
//     creatorId: '',
//     image: '',
//     discount: 0
//   });
//   const [error, setError] = useState('');
//   const [fieldErrors, setFieldErrors] = useState({});

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
//   };
//   const handleCourses = e => {
//     const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
//     setForm({ ...form, courses: options });
//     setFieldErrors({ ...fieldErrors, courses: undefined });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError('');
//     setFieldErrors({});
//     try {
//       await onSubmit({ ...form, discount: Number(form.discount) });
//       setForm({ title: 'Basic Pack', courses: [], creatorId: '', image: '', discount: 0 });
//     } catch (err) {
//       if (err.response && err.response.errors) {
//         setFieldErrors(err.response.errors);
//       } else if (err.errors) {
//         setFieldErrors(err.errors);
//       } else if (err.message) {
//         setError(err.message);
//       } else {
//         setError('Error');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>{submitText}</h3>
//       <select name="title" value={form.title} onChange={handleChange}>
//         {['Basic Pack','Premium Pack','Exclusive Pack'].map(t => (
//           <option key={t} value={t}>{t}</option>
//         ))}
//       </select>
//       {fieldErrors.title && <div style={{color:'red'}}>{fieldErrors.title}</div>}
//       <select name="creatorId" value={form.creatorId} onChange={handleChange} required>
//         <option value="">Select Creator</option>
//         {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
//       </select>
//       {fieldErrors.creatorId && <div style={{color:'red'}}>{fieldErrors.creatorId}</div>}
//       <select name="courses" multiple value={form.courses} onChange={handleCourses} required>
//         {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
//       </select>
//       {fieldErrors.courses && <div style={{color:'red'}}>{fieldErrors.courses}</div>}
//       <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
//       {fieldErrors.image && <div style={{color:'red'}}>{fieldErrors.image}</div>}
//       <input name="discount" type="number" min="0" max="100" placeholder="Discount (%)" value={form.discount} onChange={handleChange} />
//       {fieldErrors.discount && <div style={{color:'red'}}>{fieldErrors.discount}</div>}
//       <button type="submit">{submitText}</button>
//       {error && <div style={{color:'red'}}>{error}</div>}
//     </form>
//   );
// }


'use client';
import { useState } from 'react';

export default function PackageForm({ onSubmit, users = [], courses = [], submitText = "Create Package" }) {
  const [form, setForm] = useState({
    title: 'Basic Pack',
    courses: [],
    creatorId: '',
    image: '',
    discount: 0
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
  };
  const handleCourses = e => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setForm({ ...form, courses: options });
    setFieldErrors({ ...fieldErrors, courses: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    try {
      await onSubmit({ ...form, discount: Number(form.discount) });
      setForm({ title: 'Basic Pack', courses: [], creatorId: '', image: '', discount: 0 });
    } catch (err) {
      if (err.errors) {
        const fe = {};
        err.errors.forEach(er => { fe[er.field] = er.message; });
        setFieldErrors(fe);
      } else {
        setError(err.message || 'Error');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{submitText}</h3>
      <select name="title" value={form.title} onChange={handleChange}>
        {['Basic Pack','Premium Pack','Exclusive Pack'].map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {fieldErrors.title && <div style={{color:'red'}}>{fieldErrors.title}</div>}
      <select name="creatorId" value={form.creatorId} onChange={handleChange} required>
        <option value="">Select Creator</option>
        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>
      {fieldErrors.creatorId && <div style={{color:'red'}}>{fieldErrors.creatorId}</div>}
      <select name="courses" multiple value={form.courses} onChange={handleCourses} required>
        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
      </select>
      {fieldErrors.courses && <div style={{color:'red'}}>{fieldErrors.courses}</div>}
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
      {fieldErrors.image && <div style={{color:'red'}}>{fieldErrors.image}</div>}
      <input name="discount" type="number" min="0" max="100" placeholder="Discount (%)" value={form.discount} onChange={handleChange} />
      {fieldErrors.discount && <div style={{color:'red'}}>{fieldErrors.discount}</div>}
      <button type="submit">{submitText}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}