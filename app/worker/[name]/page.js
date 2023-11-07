'use client';
import React,{useContext,useEffect} from 'react';
import { UserContext } from '@/components/islogin';
import Navbar from '@/components/Navbar';
import "./workerindex.css"
export default function WorkerName() {
  const {isLogin,role,username} = useContext(UserContext);
  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    const roletoken = localStorage.getItem("role");
    if (checkToken){
      if (roletoken){
        if (role === "users"){
          if (username){
            window.location = "/";
          }
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
      <Navbar/>
      <div className='exprian-box'>
        <div className='HowToWork'>
          <div className='title'>ขั้นตอนในการเริ่มทำงาน</div>
          <div className='detail1'>1.หลังจาก login เข้าใช้งานแล้วในครั้งเเรกให้ไปทำการอัพเดตข้อมูลโปรไฟล์ทั้งหมด</div>
          <img src="/Howto1.png" width="250" height="auto"/>
          <img src="/Howto2.png" width="400" height="auto"/>
          <img src="/Howto3.png" width="400" height="auto"/>
          <div className='detail2'>2.หลังจากนั้นเราสามารถไปที่ งานทั้งหมด และเริ่มรับงานได้เลย</div>
        </div>
      </div>
    </>
  )
}
