import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import styles from "@/styles/manager.module.css"


// Text entry box for the start date of the report (manager view)
// TODO: Connect to the database once date is entered
export default function DateSelect() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    
    return (
        <div>
                <DatePicker 
                    placeholderText = "Start Date"
                    showTimeSelect
                    dateFormat="yyyy-MM-dd hh:mm:ss"
                    selected = {startDate}
                    selectsStart
                    startDate = {startDate}
                    endDate = {endDate}
                    onChange = {(date) => setStartDate(date)}
                />
                <DatePicker
                    placeholderText = "End Date"
                    showTimeSelect
                    dateFormat="yyyy-MM-dd hh:mm:ss"
                    selected = {endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate = {endDate}
                    minDate = {startDate}
                    onChange = {date => setEndDate(date)}
                />
        </div>
    )
}