import Image from 'next/image';
import styles from './badge.module.scss'

const Badge = ({type, icon}) => {
    const labels = {
        "on-deck": "on deck",
        "instruction": "instruction",
        "complete": "complete",
        "skipped": "skipped"
    }
    return <div className={styles[`badge--${type}`]}>
        <div>
            {type === "instruction" && <Image src="/img/instruction.svg" width="16px" height="16px" />}
            {type === "complete" && <Image src="/img/complete--white.svg" width="16px" height="16px" />}
            <p className={styles['badge__label']}>{labels[type]}</p>
        </div>
    </div>
}

export default Badge;