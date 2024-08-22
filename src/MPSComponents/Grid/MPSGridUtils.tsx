export const findControl = (row: any, id: string) => {
  const myProps = row.closest('tr').querySelector(`[id=${id}]`);
  return { ...myProps };
};

export const getGridData = (gvId: any) => {
  const AllRows: any[] = [];
  const tableRows = document.querySelectorAll(`#${gvId} tr`);
  const rowsWithTds = Array.from(tableRows).map((row) => {
    return AllRows.push(row);
  });
  AllRows.splice(0, 1);
  AllRows.splice(AllRows.length - 1, 1);
  return AllRows;
};

export const Eval = (val: any) => {
  return val;
};
