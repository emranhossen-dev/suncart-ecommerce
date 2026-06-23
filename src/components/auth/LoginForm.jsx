'use client'

import { useState } from 'react'
import { Card, InputGroup, TextField, Label, Button } from '@heroui/react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const LoginForm = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            await authClient.signIn.email(
                {
                    email,
                    password,
                },
                {
                    onRequest: () => {
                        setLoading(true)
                    },
                    onSuccess: () => {
                        setLoading(false)
                        toast.success('Welcome back! Login successful', {
                            position: 'top-right',
                            autoClose: 3000,
                        })
                        router.push('/')
                        router.refresh()
                    },
                    onError: (ctx) => {
                        setLoading(false)
                        toast.error(ctx.error.message || 'Login failed. Please try again', {
                            position: 'top-right',
                            autoClose: 4000,
                        })
                    },
                },
            )
        } catch (error) {
            setLoading(false)
            toast.error('An unexpected error occurred', {
                position: 'top-right',
                autoClose: 4000,
            })
            console.log(error)
        }
    }

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/',
        })
    }

    return (
        <Card className='w-full max-w-md p-8 shadow-2xl rounded-[2.5rem] border border-border bg-card text-card-foreground transition-colors duration-300 animate__animated animate__fadeInUp'>
            <div className='text-center mb-8'>
                <div className='w-16 h-16 mx-auto bg-secondary text-primary flex items-center justify-center rounded-2xl mb-4'>
                    <Lock size={28} />
                </div>

                <h1 className='text-3xl font-serif font-bold text-foreground'>
                    Welcome Back
                </h1>

                <p className='text-muted-foreground mt-2'>
                    Sign in to your SunCart account
                </p>
            </div>

            <form onSubmit={handleLogin} className='space-y-5'>
                <TextField isRequired>
                    <Label className='text-foreground font-medium mb-2'>Email</Label>

                    <InputGroup
                        fullWidth
                        className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
                    >
                        <InputGroup.Prefix>
                            <Mail size={18} className='text-primary' />
                        </InputGroup.Prefix>

                        <InputGroup.Input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='hello@suncart.com'
                            className='bg-transparent text-foreground placeholder:text-muted-foreground'
                        />
                    </InputGroup>
                </TextField>

                <TextField isRequired>
                    <Label className='text-foreground font-medium mb-2'>Password</Label>

                    <InputGroup
                        fullWidth
                        className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
                    >
                        <InputGroup.Prefix>
                            <Lock size={18} className='text-primary' />
                        </InputGroup.Prefix>

                        <InputGroup.Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='bg-transparent text-foreground placeholder:text-muted-foreground'
                        />

                        <InputGroup.Suffix>
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='text-muted-foreground hover:text-primary transition'
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>

                <Button
                    type='submit'
                    isLoading={loading}
                    className='w-full bg-primary text-primary-foreground font-bold rounded-2xl h-12 hover:opacity-90 transition-all'
                >
                    Sign In
                </Button>

                <div className='flex items-center gap-3 my-4'>
                    <div className='h-px bg-border flex-1' />
                    <span className='text-xs text-muted-foreground'>OR</span>
                    <div className='h-px bg-border flex-1' />
                </div>

                <Button
                    variant='secondary'
                    className='w-full bg-secondary text-foreground border border-border rounded-2xl font-medium'
                    onPress={handleGoogleLogin}
                >
                    <FcGoogle size={20} />
                    <span>Continue with Google</span>
                </Button>

                <p className='text-center text-sm text-muted-foreground mt-4'>
                    Don&apos;t have an account?{' '}
                    <Link
                        href='/register'
                        className='text-primary font-bold hover:underline'
                    >
                        Create one
                    </Link>
                </p>
            </form>
        </Card>
    )
}

export default LoginForm