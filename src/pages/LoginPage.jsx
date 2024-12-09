import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/localStorageUtils';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check the value of `isRegister` in localStorage
    const isRegister = getLocalStorage('isRegister');

    if (isRegister == true) {
      navigate('/dashboard');
    } else if(isRegister == false) {
      navigate('/register');
    }
  }, [navigate]);

  const handleLogin = () => {
    if (email === 'webtrendmonitor@gmail.com' && password === 'welcome1') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white w-full p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
