import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                // root: {
                //     color: "black",
                //     fontSize: '20px'
                // }
            }
        }
    }
});
export default theme;