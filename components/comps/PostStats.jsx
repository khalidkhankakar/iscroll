'use client'
import { likePost } from '@/appwirte/api'
import { cheakLike } from '@/lib/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const PostStats = ({post, userId}) => {
  const likesList = post.likes.map((user)=> user.$id)
  const [allLikes, setAllLikes] = useState(likesList)
  const [currentUserLike, setCurrentUserLike]= useState(false)
  const [currentSavePost, setCurrentSavePost]= useState(false)


  useEffect(()=>{
    const likeState = cheakLike(allLikes, userId)
    setCurrentUserLike(likeState)
  },[allLikes])

  const handleLike = async (e)=>{
    e.stopPropagation()
    const newLikes = [...allLikes]
    if(newLikes.includes(userId)){
      const filterLikesArr = newLikes.filter((like)=>{
        return like !== userId;
      })
      const callLike = await likePost(post['$id'], filterLikesArr)
      setAllLikes(filterLikesArr)

    }
    else{
      newLikes.push(userId)
      setAllLikes(newLikes)
      const callLike = await likePost(post['$id'], newLikes)
    }
  }

  return (
    <div className="flex items-center justify-between mt-3">
    {/* like Image */}
    <div className="flex items-start space-x-2">
    <p className='body-medium font-inter'>{allLikes.length}</p>
    <Image src={cheakLike(allLikes, userId)?'/liked.png':'/like.png'} width={24} height={24} alt='post image' className='object-contain cursor-pointer' onClick={handleLike} />
    </div>
    {/* save Image */}
    <Image src={currentSavePost?'/saved.png':'/save.png'} width={24} height={24} alt='post image' className='object-contain' />
</div>
  )
}

export default PostStats