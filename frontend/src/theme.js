import { createTheme } from "@mui/material";
import { alpha } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

export const theme = createTheme({
    palette:{
        primary:{
            light: "#ce93d8",
            main: "#ba68c8",
            dark: "#ab47bc"
        },
        secondary:{
            light: "#e0f7fa",
            main: "#b2ebf2",
            dark: "#80deea"
        },
        error: {
            light: "#e57373",
            main: "#ef5350",
            dark: "#f44336"
        },
        success: {
            light: "#69f0ae",
            main: "#00e676",
            dark: "#00c853"
        },
        background:{
            default: "#e8eaf6"
        },
        info:{
            main: alpha("#e8eaf6", 0.8)
        }
    },
    spacing: 8,
})