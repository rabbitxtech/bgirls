import React from "react"
import Image from "next/image"

interface AvatarProps {
  srcImg?: string | null
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <Image
      alt="avatar"
      src={props.srcImg || "/images/account-placeholder.jpg"}
      height={40}
      width={40}
    />
  )
}

export default Avatar
