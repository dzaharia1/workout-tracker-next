import ReactCalendar from 'react-calendar';
import Image from 'next/image';
import styles from './Calendar.module.scss'

const Calendar = ({routineJournal}) => {
    const renderJournalDates = ({ date }) => {
        const thisTileDate = `${date.getMonth() + 1} ${date.getDate()}, ${date.getFullYear()}`;

        let routinesList = ``;

        for (let journalItem of routineJournal) {
            if (thisTileDate === journalItem.pretty_date) {
                routinesList === '' ? 
                    routinesList = `${journalItem.routine_name.substring(4)}` :
                    routinesList += `, ${journalItem.routine_name.substring(4)}`
            }
        }

        if (routinesList.length != '') {
            return <div className={styles['Calendar__routine-log']}>
                <p>{date.getDate()}</p>
                <p>{routinesList}</p>
            </div>
        }
    }

    return <ReactCalendar
                prevLabel={<Image width="18px" height="18px" src="/img/back.svg" />}
                nextLabel={<Image width="18px" height="18px" src="/img/next.svg" />}
                next2Label={null}
                prev2Label={null}
                maxDate={new Date()}
                tileContent={renderJournalDates}
                tileDisabled={() => {return true}}
                maxDetail="month" />
}

export default Calendar;