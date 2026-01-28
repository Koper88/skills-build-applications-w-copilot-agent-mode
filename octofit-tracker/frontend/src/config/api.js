// API Configuration for OctoFit Tracker
// Automatically detects GitHub Codespaces or local environment

const getApiBaseUrl = () => {
  // Try to get codespace name from environment variable
  let codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  
  // If not set, try to detect from window location
  if (!codespaceName || codespaceName === 'localhost') {
    const hostname = window.location.hostname;
    
    // Check if we're in GitHub Codespaces by looking at the hostname
    if (hostname.includes('app.github.dev')) {
      // Extract codespace name from hostname
      // Format: <codespace-name>-<port>.app.github.dev
      const match = hostname.match(/^([^-]+)-\d+\.app\.github\.dev$/);
      if (match) {
        codespaceName = match[1];
      }
    } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
      codespaceName = 'localhost';
    }
  }
  
  const protocol = process.env.REACT_APP_API_PROTOCOL || 
                   (codespaceName === 'localhost' ? 'http' : 'https');
  const port = process.env.REACT_APP_API_PORT || '8000';
  
  let baseUrl;
  if (codespaceName === 'localhost') {
    baseUrl = `http://localhost:${port}`;
  } else {
    baseUrl = `${protocol}://${codespaceName}-${port}.app.github.dev`;
  }
  
  console.log('🔧 API Configuration:', {
    codespaceName,
    protocol,
    port,
    baseUrl,
    hostname: window.location.hostname,
    env: {
      REACT_APP_CODESPACE_NAME: process.env.REACT_APP_CODESPACE_NAME,
      REACT_APP_API_PROTOCOL: process.env.REACT_APP_API_PROTOCOL,
      REACT_APP_API_PORT: process.env.REACT_APP_API_PORT,
    }
  });
  
  return baseUrl;
};

export default getApiBaseUrl;
