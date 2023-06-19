import React from 'react'
import { IconType } from 'react-icons'
import { AiOutlineWarning } from 'react-icons/ai'

interface ErrorMessageProps {
  icon?: React.ReactElement<IconType>
  message?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ icon, message }) => {
  return (
    <div className="flex items-center gap-[2px] text-red-500">
      {/* <span className="flex justify-center items-center">{icon}</span> */}
      <span className="text-xs">{message}</span>
    </div>
  )
}

export default ErrorMessage
