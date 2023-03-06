
import Navbar from './Navbar2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { color } from '@mui/system';
import { Link, Navigate, useNavigate } from "react-router-dom";

const ManageUsers = () => {





  const [listOfUsers, setListOfUsers] = useState([]);
  const [page, setpage] = useState(0);
  const [Search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [img, setimg] = useState([]);
  const [check, setcheck] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3006/Get_Users`).then((response) => {
      console.log("THis is Response Data : ", response.data)
  setcheck(1)
      var temp = response.data;
      console.log(response.data);
      setListOfUsers(temp);
      console.log("After parse : ", temp)
    });
  }, []);


  const searching = (e) => {
    var S_User = e.target.value;
    setSearch(e.target.value)

    if (S_User.length != 0) {
      axios.get(`http://localhost:3006/Search_Users/${S_User}`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })
    }
    else {
      axios.get(`http://localhost:3006/Get_User`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })
    }
  }

  const Selectfilter = (e) => {
    var filter = e.target.value;
    setFilter(e.target.value)
    if (filter == "All Users") {
      setcheck(1);
      console.log(Filter)
      axios.get(`http://localhost:3006/Get_Users`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })

    } else if (filter == "Reported Users") {
      setcheck(1);
      axios.get(`http://localhost:3006/Get_Reported_Users`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })
    }
    else if (filter == "Blocked Users") {
      setcheck(0);
      axios.get(`http://localhost:3006/Get_Blocked_Users`).then((response) => {
        var data = response.data;
        setListOfUsers(data)
      })
    }



  }

  const BlockUser = (email) => {
    
    axios.put(`http://localhost:3006/blockUser/${email}`).then((res) => {
      console.log(res.data);
      setListOfUsers(
        listOfUsers.filter((val) => {
          return val.email != email
        }))
    })
  }


  const UnblockUser = (email) => {
    axios.put(`http://localhost:3006/UnblockUser/${email}`).then((res) => {
      console.log(res.data);
      setListOfUsers(
        listOfUsers.filter((val) => {
          return val.email != email
        }))
    })
  }

  return (

    <div style={{ backgroundColor: "rgba(0, 95, 96, 0.8)" }}>
      <Navbar />
      <main>
        <div style={{ "display": "inline" }}>
          <input
            style={{ "margin-top": "40px", "width": "50px", "marginLeft": "280px" }}
            autoComplete="off"
            type="text"
            placeholder='Search'
            className="customform w-50"
            list="item-list"
            onChange={searching}
          ></input>
          <FormControl sx={{ m: 1, minWidth: 180, marginLeft: 60 }} size="small">
            <InputLabel id="demo-select-small">Filters</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"

              value={Filter}
              label="Filters"
              onChange={Selectfilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"All Users"}>All Users</MenuItem>
              <MenuItem value={"Reported Users"}>Reported Users</MenuItem>
              <MenuItem value={"Blocked Users"}>Blocked Users</MenuItem>
            </Select>
          </FormControl>
        </div>


        <main>
          <Container sx={{ py: 8, marginTop: 2 }}>

            <Grid container spacing={4}>
              {listOfUsers.map((card) => (
                <Grid class="package-card" item key={card} xs={12} sm={6} md={3}>
                  <Card

                    style={{ backgroundColor: "#F78104", height: "260px", width: "300px", borderRadius: "20px" }}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center"

                    }}

                  >

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h6" style={{ color: "rgba(0, 95, 96, 0.8)" }} sx={{ fontWeight: 'bold' }}>
                        {card.Name}
                      </Typography>
                      <Typography variant="p" style={{ color: "rgba(0, 95, 96, 1)", fontSize: "18px" }}>
                        {card.email}
                      </Typography>
                    </CardContent>
                    <Box alignItems={"center"}>
                      <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                        Rs.{card.contact_number}/-
                      </Typography>

                    </Box>
                    <Box alignItems={"center"} >
                      <CardActions sx={{ marginLeft: 9 }}>
                        {check == 1 ?
                          <Button class="pkg-btn" style={{ color: 'orange','margin-left': '25px' }} onClick={() => { BlockUser(card.email) }}>Block</Button>
                          : <Button class="pkg-btn" style={{ 'margin-left': '12px', color: 'orange' }} onClick={() => { UnblockUser(card.email) }}>UnBlock</Button>
                        }
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack spacing={2} alignItems={"center"}>
              <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
            </Stack>
          </Container>
        </main>

      </main>




    </div>
  );



}

export default ManageUsers

