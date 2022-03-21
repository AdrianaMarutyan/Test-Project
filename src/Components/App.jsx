import {useEffect, useState} from 'react'
import * as React from "react";
import '@progress/kendo-theme-default/dist/all.css';
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import {filterBy} from "@progress/kendo-data-query";
import axios from "axios";
import CreateUserDialog from "./CreateUserDialog";

// different types of imports above

// the main component

const App = () => {
    const [users, setUsers] = useState([]);

    //request for users

    useEffect(() => {
        axios.get(`https://6235e374163bf7c4745f87db.mockapi.io/Users`)
            .then(res => {
                setUsers(res.data)
            }).catch();
    }, []);

    // for filtering

    const initialFilter = {
        logic: "and",
        filters: [
            {
                field: "name",
                operator: "contains",
                value: "",
            },
        ],
    };

    const [filter, setFilter] = useState(initialFilter);



    return (
        <>
            <Grid
                style={{
                    height: "400px",
                }}

                data={filterBy(users, filter)}
                filterable={true}
                filter={filter}
                onFilterChange={(e) => setFilter(e.filter)}
            >
                <Column field="id" title="ID" width="40px" filterable={false}/>

                   <Column field="name" format="{0:c}" title="Name" width="250px"/>


                <Column field="createdAt" title="CreatedAt" filterable={false}/>
            </Grid>




            <CreateUserDialog />
        </>
    );
}

export default App;