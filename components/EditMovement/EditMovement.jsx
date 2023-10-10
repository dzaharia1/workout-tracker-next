import React, {useState, useEffect} from 'react';
import styles from './EditMovement.module.scss';
import Button from '../Button'
import Overlay from '../Overlay'

const EditMovement = ({movementId, movementName, setId, routineId, superSets, apiUrl, refreshWorkoutData, hideOverlay}) => {
    const maxSetId = superSets[superSets.length - 1].id;
    let [movementDeleteConfirm, setMovementDeleteConfirm] = useState(0);

    function saveEditForm() {
        const nameField = document.querySelector(`#superset-name-${movementId}`);
        const superSetField = document.querySelector(`#superset-dropdown-${movementId}`);
        const url = `${apiUrl}/movement/edit/${movementId}/${nameField.value}/${superSetField.value}`;

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
                <input type="text" defaultValue={movementName} id={`superset-name-${movementId}`}/>
            </label>
            <label htmlFor="">
                <p>Superset</p>
                <select name="superset" id={`superset-dropdown-${movementId}`} defaultValue={setId}>
                    {superSets.map((superSet, i) => <option value={superSet.id} key={i}>Super set {superSet.id}</option>)}
                    <option value={maxSetId + 1}>New super set</option>
                </select>
            </label>
            <div className={styles["movement-journal__form-buttons"]}>
                <Button label={movementDeleteConfirm == 1 ? `Confirm delete?` : `Delete`} 
                    id={`${movementId}__edit-save-form`} 
                    additionalClass={styles[`edit-movement__delete-confirmation-stage-${movementDeleteConfirm}`]}  
                    clickHandler={deleteMovement} />
                <Button label="Save" 
                    id={`${movementId}__edit-save-form`} 
                    clickHandler={saveEditForm} />
            </div>
        </form>
}

export default EditMovement