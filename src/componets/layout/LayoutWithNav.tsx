import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Navi from "../Navi.";

export default function LayoutWithNav() {
    return (
        <Box >
            <Navi />
            <Box>
                <Outlet />
            </Box>
        </Box>
    )
}
