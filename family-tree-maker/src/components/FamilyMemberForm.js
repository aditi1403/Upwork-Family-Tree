import React, { useState } from 'react';

const FamilyMemberForm = ({ addMember }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [parent, setParent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({ name, photo, parent });
    setName('');
    setPhoto(null);
    setParent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Photo:
        <input type="file" onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} required />
      </label>
      <label>
        Parent (if any):
        <input type="text" value={parent} onChange={(e) => setParent(e.target.value)} />
      </label>
      <button type="submit">Add Member</button>
    </form>
  );
};

export default FamilyMemberForm;
