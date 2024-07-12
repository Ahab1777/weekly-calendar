import { useState } from 'react';
import styled from 'styled-components';
import { range, addDateBy, areDatesSame, getMonday } from './utils';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOUR_HEIGHT = 30;
const HOUR_MARGIN_TOP = 15;

//video on 16:50 - https://www.youtube.com/watch?v=H3WTUAjegY4&t=119s

export const WeeklyCalendar = () => {
    const [mondayDate, setMondayDate] = useState(getMonday());

    const hourNow= new Date().getHours();
    const minutesNow = new Date().getMinutes();
    

    return (<>
    
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
                        </DayWrapper>
                ))
                }
            </HGrid>
        </HGrid>
        <HourLine fromTop={
            hourNow * HOUR_HEIGHT + HOUR_MARGIN_TOP + HOUR_HEIGHT / 2 + minutesNow / 2
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