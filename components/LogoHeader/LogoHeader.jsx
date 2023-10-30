import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './LogoHeader.module.scss'

const LogoHeader = () => {
    const { today } = useContext(AppContext);
    return <header className={styles['header']}>
        <div className={styles['header__card']}>
            <Image src="/img/logo.svg" width="32px" height="32px" />
            <h1>Movements</h1>
            <div>
                <p>{today}</p>
            </div>
        </div>
    </header>
}

export default LogoHeader;