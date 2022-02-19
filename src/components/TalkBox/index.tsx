import styles from './styles.module.scss'
import Image from 'next/image'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'

type User = {
    name: string
    picture_url: string
}

export default function TalkBox({message, user, likes}) {
    const { user: userLogged } = useContext(AuthContext)

    return (
        <>
            <div className={styles.talksListWrapper}>
                <ul className={styles.talksList}>
                    <li className={userLogged.name == user.name ? styles.talk : styles.talkMe}>
                        <div className={styles.talkInfoUser}>
                            <div className={styles.userImage}>
                                <Image src={user.picture_url} alt={user.name} width={60} height={60} />
                            </div>
                        </div>
                        <div className={styles.talkContent}>
                            <p>
                                {user.name}
                            </p>
                            <p className={styles.prevText}>
                                {message}
                            </p>
                        </div>

                    </li>
                </ul>
            </div>
        </>
    )
}
