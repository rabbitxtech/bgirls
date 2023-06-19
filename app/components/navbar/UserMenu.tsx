'use client'

import React from 'react'
import DropDown from './DropDown'
import SwitchTheme from './SwitchTheme'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeUser } from '@/app/types'
import { useSession } from 'next-auth/react'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal()

  return (
    <div className="flex flex-row justify-center items-center relative gap-2">
      <SwitchTheme />
      {!currentUser ? (
        <Button onClick={loginModal.onOpen}>Sign in</Button>
      ) : (
        <DropDown currentUser={currentUser}/>
      )}
    </div>
  )
}

export default UserMenu
