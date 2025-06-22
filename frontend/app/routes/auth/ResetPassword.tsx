import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { FormControl, Form, FormItem, FormMessage, FormLabel, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useResetPasswordMutation } from '@/hooks/use-auth'
import { resetPasswordSchema } from '@/lib/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
// import { C } from 'node_modules/react-router/dist/development/lib-C1JSsICm.mjs'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'


type resetPasswordData = z.infer<typeof resetPasswordSchema>
const ResetPassword = () => {

    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [ isSuccess, setIsSuccess ] = useState(false)

    const {mutate, isPending} = useResetPasswordMutation();


    const form = useForm<resetPasswordData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        }
    })

    const onSubmit = (data: resetPasswordData) => {

        if(!token){
            toast.error('Invalid Token', {
                duration: 3000,
                position: 'top-right',
            })
            return;
        }

        mutate({...data, token : token as string}, {
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
                <h1 className='text-2xl font-bold text-center mb-4'>Reset Password</h1>
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
                                <h1 className='text-2xl font-bold text-center mb-4'>Password Reset Successfull</h1>
                                <p className='text-center mb-4'>Please login with new Password to Continue.</p>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                                    <FormField 
                                        name='newPassword'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder='Enter New Password' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField 
                                        name='confirmPassword'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' placeholder='Enter Confirm Password' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type='submit' className='w-full' disabled={isPending} >
                                                {isPending ? (<Loader2 className='animate-spin' />) : "Reset Password"}
                                    </Button>
                                </form>
                            </Form>
                        )
                    }
                </CardContent>
            </Card>

            
        </div>
    )
}

export default ResetPassword