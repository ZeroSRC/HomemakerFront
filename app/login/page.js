"use client";
import React, { useState,useContext } from 'react'
import Navbar from '@/components/Navbar'
import "./login.css"
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import { UserContext } from '@/components/islogin';
export default function Login() {
    const {isLogin,username,role}= useContext(UserContext);
    const [userName, setUserName] = useState('')
    const inputUsername = (e) => {setUserName(e.target.value)}
    const [passWord, setPassWord] = useState('')
    const inputPassWord = (e) => {setPassWord(e.target.value)}
    const checkPassWord = (e) => {
        const jsonData = {
            username: userName,
            password: passWord
        };
        axios.post("http://localhost:3333/login", jsonData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            const data = response.data;
            if (data.status === "success") {
                if (data.role === "users"){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);
                    window.location = "/" ;
                    alert("ล็อคอินผู้ใช้เสร็จสิ้น");
                } else if (data.role === "workers"){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);
                    window.location = "/worker/" + userName;
                    alert("ล็อคอินผู้ทำงานเสร็จสิ้น");
                }
            } else {
                alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
    }
    // เช็ค login อยู่แล้ว
    if (isLogin == "true") {
        const roleToken = localStorage.getItem("role")
        if (roleToken){
            if (role == 'users') {
                window.location = "/"
            } else if (role == 'workers') {
                window.location = "/worker/" + username
            }
        }
    }
    return (
        <>      
            <Navbar></Navbar>
            <div className='container-login'>
                <form className='box-login' onSubmit={checkPassWord}>
                    <div className='box-spaceimg'>
                        <img src='/banner-login.png' />
                    </div>
                    <div className='box-spacelogin'>
                        <Image className="pic-logo" src="/Logo-base.png" width={70} height={70} alt="Picture of the author"></Image>
                        <div className='text-title-page'>
                            เข้าสู่ระบบ
                        </div>
                        <div className='box-center-input'>
                            <label className='label-data'>ชื่อผู้ใช้</label>
                            <input type="text" placeholder="กรุณาระบุชื่อผู้ใช้ของคุณ" onChange={inputUsername} value={userName} />
                            <label className='label-data'>รหัสผ่าน</label>
                            <input type="text" placeholder="กรุณาระบุรหัสผ่านของคุณ" onChange={inputPassWord} value={passWord} />
                        </div>
                        <button className='btn-submit-login'>Login</button>
                        <div className='register-link'>
                            <label>ยังไม่มีบัญชีใช่ไหม&nbsp;<Link href="/register">สมัครสมาชิก</Link></label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
