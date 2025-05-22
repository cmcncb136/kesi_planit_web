import Box from "@mui/material/Box";
import MDEditor from "@uiw/react-md-editor";
import {useState} from "react";
import {TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Article() {
    const [title, setTitle] = useState('Q&A');
    const [content, setContent] = useState('');
    const type = useParams<{type: string}>().type;

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" sx={{my: 2}}>
                {type} 글 작성
            </Typography>

            <TextField
                label={"Title"} variant={"outlined"}
                sx={{ width: '100%', marginBottom: 2}}
            />

            <MDEditor
                height={"auto"}
                minHeight={500}
                value={content}
                onChange={(content, e) => {
                    setContent(content ?? "");
                }}
            />

            <Box sx={{py:2}} style={{width:'100%', display:'flex', flexDirection: 'row-reverse'}}>
                <Button variant={"contained"}>
                    저장
                </Button>
            </Box>
        </Container>
    )
}