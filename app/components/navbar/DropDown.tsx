import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Avatar from '../Avatar'
import { AiFillSetting } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'
import { BiPhotoAlbum } from 'react-icons/bi'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'

interface DropDownProps {
  currentUser?: SafeUser | null
}

const DropDown: React.FC<DropDownProps> = ({ currentUser }) => {
  return (
    <Menu as="div" className="relative inline-block">
      <div className="relative">
        <Menu.Button className="rounded-full overflow-hidden cursor-pointer">
          <Avatar srcImg={currentUser?.image} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-50 shadow-md focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-pink-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <AiFillSetting
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <AiFillSetting
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-pink-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <BiPhotoAlbum className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <BiPhotoAlbum className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  My Album
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-pink-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => signOut()}
                >
                  {active ? (
                    <MdLogout className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MdLogout className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropDown
