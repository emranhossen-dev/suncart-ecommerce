'use client'

import { useState } from 'react'
import { Card, InputGroup, TextField, Label, Button } from '@heroui/react'
import { Mail, Lock, User, Image as ImageIcon, Eye, EyeOff } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { toast } from 'react-toastify'

const RegisterForm = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.warning('Passwords do not match', {
                position: 'top-right',
                autoClose: 4000,
            })
            return
        }

        if (password.length < 6) {
            toast.warning('Password must be at least 6 characters', {
                position: 'top-right',
                autoClose: 4000,
            })
            return
        }

        try {
            await authClient.signUp.email(
                {
                    name,
                    email,
                    password,
                    image: image || undefined,
                },
                {
                    onRequest: () => {
                        setLoading(true)
                    },
                    onSuccess: () => {
                        setLoading(false)
                        toast.success(
                            'Account created successfully! Welcome to SunCart',
                            {
                                position: 'top-right',
                                autoClose: 3000,
                            },
                        )
                        router.push('/login')
                    },
                    onError: (ctx) => {
                        setLoading(false)
                        toast.error(
                            ctx.error.message || 'Registration failed. Please try again',
                            {
                                position: 'top-right',
                                autoClose: 4000,
                            },
                        )
                    },
                },
            )
        } catch (err) {
            setLoading(false)
            toast.error('Something went wrong', {
                position: 'top-right',
                autoClose: 4000,
            })
            console.log(err)
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
                    <User size={28} />
                </div>

                <h1 className='text-3xl font-serif font-bold text-foreground'>
                    Create Account
                </h1>

                <p className='text-muted-foreground mt-2'>
                    Join SunCart and enjoy sweet moments
                </p>
            </div>

            <form onSubmit={handleRegister} className='space-y-5'>
                <TextField isRequired>
                    <Label className='text-foreground font-medium mb-2'>Full Name</Label>

                    <InputGroup
                        fullWidth
                        className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
                    >
                        <InputGroup.Prefix>
                            <User size={18} className='text-primary' />
                        </InputGroup.Prefix>

                        <InputGroup.Input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='John Doe'
                            className='bg-transparent text-foreground placeholder:text-muted-foreground'
                        />
                    </InputGroup>
                </TextField>

                <TextField>
                    <Label className='text-foreground font-medium mb-2'>
                        Profile Image URL
                    </Label>

                    <InputGroup
                        fullWidth
                        className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
                    >
                        <InputGroup.Prefix>
                            <ImageIcon size={18} className='text-primary' />
                        </InputGroup.Prefix>

                        <InputGroup.Input
                            type='text'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder='https://suncart.com/profile.jpg'
                            className='bg-transparent text-foreground placeholder:text-muted-foreground'
                        />
                    </InputGroup>
                </TextField>

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

                <TextField isRequired>
                    <Label className='text-foreground font-medium mb-2'>
                        Confirm Password
                    </Label>

                    <InputGroup
                        fullWidth
                        className='bg-secondary border border-border rounded-2xl px-3 focus-within:ring-2 focus-within:ring-primary/20'
                    >
                        <InputGroup.Prefix>
                            <Lock size={18} className='text-primary' />
                        </InputGroup.Prefix>

                        <InputGroup.Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='••••••••'
                            className='bg-transparent text-foreground placeholder:text-muted-foreground'
                        />

                        <InputGroup.Suffix>
                            <button
                                type='button'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='text-muted-foreground hover:text-primary transition'
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>

                <Button
                    type='submit'
                    isLoading={loading}
                    className='w-full bg-primary text-primary-foreground font-bold rounded-2xl h-12'
                >
                    Create Account
                </Button>

                <div className='flex items-center gap-3 my-4'>
                    <div className='h-px bg-border flex-1' />
                    <span className='text-xs text-muted-foreground'>OR</span>
                    <div className='h-px bg-border flex-1' />
                </div>

                <Button
                    variant='secondary'
                    className='w-full bg-secondary text-foreground border border-border rounded-2xl'
                    onPress={handleGoogleLogin}
                >
                    <FcGoogle size={20} />
                    <span>Continue with Google</span>
                </Button>

                <p className='text-center text-sm text-muted-foreground mt-4'>
                    Already have an account?{' '}
                    <Link
                        href='/login'
                        className='text-primary font-bold hover:underline'
                    >
                        Sign in
                    </Link>
                </p>
            </form>
        </Card>
    )
}

export default RegisterForm