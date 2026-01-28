import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
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

  const getMedalEmoji = (index) => {
    const medals = ['🥇', '🥈', '🥉'];
    return medals[index] || '🏅';
  };

  const getRankClass = (index) => {
    if (index === 0) return 'bg-warning text-dark';
    if (index === 1) return 'bg-secondary';
    if (index === 2) return 'bg-danger';
    return 'bg-primary';
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const endpoint = `${apiBaseUrl}/api/leaderboard/`;
        
        console.log('Fetching Leaderboard from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Raw API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || data;
        
        console.log('Processed Leaderboard:', leaderboardList);
        
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading leaderboard...
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
      <div className="mb-4">
        <h2>🏆 Leaderboard</h2>
        <p className="lead text-muted">Top performers in the OctoFit community</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No leaderboard data found</strong> - Start logging workouts to appear on the leaderboard!
        </div>
      ) : (
        <div>
          {/* Top 3 Cards View */}
          <div className="row g-4 mb-5">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <div key={entry.id || index} className="col-md-4">
                <div className={`card border-0 text-white bg-gradient h-100`} style={{
                  background: index === 0 ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' :
                             index === 1 ? 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)' :
                             'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)'
                }}>
                  <div className="card-body text-center">
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                      {getMedalEmoji(index)}
                    </div>
                    <h5 className="card-title mb-1">{entry.user_name || entry.username || entry.user}</h5>
                    <p className="card-text mb-3">Rank #{index + 1}</p>
                    <div className="row g-2">
                      <div className="col-6">
                        <div style={{ fontSize: '0.9rem' }}>Calories</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                          {entry.total_calories || 0}
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ fontSize: '0.9rem' }}>Workouts</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                          {entry.workouts_count || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Full Table View */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Complete Rankings</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Calories Burned</th>
                      <th>Workouts</th>
                      <th>Score</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id || index}>
                        <td>
                          <span className={`badge ${getRankClass(index)}`}>
                            {getMedalEmoji(index)} #{index + 1}
                          </span>
                        </td>
                        <td>
                          <strong>{entry.user_name || entry.username || entry.user}</strong>
                        </td>
                        <td>
                          <span className="badge bg-success">
                            {entry.total_calories || 0} cal
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {entry.workouts_count || 0}
                          </span>
                        </td>
                        <td>{entry.score || entry.total_calories || 0}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">Profile</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
