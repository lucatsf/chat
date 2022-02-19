import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import Home from '..'
import TalkBox from '../../components/TalkBox'
import { AuthContext } from '../../context/auth'
import { api } from '../../services/api'

type User = {
    name: string
    picture_url: string
}

type Message = {
    id: string;
    message: string;
    likes: number;
    user: User
}

export default function Talks() {
    const { user } = useContext(AuthContext)

    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        api.get<Message[]>('/message').then(response => {
            setMessages(response.data)
        })
    }, [])

    if (user) {
        return (
            <>
                <Head>
                    <title>Chat | Talks</title>
                </Head>
                {messages.map(message => {
                    return (
                        <TalkBox
                            key={message.id}
                            message={message.message}
                            likes={message.likes}
                            user={message.user}
                        />
                    )
                })}
            </>
        )
    } else {
        return (
            <>
                <Head>
                    <title>Chat</title>
                </Head>
                <Home />
            </>
        )
    }
}
