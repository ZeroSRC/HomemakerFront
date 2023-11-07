'use client';
import React,{useContext,useEffect} from 'react';
import { UserContext } from '@/components/islogin';
export default function Allworkerpage() {
  const {isLogin,role,username} = useContext(UserContext);
  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    const roletoken = localStorage.getItem("role");
    if (checkToken){
      if (roletoken){
        if (role === "workers"){
          window.location = "/worker/" + username;
        } else if (role === "users"){
          window.location = "/";
        } 
      } else {
        window.location = "/login";
      }
    } else {
      window.location = "/login";
    }
  });
  return (
    <>
    </>
  )
}
