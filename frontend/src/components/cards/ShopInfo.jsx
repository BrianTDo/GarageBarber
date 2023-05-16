import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";

function ShopInfo({ shop }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {"Phone: " + shop.phone}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {shop.name}
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
              <WarehouseIcon />
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
            {shop.address +
              " " +
              shop.city +
              ", " +
              shop.state +
              " " +
              shop.zipcode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ShopInfo;
