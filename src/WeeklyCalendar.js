import { useState } from 'react';
import styled from 'styled-components';
import { range, addDateBy, areDatesSame, getMonday } from './utils';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOUR_HEIGHT = 30;
const HOUR_MARGIN_TOP = 15;

//video on 16:50 - https://www.youtube.com/watch?v=H3WTUAjegY4&t=119s

export const WeeklyCalendar = () => {
    const [mondayDate, setMondayDate] = useState(getMonday());
    const [tasks, setTasks] = useState([
        { date: new Date(2024, 6, 16, 10), text: "first hi", howLong: 3},
        { date: new Date(2024, 6, 17, 11), text: "second", howLong: 2} ,
        { date: new Date(2024, 7, 10, 16), text: "birthday", howLong: 8}
    ])

    const hourNow= new Date().getHours();
    const minutesNow = new Date().getMinutes();
    
    const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7));
    const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7));

    return (<>
    <FlexBox>
        <p>Today: {new Date().toDateString()}</p>
        <p>From: {mondayDate.toDateString()}</p>
        <p>To: {addDateBy(mondayDate, 6).toDateString()}</p>
        <button onClick={prevWeek}><ion-icon name="arrow-back-outline"></ion-icon></button>
        <button onClick={nextWeek}><ion-icon name="arrow-forward-outline"></ion-icon></button>
    </FlexBox>
    <Wrapper>
        <HGrid first={'30px'} cols={1}>
            <VGrid rows={24}>
                {range(25).map((hour) => (
                    <Hour>{hour}</Hour>
                ))}
            </VGrid>
            <HGrid cols={7}>
                {
                    DAYS.map((day, index) => (
                        <DayWrapper isToday={
                            areDatesSame(new Date(), addDateBy(mondayDate, index))}>
                            <p>{day}</p>
                            {tasks.map((task) => 
                                (areDatesSame( addDateBy(mondayDate, index), task.date) && 
                                (<Event
                                howLong={task.howLong}
                                fromTop={
                                    task.date.getHours() * HOUR_HEIGHT + 
                                    HOUR_MARGIN_TOP + 
                                    HOUR_HEIGHT / 2 + 
                                    task.date.getMinutes() / 2}
                                >Hi</Event>))
                            )}
                        </DayWrapper>
                ))
                }
            </HGrid>
        </HGrid>
        <HourLine fromTop={
            hourNow * HOUR_HEIGHT + 
            HOUR_MARGIN_TOP + 
            HOUR_HEIGHT / 2 + 
            minutesNow / 2
        }/>
    </Wrapper></>)
}

const Wrapper = styled.div`
width: calc(100% - 30px);
border: 1px solid;
margin: 15px;
`;

const HGrid = styled.div`
display: grid;
grid-template-columns: ${({ first }) => first || ""} repeat(${({ cols }) => cols}, 1fr);
position: relative;

`;

const VGrid = styled.div`
display: grid;
grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
`;

const DayWrapper = styled.span`
border: 1px solid red;
display: relative;
background: ${({isToday}) => isToday ? '#F2CEE6' : ''}

`

const Hour = styled.span`
    height: ${HOUR_HEIGHT}px;
    display: flex;
    align-items: center;

    &:first-child {
        margin-top: ${HOUR_MARGIN_TOP}px;
    }
`

const HourLine = styled.div`
position: absolute;
width: 100%;
top: ${({fromTop}) => fromTop}px;
border: 1px solid orange;
`

const FlexBox = styled.div`
display: flex;
justify-content: space-around;
front-size: 1.2rem;
margin-top: 20px;

button {
font-size: 1.2rem;
display: flex;
align-items: center;
}

`

const Event = styled.div`
position: relative;
top: ${({fromTop}) => fromTop}px;
background: green;
height: ${({howLong}) => howLong * HOUR_HEIGHT}px;
color: white;
// width: calc(100% - 10px);
margin: 0 5px;
padding: 5px;
border-radius: 6px;
`