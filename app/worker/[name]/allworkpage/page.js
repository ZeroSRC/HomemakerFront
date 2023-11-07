"use client";
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/components/islogin';
import Navbar from '@/components/Navbar'
import axios from 'axios'
import "./allwork.css"
import Card from '@/components/cardallwork';
export default function AllWorkPage() {
  const [cardDataAllwork, setCardDataAllwork] = useState([]);
  const [dataworker,setDataworker] =  useState([]);
  const { isLogin, role, username } = useContext(UserContext);
  useEffect(()=>{
    const checkToken = localStorage.getItem("token");
    const roletoken = localStorage.getItem("role");
    if (checkToken) {
      if (roletoken) {
        if (role === "users") {
          window.location = "/";
        }
      } else {
        window.location = '/login';
      }

    } else {
      window.location = "/login";
    }
    if (isLogin === "true") {
      axios.get(`http://localhost:3333/workers/${username}`)
        .then(response => {
          // ใช้ข้อมูลที่ได้จาก API ที่ตอบกลับที่นี่
          setDataworker(response.data)
          // ดึงข้อมูลงานที่ทำได้
          axios.get(`http://localhost:3333/worker/${response.data.workposition}/${response.data.serviceID}`)
            .then(response => {
              // ใช้ข้อมูลที่ได้จาก API ที่ตอบกลับที่นี่
              console.log(response.data); // สามารถแสดงผลลัพธ์ใน console หรือประมวลผลต่อไปได้
              setCardDataAllwork(response.data);
            })
            .catch(error => {
              console.error('เกิดข้อผิดพลาดในการเรียก API:', error);
              // จัดการกับข้อผิดพลาดที่เกิดขึ้นที่นี่
            });
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการเรียก API:', error);
          // จัดการกับข้อผิดพลาดที่เกิดขึ้นที่นี่
        });
    }
  },[isLogin]);
  return (
    <>
      <Navbar/>
      {/* <div className='box-sized'>
          กรุณาอัพเดตข้อมูลโปรไฟล์และสถานที่ทำงานก่อน
      </div> */}
      <div className='box-sized'>
        <div className='Box-header-history'>
          <div className='Box-his'>
            <div className='title-history'>งานทั้งหมด</div>
          </div>
          <div className='detail-history'>
            {cardDataAllwork.map((data, index) => (
              <Card key={index} data={data} dataworker={dataworker}/>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}
