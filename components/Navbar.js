"use client";
import Link from "next/link";
import "./Navbar.css"
import React,{ useContext, useEffect, useState } from "react";
import Image from "next/image";
import {AiFillPhone} from "react-icons/ai";
import {GrMail} from "react-icons/gr";
import { UserContext } from '@/components/islogin';
export default function Navbar() {
    const [noneUser,setNoneUser] = useState(false);
    const [users,setUsers] = useState(false);
    const [workers,setWorkers] = useState(false);
    const {isLogin,role,username} = useContext(UserContext);
    const clickLogout =() =>{
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        window.location = "/login";
    }
    useEffect(()=>{
        if (role === 'users'){
            //  ถ้า user เป็น true ให้เปิดใช้งาน user
            setUsers(true);
            setNoneUser(false);
            setWorkers(false);

        } else if (role === 'workers'){
            // ถ้า worker เป็น ture ให้เปิดใช้งาน workers
            setWorkers(true);
            setUsers(false);
            setNoneUser(false);

        } else {
            // ถ้าไม่มีการ log in ทั้ง user และ workers ให้เข้าเงื่อนไขนี้
            setNoneUser(true);
            setWorkers(false);
            setUsers(false);
        }
    });
    return (
        <>
            <div className="Header-container">
                <div className="Header-contact">
                    <div><p>Customer Service <AiFillPhone/> : 080-xxxx-xxx  <GrMail/> : Homemaker@xxx.com ทำขึ้นเพื่อการศึกษาเท่านั้น</p> </div>
                </div>
            </div>
            <div className="nav-container">
                <nav className="nav">
                    <div className="Logo">
                        <Link href="/"><Image className="pic-logo" src="/Logo.png" width={172.20} height={32.157} alt="Picture of the author" loading="lazy"></Image></Link>
                    </div>
                    {noneUser && <div className="Menu-link">
                        <Link href="/">หน้าหลัก</Link>
                        <Link href="/price">ค่าบริการ</Link>
                        <Link href="/login">ล็อคอิน/สมัครสมาชิก</Link>
                    </div>}
                    {users && <div className="Menu-link">
                        <Link href="/">หน้าหลัก</Link>
                        <Link href="/price">ค่าบริการ</Link>
                        <Link href={`/users/${username}/booking`}>จองบริการ</Link>
                        <div className="dropdown">
                            <button className="dropbtn">ผู้ใช้ : {username}</button>
                            <div className="dropdown-content">
                                <a href={`/users/${username}/profile`}>โปรไฟล์</a>
                                <a href={`/users/${username}/history`}>ประวัติการจอง</a>
                                <a className="log-out" onClick={clickLogout}>Log out</a>
                            </div>
                        </div>
                    </div>}
                    {workers && <div className="Menu-link">
                        <Link href={`/worker/${username}`}>หน้าหลัก</Link>
                        <Link href={`/worker/${username}/allworkpage`}>งานทั้งหมด</Link>
                        <div className="dropdown">
                            <button className="dropbtn">ผู้ทำงาน : {username}</button>
                            <div className="dropdown-content">
                                <a href={`/worker/${username}/profile`}>โปรไฟล์</a>
                                <a href={`/worker/${username}/history`}>ประวัติการให้บริการ</a>
                                <a className="log-out" onClick={clickLogout}>Log out</a>
                            </div>
                        </div>
                    </div>}
                </nav>
            </div>
        </>
    )
  }
  