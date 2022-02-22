import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Home from '..'
import SendMessage from '../../components/SendMessage'
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
    user: User;
    user_id: string;
}

const socket = io('http://ec2-3-19-76-255.us-east-2.compute.amazonaws.com')

const messagesQueue: Message[] = []

socket.on('new_message_chat', (newMessage: Message) => {
    messagesQueue.push(newMessage)
})

export default function Talks() {
    const { user } = useContext(AuthContext)

    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages(prevState => [
                    messagesQueue[0],
                    ...prevState,
                ].filter(Boolean))
                messagesQueue.shift()
            }
        }, 1000)
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('@chat:token')

        if(token) {
          api.defaults.headers.common.authorization = `Bearer ${token}`;
        }

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
                <SendMessage />
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
