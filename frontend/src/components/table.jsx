import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { usePagination } from "react-table/dist/react-table.development";
import ReactPaginate from 'react-paginate'
import { useHistory } from "react-router-dom";

export default function Table({ columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const history = useHistory()

  const HandleRowClick = (data) =>{
    console.log(data)
    history.push(`/details/${data.id}`)
  }


  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="border-gray-200 opacity-30 border-b-2 h-11"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-left  px-5 md:px-8 lg:px-10 xl:px-15 2xl:px-16 md:text-lg text-sm "
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr 
              onClick={()=> HandleRowClick(row.original)}
              className="h-12 hover:bg-gray-200" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="px-5 md:px-8 lg:px-10 xl:px-15 2xl:px-16 md:text-lg text-sm"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
        <div className="flex justify-around items-center mt-8 ">
          <div>
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
          </div>
      <div className="flex justify-center items-center w-40">
        {
          canPreviousPage &&
          <button onClick={()=> previousPage()} className="text-3xl p-2 focus:outline-none">{`<`}</button>
        }
        <h1 className="text-xl mx-32">
        {pageIndex+1}
        </h1>
        {
          canNextPage &&
          <button onClick={()=> nextPage()} className="text-3xl p-2 focus:outline-none" >{`>`}</button>
        }

      </div>
          <div>
          <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
                  </select>

          </div>
        </div>
      </div>
  );
}
