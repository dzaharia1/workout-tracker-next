import React, {useState, useEffect} from 'react';
import styles from './EditMovement.module.scss';
import Button from '../Button'

const EditMovement = ({movementId, movementName, setId, superSets, apiUrl}) => {

    function saveEditForm() {

    }

    function cancelEditForm() {}

    return <form action="" className={styles['edit-movement']}>
        <label htmlFor="">
            Movement name
            <input type="text" value={movementName}/>
        </label>
        <label htmlFor="">
            Superset
            <select name="superset" id={`${movementId}__superset-dropdown`}>
                {superSets.map((superSet, i) => {
                    return <option value={superSet.id} default={setId == superSet.id ? 'true' : 'false'} >{superSet.id}</option>
                })}
            </select>
        </label>
        <div className={styles["movement-journal__form-buttons"]}>
            <Button label="Save" id={`${movementId}__edit-save-form`} clickHandler={saveEditForm}></Button>
            <Button label="Cancel" id={`${movementId}__edit-save-form`} clickHandler={cancelEditForm}></Button>
        </div>
    </form>
}

export default EditMovement