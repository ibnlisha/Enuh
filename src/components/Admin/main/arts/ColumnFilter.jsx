
const ColumnFilter = ({column}) => {
    const {filterValue, setFilter} = column
  return (
    <span>
        <input type="search" name="columnFilter" id=""
        placeholder="Filter column"
        value={filterValue || ''}
        onChange={e=>setFilter(e.target.value)} />
    </span>
  )
}

export default ColumnFilter