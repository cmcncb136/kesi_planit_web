import axios from "axios"
import {getAuth, onAuthStateChanged} from "firebase/auth"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
})

let authReady = false

const waitForAuthInit = () =>
    new Promise(resolve => {
        const unsubscribe = onAuthStateChanged(getAuth(), () => {
            unsubscribe() //한번 만 호출
            authReady = true
            resolve(null)
        })
    })



axiosInstance.interceptors.request.use(async (config) => {
    if(!authReady) await waitForAuthInit() //auth 초기화 될때 까지 대기

    const auth = getAuth()
    if(auth.currentUser) {
        const token = await auth.currentUser.getIdToken()
        // console.log(`token: ${token}`)
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

