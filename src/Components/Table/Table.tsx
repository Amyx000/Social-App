import { Button } from '@mui/material'
import { blue } from "@mui/material/colors"
import React, { useState } from 'react'
import SetRelationShip from '../Dialog/SetRelationship'
import "./Table.css"

interface Iprops {
    data: string[]
}

function Table({ data }: Iprops) {

    const [dialog2, Setdialog2] = useState({
        dialog:false,
        name:""
    })

    return (
        <div>
            <>
                {data.length !== 0 && <table>
                    <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Set Relationship</th>
                    </tr>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                
                                <td>{item}</td>
                                <td><Button onClick={() => Setdialog2({dialog:true,name:item})} sx={{ "backgroundColor": blue[400] }} variant="contained">Update</Button></td>
                            </tr>
                        )
                    })}
                </table>}
            </>
            <SetRelationShip data={data} dialog2={dialog2} Setdialog2={Setdialog2}/>
        </div>
    )
}

export default Table