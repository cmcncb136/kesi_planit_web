import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import {StarIcon} from "./StarIcon";
import {ReactComponent as AppCalendarExample1} from "../img/app_calendar_example_1.svg";
import {ReactComponent as AppCalendarExample2} from "../img/app_calendar_example_2.svg";
import Graph from "./graph";


function MoveStarLine(props: { maxMarginPercent: number, color: string }) {
    return (
        <div
            style={{
                paddingRight: `${props.maxMarginPercent}%`
            }}
        >
            <div className={"star-line"}
                 style={{
                     backgroundColor: props.color,
                     width: `${100 - props.maxMarginPercent}%`,
                     display: "flex",
                     justifyContent: "flex-end",
                 }}
            >
                <StarIcon color={props.color} width={"5vh"} height={"5vh"} style={{
                    filter: `saturate(300%)`,
                }}/>
            </div>
        </div>
    );
}



export default function Home() {
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: 10, justifyContent: "space-between"}}>
            <Box>
                <Typography
                    sx={{textAlign: 'center', fontSize: '10vh', fontWeight: 'bold', my: '8%'}}
                    data-aos={"fade-up"}
                >
                    번거러운 일정공유<br/>
                    PlanIt에서 쉽고 간편하게
                </Typography>
                <div className={'star-line-container'} data-aos="fade">
                    <MoveStarLine color={"#FF8383"} maxMarginPercent={15}/>
                    <MoveStarLine color={"#FFEF7A"} maxMarginPercent={10}/>
                    <MoveStarLine color={"#9EFF86"} maxMarginPercent={23}/>
                </div>
            </Box>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid size={6} sx={{display: "flex", gap: 20, flexDirection: 'column', alignItems: "center"}}>
                        <Typography
                            sx={{fontSize: 58, fontWeight: 'bold'}} data-aos="fade-up">
                            일정관리<br/>
                            직관적으로 아름답게
                        </Typography>
                        <AppCalendarExample1 data-aos="fade-up" data-aos-offset={1000} />
                    </Grid>
                    <Grid size={6} sx={{display: "flex", flexDirection: 'column', justifyContent:"stretch", alignItems: "center"}}>
                        <AppCalendarExample2 data-aos="fade-up" data-aos-offset={1000}/>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="xl">
                <Typography
                    sx={{textAlign: 'center', fontSize: '10vh', fontWeight: 'bold'}}
                    data-aos={"fade-up"}>
                    일정공유 일정생성을<br/>
                    한 번에 깔금하게
                </Typography>
                <Graph data-aos="fade-up"/>
            </Container>
        </Box>
    )
}