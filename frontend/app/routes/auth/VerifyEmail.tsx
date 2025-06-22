import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React, { use, useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle, Loader, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router'
import { Button } from '@/components/ui/button';
import { useVerifyEmailMutation } from '@/hooks/use-auth';
// import { m } from 'node_modules/react-router/dist/development/lib-C1JSsICm.mjs';
import { toast } from 'sonner';

const VerifyEmail = () => {
    const [ searchParams ] = useSearchParams();
    const [isSuccess, setIsSuccess ] = useState(false);

    const { mutate, isPending : isVerifying } = useVerifyEmailMutation();


    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            mutate({token}, {
                onSuccess: () => {
                    setIsSuccess(true);
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'Email verification failed. Please try again.';
                    toast.error(errorMessage, {
                        duration: 3000,
                        position: 'top-right',
                    });
                    setIsSuccess(false);
                    console.log("Error during email verification:", error);
                }
            });
        } else {
            setIsSuccess(false);
        } 
    }, [searchParams])
    

    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-full p-4'>
            <h1 className='text-2xl font-bold text-center mb-4'>Verify Email</h1>
            {/* <p className='text-center mb-4'>Verifying your email...</p> */}
            <Card className='w-full max-w-md justify-around shadow-lg'>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-6 ">
                        {isVerifying ? (
                        <>
                            <Loader className="w-10 h-10 text-gray-500 animate-spin" />
                            <h3 className="text-lg font-semibold">Verifying email...</h3>
                            <p className="text-sm text-gray-500">
                            Please wait while we verify your email.
                            </p>
                        </>
                        ) : isSuccess ? (
                        <>
                            <CheckCircle className="w-10 h-10 text-green-500" />
                            <h3 className="text-lg font-semibold">Email Verified</h3>
                            <p className="text-sm text-gray-500">
                            Your email has been verified successfully.
                            </p>
                            <Link to="/login" className="text-sm text-blue-500 mt-6">
                            <Button variant="outline">Back to Log in</Button>
                            </Link>
                        </>
                        ) : (
                        <>
                            <XCircle className="w-10 h-10 text-red-500" />
                            <h3 className="text-lg font-semibold">
                            Email Verification Failed
                            </h3>
                            <p className="text-sm text-gray-500">
                            Your email verification failed. Please try again.
                            </p>

                            <Link to="/login" className="text-sm text-blue-500 mt-6">
                            <Button variant="outline">Back to Log in</Button>
                            </Link>
                        </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default VerifyEmail;