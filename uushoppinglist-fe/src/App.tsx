import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './routes/Login.tsx';
import Loading from './routes/Loading.tsx';
import ListDetail from './routes/ListDetail.tsx';
import Home from './routes/Home.tsx';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        {isLoading ? (
          <Route path={'/*'} element={<Loading />} />
        ) : isAuthenticated ? (
          <Route element={<Layout />}>
            <Route path={'/'} element={<Home />} />
            <Route path={'/list/:id'} element={<ListDetail />} />
          </Route>
        ) : (
          <Route path={'/*'} element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
