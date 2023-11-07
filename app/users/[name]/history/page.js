'use client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/components/islogin';
import "./history.css"
import Navbar from '@/components/Navbar';
import Card from '@/components/cardHistoryuser';
import axios from 'axios';
export default function HistoryUser() {
  const { isLogin, role, username } = useContext(UserContext);
  const [cardData, setCardData] = useState([]);
  const [chcekFilter, setChcekFilter] = useState('all');
  const [datauser, setDataUser] = useState([
    {
      "userID": null,
      "fname": null,
      "lname": null,
      "phone": null,
      "name": null,
      "username": null,
      "password": null,
      "address": null,
      "road": null,
      "tumbon": null,
      "umphor": null,
      "province": null,
      "postcode": null
    }
  ]);
  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    const roleToken = localStorage.getItem("token");
    if (checkToken) {
      if (roleToken) {
        if (role === "workers") {
          window.location = "/worker/" + username;
        }
      } else {
        window.location = "/login";
      }
    } else {
      window.location = "/login";
    }
    if (isLogin === "true") {
      axios.get(`http://localhost:3333/users/${username}`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            setDataUser(response.data);
            console.log(response.data);
          } else {
            console.log("ไม่พบข้อมูลผู้ใช้");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isLogin]);
  useEffect(() => {
    const id = datauser[0].userID
    // ทำ GET ร้องขอ API'
    console.log("id : ", id)
    axios.get(`http://localhost:3333/users/${id}/history`) // เปลี่ยน URL เป็นที่คุณใช้งานจริง
      .then((response) => {
        setCardData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการร้องขอ API:', error);
      });
  }, [datauser]);
  const selectedFilter = (e) => {
    if (e.target.value === "all") {
      setChcekFilter("all");
    } else if (e.target.value === "not-serviced") {
      setChcekFilter("not-serviced");
    } else if (e.target.value === "completed") {
      setChcekFilter("completed");
    }
  }
  return (
    <>
      <Navbar />
      <div className='box-sized'>
        <div className='Box-header-history'>
          <div className='Box-his'>
            <div className='title-history'>ประวัติการใช้บริการ</div>
            <select id="status" className='select-filter' onChange={selectedFilter}>
              <option value="all">ทั้งหมด</option>
              <option value="not-serviced">ยังไม่ได้รับบริการ</option>
              <option value="completed">เสร็จสิ้นแล้ว</option>
            </select>
          </div>
          <div className='detail-history'>
          {chcekFilter === "all"
            ? cardData.map((data, index) => (
              <Card key={index} data={data} />
            ))
            : null}
            {chcekFilter === "not-serviced"
                ? cardData
                  .filter(data => data.status === "จองบริการ")
                  .map((data, index) => (
                    <Card key={index} data={data} />
                  ))
                : null}
            {chcekFilter === "completed"
              ? cardData
              .filter(data => data.status === "เสร็จสิ้นบริการ")
              .map((data, index) => (
                <Card key={index} data={data} />
              ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
