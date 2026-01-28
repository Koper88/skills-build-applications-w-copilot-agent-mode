import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
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
    const fetchTeams = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const endpoint = `${apiBaseUrl}/api/teams/`;
        
        console.log('Fetching Teams from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Raw API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results || data;
        
        console.log('Processed Teams List:', teamsList);
        
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading teams...
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
        <h2>👨‍👩‍👧‍👦 Teams</h2>
        <button className="btn btn-primary">Create Team</button>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No teams found</strong> - Create or join a team to get started!
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{team.name}</h5>
                    <span className="badge bg-primary">{team.members_count || 0}</span>
                  </div>
                  <p className="card-text text-muted">{team.description || 'No description'}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary flex-grow-1">View</button>
                    <button className="btn btn-sm btn-outline-secondary flex-grow-1">Join</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
