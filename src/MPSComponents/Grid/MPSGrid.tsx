import React, { useState } from "react";
import { Color } from "react-bootstrap/esm/types";
import { MPSIconBS } from "../MPSComponents";
import { DownlodCSVFromArray, DownlodExcelFromArray } from "metaponder-utility";

export const MPSGrid = ({
  data,
  children,
  onRowCommand,
  isSortable = false,
  gvId,
  showExcelExport = false,
  showCSVExport = false,
  exportButtonColor = "secondary",
  outerClassName = "mt-2",
  caption = "",
  emptyDataText = "No Data Found !",
}: {
  data: any[];
  outerClassName?: string;
  children?: JSX.Element;
  isSortable?: boolean;
  onRowCommand?: Function;
  gvId: string;
  showExcelExport?: boolean;
  showCSVExport?: boolean;
  exportButtonColor?: Color;
  caption?: string;
  emptyDataText?: string;
}) => {
  // const [tableData, setTableData] = useState(data);
  // const [sortCriteria, setSortCriteria] = useState({ field: '', order: 'asc' });

  const headers = children?.props.children?.map((child: any) => {
    return {
      Header: child.props.Header,
      Value: child.props.Value,
      type: child.type.name,
    };
  });

  //////console.log(data);
  const body =
    data.length > 0 ? (
      data.map((myData: any, index: any) => {
        return (
          <tr
            key={Math.random()}
            onSubmit={(event: any) => {
              const row = event.target.closest("tr");
              const AllRows: any[] = [];
              const tableRows = document.querySelectorAll(`#${gvId} tr`);
              const rowsWithTds = Array.from(tableRows).map((row) => {
                return AllRows.push(row);
              });
              AllRows.splice(0, 1);
              AllRows.splice(AllRows.length - 1, 1);
              onRowCommand(
                row,
                { CommandName: event.target.name, ...myData },
                AllRows
              );
            }}>
            {children?.props.children.map((myChild: any) => {
              return GetComponent(myData, myChild);
            })}
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={headers.length} style={{ textAlign: "center" }}>
          <div className="d-flex gap-2 justify-content-center text-warning">
            <MPSIconBS icon="bi-exclamation-triangle" />
            <h6>{emptyDataText}</h6>
          </div>
        </td>
      </tr>
    );
  // function handleSort(field: any) {
  //   if (isSortable) {
  //     const order =
  //       sortCriteria.field === field && sortCriteria.order === 'asc'
  //         ? 'desc'
  //         : 'asc';
  //     const sortedData = [...tableData].sort((a, b) => {
  //       if (a[field] < b[field]) {
  //         return order === 'asc' ? -1 : 1;
  //       }
  //       if (a[field] > b[field]) {
  //         return order === 'asc' ? 1 : -1;
  //       }
  //       return 0;
  //     });
  //     setTableData(sortedData);
  //     setSortCriteria({ field, order });
  //   }
  // }

  const DownloadExcel = (Type: String) => {
    let fileName = self.crypto.randomUUID();
    if (Type === "Excel") {
      DownlodExcelFromArray(fileName + ".xlsx".toString(), data);
    } else {
      DownlodCSVFromArray(fileName + ".csv", data);
    }
  };

  return (
    <div className={outerClassName}>
      <div className="d-flex justify-content-between mb-1">
        <span className="mb-0 ">
          <h6 style={{ color: "#989e99" }}>{caption}</h6>
        </span>

        <div className="d-flex gap-2 ">
          {showExcelExport && data && data.length > 0 && (
            <button
              className={`btn btn-${exportButtonColor} btn-sm`}
              onClick={() => {
                DownloadExcel("Excel");
              }}>
              <MPSIconBS icon="bi-filetype-xlsx" /> Excel
            </button>
          )}
          {showExcelExport && data && data.length > 0 && (
            <button
              className={`btn btn-${exportButtonColor} btn-sm `}
              onClick={() => {
                DownloadExcel("CSV");
              }}>
              <MPSIconBS icon="bi-filetype-csv" /> CSV
            </button>
          )}
        </div>
      </div>

      <div className="table-responsive scrollbar">
        <table className="table table-bordered table-sm shadow-sm" id={gvId}>
          <thead>
            <tr>
              {headers.map((header: any, index: any) => {
                return (
                  <th>
                    {header.Header}{" "}
                    {/* {sortCriteria.field === header.Value &&
                      header.type === 'KKField' && (
                        <span>{sortCriteria.order === 'asc' ? '▲' : '▼'}</span>
                      )} */}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{body}</tbody>
          <tfoot>
            {data && data.length > 0 ? (
              <tr>
                {children?.props.children.map((child: any) => {
                  return GetFooterComp(child);
                })}
              </tr>
            ) : null}
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const GetComponent = (myData: any, myChild: any) => {
  //////console.log(myChild);
  if (myChild.type.name === "MPSField") {
    return <td>{myData[myChild.props.Value]}</td>;
  } else {
    ////console.log(myChild);
    if (myChild.props.children.props.children.type === "button") {
      //////console.log('HEllo');
      return (
        <td>
          <form
            name={myChild.props.children.props.CommandName}
            onSubmit={(event) => {
              event.preventDefault();
            }}>
            {React.createElement(
              myChild.props.children.props.children.type,
              { ...myChild.props.children.props.children.props },
              myChild.props.children.props.children.props.children &&
                myChild.props.children.props.children.props.children
            )}
          </form>
        </td>
      );
    } else {
      const filteredButtonProps = Object.entries(
        myChild.props.children.props.children.props
      ).reduce((acc: any, [key, value]) => {
        if (
          key !== "defaultValue" &&
          key !== "defaultChecked" /* && other props you want to skip */
        ) {
          acc[key] = value;
        }
        return acc;
      }, {});

      let myObjkk = {};

      if (myChild.props.children.props.children.props.type === "checkbox") {
        if (myChild.props.children.props.children.props.defaultChecked) {
          myObjkk = {
            defaultChecked:
              myData[
                myChild.props.children.props.children.props.defaultChecked
              ],
          };
        }
      } else {
        if (myChild.props.children.props.children.props.defaultValue) {
          myObjkk = {
            defaultValue:
              myData[myChild.props.children.props.children.props.defaultValue],
          };
        }
      }

      return (
        <td>
          {React.createElement(
            myChild.props.children.props.children.type,
            {
              ...myObjkk,
              ...filteredButtonProps,
            },
            myChild.props.children.props.children.props.children &&
              myChild.props.children.props.children.props.children
          )}
        </td>
      );
    }
  }
};

const GetFooterComp = (myChild: any) => {
  if (myChild.type.name === "MPSField") {
    return <td></td>;
  } else {
    if (myChild.props.children.props.footer) {
      return (
        <td>
          {React.createElement(
            myChild.props.children.props.footer.type,
            { ...myChild.props.children.props.footer.props },
            myChild.props.children.props.footer.props.children &&
              myChild.props.children.props.footer.props.children
          )}
        </td>
      );
    } else {
      return <td></td>;
    }
  }
};
