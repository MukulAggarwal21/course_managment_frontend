// 'use client';
// import { useState } from 'react';

// export default function CourseForm({ onSubmit, initial = {}, users = [], submitText = "Create Course" }) {
//   const [form, setForm] = useState({
//     title: initial.title || '',
//     description: initial.description || '',
//     price: initial.price || '',
//     image: initial.image || '',
//     creatorId: initial.creatorId || '',
//     category: initial.category || 'Programming',
//     duration: initial.duration || '',
//     level: initial.level || 'Beginner'
//   });
//   const [error, setError] = useState('');
//   const [fieldErrors, setFieldErrors] = useState({});

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError('');
//     setFieldErrors({});
//     try {
//       await onSubmit({ ...form, price: Number(form.price), duration: Number(form.duration) });
//       setForm({ title: '', description: '', price: '', image: '', creatorId: '', category: 'Programming', duration: '', level: 'Beginner' });
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
//       <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//       {fieldErrors.title && <div style={{color:'red'}}>{fieldErrors.title}</div>}
//       <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
//       {fieldErrors.description && <div style={{color:'red'}}>{fieldErrors.description}</div>}
//       <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
//       {fieldErrors.price && <div style={{color:'red'}}>{fieldErrors.price}</div>}
//       <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
//       {fieldErrors.image && <div style={{color:'red'}}>{fieldErrors.image}</div>}
//       <select name="creatorId" value={form.creatorId} onChange={handleChange} required>
//         <option value="">Select Creator</option>
//         {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
//       </select>
//       {fieldErrors.creatorId && <div style={{color:'red'}}>{fieldErrors.creatorId}</div>}
//       <select name="category" value={form.category} onChange={handleChange}>
//         {['Programming','Design','Business','Marketing','Photography','Music','Other'].map(cat => (
//           <option key={cat} value={cat}>{cat}</option>
//         ))}
//       </select>
//       {fieldErrors.category && <div style={{color:'red'}}>{fieldErrors.category}</div>}
//       <input name="duration" type="number" step="0.1" placeholder="Duration (hours)" value={form.duration} onChange={handleChange} />
//       {fieldErrors.duration && <div style={{color:'red'}}>{fieldErrors.duration}</div>}
//       <select name="level" value={form.level} onChange={handleChange}>
//         {['Beginner','Intermediate','Advanced'].map(lvl => (
//           <option key={lvl} value={lvl}>{lvl}</option>
//         ))}
//       </select>
//       {fieldErrors.level && <div style={{color:'red'}}>{fieldErrors.level}</div>}
//       <button type="submit">{submitText}</button>
//       {error && <div style={{color:'red'}}>{error}</div>}
//     </form>
//   );
// }
'use client';
import { useState } from 'react';

export default function CourseForm({ onSubmit, initial = {}, users = [], submitText = "Create Course" }) {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    price: initial.price || '',
    image: initial.image || '',
    creatorId: initial.creatorId || '',
    category: initial.category || 'Programming',
    duration: initial.duration || '',
    level: initial.level || 'Beginner'
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    try {
      await onSubmit({ ...form, price: Number(form.price), duration: Number(form.duration) });
      setForm({ title: '', description: '', price: '', image: '', creatorId: '', category: 'Programming', duration: '', level: 'Beginner' });
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
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      {fieldErrors.title && <div style={{color:'red'}}>{fieldErrors.title}</div>}
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      {fieldErrors.description && <div style={{color:'red'}}>{fieldErrors.description}</div>}
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      {fieldErrors.price && <div style={{color:'red'}}>{fieldErrors.price}</div>}
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
      {fieldErrors.image && <div style={{color:'red'}}>{fieldErrors.image}</div>}
      <select name="creatorId" value={form.creatorId} onChange={handleChange} required>
        <option value="">Select Creator</option>
        {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
      </select>
      {fieldErrors.creatorId && <div style={{color:'red'}}>{fieldErrors.creatorId}</div>}
      <select name="category" value={form.category} onChange={handleChange}>
        {['Programming','Design','Business','Marketing','Photography','Music','Other'].map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {fieldErrors.category && <div style={{color:'red'}}>{fieldErrors.category}</div>}
      <input name="duration" type="number" step="0.1" placeholder="Duration (hours)" value={form.duration} onChange={handleChange} />
      {fieldErrors.duration && <div style={{color:'red'}}>{fieldErrors.duration}</div>}
      <select name="level" value={form.level} onChange={handleChange}>
        {['Beginner','Intermediate','Advanced'].map(lvl => (
          <option key={lvl} value={lvl}>{lvl}</option>
        ))}
      </select>
      {fieldErrors.level && <div style={{color:'red'}}>{fieldErrors.level}</div>}
      <button type="submit">{submitText}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}