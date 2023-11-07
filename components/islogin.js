'use client';
import React, { useEffect, createContext, useReducer } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const initialState = {
  isLogin: 'false',
  role: '',
  username: '',
};
function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLogin: 'true',
        role: action.role,
        username: action.username,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}
export default function Islogin({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && (role === 'users' || role === 'workers')) {
      axios({
        method: 'post',
        url: 'http://localhost:3333/auth',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const data = res.data;
          if (data.status === 'success') {
            const { username } = data.decoded;
            dispatch({ type: 'LOGIN', role, username });
          } else {
            // status error หรือ token หมดอายุ
            alert('Timed out press login again');
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
            window.location = "/login"
          }
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
          dispatch({ type: 'LOGOUT' });
        });
    } else {
        // กรณีมีการพยายามลบ token
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  }, []);
  return (
    <UserContext.Provider value={state}>
      {children}
    </UserContext.Provider>
  );
}
