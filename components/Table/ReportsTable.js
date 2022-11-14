import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

import styles from "@/styles/manager.module.css"
import RestockItem from '@/components/Items/RestockItem.js';
import RestockTable from '@/components/Table/RestockTable';
import "react-datepicker/dist/react-datepicker.css";

// TODO: import data from database (Connect to the database)

const ReportsTable = ({inventory}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reportType, setReportType] = useState("");


    const generateReport = async (event) => {
        event.preventDefault()
        startDate = startDate.getUTCFullYear() + '-' +
        ('00' + (startDate.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + startDate.getUTCDate()).slice(-2) + ' ' + 
        ('00' + startDate.getUTCHours()).slice(-2) + ':' + 
        ('00' + startDate.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + startDate.getUTCSeconds()).slice(-2);
        endDate = endDate.getUTCFullYear() + '-' +
        ('00' + (endDate.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + endDate.getUTCDate()).slice(-2) + ' ' + 
        ('00' + endDate.getUTCHours()).slice(-2) + ':' + 
        ('00' + endDate.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + endDate.getUTCSeconds()).slice(-2);
        console.log(reportType, startDate, endDate)
        if(reportType == "restock"){
            var button = document.createElement('input');

            // SET INPUT ATTRIBUTE 'type' AND 'value'.
            button.setAttribute('type', 'button');
            button.setAttribute('value', 'Read Table Data');

            // ADD THE BUTTON's 'onclick' EVENT.
            button.setAttribute('onclick', 'GetTableValues()');

            // FINALLY ADD THE NEWLY CREATED TABLE AND BUTTON TO THE BODY.
            document.body.appendChild(button);
        }
        else if(reportType == "sales"){

        }
        else if(reportType == "excess"){

        }
        else if(reportType == "together"){

        }
    }

    function createRestock() {
        return (
            <table className = {styles.tableStyle} id ="excelDataTable">
                <thead>
                    <tr>
                        <th> Inventory ID </th>
                        <th> Item Name </th>
                        <th> Quantity </th>
                        <th> Price ($) </th>
                        <th> Amount Used Per Sale </th>
                        <th> Minimum Quantity Needed </th>
                        <th> Item Type </th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map(item => {
                        return <RestockItem key={item.inventoryid} item={item} />
                    })
                    }
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <form onSubmit={generateReport}>
                <Row>
                    <Col> 
                        <DatePicker 
                            required = "required"
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
                            required = "required"
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
                    </Col>
                </Row>
                <Row> 
                    <Col> 
                        <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="restock"> Restock </button>
                        <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="sales"> Sales </button>
                        <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="excess"> Excess </button> 
                        <button onClick={(event) => setReportType(event.target.id)} type = "submit" id="together"> What Sales Together </button> 
                        <p> {"\n"} </p>
                    </Col>
                </Row>
            </form>
            <RestockTable inventory={inventory}/>
            <h3> Monthly Sales </h3>
            <table className={styles.table}>
                <thead style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <th> Inventory ID </th>
                        <th> Item Name </th>
                        <th> Quantity </th>
                        <th> Price ($) </th>
                    </tr>
                </thead>
                <tbody style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <td> 1 </td>
                        <td> Dough </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Cheese </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 3 </td>
                        <td> Olives </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 4 </td>
                        <td> Pepperoni </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 5 </td>
                        <td> Salami </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ReportsTable;