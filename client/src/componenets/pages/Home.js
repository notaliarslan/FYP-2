// // function Home() {

// //   return (
// //     <div>
// //       {listOfPosts.map((value, key) => {
// //         return (
// //           <div className="post">
// //             <div className="title"> {value.title} </div>
// //             <div className="body">{value.postText}</div>
// //             <div className="footer">{value.username}</div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import homevideo from '../images/home2.mp4';
import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Fade from 'react-reveal/Fade';
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { color } from "@mui/system";
import Navbar from "./NavbarHome";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EmailContext } from "../../App";
import { AdDContext } from "../../App";
import "@fontsource/montserrat";
import star from "../images/icons8-star-48.png"
import "./App.css";
export const Home = () => {
  const { Email } = useContext(EmailContext);
  const { AdD, setAdD } = useContext(AdDContext);
  console.log(Email);
  const navigate = useNavigate();

  localStorage.setItem("newemail", Email);
  console.log("LCOAL  :", localStorage.getItem("email"));
  console.log("THIS IS LOCAL : ", localStorage.getItem("email"));
  const [listOfAds, setListOfAds] = useState([]);
  const [page, setpage] = useState(0);
  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [img, setimg] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_AD`).then((response) => {
      console.log("THis is Response Data : ", response.data);
      var temp = response.data;
      console.log(response.data);
      temp.forEach((element) => {
        element.Images = JSON.parse(element.Images);
      });
      setListOfAds(temp);
      console.log("After parse : ", temp);
    });
  }, []);
  const moreinfo = () => {
    navigate("/Addetail");
  };
  function view(id) {
    console.log(id);
    setAdD(id);
    localStorage.setItem("AdID", id);
    navigate("/AdDetail");
  }


  const Selectfilter = (e) => {
    var filter = e.target.value;
    setFilter(e.target.value);
    if (filter == "High TO Low") {
      console.log(Filter);
      axios.get(`http://localhost:3006/filterHtoL`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    } else if (filter == "Low To High") {
      axios.get(`http://localhost:3006/filterLtoH`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    } else if (filter == "Latest") {
      axios.get(`http://localhost:3006/filterLatest`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    } else if (filter == "Oldest") {
      axios.get(`http://localhost:3006/filterOldest`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("email_token")) {
      navigate("/login");
    }
  }, []);
  //const handlechange = (e,p) =>{
  //setpage(p)
  //}



  /*Pagination: */

  const itemsPerPage = 8; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };


  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the list of products based on the current page
  const displayedAds = listOfAds.slice(startIndex, endIndex);





  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)", minwidth: "100%" }}>
      <Navbar />

      <main>
        <div className='Home-banner'>
          <video src={homevideo} autoPlay loop muted />
          <div class="overlaybg2"></div>
          <Fade top distance="20%" duration={1500}>
            <div className='welcomelanding'>
              <h2>Welcome</h2>
              <h4>To</h4>
              <h1>GAMINGSTAN</h1>
              <a href="/hardware">Sell Now</a>

            </div>
          </Fade>
        </div>

        <div className='ContentLanding'>
          <Fade top distance="10%" duration={1500}>
            <h2 className='txt-align-home' style={{ color: "#ffffff", fontWeight: "bold" }}>Fresh Recommendations</h2>
          </Fade>
          <Fade top distance="20%" duration={1500}>
            <div
              className="Search_Filters"
              style={{
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50PX",
              }}
            >
              <input
                style={{
                  width: "50%",
                  marginRight: "0.5rem",
                  backgroundColor: "transparent", color: "#ffffff", borderRadius: "30px", border: "2px solid white"
                }}
                autoComplete="off"
                placeholder="Search"
                type="text"
                className="customform w-50"
                list="item-list"
                onChange={(e) => setSearch(e.target.value)}
              />

              <FormControl
                style={{
                  backgroundColor: "transparent", border: "2px solid #ffffff", color: "#ffffff",
                  minWidth: 150,
                  borderRadius: "30px",
                }}
                size="small"
              >
                <InputLabel
                  id="demo-select-small"
                  style={{ color: "#ffffff" }}
                >
                  Sort by
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={Filter}
                  label="Filters"
                  onChange={Selectfilter}
                  style={{
                    borderRadius: "20px",
                    height: "45px",
                    color: "rgba(0, 95, 96, 0.8)",
                  }}
                >
                  <MenuItem
                    value=""
                    style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}
                  >
                    <em>None</em>
                  </MenuItem>
                  <MenuItem
                    value={"High TO Low"}
                    style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}
                  >
                    High to Low
                  </MenuItem>
                  <MenuItem
                    value={"Low To High"}
                    style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}
                  >
                    Low to High
                  </MenuItem>
                  <MenuItem
                    value={"Latest"}
                    style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}
                  >
                    Latest
                  </MenuItem>
                  <MenuItem
                    value={"Oldest"}
                    style={{ borderRadius: "20px", color: "rgba(0, 95, 96, 0.8)" }}
                  >
                    Oldest
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Fade>
          <Fade top distance="20%" duration={1500}>
            <Container sx={{ py: 8 }}>
              <Grid container spacing={4}>
                {displayedAds
                  .filter((card) => {
                    return search.toLowerCase() === ""
                      ? card
                      : card.title.toLowerCase().includes(search) ||
                      card.adCategory.toLowerCase().includes(search);
                  })
                  .map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={3}>
                      <Card
                        style={{
                          border: card.Days > 0 ? "2px solid gold" : "none",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          height: "330px",
                          borderRadius: "20px",
                          boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.55)",
                          position: "relative",
                        }}
                        raised
                        sx={{
                          maxWidth: 280,
                          margin: "0 auto",
                          padding: "0.1em",
                          maxHeight: 450,
                        }}
                      >
                        {card.Days > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "10px",
                              left: "10px",
                              backgroundColor: "yellow",
                              color: "black",
                              padding: "5px",
                              borderRadius: "3px",
                              fontWeight: "bold",
                            }}
                          >
                            Featured
                          </span>
                        )}
                        <CardMedia
                          component="img"
                          height={180}
                          image={card.Images[0]}
                          alt="random"
                          style={{
                            padding: "0.5em 0.5em 0 0.5em",
                            borderRadius: "20px",
                          }}
                          onClick={() => {
                            view(card.Ad_id);
                          }}
                        />
                        <CardContent
                          sx={{ flexGrow: 1 }}
                          onClick={() => {
                            view(card.Ad_id);
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h6"
                            sx={{ fontWeight: "bold" }}
                            style={{ color: "#ffffff", marginBottom: "5px" }}
                          >
                            {card.title}
                          </Typography>

                          <Typography
                            variant="p"
                            style={{ topmargin: "3px", color: "#ffffff" }}
                          >
                            {card.Location}
                          </Typography>
                          <br></br>
                          <Typography variant="p" style={{ color: "#ffffff" }}>
                            {card.date}
                          </Typography>
                          <br></br>
                          <Typography
                            variant="p"
                            sx={{ fontWeight: "bold" }}
                            style={{ color: "#ffffff", marginBottom: "5px" }}
                          >
                            Rs.{card.Cost}/-
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>

              <Stack spacing={2} alignItems="center" style={{marginTop:30,color:"orange"}}>
              <Pagination
                count={Math.ceil(listOfAds.length / itemsPerPage)}
                color="primary"
                onChange={handlePageChange}
                page={currentPage + 1}
              />
              </Stack>
            </Container>
          </Fade>

        </div>

      </main >
    </div >
  );
}; 
