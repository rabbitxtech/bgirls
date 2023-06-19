"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
const Logo = () => {
  const router = useRouter()
  return (
    <div className="flex justify-center items-center gap-2 text-pink-500 cursor-pointer">
      <Image
        onClick={() => router.push("/")}
        src={"/images/logo.svg"}
        alt={"Logo"}
        height={40}
        width={40}
      />
      <span className="text-2xl font-semibold font-mono">Bgirls</span>
    </div>
  )
}

export default Logo
