import React from 'react'
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

type Props = {
    seed?: string;
    large?: boolean
    loading?: boolean
}

function Avatar({seed, large, loading}: Props) {
    const {data: session} = useSession()
    
    return (
    <div className={`relative h-10 w-10 rounded-full border-gray-300 bg-white ${large && 'h-20 w-20'}`}>
       {!loading ? 
            <Image 
                src={`https://avatars.dicebear.com/api/open-peeps/${seed || session?.user?.name || 'placeholder'}.svg`} 
                layout={'fill'} /> :
            <Skeleton containerClassName='w-full h-full' width={'100%'} height={'100%'} />
        }
    </div>
  )
}

export default Avatar