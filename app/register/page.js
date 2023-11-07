"use client";
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import "./register.css"
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
export default function Register() {
  const [inputName, setInputName] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputRole, setInputRole] = useState('user');
  const inputN = (e) => {
    setInputName(e.target.value)
  }
  const inputUN = (e) => {
    setInputUsername(e.target.value)
  }
  const inputPass = (e) => {
    setInputPassword(e.target.value)
  }
  const inputR = (e) => {
    setInputRole(e.target.value);
  }
  const save = (e) => {
    if (inputName.length > 3) {
      if (inputUsername.length > 3) {
        if (inputPassword.length > 5) {
          const jsonregisData = {
            "name": inputName,
            "username": inputUsername,
            "password": inputPassword,
            "role": inputRole
          };
          axios.post("http://localhost:3333/register", jsonregisData, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(response => {
              const data = response.data;
              if (data.status === "success") {
                alert("สมัครสมาชิกเสร็จสิ้น");
                window.location = "/login";
              } else if (data.status === "userfull") {
                alert("มีผู้ใช้นี้อยู่ในระบบแล้ว ลองเปลี่ยนชื่อผู้ใช้ใหม่นะ");
              }
            })
            .catch(error => {
              e.preventDefault()
              alert("sdsdsd")
              console.error('Error', error);
            });
        } else {
          e.preventDefault()
          alert("กรุณาใส่รหัสผ่านอย่างน้อย 6 ตัวอักษร")
        }
      } else {
        e.preventDefault()
        alert("กรุณาใส่ชื่อผู้ใช้อย่างน้อย 4 ตัวอักษร")
      }
    } else {
      e.preventDefault()
      alert("กรุณาใส่ชื่ออย่างน้อย 4 ตัวอักษร")
    }

  }
  return (
    <>
      <Navbar />
      <div className='container-register'>
        <form className='box-regiter' onSubmit={save}>
          <div className='space-imgretext'>
            <Image className="pic-logo" src="/Logo-base.png" width={60} height={60} alt="Picture of the author"></Image>
            <div className='text-title-page'>สมัครสมาชิก</div>
            <div className='box-input-register'>
              <div className='box-name-role'>
                <div className='box-name'>
                  <label className='label-name'>ชื่อ</label>
                  <input type="text" placeholder="กรุณาระบุชื่อของคุณ" onChange={inputN} value={inputName} />
                </div>
                <div className='box-role'>
                  <label className='label-role'>สถานะ</label>
                  <select id="role" name="role" className='select-role' onChange={inputR} value={inputRole} >
                    <option value="user">ผู้ใช้</option>
                    <option value="worker">พนักงาน</option>
                  </select>
                </div>
              </div>
              <label className='label-data'>ชื่อผู้ใช้</label>
              <input type="text" placeholder="กรุณาระบุชื่อผู้ใช้ของคุณ" onChange={inputUN} value={inputUsername} />
              <label className='label-data'>รหัสผ่าน</label>
              <input type="text" placeholder="กรุณาระบุรหัสผ่าน" onChange={inputPass} value={inputPassword} />
            </div>
            <button className='btn-submit-register'>Register</button>
            <div className='register-link'>
              <label>ฉันมีบัญชีแล้ว&nbsp;<Link href="/login">เข้าสู่ระบบ</Link></label>
            </div>
          </div>
          <div className='space-imgregis'>
            <img src='/bannerregister.png' />
          </div>
        </form>
      </div>
    </>

  )
}
