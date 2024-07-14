import Image from 'next/image'


const page = () => {
    return (
        <div className='w-[90%] flex flex-col m-auto py-3 px-2 bg-gray-100 dark:bg-dark-1 mb-24 md:mb-4  mt-2 rounded-3xl shadow-lg border border-gray-400'>
            <div>
                <Image src={'/profile.jpg'} height={1600} width={1600} alt="post-detail-image" className='rounded-xl h-96  object-cover ' />
            </div>
            <div  className='my-3 w-full h-[0.09rem] bg-gray-400 rounded-full'/>
            <div className='flex  items-center justify-around  mx-2 md:mx-6 '>
                <div className="user flex space-x-2 items-center">
                    <Image src={'/profile.jpg'} height={40} width={40} alt='profile' className='object-contain rounded-full' />
                    <div>
                        <p className='text-[0.7rem] font-bold'>{'Khalid Kakar'}</p>
                        <div className='flex'>
                            <p className='text-[0.5rem] font-light '>2 days ago </p>
                            <p className='text-[0.5rem] font-light '>{'Canada'}</p>
                        </div>
                    </div>
                </div>
                <div className='flex space-x-6'>
                <Image src={'/edit.png'} width={18} height={18} alt='post image' className='object-contain cursor-pointer'  />
                <Image src={'/delete.png'} width={18} height={18} alt='post image' className='object-contain cursor-pointer'  />
                </div>
            </div>

            <div className='my-3 w-full h-[0.06rem] bg-gray-400 rounded-full'/>

            <p className='text-sm md:text-lg text-black dark:text-white '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores aliquid quisquam placeat reiciendis facilis ipsum! Deserunt, quaerat, placeat, facilis voluptatibus iusto inventore voluptatum rem tenetur accusantium dicta pariatur mollitia at!</p>

            <div className='my-3 w-full h-[0.06rem] bg-gray-400  rounded-full'/>
            <p className='text-sm md:text-lg text-black dark:text-white '>#reactjs #nextjs #canada #slicon #valley</p>
            <div className='my-3 w-full h-[0.06rem] bg-gray-400 rounded-full'/>
            <div className='flex justify-between mx-4'>
                <div className='flex space-x-2'>
                <Image src={'/liked.png'} width={18} height={18} alt='post image' className='object-contain cursor-pointer'  /> 
                <p>0</p>
                </div>
                <Image src={'/save.png'} width={18} height={18} alt='post image' className='object-contain cursor-pointer'  />
                </div>
        </div>
    )
}
export default page