import { loginSchema, registerSchema } from '@/lib/zodSchema'
import React from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'



type registerData = z.infer<typeof registerSchema>

const Register = () => {
  const form = useForm<registerData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
  })

  const handleSubmit = (data: registerData) => {
    console.log(data)
    // Handle login logic here, e.g., API call
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full p-4'>
      <Card className='w-full max-w-md  shadow-lg'>
        <CardHeader className='text-center'>
          <CardTitle  className='text-center text-2xl font-bold'>Create an Account</CardTitle>
          <CardDescription className='text-center text-xl'>Please fill your details to Register</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Enter your email' {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Enter your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Confirm your password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full '>SignUp</Button>
              
            </form>
          </Form>
          
          <CardFooter className='text-center mt-4 justify-center'>
            <p className='text-sm text-gray-600'>Already have an account? <Link to='/login' className='text-blue-500 hover:underline'>Login</Link></p>
          </CardFooter>

        </CardContent>
      </Card>
    </div>
  )
}



export default Register