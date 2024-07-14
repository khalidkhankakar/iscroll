'use client'
import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import authContext from '../../context/authContext'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './Toggle'

const LeftSidebar = () => {
  const { userData } = useContext(authContext)
  const pathname = usePathname()
  return (
    <div className='shadow-md bg-[#f0f0f0] dark:bg-dark-1 hidden md:flex space-y-3  lg:flex flex-col py-5 h-screen col-span-3 md:col-span-3 '>
      <Link href={`/profile/${userData.userId}`} className='UserAndLogo flex flex-col items-center space-y-7'>
        <Image src={'/logo.svg'} height={120} width={120} alt='logo' />
        <div className="user flex items-center ">
        <Image src={userData.imageUrl || '/profile.jpg'} height={50} width={50} alt='profile' className='object-cover h-12 w-12 rounded-full' />
          <div className='mx-2'>
            <p className='font-medium text-black dark:text-white'>{userData.name}</p>
            <p className='text-sm font-light italic text-black dark:text-white'>@{userData.username}</p>
          </div>
        </div>
      </Link>
      <div className='Buttons flex flex-col items-center mt-3 space-y-3'>
        {
          navLinks.map((nav) => (
            <Link href={nav.Link} key={nav.text} className={`w-[60%] py-2 text-black dark:text-white hover:text-white dark:hover:text-black  transition-all duration-500 hover:bg-black dark:hover:bg-white border-[0.5px] border-black dark:border-white ${pathname === nav.Link ? 'text-white  dark:text-black bg-black dark:bg-white' : ''}  text-center font-medium hover:font-bold rounded-lg  `} >
              {nav.text}</Link>
          ))
        }
      </div>
      <ModeToggle/>
          <Image src={'/logout.png'} height={30} width={30} alt='logout' className='object-contain m-auto' />
    </div>
  )
}

export default LeftSidebar