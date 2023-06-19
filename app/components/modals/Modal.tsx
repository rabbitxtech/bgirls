import { Dialog } from '@headlessui/react'
import React from 'react'
import { MdClose } from 'react-icons/md'
import ModalLoader from '../loader/ModalLoader'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title: string
  disabled?: boolean
  body: React.ReactElement
  foot?: React.ReactElement
  isLoading?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  disabled,
  title,
  body,
  foot,
  isLoading
}) => {
  return (
    <Dialog
      open={!disabled && isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <Dialog.Backdrop
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4 mb-4">
        {/* The actual dialog panel  */}
        <div className="mx-auto max-w-md w-full rounded bg-white dark:bg-zinc-700 overflow-hidden">
          {isLoading && <ModalLoader />}
          <Dialog.Panel as="form" onSubmit={onSubmit}>
            <div className="relative p-2 mb-4 border-b-[1px] dark:border-white/20">
              {!disabled && (
                <div
                  className="absolute right-[12px] p-2 rounded-full hover:bg-gray-300/20 dark:text-white cursor-pointer"
                  onClick={onClose}
                >
                  <MdClose />
                </div>
              )}
              <Dialog.Title
                as="h1"
                className="w-full text-2xl text-center font-semibold dark:text-white"
              >
                {title}
              </Dialog.Title>
            </div>
            <div className="px-6">{body}</div>
            <div className='px-6 pb-4'>{foot}</div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
