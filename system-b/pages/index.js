import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import ProtectedContent from '../components/ProtectedContent';
import PublicContent from '../components/PublicContent';
import Layout from '../components/Layout';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on page load
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await AuthService.checkAuthStatus();
      if (response.authenticated) {
        setAuthenticated(true);
        setUser({
          id: response.userId,
          username: response.username
        });
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout activeMenu="home">
        <div className="container">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout activeMenu="home">
      <div className="content">
        {authenticated ? (
          <ProtectedContent user={user} />
        ) : (
          <PublicContent onLogin={() => {}} />
        )}
      </div>
    </Layout>
  );
}