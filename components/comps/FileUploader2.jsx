'use client'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'
import Image from 'next/image'

const FileUploader2 = ({fieldChange, mediaUrl}) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl)
  const [file, setFile] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept:{
      'image/*': ['.png', '.jpeg', '.svg', '.jpg']
    }
  })
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        fileUrl ?
        <div className='fileHoverDiv relative'>
            <Image src={fileUrl||mediaUrl} width={300} height={200} className='h-24 w-24 md:h-28 md:w-28 m-auto object-contain cursor-pointer rounded-full hover:opacity-70 transition-all duration-500' alt='your Image' />
            <div className='showEdit flex space-x-1 items-center   transition-all duration-200 absolute top-1/2 left-16'>
            <Image src={'/edit.png'} width={300} height={200} className='h-8 w-8  object-contain' alt='your Image' />
            <p className='small-regular' >Edit</p>
            </div>
        </div>
           :
          <div className='flex flex-col items-center justify-center'>
            Draghere
          </div>
      }
    </div>
  )
}

export default FileUploader2