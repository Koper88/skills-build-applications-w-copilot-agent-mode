import React, { useState, useEffect } from 'react';
import getApiBaseUrl from '../config/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const endpoint = `${apiBaseUrl}/api/workouts/`;
        
        console.log('Fetching Workouts from:', endpoint);
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('Raw API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results || data;
        
        console.log('Processed Workouts List:', workoutsList);
        
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setError(null);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info" role="alert">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading workouts...
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
        <h2>💪 Workouts</h2>
        <span className="badge bg-warning text-dark">{workouts.length} logged</span>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No workouts found</strong> - Start logging your workouts!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Activity</th>
                <th>Duration (mins)</th>
                <th>Date</th>
                <th>Calories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>
                    <span className="badge bg-secondary">{workout.id}</span>
                  </td>
                  <td>
                    <strong>{workout.user}</strong>
                  </td>
                  <td>{workout.activity}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {workout.duration_minutes} min
                    </span>
                  </td>
                  <td>{new Date(workout.date).toLocaleDateString()}</td>
                  <td>
                    <span className="badge bg-success">
                      {workout.calories_burned || 0} cal
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
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

export default Workouts;
