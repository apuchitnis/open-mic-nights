import React, { useState, useEffect } from "react";
import { useFilters, useTable } from "react-table";
import { BsPencilSquare } from "react-icons/bs";
import Map from "./Map";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

const SpreadsheetId = "1_X_znvg8kGbFMXoys011182T5ZTGONCsveY9uLEWsr8";
const { GoogleSpreadsheet } = require("google-spreadsheet");
const {ApiKey }= require('./constants');

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);
  
    // Render a multi-select box
    return (
      <select
        className="select is-small"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
  
  function SearchColumnFilter({ column: { filterValue, setFilter } }) {
    return (
      <input
        className="input is-small"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    );
  }

function TableAndMap() {
    const [data, setData] = useState({
      headerValues: null,
      rows: [],
      isFetching: false,
    });
  
    useEffect(() => {
      (async function () {
        try {
          setData({ ...data, isFetching: true });
  
          const doc = new GoogleSpreadsheet(SpreadsheetId);
          doc.useApiKey(ApiKey);
          await doc.loadInfo();
  
          const sheet = doc.sheetsByIndex[0];
          const rows = await sheet.getRows();
  
          setData({
            headerValues: sheet.headerValues,
            rows: rows,
            isFetching: false,
          });
        } catch (e) {
          console.error(e);
          setData({ ...data, isFetching: false });
        }
      })();
    }, []);
  
    const rowsData = React.useMemo(() => {
      if (!data.isFetching && data.headerValues != null) {
        return data.rows.map((row) => {
          return {
            Address: row["Address"],
            AudienceEntryFee: row["Audience Entry Fee"],
            HowToBook: row["Contact / Book a Spot"],
            Language: row["Language"],
            Category: row["Event Category"],
            SubCategory: row["Event Sub-Category"],
            Status: row["Status"],
            OrganizerName: row["Organizer Name"],
            Description: row["Event Description"],
            FacebookGroup: row["Facebook Group"],
            FacebookPage: row["Facebook Page"],
            WhatsApp: row["WhatsApp"],
            Frequency: row["Frequency"],
            Indoor: row["Indoor / Outdoor"],
            Instagram: row["Instagram"],
            Latitude: row["Latitude"],
            Level: row["Comedian Level"],
            Longitude: row["Longitude"],
            Name: row["Name"],
            PayToPlay: row["Pay to Play"],
            RowNumber: row.rowNumber,
            Time: row["Event Time"],
            UpdateInfoFormLink: row["Update Info Form Link"],
            Venue: row["Venue"],
            WalkIn: row["Walk-in"],
            Weekday: row["Weekday / Month"],
            Website: row["Website"],
            WheelchairAccess: row["Wheelchair Access"],
          };
        });
      }
      return [];
    }, [data]);
  
    const columns = React.useMemo(() => {
      if (!data.isFetching && data.headerValues != null) {
        return [
          {
            Header: "",
            accessor: "UpdateInfoFormLink",
            disableFilters: true,
            Cell: ({ row }) => {
              return (
                <a href={row.original.UpdateInfoFormLink} target="_blank">
                  <BsPencilSquare />
                </a>
              );
            },
          },
          {
            Header: "",
            accessor: "Instagram",
            disableFilters: true,
            Cell: ({ row }) => {
              return (
                <div>
                  <a href={row.original.Instagram}>
                    <BsInstagram />
                  </a>
                  <a href={row.original.FacebookPage}>
                    <BsFacebook />
                  </a>
                  <a href={row.original.WhatsApp}>
                    <BsWhatsapp />
                  </a>
                </div>
              );
            },
          },
          {
            Header: "Name",
            accessor: "Name",
            disableFilters: true,
            Filter: SearchColumnFilter,
          },
          {
            Header: "Description",
            accessor: "Description",
            hideInitially: true,
            Filter: SearchColumnFilter,
          },
          {
            Header: "Category",
            accessor: "Category",
            hideInitially: true,
            Filter: SearchColumnFilter,
          },
          {
            Header: "Sub Category",
            accessor: "SubCategory",
            hideInitially: true,
            Filter: SearchColumnFilter,
          },
          {
            Header: "Status",
            accessor: "Status",
            Filter: SelectColumnFilter,
            filter: "equals",
          },
          {
            Header: "Organizer Name",
            accessor: "OrganizerName",
            hideInitially: true,
            Filter: SearchColumnFilter,
          },
          // {
          //   Header: "Walk In",
          //   accessor: "WalkIn",
          //   hideInitially: true,
          //   Filter: SelectColumnFilter,
          // },
          // {
          //   Header: "Pay to Play",
          //   accessor: "PayToPlay",
          //   hideInitially: true,
          //   Filter: SelectColumnFilter,
          // },
          {
            Header: "Audience Entry Fee",
            accessor: "AudienceEntryFee",
            hideInitially: true,
            Filter: SelectColumnFilter,
          },
          {
            Header: "Level",
            accessor: "Level",
            Filter: SelectColumnFilter,
            filter: "equals",
          },
          {
            Header: "Language",
            accessor: "Language",
            Filter: SelectColumnFilter,
          },
          {
            Header: "Frequency",
            accessor: "Frequency",
            Filter: SelectColumnFilter,
            //hideInitially: true,
          },
          {
            Header: "Weekday",
            accessor: "Weekday",
            Filter: SelectColumnFilter,
          },
          {
            Header: "Time",
            accessor: "Time",
            Filter: SearchColumnFilter,
          },
          {
            Header: "Venue",
            accessor: "Venue",
            Filter: SearchColumnFilter,
            disableFilters: true,
          },
          {
            Header: "Website",
            accessor: "Website",
            hideInitially: true,
            disableFilters: true,
          },
          {
            Header: "Address",
            accessor: "Address",
            Filter: SearchColumnFilter,
            disableFilters: true,
          },
          {
            Header: "Wheelchair Access",
            accessor: "WheelchairAccess",
            hideInitially: true,
            Filter: SelectColumnFilter,
          },
          {
            Header: "How To Book",
            accessor: "HowToBook",
            Filter: SearchColumnFilter,
            disableFilters: true,
          },
          {
            Header: "Facebook Group",
            accessor: "FacebookGroup",
            hideInitially: true,
            disableFilters: true,
            Cell: ({ row }) => {
              return (
                <a href={row.original.FacebookGroup}>
                  {row.original.FacebookGroup}
                </a>
              );
            },
          },
          // {
          //   Header: "Indoor?",
          //   accessor: "Indoor",
          //   hideInitially: true,
          //   Filter: SelectColumnFilter,
          // },
        ];
      }
      return [];
    }, [data]);
  
    const initialFilterSettings = React.useMemo(() => {
      return [{ id: "BackOn", value: "Yes" }];
    });
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      allColumns,
    } = useTable(
      {
        columns,
        data: rowsData,
        initialState: {
          hiddenColumns: columns
            .filter((c) => c.hideInitially)
            .map((c) => c.accessor),
          filters: initialFilterSettings,
        },
      },
      useFilters
    );
  
    // line is zero-based
    // line is the row number that you want to see into view after scroll
  
    return (
      <>
        <div className="columns is-multiline">
          <span className="map column is-12-mobile is-5-desktop">
            <Map results={rows} />
          </span>
          <span className="table_wrapper column is-12-mobile is-7-desktop">
            <div id="table-dropdown" className="dropdown">
              <div className="dropdown-trigger">
                <button
                  className="button"
                  onClick={() =>
                    document
                      .getElementById("table-dropdown")
                      .classList.toggle("is-active")
                  }
                >
                  Select columns 🔽
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                {allColumns.map((column) => (
                  <div key={column.id} className="dropdown-content">
                    <label className="checkbox">
                      <input type="checkbox" {...column.getToggleHiddenProps()} />
                      {column.id}
                    </label>
                  </div>
                ))}
              </div>
            </div>
  
            <table className="table is-hoverable" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
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
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </span>
        </div>
      </>
    );
  }

  export default TableAndMap;