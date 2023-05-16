import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShopItem from "../components/ShopItem";
import Spinner from "../components/Spinner";
import { getShops, reset } from "../features/shops/shopSlice";
//import Sidebar from "../components/Sidebar";

// Material UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { DashboardRoot } from "../components/DashboardRoot";
import DashboardCard from "../components/cards/DashboardCard";
import FormCard from "../components/cards/FormCard";


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { shops, isLoading, isError, message } = useSelector(
    (state) => state.shops
  );
  
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getShops());

    return () => dispatch(reset);
  }, [user, navigate, isError, message, dispatch]);

  //const [isSidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <DashboardRoot>
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
            <Container maxWidth="true">
              <DashboardCard />
            </Container>
            {shops ? (
              <div>
                {
                  <ShopItem key={shops.shopID} shop={shops} />
                  }
              </div>
            ) : (
              <>
                <Container
                  sx={{ display: "flex", my: 10, justifyContent: "center" }}
                >
                  <FormCard />
                </Container>
              </>
            )}
          </Box>
        </Box>
      </DashboardRoot>
      {/* <Sidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} /> */}
    </>
  );
}

export default Dashboard;
