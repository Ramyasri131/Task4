import { fetchData } from "./common.js";
import { employee, roleDetails } from "./common.js";
var exports = document;
fetchData();
createTable(employee);
window.document.addEventListener("DOMContentLoaded", function () {
    var _a;
    var today = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    (_a = document.getElementsByName("todaysdate")[0]) === null || _a === void 0 ? void 0 : _a.setAttribute('min', today);
    let header = document.querySelector(".header");
    let headerHeight = header.offsetHeight;
    let description = document.querySelector(".employee-section");
    let descriptionHeight = description.offsetHeight;
    let filter = document.querySelector(".filter-section");
    let filterHeight = filter.offsetHeight;
    let advanceFilter = document.querySelector(".advance-filter-section");
    let advanceFilterHeight = advanceFilter.offsetHeight;
    let deleteSection = document.querySelector(".delete-section");
    let deleteSectionHeight = deleteSection.offsetHeight;
    let totalHeight = headerHeight + descriptionHeight + filterHeight + advanceFilterHeight + deleteSectionHeight;
    totalHeight += 52;
    let tableHeight = "calc(100vh - " + totalHeight + "px)";
    let table = document.querySelector(".table-div");
    table.style.height = tableHeight;
});
roleDetails.forEach(r => {
    let newOption = new Option(r.roleName, r.roleName);
    let dropDownRole = document.getElementById("roleDropDown");
    dropDownRole.add(newOption, undefined);
});
attachListnerToChangeStatus();
// creating table
function createTable(data) {
    let tbody = document.getElementById("tableBody");
    let i;
    for (i = 0; i < data.length; i++) {
        let tableRow = document.createElement("tr");
        tableRow.classList.add("row");
        tableRow.innerHTML += `<td class="details"><input type="checkbox" class="check-box"onclick="enableCheckBox()"></td>
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
        <div class="hidden-options" onclick="displayhiddenOptions(this)">
            <img src="../assets/images/dots.png" alt="more-icon" class="more-options">
            <div class="options">
               <div class="edit-employee">View</div>
               <div onclick="deleteRow(this)" class="delete-selected-row">Delete</div>
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
    addListnerToEditOption();
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
    tbody.innerHTML = ' ';
    applyDropDownFilter();
    if (isInvalid != 1) {
        document.querySelector(".employeetable-container").style.display = "block";
        document.querySelector(".form-container").style.display = "none";
        document.querySelector(".save-button").style.display = "none";
        document.querySelector(".submit-button").style.display = "block";
    }
}
// edit employee details
function addListnerToEditOption() {
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
var imageData;
function openEmployeeForm() {
    document.querySelector(".employeetable-container").style.display = "none";
    document.querySelector(".form-container").style.display = "block";
    document.querySelector(".upload-image-btn").disabled = false;
    let imgdisplay = document.getElementById("display-image");
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
var filter = true;
function hideAdvanceFilter() {
    const advanceFilter = document.querySelector(".advance-filter-section");
    const table = document.querySelector(".table-container");
    const tableBody = document.querySelector(".table-div");
    if (filter) {
        advanceFilter.style.display = "none";
        table.style.height = "350px";
        tableBody.style.height = "270px";
    }
    else {
        advanceFilter.style.display = "flex";
        table.style.height = "292px";
        tableBody.style.height = "235px";
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
        tbody.innerHTML = ' ';
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
    tbody.innerHTML = ' ';
    createTable(arr);
    attachListnerToChangeStatus();
}
//  alphabet filter 
applyalphabetFilter();
var btn = "";
function applyalphabetFilter() {
    document.querySelectorAll(".alphabets").forEach(button => {
        button.addEventListener("click", function () {
            var currentButton = this;
            btn = currentButton.innerText;
            if (selectedData[0] == "null" && selectedData[1] == "null" && selectedData[2] == "null") {
                if (currentButton.style.background == "rgb(244, 72, 72)") {
                    currentButton.style.background = "rgb(240, 240, 240)";
                    currentButton.style.color = "var(--gray)";
                    let filteredData = document.getElementById("tableBody");
                    filteredData.innerHTML = '';
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
                    tableBody.innerHTML = '';
                    createTable(res);
                    attachListnerToChangeStatus();
                }
            }
            else {
                if (currentButton.style.background == "rgb(244, 72, 72)") {
                    currentButton.style.background = "rgb(240, 240, 240)";
                    currentButton.style.color = "var(--gray)";
                    let tableBody = document.getElementById("tableBody");
                    tableBody.innerHTML = '';
                    let arr = dropDown(employee, selectedData[0], selectedData[1], selectedData[2]);
                    createTable(arr);
                    attachListnerToChangeStatus();
                    btn = "";
                }
                else {
                    let arr = dropDown(employee, selectedData[0], selectedData[1], selectedData[2]);
                    let tbody = document.getElementById("tableBody");
                    tbody.innerHTML = ' ';
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
                    tableData.innerHTML = '';
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
    tbody.innerHTML = ' ';
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
            delBtn.style.background = "var(--red-300)";
            document.getElementById("delete-btn").disabled = false;
        }
        else {
            let checkCount = document.querySelectorAll("input[type='checkbox']:checked").length > 0;
            if (!checkCount) {
                delBtn.style.background = "#F89191";
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
                    console.log(employee);
                }
                count++;
            });
            localStorage.setItem('employee', JSON.stringify(employee));
            applyDropDownFilter();
            let delBtn = document.getElementById("delete-btn");
            delBtn.style.background = "#F89191";
            document.getElementById("headerCheckBox").checked = false;
        }
    });
}
// check all
function checkAllCheckBoxes() {
    let mainCheck = document.getElementById("headerCheckBox");
    let del = document.getElementById("delete-btn");
    let check = document.querySelectorAll(".check-box");
    check.forEach(a => {
        a.checked = mainCheck.checked;
    });
    let checkCount = document.querySelectorAll("input[type='checkbox']:checked").length > 0;
    if (!checkCount) {
        del.style.background = "#F89191";
    }
    else {
        del.style.background = "var(--red-300)";
        document.getElementById("delete-btn").disabled = false;
    }
}
// sort the table
var sortingOrders = [];
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
    tbody.innerHTML = '';
    trow.forEach(r => {
        tbody.appendChild(r);
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
    tbody.innerHTML = ' ';
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
    let headData = table.querySelectorAll(".table-header");
    console.log(headData);
    headData.forEach(r => {
        let cells = r.querySelectorAll("th");
        cells.forEach((ele, index) => {
            tableContent += '"' + (ele.innerText || '').replace(/"/g, '""') + '"' + (index < cells.length - 1 ? ',' : '\n');
        });
    });
    let row = table.querySelectorAll(".row");
    row.forEach(r => {
        let cells = r.querySelectorAll("td");
        cells.forEach((ele, index) => {
            tableContent += '"' + (ele.innerText || '').replace(/"/g, '""') + '"' + (index < cells.length - 1 ? ',' : '\n');
        });
    });
    let tableSheet = 'data:text/csv;charset=utf-8,' + encodeURIComponent(tableContent);
    let downloadlink = document.createElement("a");
    downloadlink.href = tableSheet;
    downloadlink.download = 'employee_data.csv';
    downloadlink.click();
}
exports.displayhiddenOptions = displayhiddenOptions;
exports.editEmployeeDetails = editEmployeeDetails;
exports.deleteRow = deleteRow;
exports.openEmployeeForm = openEmployeeForm;
exports.hideAdvanceFilter = hideAdvanceFilter;
exports.displaySearchedName = displaySearchedName;
exports.enableCheckBox = enableCheckBox;
exports.deleteSelectedEmployeeRows = deleteSelectedEmployeeRows;
exports.checkAllCheckBoxes = checkAllCheckBoxes;
exports.sortEmployeeTable = sortEmployeeTable;
exports.formSubmission = formSubmission;
exports.clearInputFeilds = clearInputFeilds;
exports.resetFilters = resetFilters;
exports.exportToExcel = exportToExcel;
exports.applyDropDownFilter = applyDropDownFilter;
exports.saveEmployeeDetails = saveEmployeeDetails;
