'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@heroui/react'
import { User, Mail, Edit } from 'lucide-react'

const ProfilePage = () => {
    const { data: session, isPending, refetch } = authClient.useSession()

    useEffect(() => {
        refetch()
    }, [refetch])

    if (isPending) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent' />
            </div>
        )
    }

    if (!session?.user) {
        return (
            <div className='flex min-h-[60vh] flex-col items-center justify-center space-y-4'>
                <h2 className='text-lg font-bold text-gray-800'>Please log in to view your profile.</h2>
                <Link href='/login'>
                    <Button className='bg-orange-500 text-white font-bold rounded-xl px-6 h-11 shadow-md'>
                        Go to Login
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8'>
            {/* হিরোইউআই কাস্টম কার্ড ট্যাগ বাদ দিয়ে পিওর এইচটিএমএল ডিভ ব্যবহার */}
            <div className='overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-2xl transition-all duration-300'>
                
                {/* সলিড অরেঞ্জ কালার ব্যানার */}
                <div className='bg-orange-500 h-32 w-full block' />
                
                <div className='relative px-6 pb-8 text-center sm:text-left sm:flex sm:items-end sm:space-x-5 bg-white'>
                    
                    <div className='flex justify-center -mt-16 sm:mt-0 z-10'>
                        {session.user.image ? (
                            <img
                                src={session.user.image}
                                alt={session.user.name || "User profile"}
                                className='h-28 w-28 rounded-full border-4 border-white object-cover shadow-md bg-white block'
                                onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
                                }}
                            />
                        ) : (
                            <div className='h-28 w-28 rounded-full border-4 border-white flex items-center justify-center shadow-md bg-gray-100 text-orange-500'>
                                <User size={44} />
                            </div>
                        )}
                    </div>
                    
                    <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:pb-1'>
                        <div className='block min-w-0 flex-1'>
                            <h1 className='text-2xl font-serif font-bold text-gray-900 truncate'>
                                {session.user.name}
                            </h1>
                            <div className='flex items-center justify-center sm:justify-start gap-2 mt-1 text-gray-500'>
                                <Mail size={16} className='text-orange-500' />
                                <p className='text-sm font-medium'>{session.user.email}</p>
                            </div>
                        </div>
                        
                        <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:space-y-0 sm:space-x-4'>
                            <Link href='/profile/update'>
                                <Button
                                    className='inline-flex justify-center items-center gap-2 rounded-2xl bg-orange-500 text-white font-bold px-5 h-12 shadow-md hover:bg-orange-600 transition-colors'
                                >
                                    <Edit size={16} />
                                    <span>Update Information</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage