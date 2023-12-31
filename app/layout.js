import './globals.css'
import Footer from '@/components/Footer'
import Islogin from '@/components/islogin'

export const metadata = {
  title: 'Homemaker by blackscreen',
  description: 'Generated by create next app',
}
export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      {/* <body className={inter.className}> */}
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Islogin>
            {children}
          <Footer/>
        </Islogin>
      </body>
    </html>
    </>
  )
}
