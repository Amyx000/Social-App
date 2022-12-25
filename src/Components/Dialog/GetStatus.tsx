import React, { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';
import { findConnection } from "../../Utils/dfsMethod"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Iprops {
    dialog1: boolean
    Setdialog1: React.Dispatch<React.SetStateAction<boolean>>
    data: string[]
}
function GetStatus({ dialog1, Setdialog1, data }: Iprops) {
    const [selected, Setselected] = useState({
        person1: "",
        person2: ""
    })
    const [connections, Setconnection] = useState([
        {
            "name": "",
            "friends": []
        }
    ])
    const [degree, Setdegree] = useState<string[][]>([])
    const [showresult,Setshowresult]=useState(false)

    useEffect(() => {
        let item: any = localStorage.getItem("connections") || null
        const array = JSON.parse(item) || []
        Setconnection(array)
    }, [])

    const handleClick = () => {
        const resutl = findConnection(selected.person1, selected.person2, connections)
        Setdegree(resutl)
        Setshowresult(true)
    }

    const handleCancel = () => {
        Setdialog1(false)
        Setselected({
            person1: "",
            person2: ""
        })
        Setshowresult(false)
    }


    return (
        <div>
            <Dialog sx={{ "textAlign": "center" }} fullWidth open={dialog1} onClose={handleCancel}>
                {!showresult?<>
                    <DialogTitle>Get Degree of Separation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Select two people
                        </DialogContentText>

                        <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                            <FormControl sx={{ m: 1, width: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Person 1</InputLabel>
                                <Select
                                    sx={{ "color": "black" }}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={selected.person1}
                                    label="Person 1"
                                    onChange={(e) => Setselected(prev => ({ ...prev, person1: e.target.value }))}
                                >
                                    {data.filter((val) => val !== selected.person2).map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                            <div>And</div>
                            <FormControl sx={{ m: 1, width: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Person 2</InputLabel>
                                <Select
                                    sx={{ "color": "black" }}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={selected.person2}
                                    label="Person 2"
                                    onChange={(e) => Setselected(prev => ({ ...prev, person2: e.target.value }))}
                                >
                                    {data.filter((val) => val !== selected.person1).map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <Button disabled={(selected.person1 === "" || selected.person2 === "")} style={{ "marginTop": "10px" }} onClick={handleClick} variant={"contained"}>Show</Button>
                    </DialogContent>
                </>:
                <>
                    <DialogTitle>Result</DialogTitle>
                    {degree.length?<DialogContent>
                        <div style={{ "display": "flex", "gap":"10px","justifyContent":"center"}}>
                            {degree[0]?.map((value, index) => {
                                return (
                                    <div style={{ "display": "flex" }}>
                                        <div>{value}</div>
                                        {(degree[0].length-1!==index)&&<div><ArrowForwardIcon /></div>}
                                    </div>
                                )
                            })}
                        </div>
                        {degree.length>1&&<div style={{ "display": "flex", "gap":"10px","justifyContent":"center","marginTop":"10px" }}>
                            {degree[1]?.map((value, index) => {
                                return (
                                    <div style={{ "display": "flex" }}>
                                        <div>{value}</div>
                                        {(degree[1].length-1!==index)&&<div><ArrowForwardIcon /></div>}
                                    </div>
                                )
                            })}
                        </div>}
                    </DialogContent>:
                    <DialogContent>No Separation Found !</DialogContent>}
                </>}
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default GetStatus