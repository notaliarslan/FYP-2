import React from 'react';
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { EmailContext } from '../../App';
import { Link, useNavigate } from "react-router-dom";
import { AdContext } from '../../App';
import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import imag2 from '../images/login1.jpg';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { color } from '@mui/system';
import NewNavbar from './NavbarHome';
import "@fontsource/montserrat";
import { TextAlignJustify } from 'phosphor-react';
import Fade from 'react-reveal/Fade';
export const MyAds = () => {

  const [Ads, setAds] = useState([]);
  const [page, setpage] = useState(0);
  const { Email } = useContext(EmailContext);
  const { AdID, setAdID } = useContext(AdContext);
  const param = localStorage.getItem("email_token")
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_MyAD/${param}`).then((response) => {
      console.log("This is Response Data : ", response.data)
      var temp = response.data;
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)

      });
      setAds(temp);
      console.log("After parse : ", temp)
    });

  }, []);



  const getUser = (AdID) => {
    console.log("AD IDcbxbc IS : ", AdID)
    axios.get(`http://localhost:3006/get_userE/${AdID}`).then((res) => {
      console.log("Receiver User is : ", res.data[0].email)


      console.log("AD ID IS : ", AdID)

      if (res.data[0].email !== "" && AdID !== "") {
        console.log("rec is : ", res.data[0].email)
        navigate("/AppC", { state: { user: res.data[0].email, room: AdID } })
      }
      else {
        navigate("/login")
      }
    })
  }


  const delete_Ad = (id) => {

    axios.put(`http://localhost:3006/del_MyAD/${id}`).then((res) => {
      console.log(res.data);
      setAds(
        Ads.filter((val) => {
          return val.Ad_id != id
        }))
    })

  }


  function update1(id) {
    console.log(id)
    setAdID(id)
    navigate("/updatead")

  }
  useEffect(() => {
    if (!localStorage.getItem('email_token')) {
      navigate('/login')
    }
  }, [])
  //console.log(Ads);


  /*Pagination : */

  const itemsPerPage = 8; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAds = Ads.slice(startIndex, endIndex);
  

  return (

    <div>
      <NewNavbar />

      <main>
        <div className='Myads-banner'>
          <div className="overlaybg1"></div>
          <img className="img1" src={imag2}></img>
          <div className='ContentLanding'>
            <br></br>
            <br></br>
            <Fade top distance="20%" duration={1500}>
            <div style={{ textAlign: "center", color: "#ffffff", marginTop: "30px"}}>
              <h1><b>My Ads</b></h1>
            </div>
            {displayedAds!=""?
            <Container sx={{ py: 8 }} to>
              <Grid container spacing={4}>
              {displayedAds.map((card) => (
                  <Grid class="myad-card" item key={card} xs={12} sm={6} md={3}>
                    <Card
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", height: "520px", borderRadius: "20px", width: "350px", boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.25)" }}
                      sx={{
                        maxWidth: 480,
                        maxHeight: 450
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={190}

                        sx={{ padding: "1em 1em 0 1em" }}
                        image={card.Images[0]}
                        alt="random"

                      />
                      <CardContent sx={{ flexGrow: 1 }}  >
                        <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{ color: "#ffffff" }}>
                          {card.title}
                        </Typography>

                        <Typography variant="p" style={{ topmargin: "5px", color: "#ffffff" }}>
                          {card.Description}
                        </Typography>
                        <br></br>
                        <Typography variant="p" style={{ topmargin: "5px", color: "#ffffff" }}>
                          {card.Location}
                        </Typography>
                        <br></br>
                        <Typography variant="p" style={{ color: "#ffffff" }}>
                          {card.date}
                        </Typography>
                        <br></br>
                        <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "#ffffff" }}>
                          Rs.{card.Cost}/-
                        </Typography>
                      </CardContent>
                      <Box alignItems={"center"} >
                        <CardActions sx={{ marginLeft: 0 }}>
                          <Button class="myad-btn" onClick={() => { delete_Ad(card.Ad_id) }}>Delete</Button>
                          <Button class="myad-btn" onClick={() => { update1(card.Ad_id) }}>Update</Button>
                          <Button class="myad-btn" onClick={() => { getUser(card.Ad_id) }}>Receive</Button>

                        </CardActions>
                      </Box>
                    </Card>
                  </Grid>

                ))}
              </Grid>
              <Stack spacing={2} alignItems="center">
  <Pagination
    count={Math.ceil(Ads.length / itemsPerPage)}
    color="primary"
    onChange={handlePageChange}
    page={currentPage + 1}
  />
</Stack>

              
            </Container>:<div>
            <h2 style={{ marginTop: 100, marginLeft: 600, marginBottom: 340,color:"white" }}>No Ads</h2>
            
          </div>}
            </Fade>
          </div>
        </div>
      </main>

    </div>
  );


}


