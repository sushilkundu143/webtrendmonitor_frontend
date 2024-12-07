import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DetailsPage from './pages/DetailsPage';
import RegisterPage from './pages/RegisterPage';
import axiosInstance from './axiosInstance';
import { useQuery } from 'react-query';

function App() {
  const fetchUsers = async () => {
    const { data } = await axiosInstance.get('/lighthouse/run-report');
    return data;
  };
  const { data, error, isLoading } = useQuery('users', fetchUsers);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {!isLoading && (
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/dashboard' element={<DashboardPage data={data} />} />
            <Route path='/details/:buildId' element={<DetailsPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
