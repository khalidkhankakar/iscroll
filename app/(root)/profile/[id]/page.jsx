import {  getProfileDetails, getUserPosts } from '@/appwirte/api'
import ProfilePage from '@/components/comps/ProfilePage'
import TrendingPosts from '@/components/comps/TrendingPosts'
import Image from 'next/image'

const page = async ({params}) => {
  const profileDocument = await getProfileDetails(params.id)
  const posts = await getUserPosts(params.id)
  return (
    <div>
    {!profileDocument ? 
      <Image src={'/searchLoading.svg'} width={28} height={28} alt='loading' className=' h-10 w-10 mx-auto mt-14' />

    : <ProfilePage profileId={params.id} profileDocument={profileDocument} />}
        {!posts ? 
      <Image src={'/searchLoading.svg'} width={28} height={28} alt='loading' className=' h-10 w-10 mx-auto mt-14' />

    : <TrendingPosts posts={posts.posts} lastId={posts.lastId} type={'userPosts'} profileUserId={params.id} />}
    </div>
  )
}

export default page