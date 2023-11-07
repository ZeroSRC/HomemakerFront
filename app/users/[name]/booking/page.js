'use client';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '@/components/islogin';
import Navbar from '@/components/Navbar';
import "./booking.css"
import { BiCheckCircle } from "react-icons/bi"
export default function UserBooking() {
  // ------------------ เช็คลำดับ Form --------------------------
  const [formStateone,setFormStateone] = useState(true);
  const [formStatetwo,setFormStatetwo] = useState(false);
  const [formStatethree,setFormStatethree] = useState(false);
  // ------------------ เช็คลำดับ Form --------------------------
  const [addressChecbox,setAddressCheckBox] = useState("ใช้ที่อยู่ปัจจุบัน"); 
  const [newAddress,setNewAddress] = useState(false);
  const currentDate = new Date();
  const currentDateISO = currentDate.toISOString().split('T')[0];
  const [servs, setServs] = useState([]); 
  const { isLogin, role, username } = useContext(UserContext);
  const [timeT,setTimeT] = useState("09:00"); //จำเป็น เวลาเริ่มทำงาน
  const [timeWork, setTimeWork] = useState(1); //จำเป็น เวลาในการทำงาน
  const [dayWork, setDayWork] = useState(currentDateISO); //จำเป็น  วันที่ทำงาน
  const [totalPrice,setTotalPrice] = useState(0); // ใช้คำนวณเงินและ จำเป็น ยอดเงินทั้งหมด
  const [addsIp,setAddsIp] = useState(''); // ใช้ส่งค่า AddsIpใหม่
  const [addsRoad,setAddsRoad] = useState(''); // ใช้ส่งค่าถนนใหม่
  const [addstumbon,setAddsTumbon] = useState(''); // ใช่ส่งค่าตำบลใหม่
  const [addsUmphor,setAddsUmphor] = useState("เมือง"); // ใช้ส่งอำเภอใหม่
  const addsProvince = 'พิษณุโลก'; // ใช้ส่งข้อมูลจังหวัด
  const [howFar, setHowFar] = useState(0);
  const [addsPostcode,setAddsPostcode] = useState(''); // ใช่ส่งรหัสไปษณีย์ใหม่
  const [addsPhone,setAddsPhone] = useState(''); //ใช่ส่งค่าเบอร์มือถือใหม่
  const [price,setPrice] = useState();
  const [selectService,setSelectService] = useState(1);
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
  const [postToBookin,setPostToBooking] = useState([
    {
      "userID" : datauser.userID
    }
  ])
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
    
    // เรียกใช้ฟังก์ชัน fetchServices เพื่อดึงข้อมูลจาก API
    fetchServices();
  }, [isLogin]);
  
  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:3333/services");
      const dataS = await response.data;
      setServs(dataS);
      setPrice(dataS[0].price);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
  };
  // function ที่บายกับปุ่มและ input ต่างๆ
  const handleAddressIP = (e) => {
    setAddsIp(e.target.value);
  }
  const handleAddressRoad = (e) => {
    setAddsRoad(e.target.value);
  }
  const handleAddressTumbon = (e) => {
    setAddsTumbon(e.target.value);
  }
  const handleAddressUmphor = (e) => {
    setAddsUmphor(e.target.value);
  }
  const handleAddressPostcode = (e) => {
    const valueAsInt = parseInt(e.target.value, 10);
    setAddsPostcode(valueAsInt);
  }
  const handleAddressPhone = (e) => {
    const valueAsInt = parseInt(e.target.value, 10);
    setAddsPhone(valueAsInt);
  }
  const handleTimeChange = (e) => {
    const valueAsInt = parseInt(e.target.value, 10);
    setTimeWork(valueAsInt);
  }
  const handleDaychange = (e) => {
    setDayWork(e.target.value)
  }
  const handleTimeT = (e) => {
    setTimeT(e.target.value);

  }
  const handleSpricet = (event) => {
      const [price, serviceID] = event.target.value.split('-');
      setPrice(price);
      setSelectService(serviceID);
      // รวมยอดเงิน
  };
  const hendleNewAddree = (event) => {
    if (event.target.value === "ใช้ที่อยู่ใหม่"){
      setNewAddress(false);
      setAddressCheckBox("ใช้ที่อยู่ปัจจุบัน");
    } else if (event.target.value === "ใช้ที่อยู่ปัจจุบัน"){
      setNewAddress(true);
      setAddressCheckBox("ใช้ที่อยู่ใหม่");
    }
  }
  useEffect (()=>{
    if (newAddress === false){
      if (datauser[0].umphor === 'เมือง'){
        setHowFar(260);
      } else if (addsUmphor === 'วังทอง'){
        setHowFar(280);
      } else {
        setHowFar(300);
      }
    }
    else if (newAddress === true){
      if (addsUmphor === 'เมือง'){
        setHowFar(260);
      } else if (addsUmphor === 'วังทอง'){
        setHowFar(280);
      } else {
        setHowFar(300);
      }
    }
    setTotalPrice(price*timeWork+howFar);
  },[price,timeWork,addsUmphor])

  const changeStateone = ()=>{
    setFormStatethree(false);
    setFormStatetwo(false);
    setFormStateone(true);
  }
  const changeStatetwo = ()=>{
    if (newAddress === false){
      if ( datauser[0].phone !== null && datauser[0].address !== null && datauser[0].road !== null 
        && datauser[0].tumbon !== null && datauser[0].province !== null 
        && datauser[0].postcode !== null){
        setFormStatetwo(true);
        setFormStateone(false);
        setFormStatethree(false);
      }else{
        alert("กรุณาไปกรอกข้อมูลเบอร์โทรศัพท์และที่อยู่ หรือให้กดที่อยู่ใหม่และระบุที่อยู่เพื่อการบริการที่ถูกต้อง");
      }
    } else if (newAddress === true){
      // เช็คค่า input ทั้งหมด ในแต่ละ state''
      if (addsIp !== undefined && addsPhone !== undefined && 
      addsPostcode !== undefined && addsRoad !== undefined && 
      addstumbon !== undefined && addsUmphor !== undefined &&
      addsIp !== '' && addsPhone !== '' && 
      addsPostcode !== '' && addsRoad !== '' && 
      addstumbon !== '' && addsUmphor !== ''
      ) {
        setFormStatetwo(true);
        setFormStateone(false);
        setFormStatethree(false);
      } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้อง");
      }
    }
  }
  const changeStatethree = ()=>{
    if (newAddress === false){
      const bookingJSONData = {
        "userID": datauser[0].userID,
        "phone": datauser[0].phone        ,
        "address": datauser[0].address,
        "road": datauser[0].road,
        "tumbon": datauser[0].tumbon,
        "umphor": datauser[0].umphor,
        "province": "พิษณุโลก",
        "starttime" :dayWork,
        "postcode": datauser[0].postcode,
        "description":`"เวลาทำงานประมาณ ${timeWork} ชั่วโมง เริ่มทำงานเวลา ${timeT}"`,
        "serviceID":selectService,
        "totalprice":totalPrice
      };
      axios.post(`http://localhost:3333/users/${datauser[0].userID}/booking`, bookingJSONData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            const data = response.data;
            if (data.status === "success") {
                // alert(data.message);
            } else{
              alert("error");
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
      setFormStateone(false);
      setFormStatetwo(false);
      setFormStatethree(true);
    } else if (newAddress === true){
      const bookingJSONData = {
        "userID": datauser[0].userID,
        "phone": addsPhone,
        "address": addsIp,
        "road": addsRoad,
        "tumbon": addstumbon,
        "umphor": addsUmphor,
        "province": "พิษณุโลก",
        "starttime" :dayWork,
        "postcode": addsPostcode,
        "description":`เวลาทำงานประมาณ ${timeWork} ชั่วโมง เริ่มทำงานเวลา ${timeT} น.`,
        "serviceID":selectService,
        "totalprice":totalPrice
      };
      axios.post(`http://localhost:3333/users/${datauser[0].userID}/booking`, bookingJSONData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            const data = response.data;
            if (data.status === "success") {
                // alert(data.message);
            } else {
              // alert("error");
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
      setFormStateone(false);
      setFormStatetwo(false);
      setFormStatethree(true);
    }
  }
  return (
    <>
      <Navbar />
      <div className='Boxbooking'>
        {formStateone && <div className='Form'>
          <div className='title'>จองบริการ</div>
          <div className='tilte-second'>(เลื่อนลงเพื่อดูรายละเอียด)</div>
          {/* ----------------------------------------------------------- */}
          <div className='BoxContainService'>
            <label>กรุณาเลือกบริการที่จะใช้</label>
            <select name="Service" className='select-service' onChange={handleSpricet}>
              {servs.map((serv) => (
                <option value={`${serv.price}-${serv.serviceID}`} key={serv.serviceID} >{serv.serviceName}</option>
              ))}
            </select>
          </div>
          {/* ----------------------------------------------------------- */}
          <div className='BoxContainTime'>
            <label>กรุณาเลือกเวลาที่จะใช้บริการ</label>
            <select value={timeWork} onChange={handleTimeChange} className='select-timework'>
              <option value="1">1 ชั่วโมง</option>
              <option value="2">2 ชั่วโมง</option>
              <option value="3">3 ชั่วโมง</option>
              <option value="4">4 ชั่วโมง</option>
              <option value="5">5 ชั่วโมง</option>
              <option value="6">6 ชั่วโมง</option>
              <option value="7">7 ชั่วโมง</option>
              <option value="8">8 ชั่วโมง</option>
            </select>
          </div>
          {/* ----------------------------------------------------------- */}
          <div className='BoxAddress'>
            <label>ที่อยู่สำหรับทำงาน</label>
            <div className='Checkbox-address'>
              <input type="checkbox" name="address" value={addressChecbox} onChange={hendleNewAddree}/>
              <span>{addressChecbox}</span>
            </div>
            { newAddress &&
              <div className='BoxinputNewAddrees'>
                <div className='BoxdetialNewAdress'>
                  <label>ที่อยู่</label>
                  <div>( กรณีไม่มีข้อมูลให้ใส่ - )</div>
                </div>
                <input type="text" id="addressip" name="addressIP" value={addsIp} onChange={handleAddressIP}/>
                <div className='BoxdetialNewAdress'>
                  <label>ถนน</label>
                  <div>( กรณีไม่มีข้อมูลให้ใส่ - )</div>
                </div>
                <input type="text" id="road"  value={addsRoad} onChange={handleAddressRoad}/>
                <label>ตำบล</label>
                <input type="text" id="tumbon"  value={addstumbon} onChange={handleAddressTumbon}/>
                <label>อำเภอ</label>
                <select type="text" id="umphor" value={addsUmphor} onChange={handleAddressUmphor}>
                  <option value="เมือง">เมือง</option>
                  <option value="วังทอง">วังทอง</option>
                  <option value="บางระกำ">บางระกำ</option>
                  <option value="วัดโบสถ์">วัดโบสถ์</option>
                  <option value="บางกระทุ่ม">บางกระทุ่ม</option>
                  <option value="พรหมพิราม">พรหมพิราม</option>
                  <option value="เนินมะปราง">เนินมะปราง</option>
                  <option value="นครไทย">นครไทย</option>
                  <option value="ชาติตระการ">ชาติตระการ</option>
                </select>
                <label>จังหวัด</label>
                <input type="text" id="province"  value={addsProvince} dispatch="true" readOnly/>
                <label>รหัสไปรษณีย์</label>
                <input type="text" id="postcode"   value={addsPostcode} onChange={handleAddressPostcode}/>
                <label>เบอร์สำหรับติดต่อ</label>
                <input type="text" id="phone"   value={addsPhone} onChange={handleAddressPhone} />
              </div>
            }
          </div>
          {/* ----------------------------------------------------------- */}
          <div className='BoxDatetimeForwork'>
            <label>คุณต้องการใช้บริการนี้เมื่อไหร่</label>
            <div className='BoxDateTime'>
              <div className='da'>
                <input type="date" id="birthday" name="birthday" value={dayWork} onChange={handleDaychange}/>
              </div>
              <div className='ti'>
                <input type="time" id="appt" name="appt" min="09:00" max="18:00" value={timeT} format="H:mm" onChange={handleTimeT}/>
              </div>
            </div>
            <h5 className='Sensitive'>*รบกวนระบุเวลาในช่วงเวลางานพนักงาน 09:00 น - 17:00 น</h5>
          </div>
          {/* ----------------------------------------------------------- */}
          <div className='BoxPrice'>
            <label>ค่าบริการ (รวมภาษีแล้ว)</label>
            <label>{totalPrice}.00 บาท</label>
          </div>
          <button className='btn-next' onClick={changeStatetwo} >ถัดไป</button>
        </div>}
        {formStatetwo && <div className='FormTwo'>
          <div className="Title">
            ขั้นตอนการชำระเงิน
          </div>
          <div className="box-pic">
            <img src='/qrcode.png' />
          </div>
          <div className="deatail-box">
            <div>
              ยอดชำระ {totalPrice}.00 บาท
            </div>
            <div>
              *หมายเหตุ กรุณาใส่บันทึกช่วยจำด้วยชื่อผู้ใช้ {username}
            </div>
          </div>
          <div className="box-btn">
            <button className="btn1" onClick={changeStateone} >ย้อนกลับ</button>
            <button className="btn2" onClick={changeStatethree} >ยืนยัน</button>
          </div>
        </div>}
        {formStatethree && <form className='FormThree'>
          <BiCheckCircle className="iconfinish"/>
          <div className="th">ทำรายการเสร็จสิ้น</div>
          <div className="td">กรุณาตรวจสอบที่ประวัติการจองบริการเพิ่มเติม</div>
          <button onClick={changeStateone} className="Btn-finish-booking">เสร็จสิ้น</button>
        </form>}
      </div>
    </>
  )
}
