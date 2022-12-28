import React, { useState } from 'react';
import jwt_decode from "jwt-decode";

type userType = {
  id: string,
  email: string,
  accessToken: string,
  role: string,
  username: string
}

export type accessTokenData = {
  id: string;
  email: string;
  role: string;
  username: string;
}

export interface userContextInterface {
  user: userType | null,
  signIn: (email: string, password: string) => void,
  signOut: () => void
}

const UserContext = React.createContext<userContextInterface>({
  user: null,
  signIn: () => {},
  signOut: () => {}
})

type Props = {
  children: React.ReactNode;
};

export const UserContextProvider:React.FC<Props> = ({ children }) => {

  const [user, setUser] = useState<userType | null>(null);
  
  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signIn-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()
    console.log("DATA: ", data)

    const tokenData: accessTokenData = jwt_decode(data.accessToken)

    if (data && tokenData) {
      const user = {
        accessToken: data.accessToken,
        id: tokenData.id,
        email: tokenData.email,
        role: tokenData.role,
        username: tokenData.username
      }
      setUser(user)
    }
  }


  const signOut = () => {
    setUser(null);
  }

  const contextState = {
    setUser,
    user,
    signIn,
    signOut
  }

  return (
    <UserContext.Provider value={contextState}>
      {children}
    </UserContext.Provider>
  )

}


export default UserContext;