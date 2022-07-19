import React, { FormEvent } from 'react'
import Image from 'next/image'
import {MenuIcon, SparklesIcon, GlobeIcon, VideoCameraIcon, ChatIcon, BellIcon, PlusIcon, SpeakerphoneIcon} from '@heroicons/react/outline';
import {HomeIcon, ChevronDownIcon, SearchIcon} from '@heroicons/react/solid';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

function Header() {
    const {data: session} = useSession()

    function handleSubmit (e: FormEvent) {
        e.preventDefault()
    }

  return (
    <div className='sticky top-0 z-50 flex bg-white w-full px-4 py-2 shadow-sm items-center'>
        <div className="relative h-10 w-20 flex-shrink-0">
            <Link href={'/'}>
                <a>
                    <Image src={'https://links.papareact.com/fqy'} layout='fill' objectFit='contain' priority />
                </a>
            </Link>
        </div>

        <div className='mx-7 flex items-center xl:min-w-[300px]'>
            <HomeIcon className='w-5 h-5' />
            <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
            <ChevronDownIcon className='w-5 h-5' />
        </div>

        {/* Search Box */}
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm px-3 py-1'>
            <SearchIcon className='h-6 w-6 text-gray-400' />
            <input className='flex-1 outline-none' type="text" placeholder='Search Reddit' />
            <button type='submit' hidden />
        </form>

        <div className="mx-5 hidden lg:inline-flex items-center text-gray-500 space-x-2">
            <SparklesIcon className='icon' />
            <GlobeIcon className='icon' />
            <VideoCameraIcon className='icon' />
            <div className="h-10 border border-gray-100" />
            <ChatIcon className='icon' />
            <BellIcon className='icon' />
            <PlusIcon className='icon' />
            <SpeakerphoneIcon className='icon' />
        </div>
        <div className='ml-5 flex items-center lg:hidden'>
            <MenuIcon className='icon' />
        </div>

        {/* Sign in/out */}
        {session ? (
            <div onClick={() => signOut()} className="hidden lg:flex items-center space-x-2 border border-gray-500 p-2 w-32 cursor-pointer">
                {/* <div className='relative h-5 w-5 flex-shrink-0'>
                    <Image src="/images/reddit-face.jpeg" className='h-full w-full' layout='fill' />
                </div> */}

                <div className='flex-1 text-xs'>
                    <p className="truncate">{session?.user?.name}</p>
                    <p className='text-gray-500 whitespace-nowrap w-full'>Sign Out</p>
                </div>

                <ChevronDownIcon className='text-gray-400 h-5 flex-shrink-0 ' />
            </div>
        ) : (
            <div onClick={() => signIn()} className="hidden lg:flex items-center space-x-2 border border-gray-500 p-2 w-32 cursor-pointer">
                <div className='relative h-5 w-5 flex-shrink-0'>
                    <Image src="/images/reddit-face.jpeg" className='h-full w-full' layout='fill' objectFit='contain' />
                    <p className='text-gray-500 whitespace-nowrap w-full'>Sign In</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default Header