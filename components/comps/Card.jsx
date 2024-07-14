'use client'
import authContext from "@/context/authContext"
import { useContext, useEffect, useState } from "react"
import Image from 'next/image'
import PostStats from "./PostStats"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { getRecentPosts } from "@/appwirte/api"
import { multiFormatDateString } from "@/lib/utils"

const Card = ({ posts, lastId }) => {
    const { userData } = useContext(authContext)
    const { ref, inView, } = useInView();
    const [morePosts, setMorePosts] = useState(posts.documents)
    const [lastPostId, setLastPostId] = useState(lastId);
    const [numb, setNumb] = useState(1)
    useEffect(() => {
        const hasMore = async () => {
            // console.log('This last id', lastPostId);
            const data = await getRecentPosts(lastPostId)
            console.log('data is  ', data.posts.total, typeof data.posts.total);
            setMorePosts([...morePosts, ...data.posts.documents])
            setLastPostId(data.lastId)
            console.log(numb);
            setNumb((prevCount) => prevCount + 1);
            console.log(numb);

        }
        if (numb < Math.ceil(posts.total / 5) && inView) {
            hasMore()
        }
    }, [inView, ref])
    return (
        <>
            {
                morePosts.map((post) => (<div key={post['$id']} className="w-[90%] md:w-[80%] m-auto  py-2 px-6 rounded-lg mt-3 bg-white dark:bg-dark-1 shadow-md  ">
                    <div className='flex items-center justify-between mx-2 md:mx-6'>
                        <Link href={`/profile/${post.creator['$id']}`} className="user flex space-x-2 items-center">
                            <Image src={post.creator.imageUrl || '/profile.jpg'} height={40} width={40} alt='profile' className='object-cover rounded-full h-12 w-12' />
                            <div>
                                <p className='base-medium lg:body-bold text-light-1 font-inter '>{post.creator.name}</p>
                                <div className='flex space-x-1 items-center'>
                                    <p className='subtle-semibold lg:small-regular font-inter'>{multiFormatDateString(post.$createdAt)}</p>
                                    <div className="h-1 w-1 bg-black dark:bg-white rounded-full" />
                                    <p className=' font-inter subtle-semibold lg:small-regular'>{post.location}</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={`/update-post/${post['$id']}`} className={`text-sm ${userData.userId === post.creator['$id'] ? 'block' : 'hidden'}`}><Image src={'/edit.png'} width={24} height={24} alt='post image' className='object-contain cursor-pointer' /></Link>
                    </div>


                    <div className='flex space-x-2 mt-3 mx-1 md:mx2 flex-wrap'>
                        <p className='small-medium font-inter '>{post.caption}</p>
                    </div>
                    <div className='flex space-x-2 my-1 mx-1 md:mx-2 flex-wrap'>
                        {
                            post.tags.map((item) => (
                                <p className='small-regular font-inter' key={item}>{item}</p>
                            ))
                        }
                    </div>
                    <div>
                        <Image src={post.imageUrl} width={800} height={800} alt='post image' className='rounded-xl h-96 object-cover' />
                    </div>
                    <div className='my-3 w-full h-[0.06rem] bg-gray-400 dark:bg-slate-200  rounded-full' />

                    <PostStats post={post} userId={userData.userId} />
                </div>
                ))
            }
            {numb < Math.ceil(posts.total / 5) ?
                <div className='flex justify-center items-center' ref={ref}>
                    <Image src={'/searchLoading.svg'} width={28} height={28} alt='loading' className=' h-8 w-8 m-auto' />
                </div>
                :
                <div className="flex justify-center items-center">
                <p className="font-bold my-3 px-4 py-2 rounded-2xl font-inter text-center bg-gray-500 dark:bg-dark-3 text-white dark:text-white">End of Posts</p>
                </div>
            }
        </>
    )
}

export default Card