"use client";
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import style from "@/app/Home.module.css";
import Bannerimg from '@/components/BannerImg';
import { UserContext } from '@/components/islogin';
import { AiFillStar } from 'react-icons/ai';
import { BsCheckAll } from 'react-icons/bs';
import { BsCalendarCheckFill, BsFillHouseCheckFill, BsFillPatchCheckFill } from 'react-icons/bs';
import { TbHomeStar } from 'react-icons/tb';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { PiHandHeartFill } from 'react-icons/pi';

import axios from 'axios'; // เพิ่มการนำเข้า axios
import Link from 'next/link';
export default function Home() {
  const [services, setServices] = useState([]);
  const { isLogin, role, username } = useContext(UserContext);
  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    const RoleToken = localStorage.getItem("role");
    if (checkToken) {
      if (RoleToken) {
        if (role === "workers") {
          window.location.href = "/worker/" + username;
        }
      }
    }
    // สร้างฟังก์ชันเพื่อดึงข้อมูลจาก API
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3333/services");
        const data2 = await response.data;
        setServices(data2);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      }
    };
    // เรียกใช้ฟังก์ชัน fetchServices เพื่อดึงข้อมูลจาก API
    fetchServices();
  }, [isLogin]);
  const onClickBooking = () => {
    if (isLogin === "false") {
      window.location.href = `/login`
    } else {
      window.location.href = `/users/${username}/booking`
    }
  }
  return (
    <>
      <></>
      <Navbar />
      <div className={style.container}>
        <Bannerimg />
        <div className={style.boxHeader}>
          <h1 className={style.detailBoxHeader1}>ถ้านึกถึงความสะอาด ให้นึกถึงเรา</h1>
          <h3 className={style.detailBoxHeader1}>เราช่วยจัดหาบุคลากรคุณภาพเยี่ยม เพื่อความสะอาดในบ้านของคุณ</h3>
          <button className={style.button5} onClick={onClickBooking}>จอง</button>
        </div>
        <div className={style.containerServiceshowbox}>
          <div className={style.poppularlabel}> <AiFillStar className={style.tice} />บริการแนะนำ </div>
          <div className={style.BoxShowservice}>
            {services
              .filter(service => service.tag === "แนะนำ")
              .map(service => (
                <section className={style.article} key={service.serviceID}>
                  <img src={service.image} className={style.imgservice} />
                  <h2 className={style.titleservice}>{service.serviceName}</h2>
                  <p className={style.detailservice}>{service.description}</p>
                  <div className={style.pricedetail}>ราคาบริการ {service.price} บาท ต่อชั่วโมง</div>
                  <div className={style.btnservicebox}>
                    <Link href={`/users/${username}/booking`} className={style.btnsyle}>
                      จองบริการ
                    </Link>
                  </div>
                </section>
              ))}
          </div>
          <div className={style.poppularlabel}> <TbHomeStar className={style.tice} />บริการทั่วไป </div>
          <div className={style.BoxShowservice}>
            {services
              .filter(service => service.typeP === "general")
              .map(service => (
                <section className={style.article} key={service.serviceID}>
                  <img src={service.image} className={style.imgservice} />
                  <h2 className={style.titleservice}>{service.serviceName}</h2>
                  <p className={style.detailservice}>{service.description}</p>
                  <div className={style.pricedetail}>ราคาบริการ {service.price} บาท ต่อชั่วโมง</div>
                  <div className={style.btnservicebox}>
                    <Link href={`/users/${username}/booking`} className={style.btnsyle}>
                      จองบริการ
                    </Link>
                  </div>
                </section>
              ))}
          </div>
          <div className={style.poppularlabel}> <MdOutlineCleaningServices className={style.tice} />บริการทำความสะอาด </div>
          <div className={style.BoxShowservice}>
            {services
              .filter(service => service.typeP === "clean")
              .map(service => (
                <section className={style.article} key={service.serviceID}>
                  <img src={service.image} className={style.imgservice} />
                  <h2 className={style.titleservice}>{service.serviceName}</h2>
                  <p className={style.detailservice}>{service.description}</p>
                  <div className={style.pricedetail}>ราคาบริการ {service.price} บาท ต่อชั่วโมง</div>
                  <div className={style.btnservicebox}>
                    <Link href={`/users/${username}/booking`} className={style.btnsyle}>
                      จองบริการ
                    </Link>
                  </div>
                </section>
              ))}
          </div>
          <div className={style.poppularlabel}> <PiHandHeartFill className={style.tice} />บริการดูแลและช่วยเหลือ </div>
          <div className={style.BoxShowservice}>
            {services
              .filter(service => service.typeP === "care")
              .map(service => (
                <section className={style.article} key={service.serviceID}>
                  <img src={service.image} className={style.imgservice} />
                  <h2 className={style.titleservice}>{service.serviceName}</h2>
                  <p className={style.detailservice}>{service.description}</p>
                  <div className={style.pricedetail}>ราคาบริการ {service.price} บาท ต่อชั่วโมง</div>
                  <div className={style.btnservicebox}>
                    <Link href={`/users/${username}/booking`} className={style.btnsyle}>
                      จองบริการ
                    </Link>
                  </div>
                </section>
              ))}
          </div>
          <div className={style.poppularlabel}> <BsCheckAll className={style.tice} />บริการทั้งหมด </div>
          <div className={style.BoxShowservice}>
            {services.map((services) => (
              <section className={style.article} key={services.serviceID}>
                <img src={services.image} className={style.imgservice} />
                <h2 className={style.titleservice}>{services.serviceName}</h2>
                <p className={style.detailservice}>{services.description}</p>
                <div className={style.pricedetail}>ราคาบริการ {services.price} บาท ต่อชั่วโมง</div>
                <div className={style.btnservicebox}>
                  <Link href={`/users/${username}/booking`} className={style.btnsyle}>
                    จองบริการ
                  </Link>
                </div>
              </section>
            ))}
          </div>
          
          
        </div>
        <div className={style.HowDoing}>
          <h1 className={style.TitleHowDO}>Homemaker ทำงานอย่างไง</h1>
          <div className={style.DeatialHowdo}>
            <div className={style.boxHowDo}>
              <BsCalendarCheckFill className={style.IconHowdo} />
              <div className={style.TitleinboxHowdo}>จอง</div>
              <div className={style.DeatailinboxHowdo}>เลือกวันเวลา และสถานที่ทำความสะอาด จะช่วยค้นหาผู้ให้บริการที่เหมาะสมให้</div>
            </div>
            <div className={style.boxHowDo}>
              <BsFillPatchCheckFill className={style.IconHowdo} />
              <div className={style.TitleinboxHowdo}>ยืนยัน</div>
              <div className={style.DeatailinboxHowdo}>รอผู้บริการรับงานของคุณ และนัดสถานที่ทำงานเพิ่มเติม</div>
            </div>
            <div className={style.boxHowDo}>
              <BsFillHouseCheckFill className={style.IconHowdo} />
              <div className={style.TitleinboxHowdo}>รับบริการ</div>
              <div className={style.DeatailinboxHowdo}>รับบริการตามที่คุณนัดหมายไว้</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
