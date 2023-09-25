'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setError, setUserData } from '../store/userSlice';

export default function UpdateState({ jsonData }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log('user: ', user);
  console.log('jsondata from updateState component: ', jsonData);

  useEffect(() => {
    // dispatch(setUserData(jsonData));
    dispatch(setError());
  }, []);

  return <div>UpdateState: {user.error ? user.error : 'no error'}</div>;
}
