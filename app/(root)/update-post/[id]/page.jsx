import { getSpecficPost } from '@/appwirte/api'
import PostFrom from '@/components/comps/PostFrom'
import { inter, roboto_mono } from '@/constants'
import React from 'react'

const page = async ({params}) => {
    const getPost = await getSpecficPost(params.id)
  return (
    <div className={`${roboto_mono.className}`} >
      <h1 className={`${inter.className} text-4xl font-bold mt-5 ml-5` } >Update Post</h1>
      <PostFrom action={'update'} post={getPost} />
    </div>
  )
}

export default page