import React, { useState, useEffect } from "react";
import "./Home.css";
import Button from "@mui/material/Button"
import { blue } from "@mui/material/colors";
import Table from "../Table/Table";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GetStatus from "../Dialog/GetStatus";


function Home() {
  const [open, setOpen] = React.useState(false);
  const [text, Settext] = useState("")
  const [data, setData] = useState<string[]>([
  ])
  const[dialog1,Setdialog1]=useState(false)

  const handleClick = () => {
    let item: any
    let array = []
    item = localStorage.getItem("people")
    if (item) {
      array = JSON.parse(item)
      array.push(text)
    } else {
      array.push(text)
    }
    setData(array)
    localStorage.setItem("people", JSON.stringify(array))
    Settext("")
    setOpen(false)
  }

  useEffect(() => {
    let item: any = localStorage.getItem("people") || null
    const array = JSON.parse(item) || []
    setData(array)
  }, [])

  return (
    <div className="main">
      <div style={{ "textAlign": "center", "fontWeight": "bold", "fontSize": "35px", "color": "#42a5f5" }}>Social App</div>
      <div style={{"display":"flex","flexDirection":"column","gap":"20px"}}>
        <Button onClick={() => setOpen(true)} sx={{ "padding": "10px 30px", "fontSize": "16px", "color": blue[400] }} variant="outlined">Add People</Button>
        <Button onClick={() => Setdialog1(true)} sx={{ "padding": "10px 20px", "fontSize": "16px", "color": blue[400] }} variant="outlined">Find Degree of Separation</Button>
      </div>
      <Table data={data} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Person</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Person to your Social Group
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name of the Person"
            type={"text"}
            fullWidth
            variant="outlined"
            value={text}
            onChange={e => Settext(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleClick}>Add</Button>
        </DialogActions>
      </Dialog>
      <GetStatus data={data} dialog1={dialog1} Setdialog1={Setdialog1}/>
    </div>
  )
}

export default Home;