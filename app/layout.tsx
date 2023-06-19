import { use } from 'react'
import { Toaster } from 'react-hot-toast'
import CustomeThemeProvider from './components/CustomThemeProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import getCurrentUser from './components/actions/getCurrentUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bgirls App',
  description: 'Trang upload và lưu giữ ảnh gái xinh'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = use(getCurrentUser())

  return (
    <html lang="vi">
      <body className={inter.className}>
        <Toaster />
        <CustomeThemeProvider>
          <Navbar currentUser={currentUser} />
          <LoginModal />
          <RegisterModal />
          {children}
        </CustomeThemeProvider>
      </body>
    </html>
  )
}
