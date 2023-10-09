import React, {useState, useEffect} from 'react';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Navigation from '../../components/Navigation';
import SetList from '../../components/setList';

export default function Home({ workoutData, routineData, thisRoutine, nextRoutine, today, apiUrl }) {
  const router = useRouter();
  let [superSets, setSuperSets] = useState([])

  const formatWorkoutData = (data) => {
    let updatedSuperSets = [];
    let rawData = data || workoutData;

    for (let movement of rawData) {
      const superSetId = movement.set_id - 1;
      if (updatedSuperSets[superSetId] == null) {
        console.log(`Found superSet ${movement.set_id}`)
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
        superSets = formatWorkoutData(data.movements);
      })
  }
  
  useEffect(() => {
    formatWorkoutData()
  }, [workoutData]);

  return (
    <div>
      <Head>
        <title>Workout Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navigation thisRoutine={thisRoutine}
          nextRoutine={nextRoutine}
          routines={routineData}
          apiUrl={apiUrl}
          today={today} />
        <SetList superSets={superSets} 
                 today={today}
                 routineId={ thisRoutine['routine_id'] }
                 apiUrl={apiUrl}
                 refreshWorkoutData = {refreshWorkoutData} />
      </main>
    </div>
  )
}

export async function getServerSideProps({params}) {
  const apiUrl = process.env.API_URL || `http://localhost:3333`;
  const routineId = params.routine
  let routineData,
      workoutData,
      thisRoutine,
      nextRoutine,
      today;

  await fetch (`${apiUrl}/routine/${routineId}`, { accept: "application/json" })
  .then (data => data.json())
  .then (data => {
    routineData = data.routines;
    workoutData = data.movements;
    thisRoutine = data.thisRoutine;
    nextRoutine = data.nextRoutine;
    today = data.todaysDate;
  })

  return { props: { workoutData, routineData, thisRoutine, nextRoutine, today, apiUrl } }
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
//   const apiUrl = process.env.API_URL;
//   const signIds = await fetch(`${apiUrl}/signids`).then(data => data.json());
//   const paths = signIds.map((item) => {
//     return {
//       params: {
//         sign: item.sign_id
//       }
//     }
//   })
  return {
    paths,
    fallback: false
  }
}