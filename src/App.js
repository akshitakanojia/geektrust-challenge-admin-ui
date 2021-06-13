import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MembersTable } from './components/MembersTable';


function App() {
  const [members, setMembers] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState(null);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response => {
        setMembers(response.data.map((row) => ({ ...row, isChecked: false })));
      }))
      .catch(error => console.log(error))
  }, [])


  useEffect(() => {
    if (searchString?.length > 0) {
      setFilteredMembers(members.filter(member => {
        if (member.name?.toLowerCase().includes(searchString.toLowerCase())
          || member.email?.toLowerCase().includes(searchString.toLowerCase())
          || member.role?.toLowerCase().includes(searchString.toLowerCase())
        ) {
          return member;
        }
      }))
    }
    else {
      setFilteredMembers(members)
    }
  }, [searchString, members]);

  const handleCheck = (id) => {
    let tempMembers = [...members]
    tempMembers.forEach(member => { 
      if (member.id === id) {
        member.isChecked = !member.isChecked;
      }
    })
    setMembers(tempMembers)
  }

  const handleDelete = (id) => {
    let tempMembers = [...members]
    tempMembers = tempMembers.filter(member => member.id !== id)
    setMembers(tempMembers)
  }

  const handleDeleteSelected = () => {
    let tempMembers = [...members]
    tempMembers = tempMembers.filter(member => !member.isChecked)
    setMembers(tempMembers)
  }

  const handleEdit = (row) => {
    let tempMembers = [...members]
    tempMembers = tempMembers.map(member => {
      if (member.id === row.id) {
        return Object.assign(member, row)
      }
      return member
    })
    setMembers(tempMembers)
  }

  return (
    <div className="container">
      <div className="search-container">
        <input className="search-box"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search by name, email or role" />
      </div>
      {
        filteredMembers &&
        <MembersTable
          members={filteredMembers}
          onCheck={handleCheck}
          onDelete={handleDelete}
          onDeleteSelected={handleDeleteSelected}
          onEdit={handleEdit}
        />
      }
    </div>
  );
}

export default App;
