'use client'

import React from 'react'
import Logo from './Logo'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="sticky top-0 px-5 py-4 text-zinc-600 dark:text-white border-b-[1px] dark:border-gray-600 backdrop-blur-md">
      <div className="flex justify-between mx-7">
        <Logo />
        <UserMenu currentUser={currentUser} />
      </div>
    </div>
  )
}

export default Navbar
