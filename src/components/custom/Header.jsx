import { Button } from '@base-ui/react'
import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from './../../dashboard/index';

function Header() {

    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
            <img src='/logo.svg' width={100} height={100} />

            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                    <Button variant="outline" className="px-6 py-2.5 rounded-lg bg-black text-white font-semibold text-sm shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">Dashboard</Button>
                    </Link>
                    <UserButton className=''/>
                </div> :


                <Link to={'/auth/sign-in'}>
                    <Button className="px-6 py-2.5 rounded-lg bg-black text-white font-semibold text-sm shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">Get Started </Button>
                </Link>
            }
        </div>
    )
}

export default Header