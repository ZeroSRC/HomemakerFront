import React, { useState } from 'react';
import './cardHistoryuser.css';
import axios from 'axios';
function Card({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const formattedFullAddress = data.full_address.replace(/,/g, ' ');
    const handleUpdateBooking = () => {
        // สร้างวันที่ปัจจุบันในรูปแบบ ISO
        const currentTime = new Date().toISOString().split('T')[0]; // ตัดออกส่วนเวลา
        // ส่งร้อยเควสต์ไปยัง API เพื่ออัปเดต endtime
        axios.post(`http://localhost:3333/worker/${data.bookingID}/update`, {
          status: 'เสร็จสิ้นบริการ', // ค่า status ที่คุณต้องการอัปเดต
          endtime: currentTime, // ตั้งค่า endtime เป็นวันที่ปัจจุบัน
        })
          .then(response => {
            // ทำสิ่งที่คุณต้องการเมื่ออัปเดตสำเร็จ
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
          });
      }
      console.log(data)
    return (
        <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpanded}>
            <div className="card-header">
                <div className='thb'>
                    <div className="booking-id">รหัสการจอง : {data.bookingID}</div>
                    {data.status === "รับบริการแล้ว" &&
                        <button className="complete-button" onClick={handleUpdateBooking}>เสร็จสิ้นบริการ</button>
                    }
                </div>
            </div>
            <div className="card-content">
                <div className='box-con'>
                    <span className="status">สถานะ : {data.status}</span>
                    <p>วันที่เริ่มงาน : {data.starttime}</p>
                    <p>วันที่จบงาน : {data.endtime}</p>
                    <p>ผู้ให้บริการ : {data.worker_fname} {data.worker_lname}</p>
                </div>
                {isExpanded && (
                    <div className="additional-info">
                        <div  className='bx-info'>
                            <p>เบอร์โทรศัพท์ผู้ให้บริการ : {data.worker_phone}</p>
                            <p>คำอธิบาย : {data.description.replace(/"/g, "")}</p>
                            <p>ราคา : {data.totalprice} บาท</p>
                            <p>ที่อยู่ : {formattedFullAddress}</p>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}
export default Card;
