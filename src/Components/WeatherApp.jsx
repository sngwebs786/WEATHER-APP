import React, { useEffect, useState } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

const WeatherApp = () => {
  let [searchedValue, setSearchedValue] = useState("Karachi");
  let [cityData, setCityData] = useState([]);
  let [temp,setTemp]=useState([])
  let [input, setInput] = useState("");
  let componentMounted = true;
  let emoji = null;

  async function fetchWeather() {
    // const axios = require('axios');
    // if (componentMounted) {
    //   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d54714bf25c67dba81a9cec36deeee35`;
    //   await axios
    //     .get(apiUrl)
    //     .then(async function (res) {
    //       console.log("response: ", res.data);

    //       setData(res.data);

    //       console.log("data:", data);
    //     })
    //     .catch((err) => console.log("err", err));
    // }
    console.log("City name", searchedValue);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedValue}&appid=d54714bf25c67dba81a9cec36deeee35`;
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res.data.main);
        setCityData(res.data.weather[0])
        setTemp(res.data.main)
      })
      .catch((err) => console.log(err));
    return () => {
      componentMounted = false;
    };
  }

  useEffect(() => {
    // console.log("useEffect working");
    fetchWeather();

    // if (typeof data.main != "undefine") {
    //   if (data.weather[0].main === "Clouds") {
    //     emoji = "fa-cloud";
    //   } else if (data.weather[0].main === "Thunderstorm") {
    //     emoji = "fa-bolt";
    //   } else if (data.weather[0].main === "Drizzle") {
    //     emoji = "fa-cloud-rain";
    //   } else if (data.weather[0].main === "Rain") {
    //     emoji = "fa-cloud-shower-heavy";
    //   } else if (data.weather[0].main === "Snow") {
    //     emoji = "fa-snow-flake";
    //   } else {
    //     emoji = "fa-smog";
    //   }
    // } else {
    //   return <div>Loading...</div>;
    // }
    console.log(emoji);
  }, [searchedValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchedValue(input);
    console.log(input);
  };

  const kelToCel = (abc) => {
    return (abc - 273.15).toFixed(2);
  };

  return (
    <div>
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={
          "url(https://source.unsplash.com/600x900/?nature,rain)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <span>
            {/* <form onSubmit={handleSubmit}> */}
            <Input
              placeholder="Enter City "
              width="auto"
              color={"white"}
              className="myinp"
              name="search"
              value={searchedValue}
              onChange={(e) => setSearchedValue(e.target.value)}
            ></Input>

            <Button
              leftIcon={<SearchIcon />}
              colorScheme="teal"
              variant="solid"
              marginLeft={5}
              type="submit"
            ></Button>
            {/* </form> */}
          </span>
          <Stack
            height={"500px"}
            width={"300px"}
            spacing={6}
            textAlign={"center"}
            bg={"blackAlpha.500"}
            color={"white"}
          >
            <Text
              textAlign={"center"}
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              padding={"20px"}
            >
              {/* <Text fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}>
                {cityData.name}
              </Text> */}
              {/* <p>{cityData.weather[0].description}</p> */}
              <Text fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}>
                {searchedValue}
              </Text>{" "}
              <br />
              <p>{cityData.description}</p>
              <br />
              {/* <i className={`fas ${emoji} fa-3x`}></i> */}
              <hr />
              <h1>{kelToCel(temp.temp)}&deg;C</h1>
              {/* <h1>{kelToCel(cityData.main.temp)}&deg;C</h1> */}
            </Text>

            {/* <p className='para'>Feels Like: {kelToCel(cityData.main.feels_like)}&deg;C</p>
            <p className='para'>Minimum Temperature: {kelToCel(cityData.main.temp_min)}&deg;C</p>
            <p className='para'>Mazimum Temperature: {kelToCel(cityData.main.temp_max)}&deg;C</p> */}
            <p className="para">
              Feels Like: {kelToCel(temp.feels_like)}&deg;C
            </p>
            <p className="para">
              Minimum Temperature: {kelToCel(temp.temp_min)}&deg;C
            </p>
            <p className="para">
              Mazimum Temperature: {kelToCel(temp.temp_max)}&deg;C
            </p>
          </Stack>
        </VStack>
      </Flex>
    </div>
  );
};

export default WeatherApp;
