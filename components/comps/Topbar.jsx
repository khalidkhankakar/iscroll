'use client'
import { roboto } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import authContext from '../../context/authContext'
import { useContext } from 'react'
import { ModeToggle } from './Toggle'


const Topbar = () => {
    const {userData} = useContext(authContext) 
  return (
    <div className='items-center shadow-md bg-white dark:bg-dark-1  py-4 col-span-1 flex justify-between px-2 md:hidden lg:hidden'>
        <div className="logo">
            <Image src={'/logo.svg'} height={80} width={80} alt='logo' />
        </div>
        <div className="texture space-x-4 flex items-center">
          <ModeToggle />
          <Image src={'/logout.png'} height={30} width={30} alt='logout' className='object-contain' />
            <Image src={userData.imageUrl || '/profile.jpg'} height={30} width={30} alt='profile' className='object-cover h-10 w-10 rounded-full' />
        </div>
    </div>
  )
}

export default Topbar