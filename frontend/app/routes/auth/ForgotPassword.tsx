import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForgotPasswordMutation } from '@/hooks/use-auth'
import { forgotPasswordSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'


export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>
const ForgotPassword = () => {
    const form = useForm<forgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ''
        }
    })

    const { mutate, isPending } = useForgotPasswordMutation();

    const [ isSuccess, setIsSuccess ] = useState(false)

    const onSubmit = (data: forgotPasswordData) => {
        mutate(data, {
            onSuccess: () => {
                setIsSuccess(true)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'Password reset failed. Please try again.';
                toast.error(errorMessage, {
                    duration: 3000,
                    position: 'top-right',
                });
                console.log("Error during password reset:", error);
            }
        })
    }



    return (
        
        <div className='flex flex-col items-center justify-center min-h-screen w-full p-4'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold text-center mb-4'>Forgot Password</h1>
                {/* <p className='text-center mb-4'>Enter New Passowrd Below</p> */}
            </div>
            <Card className='w-full max-w-md justify-around shadow-lg'>
                <CardHeader>
                    <Link to='/login' className='flex'>
                        <ArrowLeft></ArrowLeft>
                        Back to Login
                    </Link>
                </CardHeader>

                <CardContent>
                    {
                        isSuccess ? (
                            <div className='flex flex-col items-center justify-center'>
                                <CheckCircle className='w-10 h-10 text-green-500' />
                                <h1 className='text-2xl font-bold text-center mb-4'>Password Reset Email Sent</h1>
                                <p className='text-center mb-4'>Please check your email to reset your password.</p>
                            </div> ) : (
                                <>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                                            <FormField 
                                                control={form.control}
                                                name='email'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input type='email' placeholder='Enter your email' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type='submit' className='w-full' disabled={isPending} >
                                                {isPending ? (<Loader2 className='animate-spin' />) : "Submit"}
                                            </Button>

                                        </form>
                                    </Form>
                                </>
                            )
                            
                    }
                </CardContent>
            </Card>

            
        </div>
        
    )
}

export default ForgotPassword