import React, {ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction} from 'react';
import BrSelect from "./brickroom/BrSelect";
import BrInput from "./brickroom/BrInput";

const SelectDate = ({handleHasPointInTime, handleHasBeginning, handleHasEnd}: {
    handleHasPointInTime: Dispatch<SetStateAction<string>>,
    handleHasBeginning: Dispatch<SetStateAction<string>>,
    handleHasEnd: Dispatch<SetStateAction<string>>}) => {
    const [timings, setTimings] = React.useState('pointInTime');
    const firstSelectionArray = [
        {id: 'pointInTime', name: 'Has Point In Time'},
        {id: 'beginning', name: 'Has Beginning'},
        {id: 'end', name: 'Has End'},
        {id: 'beginningAndEnd', name: 'Has Beginning and End'}
    ]
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimings(e.target.value);}
    const handler = (e:any) => {
        if (timings=== 'pointInTime') {
            handleHasPointInTime(e);
        } else if (timings === 'beginning') {
            handleHasBeginning(e);
        } else if (timings === 'end') {
            handleHasEnd(e);
        }
    }
    return (<>
        <div className={`grid gap-2 grid-cols-2`}>
            <BrSelect handleSelect={handleChange} array={firstSelectionArray} label="selectDate"/>
            {!(timings==='beginningAndEnd')&&
            <BrInput type="date" label={firstSelectionArray.filter((f)=>(f.id === timings))[0].name}
                     onChange={(e:ChangeEvent<HTMLSelectElement>)=>handler(e.target.value)}/>}
            {(timings==='beginningAndEnd')&&
                <div className="grid grid-cols-2 gap-2">
                    <BrInput type="date" label="Has Beginning" onChange={(e:ChangeEvent<HTMLSelectElement>)=>handleHasBeginning(e.target.value)}/>
                    <BrInput type="date" label="Has End" onChange={(e:ChangeEvent<HTMLSelectElement>)=>handleHasEnd(e.target.value)}/>
                </div>}
        </div>
    </>)
}
export default SelectDate
