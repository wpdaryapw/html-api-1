var currentStorage;

function getStorage() {
    currentStorage = localStorage; 
    updateTable();
}

function updateTable() {
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    var keys = Object.keys(currentStorage);

    if (keys.length === 0) {
        var emptyRow = document.createElement('tr');
        var emptyHeaderCell = document.createElement('td');
        emptyHeaderCell.colSpan = 3;
        emptyHeaderCell.textContent = 'No data available';
        emptyRow.appendChild(emptyHeaderCell);
        tableBody.appendChild(emptyRow);
    } else {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var data = currentStorage.getItem(key);

            var row = document.createElement('tr');

            var idCell = document.createElement('td');
            idCell.textContent = i + 1;
            var dataCell = document.createElement('td');
            dataCell.textContent = data;

            var deleteCell = document.createElement('td');
            var deleteButton = document.createElement('span');
            deleteButton.textContent = 'X';
            deleteButton.onclick = function() {
                deleteItem(key);
            };

            deleteCell.appendChild(deleteButton);
            row.appendChild(idCell);
            row.appendChild(dataCell);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        }
    }
}

function saveItem(key, value) {
    currentStorage.setItem(key, value);
    updateTable();
}

function deleteItem(key) {
    var confirmDelete = confirm("Вы уверены, что хотите удалить эту запись?");

    if (confirmDelete) {
        currentStorage.removeItem(key);
        updateTable();
    }
}

function clearStorage() {
    var confirmClear = confirm("Вы уверены, что хотите полностью очистить хранилище?");

    if (confirmClear) {
        currentStorage.clear();
        updateTable();
    }
}

function switchToLocal() {
    currentStorage = localStorage;
    updateTable();
}

function switchToSession() {
    currentStorage = sessionStorage;
    updateTable();
}
