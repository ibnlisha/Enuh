import ColumnFilter from "../components/Admin/main/arts/ColumnFilter"

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        Filter: ColumnFilter
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        Filter: ColumnFilter
        
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        Filter: ColumnFilter,
        Cell: ({value}) => <strong>{value.toUpperCase()}</strong>
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email',
        Filter: ColumnFilter
    },
    {
        Header: 'IP address',
        Footer: 'IP address',
        accessor: 'ip_address',
        Filter: ColumnFilter
    },
]