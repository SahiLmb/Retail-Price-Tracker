"use client"

import React, { FormEvent } from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props{
    productId: string
}

const Modal = ({ productId }: Props ) => {
    let [isOpen, setIsOpen] = useState(true)
    const [isSubmitting, setisSubmitting] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // to not reload the page
        setisSubmitting(true);
// adding email of user to product id  
    await addUserEmailToProduct(productId, email);
    
    setisSubmitting(false)
    setEmail('')
    closeModal()
    }

    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

  return (
    <>
    <button type="button" className="btn" onClick={openModal}>
        Track
    </button>

    <Transition appear show={isOpen} as={Fragment}>

        <Dialog as="div" onClose={closeModal} className="dialog-container">
            <div className="min-h-screen px-4 text-center">
               {/* Transitoning the track button when it opens up as a dialog box */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"

                >
                    <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* to center the dialog box */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                />
        

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95">

            <div className="dialog-content">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="p-3 border border-gray-200 rounded-10">
                        <Image
                            src="/assets/icons/logo.svg"
                            alt="logo"
                            width={28}
                            height={28} />
                    </div>

                    <Image
                    src="/assets/icons/x-close.svg"
                    alt="close"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={closeModal}
                    />
                    </div>

                        <h4 className="dialog-head_text">
                        Receive real-time updates on product prices directly to your email inbox!
                        </h4>
                            <p className="text-sm text-gray-600 mt-2">
                            Never miss a great deal again by staying connected through our timely alerts
                            </p>
                    </div>

                    {/* creating the email box for sending email */}

                            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                                </label>
                                <div className="dialog-input_container">
                                    <Image 
                                        src="/assets/icons/mail.svg"
                                        alt="mail"
                                        width={18}
                                        height={18}
                                    />
                                    <input 
                                        required
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="dialog-input"
                                    />
                                </div>
                            {/* Track Button when clicked */}
                                <button type="submit"
                                    className="dialog-btn"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Track' }

                                </button>

                            </form>
                     </div>
            
            </Transition.Child>
            </div>
            </Dialog>


    </Transition>
    </>
  )
}

export default Modal