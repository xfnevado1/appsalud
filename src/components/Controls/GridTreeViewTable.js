import React from "react"
import {Table, Button, FormControl, Row, Container} from 'react-bootstrap'
import { useTable, usePagination, useExpanded } from 'react-table'

function GridTreeViewTable({ columns, data, fetchData, pageCount: controlledPageCount, hiddenColumns=[]}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        /* Paginas */
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, 
        hiddenColumns: hiddenColumns,
      }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    useExpanded, usePagination, )
  
    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
      fetchData( pageIndex + 1, pageSize )
    }, [fetchData, pageIndex, pageSize])

    // Render the UI for your table
    return <>
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        </Table>
        <Container>
        <Row>
            <Button onClick={() => gotoPage(1)} disabled={!canPreviousPage}>{'<<'}</Button>&nbsp;
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</Button>&nbsp;
            <Button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</Button>&nbsp;
            <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>&nbsp;
            <span>
              Page &nbsp;
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>&nbsp;
            </span> &nbsp;
              | Go to page:&nbsp;
              <FormControl size="sm" style={{width:"80px"}} type="number" defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
              /> &nbsp;
            <FormControl as="select" size="sm" style={{width:"150px"}} value={pageSize} 
                onChange={e => {
                    
                    setPageSize(Number(e.target.value))
                }}
                >
                {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
                ))}
            </FormControl>
        </Row>
        </Container>
    </>
  }
  
  export default GridTreeViewTable