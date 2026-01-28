import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import getApiBaseUrl from './config/api';

function App() {
  useEffect(() => {
    // Log API configuration on app startup
    const apiBaseUrl = getApiBaseUrl();
    console.log('🚀 OctoFit Tracker initialized');
    console.log('📡 API Base URL:', apiBaseUrl);
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 200 100"
                className="navbar-logo"
                alt="OctoFit Logo"
              >
                {/* Background gradient */}
                <defs>
                  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#0f3460', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#16213e', stopOpacity:1}} />
                  </linearGradient>
                  <linearGradient id="octo" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#00d4ff', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#0099cc', stopOpacity:1}} />
                  </linearGradient>
                </defs>
                
                {/* Octopus body */}
                <circle cx="50" cy="40" r="25" fill="url(#octo)"/>
                
                {/* Octopus eyes */}
                <circle cx="42" cy="35" r="5" fill="white"/>
                <circle cx="58" cy="35" r="5" fill="white"/>
                <circle cx="42" cy="35" r="3" fill="#0f3460"/>
                <circle cx="58" cy="35" r="3" fill="#0f3460"/>
                
                {/* Octopus smile */}
                <path d="M 45 45 Q 50 48, 55 45" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                
                {/* Tentacles */}
                <path d="M 35 65 Q 30 75, 32 90" stroke="#00d4ff" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M 45 70 Q 42 82, 45 95" stroke="#00d4ff" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M 55 70 Q 58 82, 55 95" stroke="#00d4ff" strokeWidth="5" fill="none" strokeLinecap="round"/>
                <path d="M 65 65 Q 70 75, 68 90" stroke="#00d4ff" strokeWidth="5" fill="none" strokeLinecap="round"/>
                
                {/* Dumbbell */}
                <circle cx="120" cy="35" r="6" fill="#28a745"/>
                <rect x="126" y="31" width="30" height="8" fill="#28a745"/>
                <circle cx="156" cy="35" r="6" fill="#28a745"/>
              </svg>
              <strong>OctoFit Tracker</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <div className="text-center mb-5">
        <h1>🐙 OctoFit Tracker</h1>
        <p className="lead text-muted">Track your fitness journey and compete with your team!</p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h5 className="card-title">Users</h5>
              <p className="card-text text-muted">Manage user profiles and view member information</p>
              <Link to="/users" className="btn btn-primary btn-sm mt-3">
                View Users
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💪</div>
              <h5 className="card-title">Workouts</h5>
              <p className="card-text text-muted">Track your workouts and monitor progress</p>
              <Link to="/workouts" className="btn btn-primary btn-sm mt-3">
                View Workouts
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
              <h5 className="card-title">Leaderboard</h5>
              <p className="card-text text-muted">Compete with others and climb the rankings</p>
              <Link to="/leaderboard" className="btn btn-primary btn-sm mt-3">
                View Rankings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">📊 Activities</h5>
              <p className="card-text text-muted">Browse all available activities and their details</p>
              <Link to="/activities" className="btn btn-outline-primary btn-sm">
                Explore Activities
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">👨‍👩‍👧‍👦 Teams</h5>
              <p className="card-text text-muted">Join teams and collaborate with other members</p>
              <Link to="/teams" className="btn btn-outline-primary btn-sm">
                View Teams
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
