import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateShop } from "../../features/shops/shopSlice";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
  } from "@mui/material";
  import EventIcon from '@mui/icons-material/Event';
  
  function DateRestrict({ shop }) {
    const [FormData, setFormData] = useState({
        id: shop._id,
        name: shop.name,
        address: shop.address,
        city: shop.city,
        state: shop.state,
        zip: shop.zip,
        phone: shop.phone,
        active: shop.active,
        description: shop.description,
      });
    
      const { id, name, address, city, state, zip, phone, active, description } = FormData;
    
      const dispatch = useDispatch();
      const onCheck = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.checked,
        }));
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
    
        const shopData = {
          id,
          name,
          address,
          city,
          state,
          zip,
          phone,
          active,
          description,
        };
    
        dispatch(updateShop(shopData));
      };
      
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                APPOINTMENT DATE CONTROLS
              </Typography>
              <Typography color="textPrimary" variant="h4">
                Restrict Dates
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "secondary.dark",
                  height: 56,
                  width: 56,
                }}
              >
                <EventIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
          </Box>
        </CardContent>
      </Card>
    );
  }
  
  export default DateRestrict;
  