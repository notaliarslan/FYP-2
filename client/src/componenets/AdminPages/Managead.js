import React, { useEffect, useState, useContext } from 'react'
import "../pages/App.css";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import add from '../images/add1.png';
import Navbar from './Navbar2';
import { AdFContext } from '../../App';
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

function Managead() {
 
  const navigate = useNavigate()
  const [page, setpage] = useState(0);
  const [Adpac, setAdPac] = useState([]);
  const { AdFID, setAdFID } = useContext(AdFContext);
  const [check, setcheck] = useState();
  console.log("hleo")
  useEffect(() => {

    axios.get("http://localhost:3006/Get_AdPackages").then((response) => {

      setAdPac(response.data);

    });
  }, []);

  const CurrentPkg = () => {
    axios.get("http://localhost:3006/Get_AdPackages").then((response) => {
      setcheck(1)
      setAdPac(response.data);

    });
  }


  const PreviousPkg = () => {
    axios.get("http://localhost:3006/Get_PreAdPackages").then((response) => {
      setcheck(0)
      setAdPac(response.data);

    });
  }
  const delete_AdPac = (id) => {
    axios.put(`http://localhost:3006/del_AdPackage/${id}`).then((res) => {
      console.log(res.data);
      setAdPac(
        Adpac.filter((val) => {
          return val.AdF_id != id
        }))
    })

  }

  const Active_AdPac = (id) => {
    axios.put(`http://localhost:3006/Active_AdPackage/${id}`).then((res) => {
      console.log(res.data);
      setAdPac(
        Adpac.filter((val) => {
          return val.AdF_id != id
        }))
    })

  }
  const navi = () => {
    navigate("/addpackage")
  }
  function update(id) {
    console.log("THIS IS ID : ", id)
    setAdFID(id)
    navigate("/editpackage");

  }
  useEffect(() => {
    if (!localStorage.getItem('Adminemail')) {
      navigate('/Adminlogin')
    }
  }, [])
 
/*Pagination : */

const itemsPerPage = 8; // Number of items to display per page
const [currentPage, setCurrentPage] = useState(1);

const handlePageChange = (event, value) => {
  setCurrentPage(value);
};


const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedAds = Adpac.slice(startIndex, endIndex);
  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
    <div>
      <Navbar />
      <div>
        <div className='page-heading'>


          <div class="pageheading" style={{ display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"90PX" }}>
            <h1>Manage Ad Featuring Packages</h1>
          </div>
          
          <div className='head'>
          
            
            <button className='ManageEcommercebutton' style={{ "background-color": "#008083", "color": "#FFFFFF", "borderRadius": "10px", "borderColor": "#008083", "marginRight": "10px", "boxShadow": "4px 4px 4px rgba(0, 0, 0, 0.25)" }}onClick={navi}><img className='pass-iconf' src={add} />Add Packages</button>
            <button className='ManageEcommercebutton' style={{ "background-color": "#008083", "color": "#FFFFFF", "borderRadius": "10px", "borderColor": "#008083", "marginRight": "10px", "boxShadow": "4px 4px 4px rgba(0, 0, 0, 0.25)" }} onClick={() => { CurrentPkg() }}>Current Packages</button>
              <button className='ManageEcommercebutton' style={{ "background-color": "#008083", "color": "#FFFFFF", "borderRadius": "10px", "borderColor": "#008083", "marginRight": "10px", "boxShadow": "4px 4px 4px rgba(0, 0, 0, 0.25)" }} onClick={() => { PreviousPkg() }}>Previous Packages</button>
                        </div>

          <main>
          {Adpac!=""?
            <Container sx={{ py: 8, marginTop: 2 }}>

              <Grid container spacing={4}>
                {displayedAds.map((card) => (
                  <Grid class="package-card" item key={card} xs={12} sm={6} md={3} style={{marginLeft:50}}>
                    <Card

                      style={{ backgroundColor: "#FFFFFF", height: "260px", width: "300px", borderRadius: "15px"}}
                      sx={{
                        height:"100%",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                       
                    margin: "0 auto",
                    padding: "0.1em",
                    maxHeight: 450
                      }}

                    >

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h4" component="h4" style={{ color: "rgba(0, 95, 96, 0.8)" }} sx={{ fontWeight: 'bold' }}>
                          {card.Title}
                        </Typography>
                        <Typography variant="p" style={{ color: "rgba(0, 95, 96, 1)", fontSize: "18px" }}>
                          {card.Description}
                        </Typography>
                      </CardContent>
                      <Box alignItems={"center"}>
                        <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                          Rs.{card.Price}/-
                        </Typography>
                        

                      </Box>
                      <br></br>
                      <Box alignItems={"center"} >
                        <CardActions sx={{ marginLeft: 7 }}>
                          {
                          check==1 ?<div> <Button class="pkg-btn" style={{ color: 'white' }} onClick={() => { delete_AdPac(card.AdF_id) }}>Delete</Button>
                          <Button class="pkg-btn" style={{ 'margin-left': '10px', color: 'white' }} onClick={() => { update(card.AdF_id) }}>Update</Button></div>
                          :<Button class="pkg-btn" style={{ 'margin-left': '15px', color: 'white' }} onClick={() => { Active_AdPac(card.AdF_id) }}>Activate</Button>
                          }
                          
                        </CardActions>
                        
                      </Box>
                      
                    </Card>
                    
                    
              
                  </Grid>
                  
                ))}
                
              </Grid>
              <Stack spacing={2} alignItems="center">
  <Pagination
    count={Math.ceil(Adpac.length / itemsPerPage)}
    color="primary"
    onChange={handlePageChange}
    page={currentPage + 1}
  />
</Stack>
            </Container>:<div>
            <h2 style={{ marginTop: 100, marginLeft: 600, marginBottom: 340 }}>No Ad Featuring Packages</h2>
            
          </div>}
            
          </main>
          





        </div>
      </div>
    </div>
    </div>
  )
}

export default Managead;
