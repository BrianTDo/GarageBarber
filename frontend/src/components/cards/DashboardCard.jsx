import { useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

function DashboardCard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {"Welcome Back " + user.firstName + " " + user.lastName}
            </Typography>
            <Typography color="primary.dark" variant="h4">
              Dashboard
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
              <LeaderboardIcon />
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
          <Typography color="textSecondary" sx={{ mr: 1 }} variant="body2">
            Your shop information is presented on the Dashboard
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
