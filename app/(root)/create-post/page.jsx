import PostFrom from '@/components/comps/PostFrom'
import { inter, roboto_mono } from '@/constants'
import React from 'react'

const page = () => {
  return (
    <div className={`${roboto_mono.className}`} >
      <h1 className={`${inter.className} text-4xl font-bold mt-5 ml-5` } >Create Post</h1>
      <PostFrom action={'create'}/>
    </div>
  )
}

export default page