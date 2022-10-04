export function createTable(rows: any[]) {
  const tbl = document.createElement("table");

  tbl.classList.add("table");
  tbl.classList.add("table-striped");

  tbl.style.width = "100%";

  const tbdy = document.createElement("tbody");

  tbl.appendChild(tbdy);

  for (const row of rows) {
    let tr = tbdy.insertRow();
    for (const cellName in row) {
      let td = tr.insertCell();
      const cell = row[cellName];
      td.appendChild(document.createTextNode(cell));
    }
  }

  return tbl;
}
