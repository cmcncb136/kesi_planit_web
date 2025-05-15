import React, {useEffect} from 'react';
import './App.css';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Route, Routes, useNavigate} from "react-router-dom"
import Login from "./componets/Login"
import UserTable from "./componets/boards/UserBoard";
import {Collapse, Divider, Fab, Grid, keyframes, List, ListItemButton, ListItemText, Tab, Tabs} from "@mui/material";
import Button from "@mui/material/Button";
import NoticeBoard from "./componets/boards/NoticeBoard";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AutoDataBoard from "./componets/boards/AutoDataBoard";
import EditIcon from '@mui/icons-material/Edit';
import "aos/dist/aos.css";
import AOS from "aos";
import {TableName} from "./componets/boards/TableName";
import LayoutWithNav from "./componets/layout/LayoutWithNav";
import Home from "./componets/Home";

const boards = [
    {content: 'Notice', url: 'notice', title: '공지사항'},
    {content: 'Q&A', url: 'qa', title: 'Q&A'},
    {content: '자유', url: 'free', title: '자유게시판'},
]

interface BoardData {
    key: string,
    tableName: TableName
}

const tables = [
    {
        category: 'Schedule',
        values: [
            {key: 'source', tableName: TableName.SCHEDULE_SOURCE},
            {key: 'security', tableName: TableName.SCHEDULE_SECURITY}
        ]
    },
    {
        category: 'Group',
        values: [
            {key: 'group', tableName: TableName.GROUP_TABLE},
            {key: 'group and user', tableName: TableName.GROUP_AND_USER}
        ]
    },
    {
        category: 'Alarm',
        values: [
            {key: 'alarm', tableName: TableName.ALARM}
        ]
    },
    {
        category: 'Calendar',
        values: [
            {key: 'calendar', tableName: TableName.CALENDAR}
        ]
    },
    {
        category: 'Device',
        values: [
            {key: 'device', tableName: TableName.DEVICE }
        ]
    },
    {
        category: 'Friend',
        values: [
            {key: 'friend', tableName: TableName.FRIENDS_RELATION}
        ]
    },
]


function App() {
    const [tabNumber, setTabNumber] = React.useState(0);
    const [tableMenuOpens, setTableMenuOpens] = React.useState<boolean[]>(Array.from({length: tables.length}, () => false));
    const [tableName, setTableName] = React.useState<string>("Schedule > source");
    const [boardData, setBoardData] = React.useState<BoardData>({key: "", tableName: TableName.SCHEDULE_SOURCE});
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

    const tableMenuClick = (category: string, boardData: BoardData) => {
        setTableName(`${category} > ${boardData.key}`);
        setBoardData(boardData);
        console.log("chage : " + JSON.stringify(boardData))
    }

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true
        });
    }, [])


    return (
        <Routes>
            {/*Nav 없음*/}
            <Route path="/login" element={<Login/>}/>

            {/*Nav 있음*/}
            <Route element={<LayoutWithNav/>}>
                <Route path="/user" element={
                    <Container maxWidth="xl">
                        <Typography
                            sx={{paddingY: 3}}
                            variant="h4">
                            사용자 정보
                        </Typography>

                        <UserTable/>
                    </Container>
                }/>

                <Route path="/data" element={
                    <Grid container spacing={1} sx={{p: 2}}>
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
                                                                      fontWeight: 'bold'
                                                                  }
                                                              }}
                                                />
                                                {tableMenuOpens[index] ? <ExpandLess/> : <ExpandMore/>}
                                            </ListItemButton>
                                            <Collapse in={tableMenuOpens[index]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {
                                                        table.values.map((value, index) => (
                                                            <ListItemButton sx={{pl: 4}} key={index} onClick={() => {
                                                                tableMenuClick(table.category, value)
                                                            }}>
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
                        <Divider sx={{background: "inherit", my: 2}} flexItem orientation={"vertical"}/>
                        <Grid size={"grow"}>
                            <Typography
                                sx={{p: 2}}
                                variant="h4">
                                {tableName}
                            </Typography>

                            <AutoDataBoard
                                apiUrl={'/admin/table'}
                                tableName={boardData.tableName}
                            />
                        </Grid>
                    </Grid>
                }/>

                <Route path="/board/*" element={
                    //Pab 버큰 공간 확보
                    <Container maxWidth="xl" sx={{paddingBottom: 10}}>
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
                        <Fab color="primary" aria-label="write"
                             sx={{
                                 position: 'fixed',
                                 bottom: 16, // 하단 여백 (px)
                                 right: 16,  // 우측 여백 (px)
                                 zIndex: 1000
                             }}>
                            <EditIcon/>
                        </Fab>
                    </Container>
                }/>

                <Route path="/" element={
                    <Home/>
                }/>
            </Route>
        </Routes>
    );
}

export default App;
