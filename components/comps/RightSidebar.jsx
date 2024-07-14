import { getTopCreators } from '@/appwirte/api'
import { inter } from '@/constants'
import Image from 'next/image'

const RightSidebar = async () => {
  const topCreators = await getTopCreators()

  return (
    <div className='bg-[#f0f0f0] dark:bg-dark-1 hidden   h-screen overflow-y-auto  md:hidden lg:block col-span-3'>
      <h1 className={`${inter.className} text-center text-3xl font-bold mt-5 ml-5`} >Top creators</h1>
      <div className="mt-3 flex justify-center items-center flex-wrap ">


        {topCreators.documents.map((creator) => (
          <div key={creator.$id} className={`h-32 rounded-lg shadow-xl bg-gray-200 dark:bg-dark-2 w-32 flex flex-col text-center justify-center space-y-2 items-center border border-gray-500 mx-3 my-2`}>
            <Image src={creator.imageUrl} height={100} width={100} alt={'profile pic'} className='h-20 w-20 object-contain rounded-full' />
            
            <p className='text-sm font-bold'>{creator.name.substr(0,10)}</p>
          </div>
          ))}


      </div>
    </div>
  )
}

export default RightSidebar