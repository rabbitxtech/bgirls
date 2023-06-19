'use client'

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { BsKeyFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { AiOutlineWarning } from 'react-icons/ai'
import Button from '../Button'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Joi from 'joi'
import { registerSchema } from '@/app/libs/validator'
import { joiResolver } from '@hookform/resolvers/joi'
import ErrorMessage from '../input/ErrorMessage'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState<boolean>()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    resolver: joiResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repassword: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(() => true)
    axios
      .post('/api/auth/register', data)
      .then(() => {
        toast.success('Register!')
        registerModal.onClose()
        loginModal.onOpen()
        reset()
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsLoading(() => false)
      })
  }

  const bodyModal = (
    <>
      <div className="mb-4">
        <div className="relative mb-1">
          <MdEmail
            className="absolute pl-3 top-[50%] translate-y-[-50%]"
            size={32}
          />
          <input
            className="w-full px-4 pl-11 py-3 rounded-md border-[1px] outline-none"
            type="email"
            placeholder="Email"
            {...register('email')}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <ErrorMessage message={errors.email.message?.toString()} />
        )}
      </div>
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
      <div className="mb-4">
        <div className="relative mb-1">
          <BsKeyFill
            className="absolute pl-3 top-[50%] translate-y-[-50%]"
            size={32}
          />
          <input
            className="w-full px-4 pl-11 py-3 rounded-md border-[1px] outline-none"
            type="password"
            placeholder="Confirm password"
            {...register('repassword')}
            disabled={isLoading}
          />
        </div>
        {errors.repassword && (
          <ErrorMessage message={errors.repassword.message?.toString()} />
        )}
      </div>
      <Button className="w-full mb-4" disabled={isLoading}>
        Register
      </Button>
    </>
  )

  const footModal = (
    <>
      <div className="text-sm dark:text-white text-center">
        Already have an account ?{' '}
        <span
          className="text-sky-500 cursor-pointer"
          onClick={() => {
            loginModal.onOpen()
            registerModal.onClose()
            reset()
          }}
        >
          Sign in
        </span>
      </div>
    </>
  )

  return (
    <Modal
      {...registerModal}
      title="Register"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyModal}
      foot={footModal}
      isLoading={isLoading}
    />
  )
}

export default RegisterModal
