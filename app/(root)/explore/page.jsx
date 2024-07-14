import { getInfinitePosts } from '@/appwirte/api'
import ExplorePage from '@/components/comps/ExplorePage'
import { inter, roboto_mono } from '@/constants'
import Image from 'next/image'
import TrendingPosts from '../../../components/comps/TrendingPosts'


const page = async () => {
  const posts = await getInfinitePosts();
  console.log(posts.posts);
  if (!posts.posts) {
    return (<div className='m-auto'>
        <Image src={'/searchLoading.svg'} width={28} height={28} alt='loading' className='m-auto h-8 w-8' />
    </div>
    )
}
  return (
    <div className={` font-bold`} >
      <h1 className={`${inter.className} text-2xl md:text-4xl font-bold mt-5 ml-5` } >Explore</h1>
      <ExplorePage />
      <TrendingPosts posts={posts.posts} lastId={posts.lastId} type={'trendingPosts'} />
    </div>
  )
}

export default page