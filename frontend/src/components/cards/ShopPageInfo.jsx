import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import TurnRightIcon from '@mui/icons-material/TurnRight';
import Divider from '@mui/material/Divider';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function ShopPageInfo({ shop }) {
  return (
    <Card sx={{ height: "100%" }}>
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
              backgroundColor: "success.dark",
              height: 40,
              width: 40,
            }}
          >
            <PhoneIcon />
          </Avatar>
          <Typography
            color="textPrimary"
            sx={{
              ml: 1,
            }}
            variant="h6"
          >
            {"Phone: " + shop.phone}
          </Typography>
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "success.dark",
              height: 40,
              width: 40,
            }}
          >
            <TurnRightIcon />
          </Avatar>
          <Typography
            color="textPrimary"
            sx={{
              ml: 1,
            }}
            variant="h6"
          >
            {"Address: " + shop.address + " " + shop.city + ", " + shop.state + " " + shop.zipcode}
          </Typography>
        </Box>
        <Divider sx={{ pt: 2 }}/>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              backgroundColor: "primary.dark",
              height: 40,
              width: 40,
            }}
          >
            <QuestionMarkIcon />
          </Avatar>
          <Typography
            color="textPrimary"
            sx={{
              ml: 1,
            }}
            variant="h6"
          >
            About
          </Typography>
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            color="textPrimary"
            sx={{
              ml: 1,
            }}
            variant="h8"
          >
            {shop.description}
          </Typography>
        </Box>
        <Divider sx={{ pt: 2 }}/>
      </CardContent>
    </Card>
  );
}

export default ShopPageInfo;
