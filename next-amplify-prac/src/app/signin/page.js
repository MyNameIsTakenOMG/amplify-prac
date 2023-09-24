'use client';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../aws-exports';
import React, { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

Amplify.configure({ ...awsExports, ssr: true });

export default function Signin() {
  const router = useRouter();
  const [formState, setFormState] = useState('signIn');
  const [formInputState, setFormInputState] = useState({
    username: '',
    password: '',
    verificationCode: '',
  });

  const handleInputChange = (e) => {
    setFormInputState((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('sign in');
    try {
      const user = await Auth.signIn(
        formInputState.username,
        formInputState.password
      );
      console.log('user :', user);
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('sign up');
    try {
      await Auth.signUp({
        username: formInputState.username,
        password: formInputState.password,
        attributes: {
          'custom:role': 'user',
        },
      });
      setFormState('confirmSignUp');
    } catch (error) {
      console.log('error: ' + error);
    }
  };
  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    console.log('confirm sign up');
    try {
      await Auth.confirmSignUp(
        formInputState.username,
        formInputState.verificationCode
      );
    } catch (error) {
      console.log('error: ' + error);
    }
  };
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  if (formState === 'signedIn') {
    return router.push('/');
  }

  return (
    <div
      className={styles.main}
      style={{ display: 'flex', flexFlow: 'column nowrap' }}
    >
      <div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
        <button
          onClick={() => {
            setFormState('signIn');
          }}
        >
          sign in
        </button>
        <button
          onClick={() => {
            setFormState('signUp');
          }}
        >
          sign up
        </button>
        <button
          onClick={() => {
            setFormState('confirmSignUp');
          }}
        >
          confirm sign up
        </button>
        <button onClick={handleSignOut}>sign out</button>
      </div>
      {formState === 'signIn' ? (
        <div>
          <input
            name="username"
            value={formInputState.username}
            onChange={handleInputChange}
          />
          <input
            name="password"
            value={formInputState.password}
            onChange={handleInputChange}
          />
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      ) : formState === 'signUp' ? (
        <div>
          <input
            name="username"
            value={formInputState.username}
            onChange={handleInputChange}
          />
          <input
            name="password"
            value={formInputState.password}
            type="password"
            onChange={handleInputChange}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      ) : formState === 'confirmSignUp' ? (
        <div>
          <input
            name="username"
            value={formInputState.username}
            onChange={handleInputChange}
          />
          <input
            name="verificationCode"
            value={formInputState.verificationCode}
            onChange={handleInputChange}
          />
          <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
