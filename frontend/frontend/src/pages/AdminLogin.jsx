import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // reset previous error
    try {
      const { data } = await api.post('/login', { email, password });
      if (data.token) {
        localStorage.setItem('aToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

return (
 <div className='flex items-center justify-center min-h-screen bg-gray-50'>
<div className='w-full max-w-md p-5 bg-gray-60 '>
    <div className='flex flex-col items-start '>
        <img className='w-28  mb-4' src="/image.png" alt="logo" />
    </div>

    <form onSubmit={submitHandler} className='flex flex-col'>
        <h3 className='text-lg font-medium mb-2'>Admin email</h3>
        <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type='email'
            placeholder='email@example.com'
        />

        <h3 className='text-lg font-medium mb-2'>Admin password</h3>
        <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type='password'
            placeholder='password'
        />

        {error && (
            <div className='bg-red-100 text-red-700 p-2 mb-4 rounded'>
                {error}
            </div>
        )}

        <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'
        >
            Login
        </button>
    </form>
</div>
</div>

);
};

export default AdminLogin;
