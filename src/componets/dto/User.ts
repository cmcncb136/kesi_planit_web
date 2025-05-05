
export interface User {
    email: string;
    nickName: string;
    imgPath: string;
    gender: string;
    birth: string
    joinDate: string;
    role: string;
}

export interface UserWithUid {
    uid: string;
    email: string;
    nickName: string;
    imgPath: string;
    gender: string;
    birth: string
    joinDate: string;
    role: string;
}