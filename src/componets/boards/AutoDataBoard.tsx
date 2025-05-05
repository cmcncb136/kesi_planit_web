import Paper from "@mui/material/Paper";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import * as React from "react";
import {useEffect} from "react";
import {axiosInstance} from "../api/axiosInstance";

const generatorColumns = <T extends object>(data: T[]): GridColDef[] => {
    // eslint-disable-next-line eqeqeq
    if (data.length == 0) return []
    const keys = Object.keys(data[0]);

    return keys.map(key =>
        ({field: key, headerName: key.charAt(0).toUpperCase() + key.slice(1), width: 200})
    )


}

export default function AutoDataBoard<T extends object>(props: {apiUrl: string}) {
    const [rows, setRows] = React.useState<T[]>([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: 0,
        pageSize: 15,
    });

    useEffect(() => {
        axiosInstance.get(props.apiUrl, {
            params: {
                page: paginationModel.page,
                size: paginationModel.pageSize,
            }
        }).then(rst => {
            console.log(rst.data);
            setRows(rst.data.content)
            setRowCount(rst.data.totalElements)
        }).catch(e => {
            console.log(e)
        })
    }, [paginationModel]);

    return (
        <Paper sx={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={generatorColumns(rows)}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowCount={rowCount}
                pageSizeOptions={[5, 10, 15]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
}