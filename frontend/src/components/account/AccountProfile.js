import moment from 'moment';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Juicy J',
  timezone: 'GTM-7'
};

const AccountProfile = (props) => {
  const[loginStatus, setLoginStatus] = useState("");
  const[phoneStatus, setPhoneStatus] = useState("");
  const[countryStatus, setCountryStatus] = useState("");
  const[stateStatus, setStateStatus] = useState("");
  const[logg, setLogStatus] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/Login").then((response) => {
      if(response.data.loggedIn == true){
        setLogStatus("Welcome " + response.data.user[0].name + ", you are logged in!")
        setLoginStatus(response.data.user[0].name)
        setPhoneStatus("Phone Number: " + response.data.user[0].phone)
        setCountryStatus(response.data.user[0].country + ", " + response.data.user[0].state)
      }
      })
  }, [])
  return(
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {loginStatus}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {phoneStatus}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body1"
        >
          {countryStatus}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  )
};

export default AccountProfile;
