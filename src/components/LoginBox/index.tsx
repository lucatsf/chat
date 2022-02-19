import styles from  "./styles.module.scss"
import { FaGoogle } from 'react-icons/fa'
import Image from 'next/image'
import { useContext } from "react"
import { AuthContext } from "../../context/auth"

export default function LoginBox() {
    const { signInUrl } = useContext(AuthContext)

    function redirect() {
        window.location.href = signInUrl
    }

    return (
        <>
            <div className={styles.loginBoxWrapper}>

                <strong>Faça login para bater um papo.</strong>
                <button onClick={redirect} className={styles.signInGoogle}>
                    <FaGoogle size='24' />
                    Entrar com o Google
                </button>
            </div>
        </>
    )
}
