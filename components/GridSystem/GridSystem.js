import React, { Children } from 'react';
import {Row, Col} from 'react-bootstrap'

/** 
 * Creating the dynamic grid for the buttons within the server and customer views
 * @author Brandon Longuet
 * @param colCount Max columns to have in the grid
 * @param children Array of the objects that will be created
 * @param md The size of the grid on the screen
 */
const GridSystem = ({ colCount, children, md }) => {
    let childArray = Children.toArray(children)
    let rowCount = Math.ceil(childArray.length / colCount)

    //Index is needed to keep track of the current element that we are one.
    let index = 0

    //This is the driver function for building the grid system.
    const buildGrid = () => {
        return (
            renderRows()
        )
    }

    //Returns For example, we can have a row with 2 columns inside it.
    const renderRows = () => {
        let rows = []
        
        for(let row = 0; row < rowCount; row++) {
            rows.push(
                <Row key={row}>
                    {
                        renderCols()
                    }
                </Row>
            )
        }
        
        return rows
    }

    //Returns an array of columns with the children inside.
    const renderCols = () => {
        let cols = []
        
        //If you want to add more bootstrap breakpoints you can pass them as props here.
        for(let col = 0; col < colCount; col++) {
            if(index < childArray.length) {
                cols.push(
                    <Col md={md} key={col}>
                        {childArray[index]}
                    </Col>
                )
                index++
            }
        }
        
        return cols
    }

    return (
        <>
            {
                buildGrid()
            }
        </>
    );
};

export default GridSystem;