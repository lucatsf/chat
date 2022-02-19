import { useState, FormEvent } from 'react'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export default function SendMessage() {
    const [message, setMessage] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const token = localStorage.getItem('@chat:token')

        if(token) {
          api.defaults.headers.common.authorization = `Bearer ${token}`;
        }

        if (!message.trim()) {
            return
        }

        if (message.length > 42) {
            alert('Mensagem muito longa! ')
            return
        }

        await api.post('/message', { message })
        setMessage('')
    }

    return (
        <div className={styles.sendMessage}>
            <form onSubmit={handleSubmit} className={styles.sendMessageForm}>
                <div className={styles.sendMessageFormBox}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Type what you are thinking now :)"
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                     />
                    <button className={styles.button}>Send</button>
                </div>
            </form>
        </div>
    )
}
