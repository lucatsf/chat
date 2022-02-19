import styles from  "./styles.module.scss"
import { FaGoogle } from 'react-icons/fa'
import Image from 'next/image'

export default function LoginBox() {
    return (
        <>
            <div className={styles.loginBoxWrapper}>

                <strong>Faça login para bater um papo.</strong>
                <a href="#" className={styles.signInGoogle}>
                    <FaGoogle size='24' />
                    Entrar com o Google
                </a>
            </div>
        </>
    )
}
