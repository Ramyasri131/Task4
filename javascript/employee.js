import { fetchData, employee, roleDetails } from "./module.js";
fetchData();
createTable(employee);
var sortingOrders = [];
var imageData;
var filter = true;
var btn = "";
function addOnClickFunctions() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    (_a = document.getElementById("searchBar")) === null || _a === void 0 ? void 0 : _a.addEventListener("keypress", function (event) {
        displaySearchedName(event);
    });
    (_b = document.getElementById("export")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
        exportToExcel();
    });
    (_c = document.getElementsByClassName("add-employee")[0]) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
        openEmployeeForm();
    });
    (_d = document.getElementsByClassName("sort-icon")[0]) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
        hideAdvanceFilter();
    });
    (_e = document.getElementById("reset-btn")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function () {
        resetFilters();
    });
    (_f = document.getElementById("apply-btn")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function () {
        applyDropDownFilter();
    });
    (_g = document.getElementById("delete-btn")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function () {
        deleteSelectedEmployeeRows();
    });
    (_h = document.getElementById("header-check-box")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", function () {
        checkAllCheckBoxes();
    });
    document.querySelector('[onclick="sortEmployeeTable(1)"]').addEventListener('click', function () {
        sortEmployeeTable(1);
    });
    document.querySelector('[onclick="sortEmployeeTable(2)"]').addEventListener('click', function () {
        sortEmployeeTable(2);
    });
    document.querySelector('[onclick="sortEmployeeTable(3)"]').addEventListener('click', function () {
        sortEmployeeTable(3);
    });
    document.querySelector('[onclick="sortEmployeeTable(4)"]').addEventListener('click', function () {
        sortEmployeeTable(4);
    });
    document.querySelector('[onclick="sortEmployeeTable(5)"]').addEventListener('click', function () {
        sortEmployeeTable(5);
    });
    document.querySelector('[onclick="sortEmployeeTable(6)"]').addEventListener('click', function () {
        sortEmployeeTable(6);
    });
    document.querySelector('[onclick="sortEmployeeTable(7)"]').addEventListener('click', function () {
        sortEmployeeTable(7);
    });
    (_j = document.getElementsByClassName("cancel-button")[0]) === null || _j === void 0 ? void 0 : _j.addEventListener("click", function (event) {
        clearInputFeilds(event);
    });
    (_k = document.getElementsByClassName("submit-button")[0]) === null || _k === void 0 ? void 0 : _k.addEventListener("click", function (event) {
        formSubmission(event);
    });
    (_l = document.getElementsByClassName("edit-button")[0]) === null || _l === void 0 ? void 0 : _l.addEventListener("click", function (event) {
        editEmployeeDetails(event);
    });
    (_m = document.getElementsByClassName("save-button")[0]) === null || _m === void 0 ? void 0 : _m.addEventListener("click", function (event) {
        saveEmployeeDetails(event);
    });
    document.querySelectorAll(".hidden-options").forEach(ele => {
        ele.addEventListener("click", function () {
            displayhiddenOptions(this);
        });
    });
    document.querySelectorAll(".check-box").forEach(ele => {
        ele.addEventListener("change", function () {
            enableCheckBox();
        });
    });
    document.querySelectorAll(".delete-selected-row").forEach(ele => {
        ele.addEventListener("click", function () {
            deleteRow(this);
        });
    });
}
window.document.addEventListener("DOMContentLoaded", function () {
    var _a;
    var today = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    (_a = document.getElementsByName("todaysdate")[0]) === null || _a === void 0 ? void 0 : _a.setAttribute('min', today);
    let header = document.querySelector(".header");
    let headerHeight = header === null || header === void 0 ? void 0 : header.offsetHeight;
    let description = document.querySelector(".employee-section");
    let descriptionHeight = description === null || description === void 0 ? void 0 : description.offsetHeight;
    let filter = document.querySelector(".filter-section");
    let filterHeight = filter === null || filter === void 0 ? void 0 : filter.offsetHeight;
    let advanceFilter = document.querySelector(".advance-filter-section");
    let advanceFilterHeight = advanceFilter === null || advanceFilter === void 0 ? void 0 : advanceFilter.offsetHeight;
    let deleteSection = document.querySelector(".delete-section");
    let deleteSectionHeight = deleteSection === null || deleteSection === void 0 ? void 0 : deleteSection.offsetHeight;
    let totalHeight = headerHeight + descriptionHeight + filterHeight + advanceFilterHeight + deleteSectionHeight;
    totalHeight += 52;
    let tableHeight = "calc(100vh - " + totalHeight + "px)";
    let table = document.querySelector(".table-div");
    table.style.height = tableHeight;
});
roleDetails.forEach(r => {
    let newOption = new Option(r.roleName, r.roleName);
    let dropDownRole = document.getElementById("roleDropDown");
    dropDownRole === null || dropDownRole === void 0 ? void 0 : dropDownRole.add(newOption, undefined);
});
attachListnerToChangeStatus();
// creating table
function createTable(data) {
    let tbody = document.getElementById("tableBody");
    let i;
    for (i = 0; i < data.length; i++) {
        let tableRow = document.createElement("tr");
        tableRow.classList.add("row");
        tableRow.innerHTML += `<td class="details"><input type="checkbox" class="check-box"></td>
     <td class="details">
     <div class="user-data d-flex">
     <img src=${data[i].employeeImg} alt="profile-icon" />
     <div class="user-name d-flex">
         <span  class="emp-details font-weight-500">${data[i].Name}</span>
         <span class="email" class="emp-details font-weight-500">${data[i].mailId}</span>
     </div>
    </div></td>
    <td class="details"><span class="emp-details font-weight-500">${data[i].location}</span>
        </td>
     <td class="details">
         <span class="emp-details font-weight-500">${data[i].department}</span>
     </td>
     <td class="details">
         <span  class="emp-details font-weight-500">${data[i].role}</span>
     </td>
     <td class="details">
         <span class="emp-details font-weight-500">${data[i].empNo}</span>
     </td class="details">
     <td class="details">
         <div  class="active" id="changeBackGround">
             <span class="emp-details font-weight-500">${data[i].status}</span>
         </div>
     </td>
     <td class="details">
        <span class="emp-details font-weight-500">${data[i].dateofJoin}</span>
    </td>
    <td class="details">
        <div class="hidden-options">
            <img src="../assets/images/dots.png" alt="more-icon" class="more-options">
            <div class="options">
               <div class="edit-employee">View</div>
               <div class="delete-selected-row">Delete</div>
               <div class="status-option">Mark as ${data[i].status === 'In-Active' ? 'Active' : 'In-Active'}</div>
            </div>
        </div>
    </td>`;
        tbody === null || tbody === void 0 ? void 0 : tbody.append(tableRow);
        // In active
        if (data[i].status == "In-Active") {
            document.querySelectorAll("#changeBackGround")[i].classList.remove("active");
            document.querySelectorAll("#changeBackGround")[i].classList.add("in-active");
        }
    }
    onclickEditOption();
    addOnClickFunctions();
    document.getElementById("delete-btn").disabled = true;
}
//change the status of the employee
function attachListnerToChangeStatus() {
    let array = Array.from(document.getElementsByClassName("status-option"));
    array.forEach(icon => {
        icon.addEventListener("click", function () {
            let row = icon.parentElement.parentElement.parentElement.parentElement;
            let col = row.querySelectorAll("td");
            let employeeId;
            col.forEach(cell => {
                if (cell.cellIndex === 5) {
                    employeeId = cell.innerText.trim();
                }
                if (cell.cellIndex === 6) {
                    let division = document.createElement("div");
                    if (cell.innerText == "In-Active") {
                        changeStatus(cell, division, "Active", "active", icon, employeeId);
                    }
                    else if (cell.innerText == "Active") {
                        changeStatus(cell, division, "In-Active", "in-active", icon, employeeId);
                    }
                    localStorage.setItem('employee', JSON.stringify(employee));
                }
            });
            applyDropDownFilter();
        });
    });
}
function changeStatus(cell, division, status, className, icon, employeeId) {
    cell.innerText = "";
    division.innerText = status;
    division.classList.add(className);
    cell.appendChild(division);
    icon.innerText = status == "Active" ? "Mark as In-Active" : "Mark as Active";
    employee.forEach(r => {
        if (r.empNo == employeeId) {
            r.status = status;
        }
    });
}
//to enable and edit the details of an emoloyee
export function editEmployeeDetails(event) {
    event.preventDefault();
    document.querySelector(".upload-image-btn").disabled = false;
    let formInputs = ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "dropDownLocation", "roleDropDown", "DepartmentDropDown", "joinDate", "assignManager", "assignProject"];
    formInputs.forEach(ele => {
        document.getElementById(ele).disabled = false;
    });
    document.querySelector(".edit-button").style.display = "none";
    document.querySelector(".save-button").style.display = "block";
}
export function saveEmployeeDetails(event) {
    event.preventDefault();
    let id = document.getElementById("empNo").value;
    let formInputs = ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "joinDate"];
    let validMsg = ["validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join"];
    let isInvalid = 0;
    let j = 0;
    for (let i = 0; i < formInputs.length; i++) {
        if (document.getElementById(formInputs[i]).value.length < 1) {
            if (formInputs[i] == "mailId") {
                j += 1;
            }
            invalidInput(document.getElementById(validMsg[i]), document.getElementById(formInputs[i]), "This field is required");
            isInvalid = 1;
        }
    }
    if (document.getElementById("mobileNumber").value.length < 10) {
        invalidInput(document.getElementById("phone-number"), document.getElementById("mobileNumber"), "Enter 10 digits");
        isInvalid = 1;
    }
    let st = 0;
    for (let i = 0; i < document.getElementById("mailId").value.length; i++) {
        if (document.getElementById("mailId").value[i] == '@') {
            st = i + 1;
        }
    }
    let result = document.getElementById("mailId").value.slice(st);
    if (result != "tezo.com" && j == 0) {
        invalidInput(document.getElementById("valid"), document.getElementById("mailId"), "Email invalid");
        isInvalid = 1;
    }
    let inputDOJ = document.getElementById("joinDate").value;
    let [yy, mm, dd] = inputDOJ.split('-');
    let formattedDOJ = dd + "/" + mm + "/" + yy;
    let [yyy, mmm, ddd] = document.getElementById("dateOfBirth").value.split('-');
    let formattedDOB = ddd + "/" + mmm + "/" + yyy;
    employee.forEach(r => {
        var _a;
        if (r.empNo == id) {
            r.employeeImg = imageData ? imageData : r.employeeImg;
            r.Name = document.getElementById(formInputs[0]).value + " " + document.getElementById(formInputs[1]).value;
            r.mailId = document.getElementById(formInputs[3]).value;
            r.location = document.getElementById("dropDownLocation").value;
            r.dateofJoin = formattedDOJ;
            r.department = document.getElementById("DepartmentDropDown").value;
            r.role = ((_a = document.getElementById("roleDropDown").value) === null || _a === void 0 ? void 0 : _a.length) ? document.getElementById("roleDropDown").value : "N/A";
            r.dateOfBirth = formattedDOB;
            r.manager = document.getElementById("assignManager").value;
            r.project = document.getElementById("assignProject").value;
        }
    });
    localStorage.setItem('employee', JSON.stringify(employee));
    let tbody = document.getElementById("tableBody");
    tbody ? tbody.innerText = " " : " ";
    applyDropDownFilter();
    if (isInvalid != 1) {
        document.querySelector(".employeetable-container").style.display = "block";
        document.querySelector(".form-container").style.display = "none";
        document.querySelector(".save-button").style.display = "none";
        document.querySelector(".submit-button").style.display = "block";
    }
}
// edit employee details
function onclickEditOption() {
    document.querySelectorAll(".edit-employee").forEach(emp => {
        emp.addEventListener("click", function () {
            document.querySelector(".employeetable-container").style.display = "none";
            document.querySelector(".form-container").style.display = "block";
            document.querySelector(".submit-button").style.display = "none";
            document.querySelector(".edit-button").style.display = "block";
            document.getElementById("firstName").disabled = true;
            let row = emp.parentElement.parentElement.parentElement.parentElement;
            let employeeId;
            let col = row.querySelectorAll("td");
            col.forEach(cell => {
                if (cell.cellIndex === 5) {
                    employeeId = cell.innerText.trim();
                }
            });
            document.querySelector(".upload-image-btn").disabled = true;
            let formInputs = ["mailId", "assignProject", "assignManager", "mobileNumber", "DepartmentDropDown", "dropDownLocation", "roleDropDown"];
            let employeeDataLabels = ["r.mailId", "r.project", "r.manager", "r.number", "r.department", "r.location", "r.role"];
            employee.forEach(r => {
                if (r.empNo == employeeId) {
                    let firstName = document.getElementById("firstName");
                    let lastName = document.getElementById("lastName");
                    let dob = document.getElementById("dateOfBirth");
                    let dateofJoin = document.getElementById("joinDate");
                    let id = document.getElementById("empNo");
                    for (let i = 0; i < formInputs.length; i++) {
                        disableInputFields(document.getElementById(formInputs[i]), eval(employeeDataLabels[i]));
                    }
                    let [dd, mm, yy] = r.dateofJoin.split('/');
                    let formattedDOJ = yy + "-" + mm + "-" + dd;
                    disableInputFields(dateofJoin, formattedDOJ);
                    let [ddd, mmm, yyy] = r.dateOfBirth.split('/');
                    let formattedDOB = yyy + "-" + mmm + "-" + ddd;
                    disableInputFields(dob, formattedDOB);
                    let [fname, lname] = r.Name.split(" ");
                    if (lname == undefined) {
                        disableInputFields(lastName, "");
                    }
                    else {
                        disableInputFields(lastName, lname);
                    }
                    document.getElementById("display-image").src = r.employeeImg;
                    disableInputFields(firstName, fname);
                    disableInputFields(id, r.empNo);
                    document.querySelector(".upload-image-btn").addEventListener("change", function (event) {
                        let imgdisplay = document.getElementById("display-image");
                        imgdisplay.src = URL.createObjectURL(event.target.files[0]);
                        let fileReader = new FileReader();
                        fileReader.onload = function () {
                            imageData = fileReader.result;
                        };
                        fileReader.readAsDataURL(event.target.files[0]);
                    });
                }
            });
        });
    });
}
//to disable the items
function disableInputFields(ele, val) {
    ele.value = val;
    ele.disabled = true;
}
//function to handle the display of options    
var hidden = true;
export function displayhiddenOptions(x) {
    if (hidden) {
        openhiddenOptions(x);
    }
    else {
        closehiddenOptions(x);
    }
    hidden = !hidden;
}
// to display the options
function openhiddenOptions(x) {
    x.querySelector(".options").style.visibility = "visible";
}
//to hide the options
function closehiddenOptions(x) {
    x.querySelector(".options").style.visibility = "hidden";
}
//to hide the options wherever i click on page
document.addEventListener("click", (event) => {
    let target = event.target;
    let optionsContainer = Array.from(document.getElementsByClassName("hidden-options"));
    if (target.className != "more-options" && target.className != "options") {
        optionsContainer.forEach(r => {
            if (r.querySelector(".options").style.visibility == "visible") {
                displayhiddenOptions(r);
            }
        });
    }
});
//to delete the row
function deleteRow(x) {
    let row = x.parentElement.parentElement.parentElement.parentElement;
    let empNo;
    let col = row.querySelectorAll("td");
    col.forEach(cell => {
        if (cell.cellIndex == 5) {
            empNo = cell.textContent.trim();
        }
    });
    let count = 0;
    employee.forEach(r => {
        if (r.empNo == empNo) {
            employee.splice(count, 1);
        }
        count++;
        localStorage.setItem('employee', JSON.stringify(employee));
    });
    applyDropDownFilter();
}
//open form
function openEmployeeForm() {
    document.querySelector(".employeetable-container").style.display = "none";
    document.querySelector(".form-container").style.display = "block";
    document.querySelector(".upload-image-btn").disabled = false;
    let imgdisplay = document.getElementById("display-image");
    if (imgdisplay != null)
        imgdisplay.src = "../assets/images/upload-image.png";
    let formInputs = ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "dropDownLocation", "DepartmentDropDown", "roleDropDown", "joinDate", "empNo", "assignManager", "assignProject"];
    formInputs.forEach(r => {
        document.getElementById(r).disabled = false;
        document.getElementById(r).value = "";
    });
    document.querySelector(".upload-image-btn").addEventListener("change", function (event) {
        let imgdisplay = document.getElementById("display-image");
        imgdisplay.src = URL.createObjectURL(event.target.files[0]);
        let fileReader = new FileReader();
        fileReader.onload = function () {
            imageData = fileReader.result;
        };
        fileReader.readAsDataURL(event.target.files[0]);
    });
}
// hiding  and opening the advance filter when we add click on filter icon
function hideAdvanceFilter() {
    const advanceFilter = document.querySelector(".advance-filter-section");
    const table = document.querySelector(".table-container");
    const tableBody = document.querySelector(".table-div");
    if (filter) {
        advanceFilter ? advanceFilter.style.display = "none" : null;
        table ? table.style.height = "350px" : null;
        tableBody ? tableBody.style.height = "270px" : null;
    }
    else {
        advanceFilter ? advanceFilter.style.display = "flex" : null;
        table ? table.style.height = "292px" : null;
        tableBody ? tableBody.style.height = "235px" : null;
    }
    filter = !filter;
}
// display searched values on clicking enter
function displaySearchedName(event) {
    var input = document.getElementById("searchBar").value.toUpperCase();
    if (event.keyCode == 13 && input.length >= 3) {
        searchTable(input);
    }
    else {
        let tbody = document.getElementById("tableBody");
        tbody ? tbody.innerHTML = ' ' : null;
        createTable(employee);
        attachListnerToChangeStatus();
    }
}
function searchTable(input) {
    var tableData = document.querySelector(".table");
    var tr = Array.from(tableData.getElementsByClassName("row"));
    let tableRow = [];
    tr.forEach(r => {
        let rowData = [];
        let col = r.querySelectorAll("td");
        col.forEach(cell => {
            if (cell.cellIndex === 1) {
                let image = cell.querySelector("img");
                rowData.employeeImg = image.src;
                let userdata = cell.innerText.trim();
                let [name, email] = userdata.split("\n");
                rowData.Name = name;
                rowData.mailId = email;
            }
            else if (cell.cellIndex === 2) {
                rowData.location = cell.innerText.trim();
            }
            else if (cell.cellIndex === 3) {
                rowData.department = cell.innerText.trim();
            }
            else if (cell.cellIndex === 4) {
                rowData.role = cell.innerText.trim();
            }
            else if (cell.cellIndex === 5) {
                rowData.empNo = cell.innerText.trim();
            }
            else if (cell.cellIndex === 6) {
                rowData.status = cell.innerText.trim();
            }
            else if (cell.cellIndex === 7) {
                rowData.dateofJoin = cell.innerText.trim();
            }
        });
        tableRow.push(rowData);
    });
    let arr = [];
    tableRow.forEach(r => {
        let txtValue = r.Name;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            arr.push(r);
        }
    });
    let tbody = document.getElementById("tableBody");
    tbody ? tbody.innerHTML = ' ' : null;
    createTable(arr);
    attachListnerToChangeStatus();
}
//  alphabet filter 
applyalphabetFilter();
function applyalphabetFilter() {
    document.querySelectorAll(".alphabets").forEach(button => {
        button.addEventListener("click", function () {
            var currentButton = this;
            btn = currentButton.innerText;
            if (selectedData[0] == "null" && selectedData[1] == "null" && selectedData[2] == "null") {
                if (currentButton.style.background == "rgb(244, 72, 72)") {
                    currentButton.style.background = "rgb(240, 240, 240)";
                    currentButton.style.color = "var(--gray)";
                    let table = document.getElementById("tableBody");
                    table ? table.innerHTML = '' : null;
                    createTable(employee);
                    attachListnerToChangeStatus();
                    btn = "";
                }
                else {
                    document.querySelectorAll(".alphabets").forEach(bt => {
                        bt.style.background = "rgb(240, 240, 240)";
                        bt.style.color = "var(--gray)";
                    });
                    currentButton.style.background = "#F44848";
                    currentButton.style.color = "white";
                    let char = currentButton.innerText;
                    let res = employee.filter(ele => {
                        let startLetter = ele.Name.charAt(0).toUpperCase();
                        return startLetter == char;
                    });
                    let tableBody = document.getElementById("tableBody");
                    tableBody ? tableBody.innerHTML = '' : null;
                    createTable(res);
                    attachListnerToChangeStatus();
                }
            }
            else {
                if (currentButton.style.background == "rgb(244, 72, 72)") {
                    currentButton.style.background = "rgb(240, 240, 240)";
                    currentButton.style.color = "var(--gray)";
                    let tableBody = document.getElementById("tableBody");
                    tableBody ? tableBody.innerHTML = '' : null;
                    let arr = dropDown(employee, selectedData[0], selectedData[1], selectedData[2]);
                    createTable(arr);
                    attachListnerToChangeStatus();
                    btn = "";
                }
                else {
                    let arr = dropDown(employee, selectedData[0], selectedData[1], selectedData[2]);
                    let tbody = document.getElementById("tableBody");
                    tbody ? tbody.innerHTML = ' ' : null;
                    document.querySelectorAll(".alphabets").forEach(bt => {
                        bt.style.background = "rgb(240, 240, 240)";
                        bt.style.color = "var(--gray)";
                    });
                    currentButton.style.background = "#F44848";
                    currentButton.style.color = "white";
                    let char = currentButton.innerText;
                    let res = arr.filter(ele => {
                        let startLetter = ele.Name.charAt(0).toUpperCase();
                        return startLetter == char;
                    });
                    let tableData = document.getElementById("tableBody");
                    tableData ? tableData.innerHTML = '' : null;
                    createTable(res);
                    attachListnerToChangeStatus();
                }
            }
        });
    });
}
//to fetch the select data on clicking the apply
var selectedData = ["null", "null", "null"];
function collectSelectedDropDownValue() {
    let status = document.getElementById("statusDropDown").value;
    let location = document.getElementById("locationDropDown").value;
    let dept = document.getElementById("deptDropDown").value;
    let selectedDropDownData = [status, location, dept];
    selectedData = selectedDropDownData;
}
//apply dropdown
function applyDropDownFilter() {
    collectSelectedDropDownValue();
    let data = [];
    if (btn == "") {
        data = employee;
    }
    else {
        let res = employee.filter(ele => {
            let startLetter = ele.Name.charAt(0).toUpperCase();
            return startLetter == btn;
        });
        data = res;
    }
    let arr = dropDown(data, selectedData[0], selectedData[1], selectedData[2]);
    let tbody = document.getElementById("tableBody");
    tbody ? tbody.innerHTML = ' ' : null;
    createTable(arr);
    attachListnerToChangeStatus();
}
function dropDown(input, status, location, dept) {
    if (location != "null" || status != "null" || dept != "null") {
        let ans = input.filter(ele => {
            let statusVal = ele.status;
            let locationVal = ele.location;
            let deptVal = ele.department;
            if (location == "null" && dept == "null") {
                return (statusVal == status);
            }
            else if (location == "null" && status == "null") {
                return (deptVal == dept);
            }
            else if (dept == "null" && status == "null") {
                return (locationVal == location);
            }
            else if (status == "null") {
                return ((deptVal == dept) && (locationVal == location));
            }
            else if (location == "null") {
                return ((deptVal == dept) && (statusVal == status));
            }
            else if (dept == "null") {
                return ((statusVal == status) && (locationVal == location));
            }
            else if (location != "null" && status != "null" && dept != "null") {
                return ((statusVal == status) && (locationVal == location) && (deptVal == dept));
            }
        });
        return ans;
    }
    else {
        return input;
    }
}
//check box
function enableCheckBox() {
    let checkBox = document.querySelectorAll(".check-box");
    let delBtn = document.getElementById("delete-btn");
    checkBox.forEach(a => {
        if (a.checked) {
            delBtn ? delBtn.style.background = "var(--red-300)" : null;
            document.getElementById("delete-btn").disabled = false;
        }
        else {
            let checkCount = document.querySelectorAll("input[type='checkbox']:checked").length > 0;
            if (!checkCount) {
                delBtn ? delBtn.style.background = "#F89191" : null;
            }
        }
    });
}
//delete
function deleteSelectedEmployeeRows() {
    let checkBox = document.querySelectorAll(".check-box");
    checkBox.forEach(a => {
        if (a.checked) {
            let row = a.parentElement.parentElement;
            let empNo;
            let col = row.querySelectorAll("td");
            col.forEach(cell => {
                if (cell.cellIndex == 5) {
                    empNo = cell.textContent.trim();
                }
            });
            let count = 0;
            employee.forEach(r => {
                if (r.empNo == empNo) {
                    employee.splice(count, 1);
                }
                count++;
            });
            localStorage.setItem('employee', JSON.stringify(employee));
            applyDropDownFilter();
            let delBtn = document.getElementById("delete-btn");
            delBtn ? delBtn.style.background = "#F89191" : null;
            document.getElementById("header-check-box").checked = false;
        }
    });
}
// check all
function checkAllCheckBoxes() {
    let mainCheck = document.getElementById("header-check-box");
    let del = document.getElementById("delete-btn");
    let check = document.querySelectorAll(".check-box");
    check.forEach(a => {
        a.checked = mainCheck ? mainCheck.checked : false;
    });
    let checkCount = document.querySelectorAll("input[type='checkbox']:checked").length > 0;
    if (!checkCount) {
        del ? del.style.background = "#F89191" : null;
    }
    else {
        del ? del.style.background = "var(--red-300)" : null;
        document.getElementById("delete-btn").disabled = false;
    }
}
// sort the table
function sortEmployeeTable(n) {
    let tbody = document.getElementById("tableBody");
    let trow = Array.from(document.querySelectorAll(".row"));
    if (!(n in sortingOrders)) {
        sortingOrders[n] = 'asc';
    }
    trow.sort((a, b) => {
        let row1 = a.querySelectorAll(".details")[n].textContent.trim();
        let row2 = b.querySelectorAll(".details")[n].textContent.trim();
        return sortingOrders[n] === 'asc' ? row1.localeCompare(row2) : row2.localeCompare(row1);
    });
    sortingOrders[n] = sortingOrders[n] === 'asc' ? 'desc' : 'asc';
    tbody ? tbody.innerHTML = '' : null;
    trow.forEach(r => {
        tbody ? tbody.appendChild(r) : null;
    });
}
// form formSubmission
function formSubmission(event) {
    event.preventDefault();
    document.querySelector(".save-button").style.display = "none";
    document.querySelector(".edit-button").style.display = "none";
    document.querySelector(".submit-button").style.display = "block";
    SubmitEmployeeDetails(event);
}
function SubmitEmployeeDetails(event) {
    var _a;
    let formInputs = ["empNo", "firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "joinDate", "dropDownLocation", "DepartmentDropDown", "assignManager", "assignProject"];
    let validMsg = ["validEmpNo", "validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join", "city", "dept", "manager", "project"];
    let isInvalid = 0;
    let k = 0, j = 0;
    for (let i = 0; i < formInputs.length; i++) {
        if (document.getElementById(formInputs[i]).value.length < 1) {
            if (formInputs[i] == "empNo") {
                k += 1;
            }
            if (formInputs[i] == "mailId") {
                j += 1;
            }
            invalidInput(document.getElementById(validMsg[i]), document.getElementById(formInputs[i]), "This field is required");
            isInvalid = 1;
        }
    }
    let id = document.getElementById("empNo");
    let idres = id.value.slice(0, 2);
    let idnum = id.value.slice(2, id.value.length);
    if (k == 0) {
        if ((idres != 'TZ' && idres != 'tz')) {
            invalidInput(document.getElementById("validEmpNo"), id, "Enter valid employee ID");
            isInvalid = 1;
        }
        if (id.value.length < 3) {
            invalidInput(document.getElementById("validEmpNo"), id, "Enter valid employee ID");
            isInvalid = 1;
        }
        employee.forEach(r => {
            if (r.empNo == id.value) {
                invalidInput(document.getElementById("validEmpNo"), id, "Employee already exists");
                isInvalid = 1;
            }
        });
    }
    let number = document.getElementById("mobileNumber");
    if (number.value.length < 10) {
        invalidInput(document.getElementById("phone-number"), number, "Enter 10 digits");
        isInvalid = 1;
    }
    let st = 0;
    let mailId = document.getElementById("mailId");
    for (let i = 0; i < mailId.value.length; i++) {
        if (mailId.value[i] == '@') {
            st = i + 1;
        }
    }
    let result = mailId.value.slice(st);
    if (result != "tezo.com" && j == 0) {
        invalidInput(document.getElementById("valid"), mailId, "Email invalid");
        isInvalid = 1;
    }
    let inputDOJ = document.getElementById("joinDate").value;
    let [yy, mm, dd] = inputDOJ.split('-');
    let formattedDOJ = dd + "/" + mm + "/" + yy;
    let [yyy, mmm, ddd] = document.getElementById("dateOfBirth").value.split('-');
    let formattedDOB = ddd + "/" + mmm + "/" + yyy;
    if (isInvalid == 1) {
        event.preventDefault();
    }
    else {
        let formData = {
            employeeImg: imageData ? imageData : "../assets/images/upload-image.png",
            Name: document.getElementById(formInputs[1]).value + " " + document.getElementById(formInputs[2]).value,
            mailId: document.getElementById(formInputs[4]).value,
            location: document.getElementById(formInputs[7]).value,
            dateofJoin: formattedDOJ,
            department: document.getElementById(formInputs[8]).value,
            role: ((_a = document.getElementById("roleDropDown").value) === null || _a === void 0 ? void 0 : _a.length) ? document.getElementById("roleDropDown").value : "N/A",
            empNo: document.getElementById(formInputs[0]).value.toUpperCase(),
            status: "Active",
            dateOfBirth: formattedDOB,
            manager: document.getElementById(formInputs[9]).value,
            project: document.getElementById(formInputs[10]).value,
            number: Number(document.getElementById(formInputs[5]).value)
        };
        employee.push(formData);
        localStorage.setItem('employee', JSON.stringify(employee));
        let tbody = document.getElementById("tableBody");
        tbody.innerHTML = ' ';
        applyDropDownFilter();
        formInputs.forEach(ele => {
            document.getElementById(ele).value = "";
            document.getElementById(ele).classList.remove('error');
        });
        let validMsg = ['validEmpNo', "validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join", "city", "role-error", "dept", "manager", "project"];
        validMsg.forEach(ele => {
            document.getElementById(ele).innerText = "";
        });
        let imgdisplay = document.getElementById("display-image");
        imgdisplay.src = "../assets/images/upload-image.png";
        document.querySelector(".employeetable-container").style.display = "block";
        document.querySelector(".form-container").style.display = "none";
        event.preventDefault();
    }
}
function invalidInput(element, id, msg) {
    element.innerText = msg;
    element.classList.add('alert-msg');
    id.classList.add("error");
}
//clear fields
function clearInputFeilds(event) {
    document.querySelector(".edit-button").style.display = "none";
    document.querySelector(".save-button").style.display = "none";
    document.querySelector(".submit-button").style.display = "block";
    let formInputs = ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "dropDownLocation", "DepartmentDropDown", "roleDropDown", "joinDate", "empNo", "assignManager", "assignProject"];
    formInputs.forEach(r => {
        document.getElementById(r).disabled = false;
        document.getElementById(r).value = "";
        document.getElementById(r).classList.remove("error");
    });
    document.querySelector(".employeetable-container").style.display = "block";
    document.querySelector(".form-container").style.display = "none";
    let validMsg = ['validEmpNo', "validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join", "city", "role-error", "dept", "manager", "project"];
    validMsg.forEach(ele => {
        document.getElementById(ele).innerText = "";
    });
}
// reset function
function resetFilters() {
    let tbody = document.getElementById("tableBody");
    tbody ? tbody.innerHTML = ' ' : null;
    document.querySelectorAll(".alphabets").forEach(btn => {
        btn.style.background = "rgb(240, 240, 240)";
        btn.style.color = "var(--gray)";
    });
    document.getElementById("statusDropDown").selectedIndex = 0;
    document.getElementById("locationDropDown").selectedIndex = 0;
    document.getElementById("deptDropDown").selectedIndex = 0;
    btn = "";
    collectSelectedDropDownValue();
    createTable(employee);
    attachListnerToChangeStatus();
}
//export file to excel
function exportToExcel() {
    let table = document.getElementById("employeeTable");
    let tableContent = "";
    let headData = table ? table.querySelectorAll(".table-header") : null;
    headData ? headData.forEach(r => {
        let cells = r.querySelectorAll("th");
        cells.forEach((ele, index) => {
            tableContent += '"' + (ele.innerText || '').replace(/"/g, '""') + '"' + (index < cells.length - 1 ? ',' : '\n');
        });
    }) : null;
    let row = table ? table.querySelectorAll(".row") : null;
    row ? row.forEach(r => {
        let cells = r.querySelectorAll("td");
        cells.forEach((ele, index) => {
            tableContent += '"' + (ele.innerText || '').replace(/"/g, '""') + '"' + (index < cells.length - 1 ? ',' : '\n');
        });
    }) : null;
    let tableSheet = 'data:text/csv;charset=utf-8,' + encodeURIComponent(tableContent);
    let downloadlink = document.createElement("a");
    downloadlink.href = tableSheet;
    downloadlink.download = 'employee_data.csv';
    downloadlink.click();
}
