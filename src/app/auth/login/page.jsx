'use client'

import { Container } from '@/components/Container'
import coverImg from '@/images/moments/img-1.jpeg'
import logo from '@/images/logos/logo.png'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingComponent from '@/app/loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default function Login() {
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loadingSpin, setLoadingSpin] = useState(false)

  useEffect(() => {
    setError(params.get('error'))
    setSuccess(params.get('success'))
  }, [params])

  if (session.status === 'loading') {
    return <LoadingComponent />
  }

  if (session.status === 'authenticated') {
    router?.push('/forum')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingSpin(true)
    const email = e.target[0].value
    const password = e.target[1].value
    try {
      await signIn('credentials', {
        email,
        password,
      })

      setLoadingSpin(false)
    } catch (error) {
      console.error('Sign-in error:', error)
      setLoadingSpin(false)
    }
  }
  return (
    <Container className="mt-16 sm:mt-32">
      {' '}
      <div className="flex min-h-full flex-1">
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image className="h-20 w-auto" src={logo} alt="Your Company" />
              <h1 className="font-semibold text-indigo-500">
                {success ? success : 'Chào mừng trở lại!'}
              </h1>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight ">
                Đăng nhập tài khoản
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Chưa phải là thành viên?{' '}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-[#1F53A4] hover:text-[#5987d1]"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 "
                    >
                      Địa chỉ Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6"
                    >
                      Mật khẩu
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-700"
                      >
                        Ghi nhớ tài khoản
                      </label>
                    </div>

                    <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-[#1F53A4] hover:text-[#5987d1]"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 ring-2   hover:bg-gray-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {' '}
                      {loadingSpin && (
                        <>
                          <FontAwesomeIcon
                            icon={faCircleNotch}
                            spin
                            className="mr-2 h-5 w-5 text-indigo-500"
                          />
                        </>
                      )}
                      Đăng nhập
                    </button>
                    <p className="my-2 font-medium text-red-500">
                      {' '}
                      {error && error}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
