"use client";
import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/components/islogin';
import "./profile.css"
export default function UserProfile() {
  const { isLogin, role, username } = useContext(UserContext);
  const [userID, setUserID] = useState(0);
  const [fname, setFname] = useState('');
  const [lname, setlname] = useState('');
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [road, setRoad] = useState("");
  const [tumbon, setTumbon] = useState("");
  const [umphor, setUmphor] = useState("");
  const [province, setProvince] = useState('พิษณุโลก');
  const [postcode, setPostcode] = useState("");
  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    const roletoken = localStorage.getItem("role");
    if (checkToken) {
      if (roletoken) {
        if (role === "workers") {
          window.location = "/worker/" + username;
        }
      } else {
        window.location = '/login';
      }

    } else {
      window.location = "/login";
    }
    
    if (isLogin === "true") {
      axios.get(`http://localhost:3333/users/${username}`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            setUserID(response.data[0].userID);
            if (response.data[0].name === null) {
              setFname("ยังไม่มีข้อมูล");
            } else {
              setName(response.data[0].name);
            }
            
            if (response.data[0].fname === null) {
              setFname("ยังไม่มีข้อมูล");
            } else {
              setFname(response.data[0].fname);
            }
            if (response.data[0].lname === null) {
              setlname("ยังไม่มีข้อมูล");
            } else {
              setlname(response.data[0].lname);
            }
            if (response.data[0].phone === null) {
              setPhone("ยังไม่มีข้อมูล");
            } else {
              setPhone(response.data[0].phone);
            }
            if (response.data[0].address === null) {
              setAddress("ยังไม่มีข้อมูล");
            } else {
              setAddress(response.data[0].address);
            }
            if (response.data[0].road === null) {
              setRoad("ยังไม่มีข้อมูล");
            } else {
              setRoad(response.data[0].road);
            }
            if (response.data[0].tumbon === null) {
              setTumbon("ยังไม่มีข้อมูล");
            } else {
              setTumbon(response.data[0].tumbon);
            }
            if (response.data[0].umphor === null) {
              setUmphor("ยังไม่มีข้อมูล");
            } else {
              setUmphor(response.data[0].umphor);
            }
            if (response.data[0].province === null) {
              setProvince("พิษณุโลก");
            } else {
              setProvince(response.data[0].province);
            }
            if (response.data[0].postcode === null) {
              setPostcode("ยังไม่มีข้อมูล");
            } else {
              setPostcode(response.data[0].postcode);
            }
          } else {
            console.log("ไม่พบข้อมูลผู้ใช้");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isLogin])

  const handleChangeName = (e) =>{
    setName(e.target.value);
  }
  const handlechangeFName = (e) =>{
    setFname(e.target.value);
  }
  const handlechangeLName = (e) =>{
    setlname(e.target.value);
  }
  const handleChangePhone = (e) =>{
    setPhone(e.target.value);
  }
  const handleChangeAddress = (e) =>{
    setAddress(e.target.value);
  }
  const handleChangeRoad = (e) =>{
    setRoad(e.target.value);
  }
  const handleChangeTumbon = (e) => {
    setTumbon(e.target.value);
  }  
  const handleChangeUmphor = (e) =>{
    setUmphor(e.target.value);
  }
  const handleChangePostcode = (e) =>{
    setPostcode(e.target.value);
  }
  const SubmitUpdate = () => {
    if (fname !== "" && lname !== "" && phone !== "" && name !== "" && address !== "" && road !== "" && tumbon !== "" && umphor !== "" && postcode !== "" && province !== "") {
      const profileJSONData = {
        "fname": fname,
        "lname": lname,
        "phone": phone,
        "name": name,
        "address": address,
        "road": road,
        "tumbon": tumbon,
        "umphor": umphor,
        "province": "พิษณุโลก",
        "postcode": postcode
      }
      axios.post(`http://localhost:3333/users/${userID}/profile`, profileJSONData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          const data = response.data;
          if (data.status === "success") {
            alert("อัปเดตข้อมูลสำเร็จ");
            window.location.reload();
          } else {
            alert("error");
          }
        })
        .catch(error => {
          console.error('Error', error);
        });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและไม่ควรเป็นที่ว่าง");
    }
  
  }
  return (
    <>
      <Navbar />
      <div className='fullfill'>
        <div className='container-userprofile'>
          <div className='Title-profile'>ข้อมูลโปรไฟล์</div>
          <div className='bx-data'>
            <div className='warp'>
              <div className='warp-area'><label>USERID</label><h5>(ไม่สามารถแก้ไขได้)</h5></div>
              <input type="text" id="userid" value={userID} disabled readOnly/>
            </div >
            <div className='warp'>
              <label>name</label>
              <input type="text" id="name" value={name} onChange={handleChangeName}/>
            </div>
            <div className='warp'>
              <label>ชื่อ</label>
              <input type="text" id="fname" value={fname} onChange={handlechangeFName}/>
            </div>
            <div className='warp'>
              <label>นามสกุล</label>
              <input type="text" id="lname" value={lname} onChange={handlechangeLName}/>
            </div>
            <div className='warp'>
              <label>เบอร์ติดต่อ</label>
              <input type="text" id="phone" value={phone} onChange={handleChangePhone}/>
            </div>
            <div className='warp'>
              <label>ที่อยู่</label>
              <input type="text" id="address" value={address} onChange={handleChangeAddress}/>
            </div>
            <div className='warp'>
              <label>ถนน</label>
              <input type="text" id="road" value={road} onChange={handleChangeRoad}/>
            </div>
            <div className='warp'>
              <label>ตำบล</label>
              <input type="text" id="tumbon" value={tumbon} onChange={handleChangeTumbon}/>
            </div>
            <div className='warp'>
              <label>อำเภอ</label>
              <input type="text" id="umphor" value={umphor} onChange={handleChangeUmphor}/>
            </div>
            <div className='warp'>
              <div className='warp-area'><label>จังหวัด</label><h5>(*ใช้แค่พิษณุโลกเท่านั้น)</h5></div>
              <input type="text" id="province" value={province} disabled readOnly/>
            </div>
            <div className='warp'>
              <label>รหัสไปรษณีย์</label>
              <input type="text" id="postcode" value={postcode} onChange={handleChangePostcode}/>
            </div>
          </div>
          <button className='btn-update-profile' onClick={SubmitUpdate}>อัพเดต</button>
        </div>
      </div>
    </>
  )
}
