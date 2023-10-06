import React, { useState, useRef, useEffect } from 'react'
import setList from '.';
import MovementCard from '../movementCard';
import styles from './setList.module.scss'

const SetList = ({movements, today, routineId, databaseUrl}) => {
    let superSets = [];
    
    console.log(movements);
    
    console.log('refreshing')
    for (let movement of movements) {
        const superSetId = movement.set_id - 1;
        if (superSets[superSetId] == null) {
            superSets[superSetId] = {
                id: movement.set_id,
                movements: []
            };
        }
        superSets[superSetId].movements.push(movement);
    }
    
    function refreshMovements() {
        
    }

    return <section className={styles["supersets"]}>
        { superSets.map((superSet, i) => {
            return <div className={styles["super-set"]} key={i}>
                <header className={styles["super-set__header"]}>
                    <h2>Superset {superSet.id}</h2>
                    {superSet.movements.map((movement, i) => {
                        return <div className={movement.to_char === today ? styles['super-set__complete-indicator--complete'] : styles['super-set__complete-indicator']} key={i}></div>
                    })}
                </header>
                <ul className={styles["super-set__movement-list"]}>
                    { superSet.movements.map((movement, j) => {
                        return <MovementCard displayName = {movement.movement_name}
                            last_logged={movement.to_char}
                            weight={movement.weight}
                            reps={movement.num_reps}
                            sets={movement.num_sets}
                            slug={movement.movement_slug}
                            key={j}
                            movementId={movement.movement_id}
                            routineId={routineId}
                            today={today}
                            databaseUrl={databaseUrl} />
                    }) }
                </ul>
            </div>
        }) }
    </section>
}

export default SetList;