// 'use client';
// import { useState } from 'react';

// export default function UserForm({ onSubmit, initial = {}, submitText = "Create User" }) {
//   const [form, setForm] = useState({
//     name: initial.name || '',
//     email: initial.email || '',
//     phone: initial.phone || '',
//     location: initial.location || 'India',
//     profileImage: initial.profileImage || ''
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
//       await onSubmit(form);
//       setForm({ name: '', email: '', phone: '', location: 'India', profileImage: '' });
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
//       <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
//       {fieldErrors.name && <div style={{color:'red'}}>{fieldErrors.name}</div>}
//       <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//       {fieldErrors.email && <div style={{color:'red'}}>{fieldErrors.email}</div>}
//       <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
//       {fieldErrors.phone && <div style={{color:'red'}}>{fieldErrors.phone}</div>}
//       <select name="location" value={form.location} onChange={handleChange}>
//         {['India','USA','UK','Canada','Australia','Germany','France','Other'].map(loc => (
//           <option key={loc} value={loc}>{loc}</option>
//         ))}
//       </select>
//       {fieldErrors.location && <div style={{color:'red'}}>{fieldErrors.location}</div>}
//       <input name="profileImage" placeholder="Profile Image URL" value={form.profileImage} onChange={handleChange} />
//       {fieldErrors.profileImage && <div style={{color:'red'}}>{fieldErrors.profileImage}</div>}
//       <button type="submit">{submitText}</button>
//       {error && <div style={{color:'red'}}>{error}</div>}
//     </form>
//   );
// }

'use client';
import { useState } from 'react';

export default function UserForm({ onSubmit, initial = {}, submitText = "Create User" }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    email: initial.email || '',
    phone: initial.phone || '',
    location: initial.location || 'India',
    profileImage: initial.profileImage || ''
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
      await onSubmit(form);
      setForm({ name: '', email: '', phone: '', location: 'India', profileImage: '' });
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
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      {fieldErrors.name && <div style={{color:'red'}}>{fieldErrors.name}</div>}
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      {fieldErrors.email && <div style={{color:'red'}}>{fieldErrors.email}</div>}
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      {fieldErrors.phone && <div style={{color:'red'}}>{fieldErrors.phone}</div>}
      <select name="location" value={form.location} onChange={handleChange}>
        {['India','USA','UK','Canada','Australia','Germany','France','Other'].map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
      {fieldErrors.location && <div style={{color:'red'}}>{fieldErrors.location}</div>}
      <input name="profileImage" placeholder="Profile Image URL" value={form.profileImage} onChange={handleChange} />
      {fieldErrors.profileImage && <div style={{color:'red'}}>{fieldErrors.profileImage}</div>}
      <button type="submit">{submitText}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}