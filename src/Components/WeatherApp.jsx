import React from "react";
import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./Weather.css";

import cloudy from "../img/cloudy.png";
import rain from "../img/rain.png";
import partlyCloudy from "../img/partlyCloudy.png";
import mostlyCloudy from "../img/mostlyCloudy.png";
import sunny from "../img/sunny.png";
import sunnyRain from "../img/sunnyrain.png";
import thunder from "../img/thunderstorm.png";
import mostlySunny from "../img/mostlySunny.png";
import mist from "../img/mist.png";
import snow from "../img/snow.png";
import { Input } from "@chakra-ui/react";
import axios from "axios";
export default function WeatherApp() {
  //month
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  //day
  const day = new Array();
  day[0] = "Monday";
  day[1] = "Tuesday";
  day[2] = "Wednesday";
  day[3] = "Thursday";
  day[4] = "Friday";
  day[5] = "Saturday";
  day[6] = "Sunday";

  let today = new Date();
  let name = month[today.getMonth()];
  let dayName = day[today.getDay()];

  var date =
    dayName + ", " + name + " " + today.getDate() + ", " + today.getFullYear();

  //Api
  const [cityData, setCityData] = useState();
  const [icon, setIcon] = useState("04d");
  const [city, setCity] = useState("Karachi");
  const [imgs, setImage] = useState("sunny");

  useEffect(() => {
    const fetchApi = async () => {
      const axios = require("axios");

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d54714bf25c67dba81a9cec36deeee35`
        )
        .then(function (response) {
          // handle success
          setCityData(response.data);
          console.log(cityData);
          setIcon(cityData.weather[0].icon);
          console.log(icon);
          if (icon == "01d" || icon == "01n") {
            setImage(sunny);
          } else if (icon == "02d" || icon == "02n") {
            setImage(mostlySunny);
          } else if (icon == "03d" || icon == "03n") {
            setImage(cloudy);
          } else if (icon == "04d" || icon == "04n") {
            setImage(mostlyCloudy);
          } else if (icon == "09d" || icon == "09n") {
            setImage(rain);
          } else if (icon == "10d" || icon == "10n") {
            setImage(sunnyRain);
          } else if (icon == "11d" || icon == "11n") {
            setImage(thunder);
          } else if (icon == "13d" || icon == "13n") {
            setImage(snow);
          } else if (icon == "50d" || icon == "50n") {
            setImage(mist);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    };

    fetchApi();
  }, [city]);

  const kelToCel = (abc) => {
    return (abc - 273.15).toFixed(2);
  };
  return (
    <section className="vh-100 weather_main">
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
              <MDBCardBody className="p-4">
                <Input
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter City name"
                  name="search"
                />

                {cityData ? (
                  <>
                    <div className="d-flex flex-column text-center mt-5 mb-4">
                      <MDBTypography
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331", fontSize: "40px" }}
                      >
                        {city}
                      </MDBTypography>
                      <MDBTypography
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331", fontSize: "20px" }}
                      >
                        {date}
                      </MDBTypography>
                      <MDBTypography
                        tag="h6"
                        className="display-4 mb-0 font-weight-bold"
                        style={{ color: "#1C2331" }}
                      >
                        {kelToCel(cityData.main.temp)} &deg;C
                      </MDBTypography>
                      <span
                        className="small"
                        style={{ color: "#868B94", fontSize: "25px" }}
                      >
                        {cityData.weather[0].main}
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                        <div style={{ fontSize: "20px" }}>
                          Feels like:
                          <span className="ms-1">
                            <b>{kelToCel(cityData.main.feels_like)} &deg;C</b>
                          </span>
                        </div>
                      </div>
                      <div>
                        <img src={imgs} width="100px" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Sorry! No Data Found</p>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
