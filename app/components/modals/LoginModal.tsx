'use client'

import React, { useMemo, useState } from 'react'
import { BsGithub, BsKeyFill } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import Button from '../Button'
import { FaUserAlt } from 'react-icons/fa'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Modal from './Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Link from 'next/link'
import { loginSchema } from '@/app/libs/validator'
import { joiResolver } from '@hookform/resolvers/joi'
import ErrorMessage from '../input/ErrorMessage'

const LoginModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(() => true)
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback: any) => {
      setIsLoading(() => false)
      if (callback?.ok && !!!callback?.error) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
        reset()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyModal = (
    <>
      <div className="mb-4">
        <div className="relative mb-1">
          <FaUserAlt
            className="absolute pl-3 top-[50%] translate-y-[-50%]"
            size={32}
          />
          <input
            className="w-full px-4 pl-11 py-3 rounded-md border-[1px] outline-none"
            placeholder="Username"
            {...register('username')}
            disabled={isLoading}
          />
        </div>
        {errors.username && (
          <ErrorMessage message={errors.username.message?.toString()} />
        )}
      </div>
      <div className="mb-4">
        <div className="relative mb-1">
          <BsKeyFill
            className="absolute pl-3 top-[50%] translate-y-[-50%]"
            size={32}
          />
          <input
            className="w-full px-4 pl-11 py-3 rounded-md border-[1px] outline-none"
            type="password"
            placeholder="Password"
            {...register('password')}
            disabled={isLoading}
          />
        </div>
        {errors.password && (
          <ErrorMessage message={errors.password.message?.toString()} />
        )}
      </div>
      <Link href="#" className="float-right mb-4">
        <span className="text-sm text-center text-sky-500">
          Forgot password ?
        </span>
      </Link>
      <Button className="w-full" disabled={isLoading}>
        Sign in
      </Button>
    </>
  )

  const footModal = (
    <>
      <div className="relative w-full h-[1px] my-7 bg-gray-200 dark:bg-white/20">
        <span className="absolute text-sm top-[-50%] translate-y-[-50%] left-[50%] translate-x-[-50%] p-1 dark:text-white bg-white dark:bg-zinc-700">
          Or
        </span>
      </div>
      <button
        className="w-full flex items-center px-[2px] py-[2px] mb-4 bg-blue-500 rounded"
        onClick={(e) => {
          e.preventDefault()
          signIn('google')
        }}
      >
        <span className="flex-0 p-[10px] bg-white rounded-sm">
          <FcGoogle size={16} />
        </span>
        <span className="flex flex-1 justify-center text-white">
          Sign in with Google
        </span>
      </button>
      <button
        className="w-full flex items-center px-[2px] py-[2px] mb-4 bg-zinc-900 rounded"
        onClick={(e) => {
          e.preventDefault()
          signIn('github')
        }}
      >
        <span className="flex-0 p-[6px] text-white rounded-sm">
          <BsGithub size={24} />
        </span>
        <span className="flex flex-1 justify-center text-white">
          Sign in with Github
        </span>
      </button>
      <div className="text-sm dark:text-white text-center">
        No account yet ?{' '}
        <span
          className="text-sky-500 cursor-pointer"
          onClick={() => {
            loginModal.onClose()
            registerModal.onOpen()
            reset()
          }}
        >
          Register here
        </span>
      </div>
    </>
  )

  return (
    <Modal
      {...loginModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyModal}
      foot={footModal}
      title="Sign in"
      isLoading={isLoading}
    />
  )
}

export default LoginModal
