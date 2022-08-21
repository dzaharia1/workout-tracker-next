import styles from './Card.module.scss'

const Card = ({ url, title, description }) => {
    return <a className={styles.card} href={`https://${ url }`}>
        <h2>{ title }</h2>
        <p>{ description }</p>
    </a>
}

export default Card;