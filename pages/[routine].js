import React, {useState, useEffect} from 'react';
import { Router, useRouter } from 'next/router';
import { AppContext } from '../components/AppContext';
import Head from 'next/head';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import SetList from '../components/SetList';
import LogoHeader from '../components/LogoHeader';
import CompleteButton from '../components/CompleteButton';

export default function Home({ movements, routineData, thisRoutine, nextRoutine, today, apiUrl }) {
  const router = useRouter();
  const [superSets, setSuperSets] = useState([]);
  const [routineDataLocal, setRoutineDataLocal] = useState(routineData);
  const [thisRoutineLocal, setThisRoutineLocal] = useState(thisRoutine);
  const [nextRoutineLocal, setNextRoutineLocal] = useState(nextRoutine);

  let routineId = thisRoutineLocal['routine_id'];

  const formatWorkoutData = (data) => {
    let updatedSuperSets = [];
    let rawData = data || movements;

    for (let movement of rawData) {
      const superSetId = movement.set_id - 1;
      if (updatedSuperSets[superSetId] == null) {
        updatedSuperSets[superSetId] = {
          id: movement.set_id,
          movements: []
        };
      }
      updatedSuperSets[superSetId].movements.push(movement);
    }

    setSuperSets(updatedSuperSets);
  }

  const refreshWorkoutData = () => {
    const url = `${apiUrl}/routine/${thisRoutine.routine_id}`;
    fetch(url, {accept: "application/json"})
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setRoutineDataLocal(data.routines);
        formatWorkoutData(data.movements);
        setThisRoutineLocal(data.thisRoutine);
        setNextRoutineLocal(data.nextRoutine);
      })
  }
  
  useEffect(() => {
    formatWorkoutData()
  }, [movements]);

  return (
    <AppContext.Provider value={{apiUrl, today, routineId, refreshWorkoutData}}>
      <main>
        <Head>
          <title>Movements</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icon 70.png" />
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="white"/>
          <meta name="theme-color" content="#eeeeee"/>
        </Head>
        <CompleteButton thisRoutine={thisRoutineLocal} />
        <LogoHeader routine={thisRoutine.routine_name} />
        <SetList superSets={superSets} />
        <Navigation thisRoutine={thisRoutineLocal}
          nextRoutine={nextRoutineLocal}
          routines={routineDataLocal}
          superSets={superSets} />
      </main>
    </AppContext.Provider>
  )
}

export async function getServerSideProps({params}) {
  const apiUrl = process.env.API_URL || `http://localhost:3333`;
  const routineId = params.routine
  let routineData,
      movements,
      thisRoutine,
      nextRoutine,
      today;

  await fetch (`${apiUrl}/routine/${routineId}`, { accept: "application/json" })
  .then (data => data.json())
  .then (data => {
    routineData = data.routines;
    movements = data.movements;
    thisRoutine = data.thisRoutine;
    nextRoutine = data.nextRoutine;
    today = data.todaysDate;
  })

  return { props: { movements, routineData, thisRoutine, nextRoutine, today, apiUrl } }
}

export async function getServerSidePaths() {
    const apiUrl = process.env.API_URL || `http://localhost:3333`;
    const routines = await fetch(`${apiUrl}/routines`).then(data => data.json());
    const paths = routines.map(item => {
        return {
            params: {
                routine: item.routine_id
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}