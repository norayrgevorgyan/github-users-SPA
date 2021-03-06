export default function drawTable(records) {
    if (records.length === 0) {
        return false;
    }
    const table = document.createElement('table');
    table.classList.add("records-table");
    const recordsTable = document.createElement('tbody');
    for (const rec of records) {
        recordsTable.appendChild(createRecordItem(rec))
    }
    table.appendChild(recordsTable);
    return table;
}

function createRecordItem(item)
{
    const itemRow = document.createElement('tr');
    const itemName = document.createElement('td');
    itemName.innerHTML = item.name;
    const itemURL = document.createElement('a');
    itemURL.setAttribute('href', item.html_url);
    itemURL.setAttribute('target', 'blank');
    itemURL.innerHTML = item.html_url;
    const itemURLTd = document.createElement('td');
    itemURLTd.appendChild(itemURL);
    itemRow.appendChild(itemName);
    itemRow.appendChild(itemURLTd);
    return itemRow;
}

