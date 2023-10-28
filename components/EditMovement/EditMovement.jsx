import React, {useState, useEffect, useRef, useContext} from 'react';
import { AppContext } from '../AppContext';
import styles from './EditMovement.module.scss';
import Button from '../Button'
import Overlay from '../Overlay'

const EditMovement = ({movementId, movementName, setId, superSets, hideOverlay}) => {
    const { apiUrl, routineId, refreshWorkoutData } = useContext(AppContext);
    const maxSetId = superSets[superSets.length - 1].id;
    let [movementDeleteConfirm, setMovementDeleteConfirm] = useState(0);
    let nameField = useRef(movementName);
    let superSetField = useRef(setId);

    function saveEditForm() {
        const url = `${apiUrl}/movement/edit/${movementId}/${nameField.current.value}/${superSetField.current.value}`;

        fetch(url, {
            method: 'PUT'
        }).then(() => {
            refreshWorkoutData();
            hideOverlay();
        });
    }

    function deleteMovement() {
        setMovementDeleteConfirm(movementDeleteConfirm + 1);
        const url = `${apiUrl}/movement/delete/${movementId}/${routineId}`;

        if (movementDeleteConfirm == 1) {
            fetch(url, {
                method: 'DELETE'
            }).then(() => {
                refreshWorkoutData();
                hideOverlay();
            })
        }
    }

    return <form action="" className={styles['edit-movement']}>
            <label htmlFor="">
                <p>Movement name</p>
                <input
                    type="text"
                    id={`superset-name-${movementId}`}
                    defaultValue={movementName}
                    ref={nameField} />
            </label>
            <label htmlFor="">
                <p>Superset</p>
                <select
                    name="superset"
                    id={`superset-dropdown-${movementId}`}
                    defaultValue={setId}
                    ref={superSetField}>
                    {superSets.map((superSet, i) => <option value={superSet.id} key={i}>Super set {superSet.id}</option>)}
                    <option value={maxSetId + 1}>New super set</option>
                </select>
            </label>
            <div className={styles["movement-journal__form-buttons"]}>
                <Button label={movementDeleteConfirm == 1 ? `confirm delete?` : `delete`} 
                    id={`${movementId}__edit-save-form`} 
                    additionalClass={styles[`edit-movement__delete-confirmation-stage-${movementDeleteConfirm}`]}  
                    clickHandler={deleteMovement}
                    type="tertiary" />
                <Button label="save" 
                    id={`${movementId}__edit-save-form`} 
                    clickHandler={saveEditForm}
                    type="primary"
                    icon="/img/add--white.svg" />
            </div>
        </form>
}

export default EditMovement