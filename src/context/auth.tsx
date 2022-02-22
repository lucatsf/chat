import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  picture_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
}

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: {
      id: string;
      name: string;
      email: string;
      picture_url: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props:AuthProvider) {

  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://api.lucastorres.dev/authenticate/google`

  async function sigIn(code: string) {

    const response = await api.post<AuthResponse>('auth/google/url', {
      code: code,
      serviceType: 'web'
    })

    const { token, user } = response.data;

    if (typeof token != undefined && token != null) {
      localStorage.setItem('@chat:token', token);

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser(user);
    }

    if (user) {
      window.location.href = '/talks';
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('@chat:token')

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get('user/profile').then(response => {
        const { user } = response.data;

        setUser(user)
      })

      localStorage.setItem('@chat:token', token);
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes('?code=')

    if (hasCode) {
      const [urlWithCode, code] = url.split('?code=')

      window.history.pushState({}, '', urlWithCode)

      sigIn(code)
    }
  }, [])


  return (
    <AuthContext.Provider value={{ signInUrl, user }}>
      {props.children}
    </AuthContext.Provider>
  )
}
