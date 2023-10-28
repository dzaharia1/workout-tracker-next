import styles from './MovementAttributes.module.scss';
import Badge from '../Badge';

const MovementAttributes = ({last_logged, weight, sets, reps, instruction, divider}) => {
    return <div className={styles['movement-attributes']}>
        {instruction ? 
            <Badge type="instruction" icon="/img/instruction.svg"/>
            :
            <div className={styles[`movement-attributes__last-logged`]}>
                <p>{last_logged}</p>
                <span>last set</span>
            </div>
        }
        <div className={styles['movement-attributes__right-region']}>
            <div className={styles['movement-attributes__attribute']}>
                <p>{weight}</p>
                <span>lbs</span>
            </div>
            <div className={styles['movement-attributes__attribute']}>
                <p>{sets}</p>
                <span>sets</span>
            </div>
            <div className={styles['movement-attributes__attribute']}>
                <p>{reps}</p>
                <span>reps</span>
            </div>
        </div>
    </div>
}

export default MovementAttributes;