import "./Footer.css"
// import Image from "next/image"
import Link from "next/link"
import Image from "next/image"
export default function Footer() {
    return (
            <footer className="Footer">
                    <div className="top-footer">
                        <div className="ft-l-contain">
                            <div>
                            <Link href="/"><Image className="pic-logo" src="/Logo.png" width={172.20} height={32.157} alt="Picture of the author"></Image></Link>
                            </div>
                            <div className="detail-f">
                                Homemaker ถูกทำขึ้นเพื่อการศึกษาเท่านั้นไม่ได้มีประสงค์จะหารายได้แต่อย่างใด
                            </div>
                        </div>
                        <div className="ft-r-contain">
                            <div className="link-f">
                                <div className="title">Link</div>
                                <Link href="/" className="d">หน้าหลัก</Link>
                                <Link href="/price" className="d">ค่าบริการ</Link>
                            </div>
                            <div className="contact-f">
                                <div className="title">Contact</div>
                                <div className="d">เบอร์ติดต่อ : 080-xxxx-xxx</div>
                                <div className="d">อีเมลล์ : Homemaker@xxx.com</div>
                            </div>
                        </div>
                    </div>
                    <div className="under-footer">
                            <div>
                                copyright ©2023
                            </div>
                            <div>
                                made by Thitisak and Donlawat
                            </div>
                    </div>
            </footer>
    )
}