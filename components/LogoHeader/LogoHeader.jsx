import Image from 'next/image';
import styles from './LogoHeader.module.scss'

const LogoHeader = ({today}) => {
    return <header className={styles['header']}>
        <div className={styles['header__card']}>
            <Image src="/img/logo.svg" width="40px" height="40px" />
            <h1>Movements</h1>
            <div>
                <p>{today}</p>
            </div>
        </div>
    </header>
}

export default LogoHeader;