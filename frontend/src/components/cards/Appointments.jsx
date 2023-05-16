import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardHeader } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  getCustomers,
  deleteCustomer,
  reset,
} from "../../features/customers/customerSlice";


function Appointments({ shop }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCustomers(shop.shopID))
    
    return () => dispatch(reset);
  }, [shop, user, isError, message, dispatch]);

  var customerRows = customers.map((customer) => {
    return {
      id: customer.id,
      firstName: customer.customer.firstName,
      lastName: customer.customer.lastName,
      phone: customer.customer.phone,
      date: customer.date,
      time: customer.time
    };
  });

  const [rows, setRows] = useState(customerRows);

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    dispatch(deleteCustomer(id));
  };

  const columns = [
    { field: "firstName", headerName: "First Name", width: 300 },
    { field: "lastName", headerName: "Last Name", width: 300 },
    { field: "phone", headerName: "Phone", width: 300 },
    { field: "date", headerName: "Date", type: "date", width: 300 },
    { field: "time", headerName: "Time", type: "time", width: 300 },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      width: 250,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<CheckIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Card>
      <CardHeader title="Latest Appointments" />
      <Box sx={{ minWidth: 400 }}>
          <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>
    </Card>
  );
}

export default Appointments;