import Image from 'next/image'
import '../globals.css';
import { Toaster } from "@/components/ui/toaster"
export const metadata = {
  title: 'Auth',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
        <section className='flex items-center md:justify-between justify-center w-full'>
          <main className='w-full md:w-1/2 lg:w-1/2 xl:w-1/2  md:m-auto px-10' >
            {children}
          </main>
          <Toaster />
          <div className='hidden md:block md:w-1/2 lg:w-1/2 xl:w-1/2 '>
            <Image src={'/leftImg.jpg'} width={1000} height={1000} alt='leftImag' className='object-fill min-h-screen'/>
          </div>
        </section>
  )
}
