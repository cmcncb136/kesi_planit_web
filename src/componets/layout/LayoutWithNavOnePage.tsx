import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Navi from "../Navi.";
import {useRef} from "react";

export default function LayoutWithNavOnePage() {
    const navRef = useRef<HTMLDivElement>(null);

    //Todo. 계산 로직
    return (
        <Box>
            <Navi ref={navRef} />
            <Box sx={{ height: `calc(100vh - 100px)` }}>
                <Outlet />
            </Box>
        </Box>
    )
}




