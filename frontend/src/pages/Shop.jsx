import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getShopById, reset } from "../features/shops/shopSlice";

import Spinner from "../components/Spinner";
import Box from "@mui/material/Box";
import { ShopRoot } from "../components/ShopRoot";
import { Container, Grid } from "@mui/material";
import ShopBanner from "../components/cards/ShopBanner";
import ShopPageInfo from "../components/cards/ShopPageInfo";
import CreateAppoint from "../components/cards/CreateAppoint";

function Shop() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { shops, isLoading, isError, message } = useSelector(
    (state) => state.shops
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getShopById(id));

    return () => dispatch(reset);
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <ShopRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <ShopBanner shop={shops}></ShopBanner>
            <Container maxWidth={false} sx={{ my: 4 }}>
              <Grid container spacing={3} sx={{height: '100%'}}>
                <Grid item lg={6} sm={12} xl={6} xs={12}>
                  <ShopPageInfo shop={shops}></ShopPageInfo>
                </Grid>
                <Grid item lg={6} sm={12} xl={6} xs={12}>
                  <CreateAppoint shop={shops}></CreateAppoint>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ShopRoot>
    </>
  );
}

export default Shop;
