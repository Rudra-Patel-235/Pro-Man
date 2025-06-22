import { loginSchema } from '@/lib/zodSchema'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router'
import { useLoginMutation } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { useAuth } from '@/tanstack/authContext'


type loginData = z.infer<typeof loginSchema>

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth()

  const form = useForm<loginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const { mutate, isPending } = useLoginMutation();


  const handleSubmit = (data: loginData) => {
    mutate(data, {
        onSuccess: (data) => {
            login(data);
            toast.success('Login successful!', {
                duration: 3000,
                position: 'top-right',
            });
            navigate('/dashboard')
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage, {
                duration: 3000,
                position: 'top-right',
            });
            console.log("Error during login:", error);
        }
    });
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full p-4'>
      <Card className='w-full max-w-md  shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle  className='text-center text-2xl font-bold'>Welcome Back</CardTitle>
          <CardDescription className='text-center text-xl'>Please enter your credentials to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex justify-between items-center mb-2'>
                      <FormLabel>Password</FormLabel>
                      <Link to='/forgot-password' className='text-blue-500 text-xs hover:underline'>Forgot password?</Link>
                    </div>
                    <FormControl>
                      <Input type='password' placeholder='Enter your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}              
              />
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? "Logging in..." : "Log In"}
              </Button>
              
            </form>
          </Form>
          
          <CardFooter className='text-center mt-4 justify-center'>
            <p className='text-sm text-gray-600'>Don't have an account? <Link to='/register' className='text-blue-500 hover:underline'>Register</Link></p>
          </CardFooter>

        </CardContent>
      </Card>
    </div>
  )
}



export default Login