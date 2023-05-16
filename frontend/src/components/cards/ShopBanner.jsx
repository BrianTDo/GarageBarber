import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

function ShopBanner({ shop }) {
  function ActiveIndicator() {
    if (shop.active == 1) {
      return (
        <Box
          sx={{
            pt: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "success.dark",
              height: 25,
              width: 25,
            }}
          >
            <PriorityHighIcon />
          </Avatar>
          <Typography
            component="h6"
            variant="h5"
            color="textPrimary"
            sx={{
              ml: 1,
            }}
          >
            Active
          </Typography>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          pt: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "error.dark",
            height: 25,
            width: 25,
          }}
        >
          <PriorityHighIcon />
        </Avatar>
        <Typography
          component="h6"
          variant="h5"
          color="textPrimary"
          sx={{
            ml: 1,
          }}
        >
          Inactive
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(https://ctl.s6img.com/society6/img/FTkrlmt0gubwyjexJkOXr8phx0o/w_1500/coffee-mugs/swatch/~artwork,fw_4600,fh_2000,fy_-1300,iw_4600,ih_4600/s6-original-art-uploads/society6/uploads/misc/105710eeb0f446988a1d217991317132/~~/barber-shop-stripes-red-white-blue-mugs.jpg)`,
      }}
    >
      {/* Increase the priority of background image */}
      {
        <img
          style={{ display: "none" }}
          src="https://ctl.s6img.com/society6/img/FTkrlmt0gubwyjexJkOXr8phx0o/w_1500/coffee-mugs/swatch/~artwork,fw_4600,fh_2000,fy_-1300,iw_4600,ih_4600/s6-original-art-uploads/society6/uploads/misc/105710eeb0f446988a1d217991317132/~~/barber-shop-stripes-red-white-blue-mugs.jpg"
          alt="barber"
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.08)",
        }}
      />
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Box
            sx={{
              position: "relative",
              p: { xs: 5, md: 15 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h6"
              variant="h2"
              color="textPrimary"
              gutterBottom
            >
              {shop.name}
            </Typography>
            <ActiveIndicator />
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              position: "relative",
              p: { xs: 5, md: 5 },
              pr: { md: 5 },
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "error.dark",
                height: 56,
                width: 56,
              }}
            >
              <ContentCutIcon />
            </Avatar>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ShopBanner;
