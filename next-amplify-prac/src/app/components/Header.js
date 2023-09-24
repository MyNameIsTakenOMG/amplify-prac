'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsExports from '@/aws-exports';
import { useRouter } from 'next/navigation';

Amplify.configure({ ...awsExports, ssr: true });

export default function Header() {
  const [userAuth, setUserAuth] = useState('signin');

  const router = useRouter();

  useState(() => {
    // check if user is signed in on first load
    let isMount = true;
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('current user', user);
        if (isMount) {
          setUserAuth('sign out');
        }
      })
      .catch((error) => {
        console.log('error', error);
      });

    // listen to auth change
    const cancelHub = Hub.listen('auth', (data) => {
      console.log('data: ', data);
      const event = data.payload.event;
      console.log('event:', event);
      if (event === 'signOut') {
        console.log('user signed out...');
      }
      if (event === 'signIn') {
        console.log('user signed in...');
      }
      if (event === 'signUp') {
        console.log('user signed up...');
        console.log('data payload:', data.payload);
      }
      if (event === 'confirmSignUp') {
        console.log('user signed up confirmed...');
      }
    });

    return () => {
      cancelHub();
      isMount = false;
    };
  }, []);

  const handleClick = () => {
    if (userAuth === 'signin') {
      router.push('/signin');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
      }}
    >
      <h6>Header</h6>
      <button
        style={{ border: '1px solid black', cursor: 'pointer' }}
        onClick={handleClick}
      >
        {userAuth}
      </button>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexFlow: 'row nowrap',
          columnGap: '1rem',
        }}
      >
        <li>
          <Link href={'/'}>home</Link>
        </li>
        <li>
          <Link href={'/about'}>about</Link>
        </li>
        <li>
          <Link href={'/premium'}>premium</Link>
        </li>
      </ul>
    </div>
  );
}
