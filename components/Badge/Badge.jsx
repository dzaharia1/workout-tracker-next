import Image from 'next/image';
import styles from './badge.module.scss'

const Badge = ({type, icon}) => {
    return <div className={styles[`badge--${type}`]}>
        <div>
            {type === "instruction" && <Image src="/img/instruction.svg" width="16px" height="16px" />}
            {type === "complete" && <Image src="/img/complete--white.svg" width="16px" height="16px" />}
            <p>{type}</p>
        </div>
    </div>
}

export default Badge;