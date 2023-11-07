"use client";
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/components/islogin';
import Navbar from '@/components/Navbar'
import axios from 'axios'
import Card from '@/components/cardHistoryworker';
import "./historyworker.css"
export default function WorkerHistory() {
  const [dataworker,setDataworker] =  useState();
  const { isLogin, role, username } = useContext(UserContext);
  const [chcekFilter, setChcekFilter] = useState('all');
  const selectedFilter = (e) => {
    if (e.target.value === "all") {
      setChcekFilter("all");
    } else if (e.target.value === "not-serviced") {
      setChcekFilter("not-serviced");
    } else if (e.target.value === "completed") {
      setChcekFilter("completed");
    }
  }
  const [dataCardhis,setdataCardhis] = useState([]);
  useEffect(() => {
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
          setDataworker(response.data);
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการเรียก API:', error);
          // จัดการกับข้อผิดพลาดที่เกิดขึ้นที่นี่
        });
    }
  }, [isLogin]);
  useEffect(()=>{
    if (dataworker !== undefined){
      const forcheckrtask = dataworker.workerID 
      fetchReceivedBookings(forcheckrtask);
    }
    
  },[dataworker])
  async function fetchReceivedBookings(e) {
    try {
      const response = await axios.get(`http://localhost:3333/workers/history/${e}`);
      setdataCardhis(response.data)
      console.log(response.data)
      // ... (เหมือนเดิม)
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
  }
  
  return (
    <>
      <Navbar />
      <div className='box-sized'>
        <div className='Box-header-history'>
          <div className='Box-his'>
            <div className='title-history'>งานทั้งหมด</div>
            <select id="status" className='select-filter' onChange={selectedFilter}>
              <option value="all">ทั้งหมด</option>
              <option value="not-serviced">ยังไม่ได้รับบริการ</option>
              <option value="completed">เสร็จสิ้นแล้ว</option>
            </select>
          </div>
          <div className='detail-history'>
            { chcekFilter === "all" ?
            dataCardhis.map((data, index) => (
              <Card key={index} data={data} dataworker={dataworker}/>
            ))
            : null}
            { chcekFilter === "not-serviced" ?
            dataCardhis.filter(data => data.status === "รับบริการแล้ว").map((data, index) => (
              <Card key={index} data={data} dataworker={dataworker}/>
            ))
            : null}
            { chcekFilter === "completed" ?
            dataCardhis.filter(data => data.status === "เสร็จสิ้นบริการ").map((data, index) => (
              <Card key={index} data={data} dataworker={dataworker}/>
            ))
            : null}
          </div>
        </div>
      </div>
    </>

  )
}
