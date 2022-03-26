import React, { useState, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter,
useFilters, useRowSelect, usePagination,
useAsyncDebounce} from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareDown, faCaretSquareUp, faTrash, } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import TableModal from './TableModal'

const Table = ({MOC_DATA, COLUMNS,
   routeName, title, apiName, noItems, 
}) => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    // const data1 = useMemo(()=>MOC_DATA, [MOC_DATA])
    const [flagged, setFlagged] = useState({})
    const [data, setData] = useState(MOC_DATA)
    const columns = useMemo(()=> COLUMNS, [COLUMNS])
    const tableInstance = useTable({
        columns,
        data
    }, useFilters,
    useGlobalFilter, useSortBy, 
    usePagination, useRowSelect,
    hooks => {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: 'selection',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
          {
            id: 'modify',
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: 'Modify',
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => {
                return(
              <div>
                <Link to ={`/admin/${routeName}/${row.original.id}/edit`} 
                className='link'>Edit asset</Link>
                <button
                onClick = {()=> {
                  setFlagged({...row.original})
                  setShow(true)
                }} 
                className = 'btn danger'>
                    <FontAwesomeIcon icon={faTrash}/></button>
              </div>
            )},
          },
        ])
      }
    )
    const {
        getTableProps, 
        getTableBodyProps,
        // rows,
        state,
        setGlobalFilter,
        prepareRow,
        footerGroups,
        headerGroups,
        page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // selectedFlatRows,
    } = tableInstance
    const { pageIndex, pageSize, globalFilter, selectedRowIds } = state
    const [value, setValue] = useState(globalFilter)
    const handlerChange = useAsyncDebounce(value => 
        setGlobalFilter(value || undefined), 1000)
    
        const IndeterminateCheckbox = React.forwardRef(
            ({ indeterminate, ...rest }, ref) => {
              const defaultRef = React.useRef()
              const resolvedRef = ref || defaultRef
          
              React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
              }, [resolvedRef, indeterminate])
          
              return (
                <>
                  <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
              )
            }
          )
  return (
    <div style={{flex: '4', margin: '0 0.5em'}}>
      {noItems && <p>No assets found</p>}
        <TableModal show ={show} showModal= {showModal}
        setShow = {setShow} setShowModal = {setShowModal}
        selectedItems = {selectedRowIds}
        flagged = {flagged}
        apiName = {apiName}
        data = {data}
        setData = {setData}
        />
        <h1 style={{textAlign: 'left'}}>{title}</h1>
        <div  style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
            {/* <button className='btn' style={{backgroundColor: 'steelblue'}}></button> */}
            {!!Object.keys(selectedRowIds).length && <span style={{textAlign: 'center', flex: '1'}}>
                Number of rows selected: {Object.keys(selectedRowIds).length}
                </span>}
            <Link style ={{marginRight: '0.5em'}}
            to = {`/admin/${routeName}/new`} className = 'link'>
              Add {routeName.substring(0, routeName.length-1)}</Link>
            <button 
            onClick={()=>setShowModal(true)}
            className='btn danger'>Delete selected</button>
            </div>
        <div style={{display: 'flex', marginBottom: '0.5em',fontSize: '1em'}}>
            <label htmlFor="srch">Serach:</label>
            <input type="search" name="search"
            style={{flex: '1', fontSize: '1em',
             padding: '0.25em 0.8em', borderRadius: '0.6em', }} 
            defaultValue = {value || ''} id="srch" 
            placeholder='Filter...'
            onChange = {e => {
                setValue(e.target.value)
                handlerChange(e.target.value)
            }}/>
        </div>
        <table {...getTableProps()} style = {{
            width: '100%'
        }}>
            <thead style = {{
                backgroundColor: 'lightsteelblue',
                boxShadow: '0 0 15px -10px rgba(0,0,0,0.75)'
            }}>
                {headerGroups.map(headerGroup =>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(col => (
                            <th {...col.getHeaderProps(col.getSortByToggleProps())} style ={{
                                padding: '0.5em'
                            }}>
                                {col.render('Header')}
                                <span>
                                {col.isSorted? (col.isSortedDesc?
                                     <FontAwesomeIcon icon = {faCaretSquareDown}/>:
                                      <FontAwesomeIcon icon = {faCaretSquareUp}/>): ''}
                                </span>
                                {/* <div>
                                    {col.canFilter? col.render('Filter'): null}
                                </div> */}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()} >
                {page.map((row) =>{
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()} >
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()} style ={{
                                boxShadow: '0 0 15px -10px rgba(0,0,0,0.75)',
                                padding: '0.5em',
                            }}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                    )
                })}
            </tbody>
            <tfoot style = {{
                backgroundColor: 'lightsteelblue',
                boxShadow: '0 0 15px -10px rgba(0,0,0,0.75)'
            }}>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(col =>(
                            <td {...col.getFooterProps()}>{col.render('Footer')}</td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
        <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        </div>
    </div>
  )
}

export default Table