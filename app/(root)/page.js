import { getRecentPosts } from '@/appwirte/api';
import Card from '@/components/comps/Card';
import { roboto_mono, inter} from '@/constants';
import Image from 'next/image';

const Home = async () => {
  const posts = await getRecentPosts();
  if (!posts.posts) {
    return (<div className='m-auto'>
        <Image src={'/searchLoading.svg'} width={28} height={28} alt='loading' className='m-auto h-12 w-12' />
    </div>
    )
}
  return (
    <div className={`${roboto_mono.className}  font-bold`} >
      <h1 className={`${inter.className} text-black dark:text-white text-4xl font-bold mt-5 ml-5` } >Home Feed</h1>
    <Card  posts={posts.posts} lastId={posts.lastId}  />
    </div>
  ) 
}

export default Home