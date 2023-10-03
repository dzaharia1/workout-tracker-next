import React, { useState, useRef, useEffect } from 'react'
import setList from '.';
import MovementCard from '../movementCard';
import styles from './setList.module.scss'

const SetList = ({movements}) => {
    let superSets = [];
    
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

    return <section className={styles["supersets"]}>
        { superSets.map((superSet, i) => {
            return <div className={styles["super-set"]} key={i}>
                <header className={styles["super-set__header"]}>
                    <h2>Superset {superSet.id}</h2>
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
                            movementId={movement.movement_id} />
                    }) }
                </ul>
            </div>
        }) }
    </section>
}

export default SetList;