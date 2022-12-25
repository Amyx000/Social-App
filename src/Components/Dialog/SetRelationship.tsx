import React, { useState,useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, InputLabel, TextField } from '@mui/material';

interface Iprops {
  dialog2: {
    dialog: boolean,
    name: string

  }
  data: string[]
  Setdialog2: React.Dispatch<React.SetStateAction<{ dialog: boolean, name: string }>>
}

function SetRelationShip({ dialog2, Setdialog2, data }: Iprops) {

  const [friend1, Setfriend1] = useState<string[]>([""])
  const [friend2, Setfriend2] = useState<string[]>([""])
  const [connections, Setconnection] = useState([
    {
      "name": "",
      "friends": []
    }
  ])


  useEffect(()=>{
    let item: any = localStorage.getItem("connections") || null
    const array:any[] = JSON.parse(item) || []
    Setconnection(array)
    console.log()
    const friends =array.filter((val)=>val.name===dialog2.name)[0]?.friends||[]
    if(friends.length){
      Setfriend1([friends[0]])
      friends.length>1&&Setfriend2([friends[1]])
    }else{
      Setfriend1([""])
      Setfriend2([""])
    }
    
  },[dialog2])

  const handleCancel = () => {
    Setdialog2(prev => ({ ...prev, dialog: false }))

  }
  const handleSubmit = () => {
    let friends: string[] = []
    let newConnections: any[] = connections[0]?.name?connections:[]
    if (friend2[0]) {
      friends = friend1.concat(friend2)
    } else { friends = friend1 }

    let check = false
    newConnections.forEach((val) => {
      if (val.name === dialog2.name) {
        check = true
      }
    })

    if (check) {
      newConnections.map((val) => {
        if (val.name === dialog2.name) {
          val.friends = friends
        }
      })
    } else {
      newConnections.push({ name: dialog2.name, friends })
    }

    Setconnection(newConnections)

    localStorage.setItem("connections", JSON.stringify(newConnections))
    Setfriend1([""])
    Setfriend2([""])
    Setdialog2(prev => ({ ...prev, dialog: false }))

  }

  
  return (
    <div>
      <Dialog sx={{ "textAlign": "center" }} fullWidth open={dialog2.dialog} onClose={handleCancel}>
        <DialogTitle>Set the Relationship</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the friend
          </DialogContentText>

          <div className='relationdialog' style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "20px","marginTop":"10px" }}>
            <TextField
              type={"text"}
              value={dialog2.name}
              disabled
              style={{ "minWidth": "100px" }}
              inputProps={{style: { textAlign: 'center'}}}
              variant="outlined" />
            <div>Friend of</div>
            <FormControl sx={{ m: 1, width: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Friend 1</InputLabel>
              <Select
                sx={{ "color": "black" }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={friend1[0]}
                label="Friend"
                onChange={e => Setfriend1([e.target.value])}
              >
                {data.filter((val) => val !== dialog2.name&&val!==friend2[0]).map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Friend 2</InputLabel>
              <Select
                sx={{ "color": "black" }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={friend2[0]}
                label="Friend 2"
                onChange={e => Setfriend2([e.target.value])}
              >
                {data.filter((val) => val !== dialog2.name&&val!==friend1[0]).map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SetRelationShip