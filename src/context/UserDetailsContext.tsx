'use client'

import { apiGetAuthUserDetails } from '@/lib/api-requests';
import { AllUser } from '@/lib/types';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface UserDetailsContextProps {
    userDetails: AllUser;
  }

export const UserDetailsContext = createContext<UserDetailsContextProps>({
    userDetails: {} as AllUser,
});

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<AllUser>({} as AllUser);

  const getData = async () => {
    const data = await apiGetAuthUserDetails();
    setUserDetails(data);
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <UserDetailsContext.Provider value={{ userDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};