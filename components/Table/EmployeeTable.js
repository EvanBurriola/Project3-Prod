import React from 'react';

// TODO: import data from database (Connect to the database)

/**
 * Creating a table for the employees in the manager view
 *  
 * @author Jenna Jung
 */
const EmployeeTable = () => {

    return (
        <div>
            <h1> Employees </h1>
            <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                <thead style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <th> Employee ID </th>
                        <th> Name </th>
                        <th> Role </th>
                        <th> Active (T/F) </th>
                    </tr>
                </thead>
                <tbody style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <td> 1 </td>
                        <td> Person 1 </td>
                        <td> Manager </td>
                        <td> T </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Person 2 </td>
                        <td> Server </td>
                        <td> T </td>
                    </tr>
                    <tr>
                        <td> 3 </td>
                        <td> Person 3 </td>
                        <td> Server </td>
                        <td> F </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default EmployeeTable;