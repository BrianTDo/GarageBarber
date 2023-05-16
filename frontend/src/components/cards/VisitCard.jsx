import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import WebIcon from "@mui/icons-material/Web";

function VisitCard({ shop }) {
  return (
    <Card sx={{ height: "100%" }} {...shop}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Visit Shop Page
            </Typography>
            <Typography color="textPrimary" variant="h4">
              <Button
                color="secondary"
                variant="contained"
                size="large"
                component={Link}
                to={"/shop/" + shop.shopID}
              >
                Visit Shop
              </Button>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <WebIcon />
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
          <Typography
            color="textSecondary"
            sx={{
              mr: 1,
            }}
            variant="body2"
          >
            Shop webpage
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default VisitCard;
