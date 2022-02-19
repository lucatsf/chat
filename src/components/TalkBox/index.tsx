import styles from './styles.module.scss'
import Image from 'next/image'

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


export default function TalkBox({message, user, likes}) {
    return (
        <>
            <div className={styles.talksListWrapper}>
                <ul className={styles.talksList}>
                    <li className={styles.talk}>
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
