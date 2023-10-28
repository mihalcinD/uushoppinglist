import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import Login from './routes/Login.tsx';
import Loading from './routes/Loading.tsx';

function App() {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        {isLoading ? (
          <Route path="/" element={<Loading />} />
        ) : isAuthenticated ? (
          <Route path="/" element={<Layout />}></Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
