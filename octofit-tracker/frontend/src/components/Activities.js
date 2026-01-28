import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
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
    const fetchActivities = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const endpoint = `${apiBaseUrl}/api/activities/`;
        
        console.log('Fetching Activities from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Raw API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = data.results || data;
        
        console.log('Processed Activities List:', activitiesList);
        
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading activities...
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
        <h2>📊 Activities</h2>
        <span className="badge bg-success">{activities.length} activities</span>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No activities found</strong> - Activities data will appear here
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Activity Name</th>
                <th>Description</th>
                <th>Calories Burned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>
                    <span className="badge bg-secondary">{activity.id}</span>
                  </td>
                  <td>
                    <strong>{activity.name}</strong>
                  </td>
                  <td>{activity.description || '-'}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {activity.calories_burned || 0} cal
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Details</button>
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

export default Activities;
