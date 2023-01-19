import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import './Admin.css'

function ViewUsers() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getUsers() // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    let result = await fetch('http://localhost:3001/admin/users')
    result = await result.json();
    if (result) {
      setUsers(result);
    }
  };

  const deleteUser = async (id) => {
    let result = await fetch(`http://localhost:3001/admin/user/${id}`, {
      method: "Delete"
    });
    result = await result.json()
    console.log(result)
    if (result.result) {
      console.log(result.result)
      searchHandle()
    }
    if (result.error) {
      console.log('error found')
      navigate('/notFound')
    }
  }

  const updateUser = async (id) => {
      return navigate(`/admin/update/${id}`)
  }

  const searchHandle = async (event) => {
    let key = event?.target.value
    console.log(key);
    if (key) {
      let result = await fetch(`http://localhost:3001/admin/search/${key}`)
      result = await result.json()
      if (result) {
        setUsers(result)
      }
    } else {
      getUsers()
    }
  }

  return (
    <div className="user-list">

      <h2>All Users</h2>
      <input type="text" className="search-user" placeholder="Search users"
        onChange={searchHandle}
      />
      <ul style={{ fontWeight: 500 }}>
        <li>S.No</li>
        <li>Name</li>
        <li>Email</li>
        <li>Actions</li>
      </ul>
      {users.length > 0 ? users.map((user, index) => (

        <ul className='ulFocus' key={user._id}>
          <li>{index + 1}</li>
          <li>{user.name}</li>
          <li>{user.email}</li>
          <li>
            <button className='deleteBtn'
              onClick={() => {
                if (window.confirm(`Do you want to delete ${user.name} ?`)) {
                  deleteUser(user._id)
                }
              }}>Delete</button>
              <button className='deleteBtn'
              onClick={()=>updateUser(user._id)}>Update</button>
              
          </li>
        </ul>
      ))
        :
        <h2>No Result Found</h2>
      }
    </div>
  )
}

export default ViewUsers