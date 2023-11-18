import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './LogoHeader.module.scss'

const LogoHeader = ({routine}) => {
    const { today } = useContext(AppContext);

    return <header className={styles['header']}>
        <div className={styles['header__card']}>
            <Image src="/img/logo.svg" width="24px" height="24px" />
            <h1>{routine}</h1>
            <div>
                <p>{today}</p>
            </div>
        </div>
    </header>
}

export default LogoHeader;