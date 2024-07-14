'use client'
import { mobileNavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MobileNavigation = () => {
  const pathname = usePathname()

  return (
    <div className='w-full flex  md:hidden fixed bottom-0 col-span-1 px-4 justify-between items-center bg-white py-2 rounded-l-xl rounded-r-xl shadow-2xl  '>
        {
        mobileNavLinks.map((nav)=>(

        <Link key={nav.link} href={nav.link} className='flex flex-col items-center '>
        <Image src={pathname === nav.link ?nav.img2:nav.img1} width={24} height={24} alt='post image' className='object-contain cursor-pointer'  />
        <p className='text-sm font-semibold'>{nav.text}</p>
        </Link>
        
        ))
        }

    </div>
  )
}

export default MobileNavigation