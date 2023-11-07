'use client';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/components/islogin';

export default function Alluserspage() {
  const { isLogin, role, username } = useContext(UserContext);

  useEffect(() => {
    const checkToken = refstorage.getItem("token"); // ใช้ refstorage แทน localStorage
    const roletoken = refstorage.getItem("role"); // ใช้ refstorage แทน localStorage

    if (typeof refstorage !== 'undefined') { // ใช้ refstorage แทน localStorage
      if (checkToken) {
        if (roletoken) {
          if (role === "workers") {
            window.location = "/worker/" + username;
          } else if (role === "users") {
            window.location = "/";
          } else {
            window.location = "/login";
          }
        }
      } else {
        window.location = "/login";
      }
    }
  }, []); // เพิ่ม `[]` เพื่อให้ useEffect ทำงานครั้งเดียวเมื่อคอมโพเนนต์ถูกโหลด

  return (
    <>
    </>
  )
}
