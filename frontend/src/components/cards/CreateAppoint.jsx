import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../features/customers/customerSlice";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Grid,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { toast } from "react-toastify";


function CreateAppoint({ shop }) {



  const [FormData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    date: null,
    shop: shop.shopID,
  });

  const { firstName, lastName, phone, date } = FormData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onDate = (newDate) => {
    setFormData((prevState) => ({
      ...prevState,
      date: newDate
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const customerData = {
      firstName,
      lastName,
      phone,
      date,
      shop,
    };

    dispatch(createCustomer(customerData));
    toast("Submitted!");
    setFormData({ firstName: "", lastName: "", phone: "", date: null });
  };

  return (
    <Card  sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            pt: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "warning.dark",
              height: 40,
              width: 40,
            }}
          >
            <CalendarMonthIcon />
          </Avatar>
          <Typography
            color="textPrimary"
            sx={{
              ml: 1,
            }}
            variant="h5"
          >
            Create an Appointment
          </Typography>
        </Box>
        <Divider sx={{ pt: 2 }} />
        <Box
          sx={{
            pt: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            color="textPrimary"
            sx={{
              ml: 1,
            }}
            variant="h6"
          >
            Please fill out all information accurately
          </Typography>
        </Box>
        <form onSubmit={onSubmit}>
          <Grid container justifyContent="space-between" sx={{ mt: 2,}}>
            <Grid item >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
            </Grid>
            <Grid item >
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
            </Grid>
            <Grid item >
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="phone"
                id="phone"
                value={phone}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </Grid>
            <Grid item sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  margin="normal"
                  required
                  value={date}
                  id="date"
                  name="date"
                  onChange={onDate}
                  label="Select Date and Time"
                  onError={console.log}
                  mask="___/__/__ __:__ _M"
                  disablePast
                  renderInput={(props) => <TextField {...props} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item >
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 20, mb: 2 }}
                size="large"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreateAppoint;
