import { useSelector } from "react-redux";
import ShopForm from "../ShopForm";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function FormCard() {

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Create A Shop to Get Started
            </Typography>
            <Typography color="error" variant="h4">
              No Shop Was Found
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.dark",
                height: 56,
                width: 56,
              }}
            >
              <PriorityHighIcon />
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
          <ShopForm />
        </Box>
      </CardContent>
    </Card>
  );
}

export default FormCard;
