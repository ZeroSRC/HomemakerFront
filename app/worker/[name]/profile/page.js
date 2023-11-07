"use client";
import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/components/islogin';
import "./profileWorker.css"
export default function WorkerProfile() {
  const [services, setServices] = useState([]);
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
  // ที่อยู่กับ servicr ที่เลือกทำ
  const [workposition, setWorkposition] = useState();
  const [workarea, setWorkarea] = useState();
  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    const roletoken = localStorage.getItem("role");
    if (checkToken) {
      if (roletoken) {
        if (role === "users") {
          window.location = "/";
        }
      } else {
        window.location = '/login';
      }

    } else {
      window.location = "/login";
    }
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3333/services");
        const data2 = await response.data;
        setServices(data2);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      }
    };
    fetchServices();

    if (isLogin === "true") {
      axios.get(`http://localhost:3333/workers/${username}`)
        .then(response => {
          if (response.status === 200) {
            const workerData = response.data;
            // ทำอะไรกับข้อมูลของ worker ที่คุณได้รับได้ตามต้องการ
            setUserID(workerData.workerID)
            setName(workerData.name);
            if (workerData.fname !== '') {
              setFname(workerData.fname)
            } else {
              setFname("ยังไม่ได้อัพเดต")
            }
            if (workerData.lname !== '') {
              setlname(workerData.lname)
            } else {
              setlname("ยังไม่ได้อัพเดต")
            }
            if (workerData.phone !== '') {
              setPhone(workerData.phone)
            } else {
              setPhone("ยังไม่ได้อัพเดต")
            } if (workerData.address !== '') {
              setAddress(workerData.address)
            } else {
              setAddress("ยังไม่ได้อัพเดต")
            }
            if (workerData.tumbon !== '') {
              setTumbon(workerData.tumbon)
            } else {
              setTumbon("ยังไม่ได้อัพเดต")

            }
            if (workerData.road !== '') {
              setRoad(workerData.road)
            } else {
              setRoad("ยังไม่ได้อัพเดต")
            }
            if (workerData.umphor !== '') {
              setUmphor(workerData.umphor)
            } else {
              setUmphor("ยังไม่ได้อัพเดต")
            }
            if (workerData.postcode !== '') {
              setPostcode(workerData.postcode)
            } else {
              setPostcode("ยังไม่ได้อัพเดต")
            }
            if (workerData.workposition !== '') {
              setWorkarea(workerData.workposition);
            } else {
              setWorkarea('');
            }
            if (workerData.serviceID !== '') {
              setWorkposition(workerData.serviceID);
            } else {
              setWorkposition('');
            }
          } else if (response.status === 404) {
            // กรณีไม่พบข้อมูล worker
            console.log('ไม่พบข้อมูล worker');
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการร้องขอ API:', error);
        });

    }
  }, [isLogin])

  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handlechangeFName = (e) => {
    setFname(e.target.value);
  }
  const handlechangeLName = (e) => {
    setlname(e.target.value);
  }
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  }
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  }
  const handleChangeRoad = (e) => {
    setRoad(e.target.value);
  }
  const handleChangeTumbon = (e) => {
    setTumbon(e.target.value);
  }
  const handleChangeUmphor = (e) => {
    setUmphor(e.target.value);
  }
  const handleChangePostcode = (e) => {
    setPostcode(e.target.value);
  }
  function handleChangeWorkposition(event) {
    const selectedServiceID = event.target.value;
    setWorkposition(selectedServiceID); 
  }
  const handleChangeWorkarea = (e) => {
    setWorkarea(e.target.value);
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
      axios.post(`http://localhost:3333/workers/${userID}/profile`, profileJSONData, {
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
  };
  const SubmitUpdateWork = () => {
    if (workposition !== "" && workarea !== ''){
      const jsonWorkdata = {
        serviceID: workposition,
        workposition : workarea
      }
      axios.post(`http://localhost:3333/workers/${userID}/updateforwork`, jsonWorkdata, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        // สำเร็จ
        alert("อัปเดตข้อมูลสำเร็จ");
        window.location.reload();
      })
      .catch(error => {
        // เกิดข้อผิดพลาด
        alert("error: " + error);
      });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและไม่ควรเป็นที่ว่าง");
    }
  };
  return (
    <>
      <Navbar />
      <div className='fullfill'>
        <div className='container-userprofile'>
          <div className='Title-profile'>ข้อมูลโปรไฟล์</div>
          <div className='bx-data'>
            <div className='warp'>
              <div className='warp-area'><label>USERID</label><h5>(ไม่สามารถแก้ไขได้)</h5></div>
              <input type="text" id="userid" value={userID} disabled readOnly />
            </div >
            <div className='warp'>
              <label>name</label>
              <input type="text" id="name" value={name} onChange={handleChangeName} />
            </div>
            <div className='warp'>
              <label>ชื่อ</label>
              <input type="text" id="fname" value={fname} onChange={handlechangeFName} />
            </div>
            <div className='warp'>
              <label>นามสกุล</label>
              <input type="text" id="lname" value={lname} onChange={handlechangeLName} />
            </div>
            <div className='warp'>
              <label>เบอร์ติดต่อ</label>
              <input type="text" id="phone" value={phone} onChange={handleChangePhone} />
            </div>
            <div className='warp'>
              <label>ที่อยู่</label>
              <input type="text" id="address" value={address} onChange={handleChangeAddress} />
            </div>
            <div className='warp'>
              <label>ถนน</label>
              <input type="text" id="road" value={road} onChange={handleChangeRoad} />
            </div>
            <div className='warp'>
              <label>ตำบล</label>
              <input type="text" id="tumbon" value={tumbon} onChange={handleChangeTumbon} />
            </div>
            <div className='warp'>
              <label>อำเภอ</label>
              <input type="text" id="umphor" value={umphor} onChange={handleChangeUmphor} />
            </div>
            <div className='warp'>
              <div className='warp-area'><label>จังหวัด</label><h5>(*ใช้แค่พิษณุโลกเท่านั้น)</h5></div>
              <input type="text" id="province" value={province} disabled readOnly />
            </div>
            <div className='warp'>
              <label>รหัสไปรษณีย์</label>
              <input type="text" id="postcode" value={postcode} onChange={handleChangePostcode} />
            </div>
          </div>
          <button className='btn-update-profile' onClick={SubmitUpdate}>อัพเดต</button>
        </div>
        <div className='container-userprofiletwo'>
          <div className='Title-work'>ข้อมูลสำหรับการทำงาน</div>
          <div className='bx-data'>
            <div className='warp-area'><label>งานที่จะทำ</label><h5>(เลือกได้ 1 อย่าง)</h5></div>
            <select name="Service" className='select-service' onChange={handleChangeWorkposition}>
              {services.map((serv) => (
                <option value={serv.serviceID} key={serv.serviceID} >{serv.serviceName}</option>
              ))}
            </select>
            <div className='warp-area'><label>พื้นที่สำหรับทำงาน</label><h5>(เลือกได้ 1 อำเภอ)</h5></div>
            <select type="text" id="name" value={workarea} onChange={handleChangeWorkarea}>
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
            <button className='btn-update-profile' onClick={SubmitUpdateWork}>บันทึก</button>
          </div>
        </div>
      </div>
    </>
  )
}
