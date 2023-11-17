import React, { useState, useRef } from 'react'
import Modal from 'react-modal'
import styles from './modal.module.css'
import { customStyles } from '@/app/categories/Modal/CreateContributeModal'
interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  code: number // Assuming code is a number
  email: string
  submitButtonRef: React.RefObject<HTMLButtonElement>
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  code,
  email,
  submitButtonRef,
}: ConfirmationModalProps) {
  const confirmCode = String(code)
  const [inputCapcha, setInput] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const checkCapcha = () => {
    console.log(confirmCode, ' vs ', inputCapcha)
    if (inputCapcha === confirmCode) {
      console.log('Registration successfully')
      submitButtonRef.current?.click()
      onClose()
    } else {
      setIsError(true)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-overlay custom-modal"
    >
      <div className={styles['confirm-box']}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-2xl font-semibold leading-6 text-gray-900"
          >
            Xác thực địa chỉ Email!
          </label>
          <p className="my-1 text-sm font-medium text-gray-700">
            Chúng mình đã gửi mã xác thực tới email:{' '}
            <span className="italic">{email}</span>.<br></br> Vui lòng kiểm tra
            hòm thư và xác nhận để tiếp tục.
          </p>
          <div className="relative mt-4">
            <input
              type="text"
              className="peer block w-full border-0 bg-gray-50 px-1.5 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Mã xác thực"
              onChange={(e) => {
                setIsError(false)
                setInput(e.target.value)
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              aria-hidden="true"
            />
          </div>
          {isError && (
            <p className="font-medium text-red-500">
              Mã xác nhận không trùng khớp. Vui lòng thử lại!
            </p>
          )}
        </div>
        <div className="justify-end">
          {' '}
          <button
            className="mx-4 rounded-sm bg-transparent px-4 py-1.5 font-semibold text-gray-700 ring-1 ring-gray-200 hover:border-transparent hover:bg-blue-500 hover:text-white"
            onClick={() => {
              onClose()
            }}
          >
            Đóng
          </button>
          <button
            className="rounded-sm bg-[#1C35ED] px-4 py-1.5 font-bold text-white hover:bg-blue-700"
            onClick={() => {
              checkCapcha()
            }}
          >
            Xác nhận đăng ký
          </button>
        </div>
      </div>
    </Modal>
  )
}
