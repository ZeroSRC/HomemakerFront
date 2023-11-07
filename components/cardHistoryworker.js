import React, { useState } from 'react';
import './cardHistoryuser.css';
import axios from 'axios';
function cardHistoryworker({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpanded}>
            <div className="card-header">
                <div className='thb'>
                    <div className="booking-id">รหัสการจอง : {data.bookingID}</div>
                </div>
            </div>
            <div className="card-content">
                <div className='box-con'>
                    <span className="status">สถานะ : {data.status}</span>
                    <p>วันที่เริมงาน : {data.starttime ? new Date(data.starttime).toLocaleString().replace('12:00:00 AM', '') : 'ไม่มีข้อมูล'}</p>
                    <p>วันที่จบงาน : {data.endtime ? new Date(data.endtime).toLocaleString().replace('12:00:00 AM', '') : 'ไม่มีข้อมูล'}</p>
                    <p>ผู้ใช้บริการ : {data.fname} {data.lname}</p>
                </div>
                {isExpanded && (
                    <div className="additional-info">
                        <div className='bx-info'>
                            <p>เบอร์โทรศัพท์ผู้ใช้บริการ : {data.phone}</p>
                            <p>คำอธิบาย : {data.description.replace(/"/g, "")}</p>
                            <p>ราคา : {data.totalprice} บาท</p>
                            <p>ที่อยู่ : {data.address} ถนน {data.road} ตำบล {data.tumbon} อำเภอ {data.umphor} 
                            จังหวัด {data.province } รหัสไปษณีย์ {data.postcode}
                            </p>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}
export default cardHistoryworker;
