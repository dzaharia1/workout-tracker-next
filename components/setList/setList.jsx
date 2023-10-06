import React, { useState, useRef, useEffect } from 'react'
import setList from '.';
import MovementCard from '../movementCard';
import styles from './setList.module.scss'

const SetList = ({superSets, today, routineId, apiUrl, refreshWorkoutData}) => {

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
                            instruction={movement.instruction}
                            key={j}
                            movementId={movement.movement_id}
                            routineId={routineId}
                            today={today}
                            apiUrl={apiUrl}
                            refreshWorkoutData = {refreshWorkoutData} />
                    }) }
                </ul>
            </div>
        }) }
    </section>
}

export default SetList;