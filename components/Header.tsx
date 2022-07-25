import React, { FormEvent, useState } from 'react'
import Image from 'next/image'
import {MenuIcon, SparklesIcon, GlobeIcon, VideoCameraIcon, ChatIcon, BellIcon, PlusIcon, SpeakerphoneIcon} from '@heroicons/react/outline';
import {HomeIcon, ChevronDownIcon, SearchIcon} from '@heroicons/react/solid';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Avatar from './Avatar';

function Header() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
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

        <div className='hidden sm:flex mx-7 items-center xl:min-w-[300px]'>
            <HomeIcon className='w-5 h-5' />
            <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
            <ChevronDownIcon className='w-5 h-5' />
        </div>

        {/* Search Box */}
        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm px-3 py-1 ml-2 sm:ml-0'>
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
        <div className='ml-5 flex items-center lg:hidden z-[70]'>
            <div className="w-full h-full">
                <MenuIcon onClick={() => setMenuOpen(!menuOpen)} className='icon' />
            </div>
        </div>
        <div className={`absolute top-0 right-0 ${menuOpen ? 'block' : 'hidden'} w-2/5 h-screen z-[50] lg:hidden`}>
            <div className={`w-full h-full bg-gray-50 flex-col py-12 px-3 shadow-lg z-[100]`}>
                {/* Sign in/out */}
                {session ? (
                    <div onClick={() => signOut()} className="flex items-center space-x-2 border border-gray-500 p-2 w-full">
                        <Avatar />
                        <div className='flex-1 text-xs'>
                            <p className="truncate">{session?.user?.name}</p>
                            <p className='text-gray-500 whitespace-nowrap w-full'>Sign Out</p>
                        </div>
                        <ChevronDownIcon className='text-gray-400 h-5 flex-shrink-0 ' />
                    </div>
                ) : (
                    <div onClick={() => signIn()} className="flex items-center space-x-2 border border-gray-500 p-2 w-32">
                        <div className='relative h-5 w-5 flex-shrink-0'>
                            <Image src="/images/reddit-face.jpeg" className='h-full w-full' layout='fill' objectFit='cover' />
                        </div>
                        <p className='text-gray-500 whitespace-nowrap w-full'>Sign In</p>
                    </div>
                )}
            </div>
        </div>

        {/* Sign in/out */}
        {session ? (
            <div onClick={() => signOut()} className="hidden lg:flex items-center space-x-2 border border-gray-500 p-2 w-32 cursor-pointer">
                <div className='flex-1 text-xs'>
                    <p className="truncate">{session?.user?.name}</p>
                    <p className='text-gray-500 whitespace-nowrap w-full'>Sign Out</p>
                </div>

                <ChevronDownIcon className='text-gray-400 h-5 flex-shrink-0 ' />
            </div>
        ) : (
            <div onClick={() => signIn()} className="hidden lg:flex items-center space-x-2 border bg-gray-100 border-gray-500 p-2 w-32 cursor-pointer">
                <div className='relative h-8 w-8 flex-shrink-0'>
                    <Image src="/images/reddit-face.jpeg" className='h-full w-full' layout='fill' objectFit='contain' />
                </div>
                <p className='text-gray-500 whitespace-nowrap w-full'>Sign In</p>
            </div>
        )}
    </div>
  )
}

export default Header