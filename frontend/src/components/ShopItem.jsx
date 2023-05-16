import { Container, Grid } from "@mui/material";

import ShopInfo from "./cards/ShopInfo";
import ActiveCard from "./cards/ActiveCard";
import ShopControl from "./cards/ShopControl";
import VisitCard from "./cards/VisitCard";
import Appointments from "./cards/Appointments";
import DateRestrict from "./cards/DateRestrict";

function ShopItem({ shop }) {
  return (
    <Container maxWidth={false} sx={{ my: 4 }}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <ShopInfo shop={shop} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <ActiveCard shop={shop} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <VisitCard shop={shop} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <ShopControl shop={shop} />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <Appointments shop={shop} sx={{ height: "100%" }}/>
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <DateRestrict shop={shop} sx={{ height: "100%" }} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShopItem;
