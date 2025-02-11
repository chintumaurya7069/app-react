import { useState } from 'react';
import './App.css';

function App() {
  // Initial user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);

  const [newUser, setNewUser] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingName, setEditingName] = useState('');

  // CREATE: Add a new user
  const handleAddUser = () => {
    if (newUser.trim() === '') return;

    const user = {
      id: users.length + 1,
      name: newUser
    };

    setUsers([...users, user]);
    setNewUser('');
  };

  // DELETE: Remove user
  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // UPDATE: Start editing
  const handleEditUser = (id, name) => {
    setEditingUserId(id);
    setEditingName(name);
  };

  // UPDATE: Save edited user
  const handleUpdateUser = () => {
    setUsers(users.map(user =>
      user.id === editingUserId ? { ...user, name: editingName } : user
    ));
    setEditingUserId(null);
    setEditingName('');
  };

  return (
    <div className="app-container">
      <h1>Vite React CRUD App</h1>

      {/* Add User */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Display Users */}
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id}>
            {editingUserId === user.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
              />
            ) : (
              <span>{user.name}</span>
            )}

            <div className="button-group">
              {editingUserId === user.id ? (
                <button onClick={handleUpdateUser} className="save-btn">Save</button>
              ) : (
                <button onClick={() => handleEditUser(user.id, user.name)} className="edit-btn">Edit</button>
              )}
              <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
