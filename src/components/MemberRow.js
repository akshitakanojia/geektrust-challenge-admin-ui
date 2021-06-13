import React, { useContext, useEffect, useState } from 'react'
import "./MembersTable.css"

const MemberRow = ({ row, onRowCheck, onRowDelete, onRowEdit, onClickEdit, token }) => {
  const initialValues = { ...row };

  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState(initialValues);

  const handleCheck = () => onRowCheck(row.id);
  const handleDelete = () => onRowDelete(row.id)
  const handleEdit = (e) => {
    if (editMode) {
      const { name, value } = e.target;
      setEditedValues({
        ...editedValues,
        [name]: value,
      });
    }
  }

  const handleCancel = () => {
    setEditedValues(initialValues);
    setEditMode(false);
    onClickEdit(null);
  }

  const handleSave = () => {
    onRowEdit(editedValues);
    setEditMode(false);
    onClickEdit(null);
  }

  const handleEditMode = () => {
    onClickEdit(row.id);
  }

  useEffect(() => {
    token === row.id ? setEditMode(true) : setEditMode(false);
  }, [token])

  return (
    <tr>
      <td><input type="checkbox" onChange={handleCheck} checked={row.isChecked ? "checked" : ""} /></td>
      <td>
        <div className="inp-wrapper">
          <input className={`data ${editMode ? "editable" : "view"}`}
            name="name"
            value={editedValues.name}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="inp-wrapper">
          <input className={`data ${editMode ? "editable" : "view"}`}
            name="email"
            value={editedValues.email}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        <div className="inp-wrapper">
          <input className={`data ${editMode ? "editable" : "view"}`}
            name="role"
            value={editedValues.role}
            onChange={handleEdit} />
        </div>
      </td>
      <td>
        {editMode ? <><span onClick={handleSave} ><span class="material-icons">
          save
        </span></span>   <span onClick={handleCancel}><span class="material-icons">
          close
        </span></span></>
          : <><span onClick={handleEditMode}><span class="material-icons">
            edit
          </span></span>   <span onClick={handleDelete}><span class="material-icons">
            delete
          </span></span></>}
      </td>
    </tr>
  )
}

export default MemberRow