import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getApiBaseUrl = () => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
    const protocol = process.env.REACT_APP_API_PROTOCOL || 'https';
    const port = process.env.REACT_APP_API_PORT || '8000';
    
    if (codespaceName === 'localhost') {
      return `http://localhost:${port}`;
    }
    return `${protocol}://${codespaceName}-${port}.app.github.dev`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const endpoint = `${apiBaseUrl}/api/users/`;
        
        console.log('Fetching Users from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Raw API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersList = data.results || data;
        
        console.log('Processed Users List:', usersList);
        
        setUsers(Array.isArray(usersList) ? usersList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Users</h2>
        <span className="badge bg-primary">{users.length} users</span>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No users found</strong> - Users data will appear here
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="badge bg-secondary">{user.id}</span>
                  </td>
                  <td>
                    <strong>{user.username}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.first_name || '-'}</td>
                  <td>{user.last_name || '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
