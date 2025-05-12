import Paper from "@mui/material/Paper";
import {DataGrid, GridColDef, GridPaginationModel} from "@mui/x-data-grid";
import * as React from "react";
import {useEffect} from "react";
import {axiosInstance} from "../api/axiosInstance";
import {TableName} from "./TableName";

const generatorColumnsByObject = <T extends object>(data: T[]): GridColDef[] => {
    // eslint-disable-next-line eqeqeq
    if (data.length == 0) return []
    const keys = Object.keys(data[0]);

    return keys.map(key =>
        ({field: key, headerName: key.charAt(0).toUpperCase() + key.slice(1), width: 150})
    )
}

const generatorColumnsByMap = (data: object): GridColDef[] => {
    const colDef: GridColDef[] = []
    if(data === undefined) return []

    for(const key of Array.from(Object.keys(data))) {
        colDef.push({field: key, headerName: key.charAt(0).toUpperCase() + key.slice(1), width: 150})
    }

    return colDef
}



export default function AutoDataBoard(props: { apiUrl: string, tableName: TableName }) {
    const [rows, setRows] = React.useState<object[]>([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: 0,
        pageSize: 15,
    });

    useEffect(() => {
        axiosInstance.get(props.apiUrl, {
            params: {
                tableName: TableName[props.tableName],
                page: paginationModel.page,
                size: paginationModel.pageSize,
            }
        }).then(rst => {
            console.log(rst.data);
            setRows(rst.data.content);
            setRowCount(rst.data.totalElements)
        }).catch(e => {
            console.log(e)
        })
    }, [paginationModel, props.tableName]);

    return (
        <Paper sx={{height: '70%', width: '100%'}}>
            <DataGrid
                rows={rows}
                getRowId={row => row.ID}
                columns={generatorColumnsByMap(rows[0])}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowCount={rowCount}
                pageSizeOptions={[5, 10, 15]}
                sx={{border: 0}}
            />
        </Paper>
    );
}