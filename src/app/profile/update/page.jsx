'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Card, InputGroup, TextField, Label, Button } from '@heroui/react'
import { User, Image as ImageIcon } from 'lucide-react'
import { toast } from 'react-toastify'

const UpdateProfilePage = () => {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()
    
    const [name, setName] = useState(session?.user?.name || '')
    const [photoUrl, setPhotoUrl] = useState(session?.user?.image || '')
    const [loading, setLoading] = useState(false)

    if (isPending) {
        return (
            <div className='flex min-h-[60vh] items-center justify-center'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
            </div>
        )
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error: updateError } = await authClient.updateUser({
                name: name || session?.user?.name,
                image: photoUrl || session?.user?.image
            })

            setLoading(false)

            if (updateError) {
                toast.error(updateError.message || 'Could not update information.', {
                    position: 'top-right',
                    autoClose: 4000,
                })
            } else {
                toast.success('Information updated successfully! 🎉', {
                    position: 'top-right',
                    autoClose: 3000,
                })
                window.location.assign('/profile')
            }
        } catch (err) {
            setLoading(false)
            toast.error('An unexpected error occurred', {
                position: 'top-right',
                autoClose: 4000,
            })
            console.log(err)
        }
    }

    return (
        <div className='flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
            <Card className='w-full max-w-md p-8 shadow-2xl rounded-[2.5rem] border border-border bg-white text-gray-900 transition-colors duration-300'>
                <div className='mb-6'>
                    <h2 className='text-2xl font-serif font-bold text-gray-900'>
                        Update Profile
                    </h2>
                    <p className='mt-1 text-sm text-gray-500'>
                        Modify your public identity dashboard.
                    </p>
                </div>

                <form className='space-y-5' onSubmit={handleUpdate}>
                    <TextField isRequired>
                        <Label className='text-gray-700 font-medium mb-2'>Update Name</Label>
                        <InputGroup
                            fullWidth
                            className='bg-gray-50 border border-gray-200 rounded-2xl px-3 focus-within:ring-2 focus-within:ring-orange-500/20'
                        >
                            <InputGroup.Prefix>
                                <User size={18} className='text-orange-500' />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type='text'
                                defaultValue={session?.user?.name || ''}
                                onChange={(e) => setName(e.target.value)}
                                className='bg-transparent text-gray-900 placeholder:text-gray-400'
                            />
                        </InputGroup>
                    </TextField>

                    <TextField isRequired>
                        <Label className='text-gray-700 font-medium mb-2'>Update Photo URL</Label>
                        <InputGroup
                            fullWidth
                            className='bg-gray-50 border border-gray-200 rounded-2xl px-3 focus-within:ring-2 focus-within:ring-orange-500/20'
                        >
                            <InputGroup.Prefix>
                                <ImageIcon size={18} className='text-orange-500' />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                type='url'
                                defaultValue={session?.user?.image || ''}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className='bg-transparent text-gray-900 placeholder:text-gray-400'
                            />
                        </InputGroup>
                    </TextField>

                    <div className='flex items-center gap-3 pt-2'>
                        <Button
                            type='button'
                            onClick={() => router.push('/profile')}
                            className='w-1/2 rounded-2xl border border-border bg-gray-100 text-gray-700 font-medium h-12'
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            isLoading={loading}
                            className='w-1/2 rounded-2xl bg-orange-500 text-white font-bold h-12'
                        >
                            Update Info
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default UpdateProfilePage