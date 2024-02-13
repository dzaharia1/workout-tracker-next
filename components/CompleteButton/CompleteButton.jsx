import {useContext, useState, useRef, useSyncExternalStore} from 'react';
import { AppContext } from '../AppContext';
import styles from './CompleteButton.module.scss';
import IconButton from '../iconButton';
import Button from '../Button';

const CompleteButton = ({ thisRoutine }) => {
    const {apiUrl, today, refreshWorkoutData} = useContext(AppContext);
    const [routineCompleted, setRoutineCompleted] = useState(thisRoutine.last_logged == today);
    const [confirmMode, setConfirmMode] = useState(false);

    function markRoutineCompleted() {
        fetch(`${apiUrl}/routine/markComplete/${thisRoutine.routine_id}`, {
            method: 'POST',
            mode: 'no-cors'
        }).then(data => {
            setRoutineCompleted(true);
            setConfirmMode(false);
            refreshWorkoutData();
        })
    }

    function unMarkRoutineCompleted() {
        fetch(`${apiUrl}/routine/unmarkcomplete/${thisRoutine.routine_id}`, {
            method: 'POST',
            mode: 'no-cors'
        }).then(data => {
            setRoutineCompleted(false);
            refreshWorkoutData();
        });
    }

    return <div className={styles['complete-button']}>
        {routineCompleted ?
            <Button 
                icon="/img/complete.svg" 
                type="complete" 
                label="complete"
                iconSize="40"
                clickHandler={unMarkRoutineCompleted} /> :
            confirmMode ?
                <div className={styles['complete-button__confirm-mode']}>
                    <Button
                        icon="/img/complete--white.svg"
                        type="primary"
                        label="mark complete?"
                        iconSize="40"
                        clickHandler={markRoutineCompleted} />
                    <IconButton
                        icon="/img/close.svg"
                        type="tertiary"
                        iconSize="40"
                        clickHandler={() => setConfirmMode(false)} />
                </div> :
                <IconButton
                    icon="/img/complete--white.svg"
                    type="primary"
                    iconSize="40"
                    clickHandler={() => setConfirmMode(true)}/>
        }
    </div>
}

export default CompleteButton;