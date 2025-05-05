import * as React from 'react';
import Box from "@mui/material/Box";
import {Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField, Link, Card, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {GoogleIcon, LogoIcon, LogoTitle} from "./custom_icon/Icons";
import Typography from "@mui/material/Typography";
import {authService} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth"
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [emailErr, setEmailErr] = React.useState<boolean>(false);
    const [emailErrMsg, setEmailErrMsg] = React.useState<string>('');
    const [passwordErr, setPasswordErr] = React.useState<boolean>(false);
    const [passwordErrMsg, setPasswordErrMsg] = React.useState<string>('');
    const auth = authService;
    const navigate = useNavigate();

    const validateInput = () => {
        const email = document.querySelector('#email') as HTMLInputElement;
        const password = document.querySelector('#password') as HTMLInputElement;

        let isValid = true;

        if(!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailErr(true)
            setEmailErrMsg('이메일 형식이 잘못 되었습니다.')
            isValid = false
        }else {
            setEmailErr(false)
            setEmailErrMsg('')
        }

        if(!password.value || password.value.length < 8) {
            setPasswordErr(true)
            setPasswordErrMsg('비밀번호는 8자리 이상이여야 합니다.')
            isValid = false
        }else {
            setPasswordErr(false)
            setPasswordErrMsg('')
        }

        return isValid
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(emailErr || passwordErr) {
            return
        }

        const email = document.querySelector('#email') as HTMLInputElement;
        const password = document.querySelector('#password') as HTMLInputElement;

        console.log(`email: ${email.value} password: ${password.value}`);
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                navigate('/')
                console.log(`user: ${JSON.stringify(userCredential)}`)
            })
            .catch((error) => {
                console.error(error)
                alert(`${error.code} : ${error.message}`)
            })
    }

    return (
        <Stack
            sx={{
                height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
                minHeight: '100%',
                direction: 'column',
                justifyContent: 'space-between',
                '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    zIndex: -1,
                    inset: 0,
                    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                    backgroundRepeat: 'no-repeat'
                },
            }}

        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'center',
                    padding: 4,
                    gap: 2,
                    width: '100%',
                    margin: 'auto',
                    maxWidth: '500px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)',
                }}
                variant={"outlined"} >
                <Box>
                    <LogoIcon />
                    <LogoTitle />
                </Box>
                <Typography
                    component="h2"
                    variant={"h4"}
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    Sign in
                </Typography>
                <Box
                    component={"form"}
                    noValidate //서버로 제추할 때 유효성을 검사하지 않음을 명시
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2 //아이템간 거리
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor={"email"}>Email</FormLabel>
                        <TextField
                            id={"email"}
                            type={"email"}
                            autoComplete={"email"}
                            variant={"outlined"}
                            error={emailErr}
                            helperText={emailErrMsg}
                            autoFocus
                            fullWidth
                            required
                            color={emailErr ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor={"password"}>Password</FormLabel>
                        <TextField
                            id={"password"}
                            type={"password"}
                            variant={"outlined"}
                            error={passwordErr}
                            helperText={passwordErrMsg}
                            autoFocus
                            fullWidth
                            required
                            color={passwordErr ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value={"remember"} color={"primary"} />}
                        label="Remember me"
                    />
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        onClick={validateInput}
                    >
                        Sign in
                    </Button>
                </Box>
                <Divider>or</Divider>
                <Box
                    sx = {{display: "flex",
                        flexDirection: "column",
                        gap: 2}}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => {}}
                        startIcon={<GoogleIcon />} >
                        Sign in with Google
                    </Button>
                    <Typography sx={{ textAlign: "center"}}>
                        Don&apos;t have account?{' '}
                        <Link
                            variant={"body2"}
                            sx={{ alignSelf: "center" }}
                            href={"/"}
                        > Sign Up</Link>
                    </Typography>
                </Box>
            </Card>
        </Stack>
    );
}