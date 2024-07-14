'use client'
import { getInfinitePosts, getUserPosts } from '@/appwirte/api';
import authContext from '@/context/authContext';
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PostStats from './PostStats';

const TrendingPosts =  ({posts,lastId, type, profileUserId}) => {
    const {userData} = useContext(authContext)
    const { ref, inView,  } = useInView();
    const [morePosts, setMorePosts] = useState(posts.documents)
    const [lastPostId, setLastPostId]= useState(lastId)
    const [numb, setNumb] = useState(1)

    useEffect(() => {
        if(type==='trendingPosts'){
        const hasMore = async () => {
            const data = await getInfinitePosts(lastPostId)
            setMorePosts([...morePosts, ...data.posts.documents])
            setLastPostId(data.lastId)
            setNumb((prevCount) => prevCount + 1);

        }
        if (numb < Math.ceil(posts.total / 5)  && inView && posts.documents.length >0) {
            hasMore()
        }
    }
    else{
        const hasMore = async () => {
            const data = await getUserPosts(profileUserId,lastPostId)
            setMorePosts([...morePosts, ...data.posts.documents])
            setLastPostId(data.lastId)
            setNumb((prevCount) => prevCount + 1);

        }
        if (numb < Math.ceil(posts.total / 5)  && inView && posts.documents.length >0) {
            hasMore()
        }
    }
    }, [inView, ref])


    return (
        <>
            <ul className="w-full  mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3  ">
               {
                morePosts.map((post)=>(
                    <li className="relative min-w-72 h-64 lg:h-96" key={post.$id}>
                    <Link href={`/update-post/${post.$id}`} className="flex rounded-[24px] border border-dark-4 overflow-hidden cursor-pointer w-full h-full">
                        <Image
                            src={post.imageUrl}
                            alt="post"
                            width={500}
                            height={500}
                            className="h-full w-full object-cover"
                        />
                    </Link>
                    <div className="absolute bottom-2 p-5 flex-between w-full bg-gradient-to-t from-dark-3 to-transparent rounded-b-[24px] gap-2">
                        <div className="flex items-center justify-start gap-2 flex-1">
                            <Image
                                src={
                                    post.creator.imageUrl
                                }
                                width={20}
                                height={20}
                                alt="creator"
                                className="w-8 h-8 rounded-full"
                            />
                            <p className="line-clamp-1">{post.creator.name}</p>
                        </div>
                        <PostStats post={post} userId={userData.userId} />
                    </div>
                </li>
                ))
               } 
            </ul>
            {numb < Math.ceil(posts.total / 5) ?
                <div className='flex justify-center items-center' ref={ref}>
                    <Image src={'/searchLoading.svg'} width={28} height={28} alt='loading' className=' h-8 w-8 m-auto' />
                </div>
                :
                <div className="flex justify-center items-center">
                <p className="font-bold my-3 px-4 py-2 rounded-2xl font-inter text-center bg-gray-500 dark:bg-dark-3 text-white dark:text-white">{type === 'trendingPosts'? 'End':
                'No more posts'}</p>
                </div>
            }
        </>
    )
}

export default TrendingPosts