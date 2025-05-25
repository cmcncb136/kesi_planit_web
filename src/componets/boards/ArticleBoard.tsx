import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {useEffect} from "react";
import {axiosInstance} from "../api/axiosInstance";
import {Category} from "../article/Category"

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'TITLE', width: 500 },
    { field: 'authorEmail', headerName: 'AUTHOR', width: 130 },
    { field: 'createdTime', headerName: 'CREATED', width: 130 },
];



export default function ArticleBoard(props: {category: Category}) {
    const [row, setRow] = React.useState<object[]>([]);
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({ page: 0   , pageSize: 10 });
    const [rowCount, setRowCount] = React.useState(0);

    useEffect(() => {
        axiosInstance.get("article/list", {
            params: {
                category: Category[props.category],
                page: paginationModel.page,
                size: paginationModel.pageSize,
            }
        }).then(rst => {
            setRow(rst.data.content)
            setRowCount(rst.data.totalPages)
        })
    }, [paginationModel, props.category]);

    return (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={row}
                columns={columns}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10]}
                rowCount={rowCount}
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
                sx={{ border: 0 }}
            />
        </Paper>
    );
}