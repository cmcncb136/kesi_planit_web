import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import {User, UserWithUid} from "../dto/User"
import Paper from "@mui/material/Paper";
import * as React from "react";
import {axiosInstance} from "../api/axiosInstance";
import {useEffect} from "react";


const columns: GridColDef[] = [
    { field: 'uid', headerName: 'Uid', width: 300 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'nickName', headerName: 'NickName', width: 130 },
    { field: 'imgPath', headerName: 'Image Path', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'birth', headerName: 'Birth', width: 100 },
    { field: 'joinDate', headerName: 'Join Date', width: 100 },
    { field: 'role', headerName: 'Role', width: 100 },
];


export default function UserTable() {
    const [rows, setRows] = React.useState<UserWithUid[]>([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
    });

    useEffect(() => {
        axiosInstance.get(`/admin/users`, {
            params: {
                page: paginationModel.page,
                size: paginationModel.pageSize,
            }
        }).then(rst => {
            console.log(rst.data);
            setRows(rst.data.content)
            setRowCount(rst.data.totalElements)
        })
    }, [paginationModel]);

    return (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row.email}
                columns={columns}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowCount={rowCount}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}