let data = JSON.parse(localStorage.getItem("myData")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = -1;


function displayData() {
    let tableBody = document.getElementById("data-body");
    let searchValue = document.getElementById("search").value;

    tableBody.innerHTML = "";

    let filteredData = data
        .map((name, index) => ({ name, index }))
        .filter(item => item.name.includes(searchValue));

    if (filteredData.length === 0) {
        tableBody.innerHTML = "No data found.";
        return;
    }
    let table =
        `<table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;
    filteredData.forEach(function (item) {
        table +=
            `<tr>
                <td>${item.name}</td>
                <td>
                    <button onclick="editData(${item.index})">Edit</button>
                    <button onclick="deleteData(${item.index})">Delete</button>
                </td>
            </tr>`;
    });

    tableBody.innerHTML = table;
}

function handleSubmit(event) {
    event.preventDefault();




    let name = document.getElementById("name").value;

    if (name.length > 0) {
        document.getElementById("error").innerText = ("");
    } else {
        document.getElementById("error").innerText = ("enter data!!!");
        return;
    }

    let duplicateIndex = data.findIndex(function (item) {
        return item === name;
    });

    if (editIndex === -1) {

        if (duplicateIndex !== -1) {
            document.getElementById("error").innerText = "Same data already exists!";
            return;
        }

        data.push(name);

    } else {

        if (duplicateIndex !== -1 && duplicateIndex !== editIndex) {
            document.getElementById("error").innerTexterrorAdd = "Same data already exists!";
            return;
        }

        data[editIndex] = name;
        editIndex = -1;
        document.getElementById("btn").innerText = "Submit";
    }

    localStorage.setItem("myData", JSON.stringify(data));

    document.getElementById("name").value = "";

    displayData();
}

function editData(index) {
    document.getElementById("name").value = data[index];

    editIndex = index;

    document.getElementById("btn").innerText = "Update";
}


function deleteData(index) {
    data.splice(index, 1);

    localStorage.setItem("myData", JSON.stringify(data));
    displayData();
}  
 const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("userName").textContent = user.name;
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userpassword").textContent = user.password;
    }

displayData();    