import { useEffect, useState } from 'react'
import TalkBox from '../../components/TalkBox'
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
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        api.get<Message[]>('/message').then(response => {
            setMessages(response.data)
        })
    }, [])

    return (
        <>
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
}
