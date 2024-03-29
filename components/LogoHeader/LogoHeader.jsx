import Image from 'next/image';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './LogoHeader.module.scss'

const LogoHeader = ({routine}) => {
    const { today } = useContext(AppContext);

    return <header className={styles['header']}>
        <div className={styles['header__card']}>
            <Image src="/img/logo.svg" width="24" height="24" />
            <h1>{routine}</h1>
            <div>
                <p>Movements - {today}</p>
            </div>
        </div>
    </header>
}

export default LogoHeader;