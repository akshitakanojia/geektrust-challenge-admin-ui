import React, { useEffect, useState } from 'react'
import MemberRow from './MemberRow'
import "./MembersTable.css"
import Pagination from './Pagination';

const MembersTable = ({ members, onCheck, onDelete, onDeleteSelected, onEdit }) => {
  const maxItem = 10;
  const maxPageNumber = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [allCheckOnPage, setAllCheckOnPage] = useState(false);
  const [anyCheck, setAnyCheck] = useState(false);
  const [token, setToken] = useState(null);
  const [totalPages, setTotalPages] = useState(Math.ceil(members?.length / maxItem));

  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members?.length, totalPages])

  const currentData = () => {
    const begin = (currentPage - 1) * maxItem;
    const end = begin + maxItem;
    return members.slice(begin, end);
  }
  
  useEffect(() => {
    setTotalPages(Math.ceil(members?.length / maxItem));
    setAnyCheck(members.reduce((i, member) => i || member.isChecked, false));
  }, [members])
  
  useEffect(() => {
    setAllCheckOnPage(currentData().reduce((i, member) => i && member.isChecked, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, members, currentData()])
  

  const handleAllRowsCheck = (e) => {
    if (e.target.checked)
      currentData()?.map(row => !row.isChecked && onCheck(row.id));
    else
      currentData()?.map(row => row.isChecked && onCheck(row.id));
  }

  const handleRowCheck = (id) => onCheck(id);

  const handleRowDelete = (id) => onDelete(id);

  const handleDelete = () => onDeleteSelected();

  const handleRowEdit = (row) => onEdit(row);

  const handleEditLock = (id) => setToken(id);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox"
              onChange={handleAllRowsCheck}
              checked={anyCheck ? allCheckOnPage ? "checked" : "" : ""} /></th>
            <th><div className="data">Name</div></th>
            <th><div className="data">Email</div></th>
            <th><div className="data">Role</div></th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            currentData().map(member =>
              <MemberRow key={member.id}
                row={member}
                onRowCheck={handleRowCheck}
                onRowDelete={handleRowDelete}
                onRowEdit={handleRowEdit}
                onClickEdit={handleEditLock}
                token={token}
              />
            )
          }
        </tbody>
      </table>
      <div className="footer">
        <button className={`del-btn${!anyCheck ? " disabled" : ""}`} disabled={!anyCheck ? "disabled" : ""} onClick={handleDelete}>Delete seleted</button>
        {
          currentData() &&
          <Pagination
            currentPage={currentPage}
            limit={maxPageNumber}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        }
      </div>
    </div>
  )
}

export default MembersTable
