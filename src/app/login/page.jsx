import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const LoginPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-background text-foreground px-4 transition-colors'>
			<LoginForm />
		</div>
	)
}

export default LoginPage
