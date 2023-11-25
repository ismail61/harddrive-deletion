import React, { useState } from "react";
import "./index.css";
import { useTable } from "react-table";

const CustomerView = () => {
  const data = React.useMemo(
    () => [
      { id: 1, collectionDate: "23/12/12", device: "Android" },
      { id: 2, collectionDate: "23/12/12", device: "Ios" },
      { id: 3, collectionDate: "23/12/12", device: "Mac" },
      { id: 4, collectionDate: "23/12/12", device: "Linux" },
      { id: 5, collectionDate: "23/12/12", device: "Mint"}
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Id", accessor: "id" },
      { Header: "CollectionDate", accessor: "collectionDate" },
      {
        Header: "Device",
        accessor: "device",
        Cell: ({ row }) => (
          <select
            value={row.values.country}
            onChange={(e) => {
              // Handle dropdown change here
              console.log(`Selected country: ${e.target.value}`);
            }}
          >
            <option value="Android">Android</option>
            <option value="Ios">Ios</option>
            <option value="Mac">Mac</option>
            <option value="Linux">Linux</option>
          </select>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  //this is for order result
  const [orderinput, setOrderinput] = useState("");
  const [orderResult, setOrderResult] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setOrderinput(value);
    const calculatedResult = value ? Math.pow(parseFloat(value), 2) : "";
    setOrderResult(calculatedResult);
  };

  //this is for after getting the code
  const [codeinput, setCodeinput] = useState("");
  const [codeResult, setcodeResult] = useState("");

  const handleCodeChange = (event) => {
    const value = event.target.value;
    setCodeinput(value);
    const calculatedResult = value ? Math.pow(parseFloat(value), 2) : "";
    setcodeResult(calculatedResult);
  };

  return (
    <>
      <div className="calc container pb-5">
        <div className="pr-4">
          <label>
            Enter Order:
            <input
              type="number"
              value={orderinput}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="pr-2">
          <label>
            Code:
            <input
              type="number"
              value={codeinput}
              onChange={handleCodeChange}
            />
          </label>
        </div>
        <div>Devices Deletion Progress: {orderResult}</div>
      </div>

      <div className="container pt-4 pb-4">
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "auto" }}>
        <table {...getTableProps()} style={{ width: "100%" }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default CustomerView;
