import React, {useState} from 'react';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

const App = () => {

  const usersData = [
    { id: 1, name: 'Tania', username: 'TaniaMania' },
    { id: 2, name: 'Craig', username: 'JmansBro' },
    { id: 3, name: 'Mike', username: 'Jdan34' },
    { id: 4, name: 'Steve', username: 'Officeboss' },
  ]
  const initialFormState = { id: null, name: '', username: '' }

  const [users, setUsers] = useState(usersData);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = user => {
    user.id = users.length +1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
    setEditing(false)
}

  const editRow = user => {
    setEditing(true)

    setCurrentUser({id: user.id, name: user.name, username: user.username })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map(user => (user.id === id ? updatedUser: user)))
  }
  
    return (
      <div className = 'container'>
      <h1>CRUD App with Hooks</h1>
      <div className= 'flex-row'>
        <div className = "flex-large">
          {editing ? (
            <div>
              <h2>Edit User</h2>
              <EditUserForm
              editing={editing}
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
              />
            </div>
          ) : (
        <div>
          <h2> Add User</h2>
          <AddUserForm addUser={addUser} />
        </div>
          )}
        </div>

        <div className = 'flex-large'>
          <h2> View Users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
