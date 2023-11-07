import React, { useState,useEffect } from 'react';
import './cardHistoryuser.css';
import axios from 'axios';
function Card({ data , dataworker}) {
    const [isBookingAccepted, setIsBookingAccepted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handlerecervBooking = () => {
      const jsonAcceptData = {
        bookingID: data.bookingID,
        workerID: dataworker.workerID
      };
      axios.post(`http://localhost:3333/worker/:id/workallpage`, jsonAcceptData, {
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then(response => {
          const data = response.data;
            alert("อัพเดตข้อมูลเสร็จสิ้น");
            setIsBookingAccepted(true);
    })
      }
      useEffect(() => {
        if (isBookingAccepted) {
          // เมื่อการรับงานสำเร็จแล้ว ให้รีเรนเดอร์หน้าใหม่
          window.location.reload();
        }
      }, [isBookingAccepted]);
    return (
        <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpanded}>
            <div className="card-header">
                <div className='thb'>
                    <div className="booking-id">รหัสการจอง : {data.bookingID}</div>
                        <button className="complete-button" onClick={handlerecervBooking}>รับงาน</button>
                </div>
            </div>
            <div className="card-content">
                <div className='box-con'>
                    <span className="status">สถานะ : {data.status}</span>
                    <p>วันที่เริ่มงาน : {data.starttime.split('T')[0]}</p>
                    <p>วันที่จบงาน : {data.endtime}</p>
                    <p>ผู้ใช่บริการ : {data.fname} {data.lname}</p>
                </div>
                {isExpanded && (
                    <div className="additional-info">
                        <div  className='bx-info'>
                            <p>เบอร์โทรศัพท์ผู้ใช้บริการ : {data.worker_phone}</p>
                            <p>คำอธิบาย : {data.description.replace(/"/g, "")}</p>
                            <p>ราคา : {data.totalprice} บาท</p>
                            <p>ที่อยู่ : {data.address} ถนน </p>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}
export default Card;
