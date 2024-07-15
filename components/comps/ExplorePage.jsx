'use client'
import Image from 'next/image'
import React, { useState } from 'react'


const ExplorePage = () => {
    const [search, setSearch] = useState('')
    return (
        <div className='w-full '>
            <div className='flex py-2 px-3 dark:border dark:border-white w-3/4 m-auto mt-3 bg-white dark:bg-dark-2 shadow-lg rounded-lg space-x-2 '>
                <Image src={'/search.png'} width={28} height={28} alt="search" className='object-contain cursor-pointer' />
                <input type="text" name='search' placeholder='explore...' className='flex-1  outline-none bg-white dark:bg-dark-2 text-lg font-medium italic placeholder:font-light placeholder:italic placeholder:text-slate-800 dark:placeholder:text-slate-300 ' value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </div>
            <div className='w-4/5 mt-20 m-auto flex justify-between items-center'>
                <h3 className={`text-xl font-inter md:text-2xl font-semibold`} >Today&apos;s popular</h3>

                <div className='flex items-center  shadow-lg bg-white dark:bg-dark-2 rounded-2xl p-2'>
                    <Image src={'/search.png'} width={28} height={28} alt="search" className='object-contain cursor-pointer h-4 w-4' />
                    <p className='text-sm '>All</p>
                </div>
            </div>

        </div>
    )
}

export default ExplorePage
