import React from 'react'
import type { Route } from "../../+types/root";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pro-Man" },
    { name: "description", content: "Welcome to Pro-Man!" },
  ];
}

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Link to='/login'>
        <Button className='w-40' variant='default'>Login</Button>
      </Link>

      <Link to='/register'>
        <Button className='w-40 mt-4 bg-gray-300' variant='secondary'>Register</Button>
      </Link>
    </div>

  )
}

export default Home;
