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

	const handleLogin = async (formData) => {
		const email = formData.get('email')
		const password = formData.get('password')

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
						toast.success('Welcome back! 🌸 Login successful', {
							position: 'top-right',
							autoClose: 3000,
						})
						router.push('/')
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

	return (
		<Card className='w-full max-w-md p-8 shadow-2xl rounded-[2.5rem] border border-border bg-card text-card-foreground transition-colors duration-300'>
			{/* Header */}
			<div className='text-center mb-8'>
				<div className='w-16 h-16 mx-auto bg-secondary text-primary flex items-center justify-center rounded-2xl mb-4'>
					<Lock size={28} />
				</div>

				<h1 className='text-3xl font-serif font-bold text-foreground'>
					Welcome Back
				</h1>

				<p className='text-muted-foreground mt-2'>
					Sign in to your Sweet Rose account
				</p>
			</div>

			{/* Form */}
			<form action={handleLogin} className='space-y-5'>
				{/* Email */}
				<TextField isRequired>
					<Label className='text-foreground font-medium mb-2'>Email</Label>

					<InputGroup
						fullWidth
						className='
							bg-secondary
							border border-border
							rounded-2xl
							px-3
							transition-all
							duration-300
							focus-within:ring-2
							focus-within:ring-primary/20
						'
					>
						<InputGroup.Prefix>
							<Mail size={18} className='text-primary' />
						</InputGroup.Prefix>

						<InputGroup.Input
							name='email'
							type='email'
							placeholder='hello@sweetrose.com'
							className='bg-transparent text-foreground placeholder:text-muted-foreground'
						/>
					</InputGroup>
				</TextField>

				{/* Password */}
				<TextField isRequired>
					<Label className='text-foreground font-medium mb-2'>Password</Label>

					<InputGroup
						fullWidth
						className='
							bg-secondary
							border border-border
							rounded-2xl
							px-3
							transition-all
							duration-300
							focus-within:ring-2
							focus-within:ring-primary/20
						'
					>
						<InputGroup.Prefix>
							<Lock size={18} className='text-primary' />
						</InputGroup.Prefix>

						<InputGroup.Input
							name='password'
							type={showPassword ? 'text' : 'password'}
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

				{/* Forgot Password */}
				<div className='flex justify-end -mt-2'>
					<Link
						href='/forgot-password'
						className='text-sm text-primary font-medium hover:underline'
					>
						Forgot password?
					</Link>
				</div>

				{/* Login Button */}
				<Button
					type='submit'
					isLoading={loading}
					className='
						w-full
						bg-primary
						text-primary-foreground
						font-bold
						rounded-2xl
						h-12
						hover:opacity-90
						transition-all
					'
				>
					Sign In
				</Button>

				{/* Divider */}
				<div className='flex items-center gap-3 my-4'>
					<div className='h-px bg-border flex-1' />
					<span className='text-xs text-muted-foreground'>OR</span>
					<div className='h-px bg-border flex-1' />
				</div>

				{/* Google Login */}
				<Button
					variant='secondary'
					className='
						w-full
						bg-secondary
						text-foreground
						border border-border
						rounded-2xl
						font-medium
					'
					onPress={() =>
						toast.info('Google login coming soon! 🚀', {
							position: 'top-right',
							autoClose: 3000,
						})
					}
				>
					<FcGoogle size={20} />
					<span>Continue with Google</span>
				</Button>

				{/* Register Link */}
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
