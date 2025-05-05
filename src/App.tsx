import React from 'react';
import './App.css';
import Navi from "./componets/Navi.";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Route, Routes, useNavigate} from "react-router-dom"
import Login from "./componets/Login"
import UserTable from "./componets/boards/UserBoard";
import {ListItemButton, Tab, Tabs, List, ListItemText, Collapse, Grid, Divider} from "@mui/material";
import Button from "@mui/material/Button";
import NoticeBoard from "./componets/boards/NoticeBoard";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Paper from "@mui/material/Paper";
import AutoDataBoard from "./componets/boards/AutoDataBoard";

const boards = [
    {content: 'Notice', url: 'notice', title: '공지사항'},
    {content: 'Q&A', url: 'qa', title: 'Q&A'},
    {content: '자유', url: 'free', title: '자유게시판'},
]

interface ScheduleSourceDto {
    id: number;
    makerUid: string;
    sourceCalendarId: number;
    color: number;

    title: string;
    description: string;

    guestEditPermission: boolean;

    link: string;
    place: string;

    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

//alarm, calendar, device, firends, group, schedule

const makeBoard = <T extends object>(apiUrl: string) => {
    return (
        <AutoDataBoard<T>
            apiUrl={apiUrl} />)
}

const tables = [
    {category: 'Schedule',
        values: [
            {key:'source', board: makeBoard<ScheduleSourceDto>},
            {key:'security'}
        ]
    },
    {category: 'Group',
        values: [
            {key:'group'},
            {key:'group and user'}
        ]},
    {category: 'Alarm',
        values: [
            {key:'alarm'}
        ]},
    {category: 'Calendar',
        values: [
            {key:'calendar'}
        ]},
    {category: 'Device',
        values: [
            {key:'device'}
        ]},
    {category: 'Friend',
        values: [
            {key:'friend'}
        ]},
]


function App() {
    const [tabNumber, setTabNumber] = React.useState(0);
    const [tableMenuOpens, setTableMenuOpens] = React.useState<boolean[]>(Array.from({length: tables.length}, () => false));
    const [tableName, setTableName] = React.useState<string>('Data');
    const navigate = useNavigate();

    const tabChange = (event: React.SyntheticEvent<any>, moveTabNumber: number) => {
        setTabNumber(moveTabNumber)
        navigate("board/" + boards[moveTabNumber].url)
    }

    const toggleTableMenu = (index: number) => {
        const opens = [...tableMenuOpens];
        opens[index] = !opens[index];
        setTableMenuOpens(opens);
    }

    const tableMenuClick = (category: string, value: string) => {
         setTableName(`${category} > ${value}`);
    }


    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>

            <Route path="/user" element={
                <Box>
                    <Navi/>

                    <Container maxWidth="xl">
                        <Typography
                            sx={{paddingY: 3}}
                            variant="h4">
                            사용자 정보
                        </Typography>

                        <UserTable/>
                    </Container>
                </Box>
            }/>


            <Route path="/data" element={
                <Box>
                    <Navi/>
                    <Grid container spacing={1} sx={{p:2}} >
                        <Grid size={2}>
                            <List>
                                {
                                    tables.map((table, index) => (
                                        <Box key={index}>
                                            <ListItemButton onClick={() => {
                                                toggleTableMenu(index)
                                            }}>
                                                <ListItemText primary={table.category}
                                                              slotProps={{
                                                                  primary: {
                                                                      fontWeight:'bold'
                                                                  }
                                                              }}
                                                />
                                                {tableMenuOpens[index] ? <ExpandLess/> : <ExpandMore/>}
                                            </ListItemButton>
                                            <Collapse in={tableMenuOpens[index]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {
                                                        table.values.map((value, index) => (
                                                            <ListItemButton sx={{pl: 4}} key={index} onClick={() => {tableMenuClick(table.category, value.key)}}>
                                                                <ListItemText primary={value.key}/>
                                                            </ListItemButton>
                                                        ))
                                                    }
                                                </List>
                                            </Collapse>
                                        </Box>
                                    ))
                                }
                            </List>
                        </Grid>
                        <Divider sx={{background:"inherit", my:2}} flexItem orientation={"vertical"} />
                        <Grid size={"grow"} >
                            <Typography
                                sx={{p: 2}}
                                variant="h4">
                                {tableName}
                            </Typography>
                            {makeBoard<ScheduleSourceDto>('/schedule/sources')}
                        </Grid>
                    </Grid>
                </Box>
            }/>

            <Route path="/board/*" element={<Box>
                <Navi/>
                <Container maxWidth="xl">
                    <Tabs value={tabNumber} sx={{my: 4}} onChange={tabChange} centered>
                        {boards.map((board) => (
                            <Tab
                                sx={{px: 4}} key={board.content}
                                label={board.content}/>
                        ))}
                    </Tabs>
                    <Typography
                        sx={{paddingY: 1}}
                        variant="h4">
                        {boards[tabNumber].title}
                    </Typography>
                    <Routes>

                        <Route path={"/qa"} element={
                            <Button>Q&A</Button>
                        }>
                        </Route>

                        <Route path={"/free"} element={
                            <Button>Free</Button>
                        }>
                        </Route>

                        <Route path={"*"} element={
                            <Box>
                                <Button>Notice</Button>
                                <NoticeBoard/>
                            </Box>
                        }>
                        </Route>
                    </Routes>
                </Container>
            </Box>
            }/>

            <Route path="/" element={<Box>
                <Navi/>
            </Box>
            }/>
        </Routes>
    );
}

export default App;
