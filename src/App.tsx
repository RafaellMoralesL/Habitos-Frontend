import './App.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabitsThunk } from "./features/habit/habitSlice";
import { fetchRegisterUserThunk, fetchLoginUserThunk, } from './features/user/userSlice';
import type {RootState, AppDispatch } from './store';
import Habits from './habits';

function App() {
  const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  useEffect(() => {
  
    if(user?.token){
      dispatch(fetchHabitsThunk(user.token));
    }
  }, [dispatch, user]);
  const handleLogin = () => {
    dispatch(fetchLoginUserThunk({ username, password}));
  };

  const handleRegister = () => {
    dispatch(fetchRegisterUserThunk({ username, password }));
  };
  return (
    <>
  <div>
        {!user && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2x1 font-bold mb-4">Login / Register</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:boder-blue-500 sm:text-sm text-black"
                />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:boder-blue-500 sm:text-sm text-black"
                    />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegister}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                      >
                        Register
                      </button>
                </div>
              </div>
        )}
        {user ? <Habits /> :null}
  </div>
    </>
  )
}

export default App
