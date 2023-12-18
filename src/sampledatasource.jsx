export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.firstname} {params.row.lastname}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellStatus ${params.row.status}`}>{params.row.status}</div>
      );
    },
  },
];

export const userSample = [
  {
    id: 1,
    firstname: "Jm",
    lastname: "Planteras",
    status: "Active",
    role: "Owner",
    email: "jm.planteras@gagaga",
    
  },
  {
    id: 2,
    firstname: "Angelo",
    lastname: "Telamo",
    status: "Inactive",
    role: "Customer",
    email: "angelo@yahoo.com",
  },
  {
    id: 3,
    firstname: "Wally",
    lastname: "Dignos",
    status: "Disable",
    role: "Customer",
    email: "wally.dignos@gmail.com",
  },
  
  
];
