'use client'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'
import Image from 'next/image'

const FileUploader = ({fieldChange, mediaUrl}) => {
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
    <div {...getRootProps()} className='py-4 px-3  bg-white dark:bg-dark-1 rounded-md'>
      <input {...getInputProps()} />
      {
        fileUrl ?
          <div className={`flex flex-col items-center justify-center`}>
            <Image src={fileUrl||mediaUrl} width={300} height={200} className='object-contain rounded-md' alt='your Image' />
            <div className='my-1 text-black h-2' />
            <Button type="button">Replace</Button>
          </div>
           :
          <div className='flex flex-col items-center justify-center'>
            <p className='text-sm font-medium text-black dark:text-white '>PNG/SVG/JPEG/JPG</p>
            <Button type="button">Add Image</Button>
          </div>
      }
    </div>
  )
}

export default FileUploader