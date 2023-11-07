"use client";
import React,{useContext} from 'react';
import { UserContext } from '@/components/islogin';
import Navbar from '@/components/Navbar'
import "./price.css"
export default function Price() {
    const token = localStorage.getItem("token");
    const {isLogin,role,username} = useContext(UserContext);
    const BookingBtn = () =>{
      if (token) {
        if (role === "users") {
          window.location = "/users/"+username+"/booking";
        } else if (role === "workers") {
          alert("press login user account")
        }
      } else {
        window.location = "/login"
      }
    }
    return (
    <>
      {isLogin&&<Navbar/>}
      <div className='price-box'>
        <div className='top-price-box'>
          <div id='1' className='price-box-contain'>
            <div className='area-work'>
              <div className='second-detail'>พิษณุโลก เขตอำเภอเมือง</div>
              <h1>฿260/ชม.</h1>
              <div className='second-detail'>รวมภาษีแล้ว</div>
            </div>
            <div className='detail-price'>
              <div className='price-hour'>2 ชม. ฿520</div>
              <div className='price-hour'>3 ชม. ฿780</div>
              <div className='price-hour'>4 ชม. ฿1,040</div>
              <div className='price-hour'>6 ชม. ฿1,560</div>
              <div className='price-hour'>8 ชม. ฿2,080</div>
            </div>
            <button className='btn-price' onClick={BookingBtn}>จองบริการ</button>
          </div>
          <div id='2' className='price-box-contain'>
            <div className='area-work'>
              <div className='second-detail'>พิษณุโลก อำเภอวังทอง</div>
              <h1>฿280/ชม.</h1>
              <div className='second-detail'>รวมภาษีแล้ว</div>
            </div>
            <div className='detail-price'>
              <div className='price-hour'>2 ชม. ฿560</div>
              <div className='price-hour'>3 ชม. ฿840</div>
              <div className='price-hour'>4 ชม. ฿1,120</div>
              <div className='price-hour'>6 ชม. ฿1,680</div>
              <div className='price-hour'>8 ชม. ฿2,240</div>
            </div>
            <button className='btn-price' onClick={BookingBtn} >จองบริการ</button>
          </div>
          <div id='3' className='price-box-contain'>
            <div className='area-work'>
              <div className='second-detail'>พิษณุโลก เขตอื่นๆ</div>
              <h1>฿300/ชม.</h1>
              <div className='second-detail'>รวมภาษีแล้ว</div>
            </div>
            <div className='detail-price'>
              <div className='price-hour'>2 ชม. ฿600</div>
              <div className='price-hour'>3 ชม. ฿900</div>
              <div className='price-hour'>4 ชม. ฿1,200</div>
              <div className='price-hour'>6 ชม. ฿1,800</div>
              <div className='price-hour'>8 ชม. ฿2,400</div>
            </div>
            <button className='btn-price' onClick={BookingBtn}>จองบริการ</button>
          </div>
        </div>     
        <div className='under-price-box'>
          <div className='detail-price'>
            <p>เว็ปไซต์ Homemaker สร้างขึ้นเพื่อศึกษาเกี่ยวกับเว็ปไซต์ Home assistant อีกทั้งศึกษาเกี่ยวกับการทำงานของระบบฐานข้อมูลและความสัมพันธ์ของข้อมูล เป็นส่วนหนึ่งในรายวิชา Database เท่านั้น ไม่มีการประสงค์สร้างรายได้แต่อย่างใด</p>
          </div>
        </div>
      </div>
    </>
    )
  }
  