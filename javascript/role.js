var _a, _b, _c, _d, _e, _f, _g;
import { fetchData, employee, roleDetails } from "./module.js";
fetchData();
createCards(roleDetails);
var unassignedEmployee = [];
var visible = false;
var selectedOptions = ["", ""];
document.getElementsByClassName("add-role")[0].addEventListener("click", function () {
    displayAddRoleForm();
});
(_a = document.getElementById("reset")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    resetFilters();
});
(_b = document.getElementById("apply")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    applyFilters();
});
(_c = document.getElementById("search-emp")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    showUnassignedEmployees();
});
(_d = document.getElementsByClassName("cancel-button")[0]) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    clearFeilds();
});
(_e = document.getElementsByClassName("submit-button")[0]) === null || _e === void 0 ? void 0 : _e.addEventListener("click", function (event) {
    submitRoleDetails(event);
});
(_f = document.getElementsByClassName("edit-button")[0]) === null || _f === void 0 ? void 0 : _f.addEventListener("click", function (event) {
    editRoleDetails(event);
});
(_g = document.getElementsByClassName("save-button")[0]) === null || _g === void 0 ? void 0 : _g.addEventListener("click", function (event) {
    saveRoleDetails(event);
});
document.addEventListener("click", (event) => {
    let target = event.target;
    if (target.className != "asssign-employees-container" && target.className != "searchEmployee" && target.className != "assign-employee" && target.className != "assign-employee-details" && target.className != "check-employee" && target.className != "employee-check-box") {
        if (document.querySelector(".asssign-employees-container").style.display == "flex") {
            showUnassignedEmployees();
        }
    }
});
// to display the form
export function displayAddRoleForm() {
    document.querySelector(".add-role-page").style.display = "none";
    document.querySelector(".add-role-form").style.display = "block";
    document.querySelector(".edit-button").style.display = "none";
    document.querySelector(".submit-button").style.display = "block";
    document.querySelector(".save-button").style.display = "none";
    let inputRole = document.getElementById("role-name-input");
    let inputDepartment = document.getElementById("department-dropdown");
    let inputLocation = document.getElementById("location-dropdown");
    inputDepartment ? inputDepartment.value = "" : null;
    inputLocation ? inputLocation.value = "" : null;
    inputRole ? inputRole.value = "" : null;
    document.getElementById("description").value = "";
    inputRole ? inputRole.disabled = false : null;
    inputDepartment ? inputDepartment.disabled = false : null;
    inputLocation ? inputLocation.disabled = false : null;
    document.getElementById("description").disabled = false;
}
//show unassigned employess when click on assign employees
function getLocationBasedEmployees() {
    collectUnassignedEmployees("addRole");
}
document.getElementById("location-dropdown").addEventListener("change", function () {
    getLocationBasedEmployees();
});
function collectUnassignedEmployees(pageType) {
    document.getElementById("assign-employee-section").innerHTML = "";
    let inputLocation = document.getElementById("location-dropdown").value;
    let a = 0;
    employee.forEach(r => {
        if (r.role == "N/A" && r.location == inputLocation) {
            let assignEmployeeDiv = document.createElement("div");
            assignEmployeeDiv.classList.add("assign-employee");
            let assignEmployeeDetails = document.createElement("div");
            assignEmployeeDetails.classList.add("assign-employee-details");
            let assignEmployeeImg = document.createElement("img");
            assignEmployeeImg.src = r.employeeImg;
            let employeeName = document.createElement("label");
            employeeName.classList.add("check-employee");
            employeeName.innerText = r.Name;
            employeeName.setAttribute("for", "chekCheckBox" + a);
            assignEmployeeDetails.appendChild(assignEmployeeImg);
            assignEmployeeDetails.appendChild(employeeName);
            let check = document.createElement("INPUT");
            check.setAttribute("type", "checkbox");
            check.classList.add("employee-check-box");
            check.setAttribute('id', "chekCheckBox" + a);
            let id = r.empNo;
            check.onchange = function () {
                checkUnassignedEmployees(this, id);
            };
            a++;
            assignEmployeeDiv.appendChild(assignEmployeeDetails);
            assignEmployeeDiv.appendChild(check);
            document.getElementById("assign-employee-section").appendChild(assignEmployeeDiv);
        }
    });
    if (pageType == "edit") {
        let assignedrole = document.getElementById("role-name-input").value;
        employee.forEach(r => {
            if (r.role == assignedrole && r.location == inputLocation) {
                let assignEmployeeDiv = document.createElement("div");
                assignEmployeeDiv.classList.add("assign-employee");
                let assignEmployeeDetails = document.createElement("div");
                assignEmployeeDetails.classList.add("assign-employee-details");
                let assignEmployeeImg = document.createElement("img");
                assignEmployeeImg.src = r.employeeImg;
                let employeeName = document.createElement("label");
                employeeName.innerText = r.Name;
                employeeName.classList.add("check-employee");
                employeeName.setAttribute("for", "chekCheckBox" + a);
                assignEmployeeDetails.appendChild(assignEmployeeImg);
                assignEmployeeDetails.appendChild(employeeName);
                let check = document.createElement("INPUT");
                check.setAttribute("type", "checkbox");
                check.classList.add("employee-check-box");
                check.setAttribute('id', "chekCheckBox" + a);
                let id = r.empNo;
                check.checked = true;
                unassignedEmployee.push(id);
                check.onchange = function () {
                    checkUnassignedEmployees(this, id);
                };
                a++;
                assignEmployeeDiv.appendChild(assignEmployeeDetails);
                assignEmployeeDiv.appendChild(check);
                document.getElementById("assign-employee-section").appendChild(assignEmployeeDiv);
            }
        });
    }
}
export function showUnassignedEmployees() {
    if (visible) {
        closeUnassignedEmployees();
    }
    else {
        openUnassignedEmployees();
    }
    visible = !visible;
}
function openUnassignedEmployees() {
    document.getElementById("assign-employee-section").style.display = "flex";
}
function closeUnassignedEmployees() {
    document.getElementById("assign-employee-section").style.display = "none";
}
//check box checked
function checkUnassignedEmployees(className, employeeID) {
    if (unassignedEmployee.includes(employeeID)) {
        unassignedEmployee.splice(unassignedEmployee.indexOf(employeeID), 1);
    }
    else {
        unassignedEmployee.push(employeeID);
    }
}
//submit details
export function submitRoleDetails(event) {
    event.preventDefault();
    let inputRole = document.getElementById("role-name-input");
    let inputDepartment = document.getElementById("department-dropdown");
    let inputLocation = document.getElementById("location-dropdown");
    let inputDescription = document.getElementById("description");
    let isInvalid = 0;
    if ((inputRole === null || inputRole === void 0 ? void 0 : inputRole.value) == "") {
        inputRole.classList.add("alert");
        document.getElementById("valid-role").innerText = "This field is required";
        document.getElementById("valid-role").classList.add("error");
        isInvalid = 1;
    }
    if ((inputDepartment === null || inputDepartment === void 0 ? void 0 : inputDepartment.value) == "") {
        inputDepartment.classList.add("alert");
        document.getElementById("valid-dept").innerText = "This field is required";
        document.getElementById("valid-dept").classList.add("error");
        isInvalid = 1;
    }
    if ((inputLocation === null || inputLocation === void 0 ? void 0 : inputLocation.value) == "") {
        inputLocation.classList.add("alert");
        document.getElementById("valid-city").innerText = "This field is required";
        document.getElementById("valid-city").classList.add("error");
        isInvalid = 1;
    }
    roleDetails.forEach(r => {
        if (r.location == (inputLocation === null || inputLocation === void 0 ? void 0 : inputLocation.value)) {
            if (r.roleName == (inputRole === null || inputRole === void 0 ? void 0 : inputRole.value)) {
                inputRole === null || inputRole === void 0 ? void 0 : inputRole.classList.add("alert");
                document.getElementById("valid-role").innerText = "Role already exists";
                document.getElementById("valid-role").classList.add("error");
                isInvalid = 1;
            }
        }
    });
    if (isInvalid == 0) {
        let roleName = inputRole === null || inputRole === void 0 ? void 0 : inputRole.value;
        let department = inputDepartment === null || inputDepartment === void 0 ? void 0 : inputDepartment.value;
        let location = inputLocation === null || inputLocation === void 0 ? void 0 : inputLocation.value;
        let description = inputDescription === null || inputDescription === void 0 ? void 0 : inputDescription.value;
        let arr = { roleName, department, location, description };
        roleDetails.push(arr);
        let container = document.getElementById("card-container");
        container.innerHTML = " ";
        employee.forEach(r => {
            if (unassignedEmployee.includes(r.empNo)) {
                r.role = roleName;
            }
        });
        localStorage.setItem('employee', JSON.stringify(employee));
        localStorage.setItem('roleDetails', JSON.stringify(roleDetails));
        createCards(roleDetails);
        inputLocation === null || inputLocation === void 0 ? void 0 : inputLocation.classList.remove("alert");
        document.getElementById("valid-city").innerText = "";
        document.getElementById("valid-city").classList.remove("error");
        inputDepartment === null || inputDepartment === void 0 ? void 0 : inputDepartment.classList.remove("alert");
        document.getElementById("valid-dept").innerText = "";
        document.getElementById("valid-dept").classList.remove("error");
        inputRole === null || inputRole === void 0 ? void 0 : inputRole.classList.remove("alert");
        document.getElementById("valid-role").innerText = "";
        document.getElementById("valid-role").classList.remove("error");
        document.querySelectorAll(".assign-employee").forEach(r => {
            document.querySelector(".asssign-employees-container").removeChild(r);
        });
        document.querySelector(".add-role-page").style.display = "block";
        document.querySelector(".add-role-form").style.display = "none";
    }
}
//to display the page
export function clearFeilds() {
    let inputRole = document.getElementById("role-name-input");
    let inputDepartment = document.getElementById("department-dropdown");
    let inputLocation = document.getElementById("location-dropdown");
    inputRole ? inputRole.value = "" : null;
    let inputs = [inputRole ? inputRole : null, inputDepartment ? inputDepartment : null, inputLocation ? inputLocation : null];
    inputs ? inputs.forEach(ele => {
        ele === null || ele === void 0 ? void 0 : ele.classList.remove("alert");
    }) : null;
    let vaildMsg = ["valid-city", "valid-dept", "valid-role"];
    vaildMsg.forEach(ele => {
        document.getElementById(ele).innerText = "";
        document.getElementById(ele).classList.remove("error");
    });
    document.getElementById("assign-employee-section").style.display = "none";
    inputDepartment ? inputDepartment.value = "" : null;
    inputLocation ? inputLocation.value = "" : null;
    inputRole ? inputRole.disabled = false : null;
    inputDepartment ? inputDepartment.disabled = false : null;
    document.querySelectorAll(".assign-employee").forEach(r => {
        document.querySelector(".asssign-employees-container").removeChild(r);
    });
    document.querySelector(".add-role-page").style.display = "block";
    document.querySelector(".add-role-form").style.display = "none";
}
//create cards 
function createCards(roleDetails) {
    roleDetails.forEach(r => {
        let container = document.getElementById("card-container");
        //division for card
        let division = document.createElement("div");
        division.classList.add("role-card");
        //division for name of the role
        let roleNameContainer = document.createElement("div");
        roleNameContainer.classList.add("role-name");
        let roleName = document.createElement("span");
        roleName.innerText = r.roleName;
        let editImage = document.createElement("img");
        editImage.src = "../assets/icons/edit.svg";
        editImage.classList.add("editDetails");
        roleNameContainer.appendChild(roleName);
        roleNameContainer.appendChild(editImage);
        //division for department
        let departmentDivision = document.createElement("div");
        departmentDivision.classList.add("department");
        let departmentHeading = document.createElement("div");
        departmentHeading.classList.add("dept");
        let departmentIcon = document.createElement("img");
        departmentIcon.src = "../assets/icons/team.svg";
        departmentHeading.appendChild(departmentIcon);
        let departmentName = document.createElement("span");
        departmentName.innerText = "Department";
        departmentHeading.appendChild(departmentName);
        departmentDivision.appendChild(departmentHeading);
        let department = document.createElement("span");
        department.classList.add("dept-name-color");
        department.innerText = r.department;
        departmentDivision.appendChild(department);
        //division for city name
        let cityDivision = document.createElement("div");
        cityDivision.classList.add("town");
        let cityNameContainer = document.createElement("div");
        cityNameContainer.classList.add("dept");
        let cityImage = document.createElement("img");
        cityImage.src = "../assets/icons/location.svg";
        cityNameContainer.appendChild(cityImage);
        let cityHeading = document.createElement("span");
        cityHeading.innerText = "Location";
        cityNameContainer.appendChild(cityHeading);
        cityDivision.appendChild(cityNameContainer);
        let cityName = document.createElement("span");
        cityName.innerText = r.location;
        cityName.classList.add("dept-name-color");
        cityDivision.appendChild(cityName);
        //total employees
        let totalEmployeeDivision = document.createElement("div");
        totalEmployeeDivision.classList.add("total-emp");
        let totalEmployeeHeading = document.createElement("span");
        totalEmployeeHeading.innerText = "Total Employees";
        totalEmployeeDivision.appendChild(totalEmployeeHeading);
        //profile icons
        let profieIconsContainer = document.createElement("div");
        profieIconsContainer.classList.add("icons");
        let displayImages = [];
        let cnt = 0;
        employee.forEach(ele => {
            if (ele.role == r.roleName && ele.location == r.location) {
                displayImages.push(ele.employeeImg);
                cnt++;
            }
        });
        if (cnt <= 4) {
            for (let i = 0; i < cnt; i++) {
                let image = document.createElement("img");
                image.src = displayImages[i];
                image.setAttribute('class', 'employee-profile');
                profieIconsContainer.appendChild(image);
            }
        }
        else {
            for (let i = 0; i < 4; i++) {
                let image = document.createElement("img");
                image.src = displayImages[i];
                image.setAttribute('class', 'employee-profile');
                profieIconsContainer.appendChild(image);
            }
            let image5 = document.createElement("div");
            let text1 = "+";
            let text2 = String(cnt - 4);
            let str = text1.concat(text2);
            image5.innerText = str;
            image5.setAttribute('id', 'total-count');
            profieIconsContainer.appendChild(image5);
        }
        totalEmployeeDivision.appendChild(profieIconsContainer);
        //roledetails page division
        let link = document.createElement("div");
        link.classList.add("view-emp");
        let linkHeading = document.createElement("span");
        linkHeading.innerText = "View all Employess";
        let arrowImage = document.createElement("img");
        arrowImage.src = "../assets/icons/view.png";
        link.appendChild(linkHeading);
        link.appendChild(arrowImage);
        division.appendChild(roleNameContainer);
        division.appendChild(departmentDivision);
        division.appendChild(cityDivision);
        division.appendChild(totalEmployeeDivision);
        division.appendChild(link);
        container.appendChild(division);
    });
    onclickViewEmployee();
    onclickEditIcon();
}
function getSelectedOptions() {
    let deptValue = document.getElementById("filterDepartment").value;
    let locationValue = document.getElementById("filterLocation").value;
    selectedOptions = [deptValue, locationValue];
}
export function applyFilters() {
    getSelectedOptions();
    if (selectedOptions[0] != "" || selectedOptions[1] != "") {
        let filterRoles = roleDetails.filter(ele => {
            if (selectedOptions[0] == "" && selectedOptions[1] != "") {
                return (ele.location == selectedOptions[1]);
            }
            else if (selectedOptions[1] == "" && selectedOptions[0] != "") {
                return (ele.department == selectedOptions[0]);
            }
            else {
                return ((ele.department == selectedOptions[0]) && (ele.location == selectedOptions[1]));
            }
        });
        document.querySelector(".role-container").innerHTML = "";
        createCards(filterRoles);
    }
}
//adding link to view employees icon
function onclickViewEmployee() {
    document.querySelectorAll(".view-emp").forEach(r => {
        r.addEventListener("click", function () {
            let row = r.parentElement.querySelector(".role-name");
            let cityName = r.parentElement.querySelector(".town").querySelector(".dept-name-color");
            let desc = "";
            roleDetails.forEach(a => {
                if (a.roleName == row.innerText) {
                    desc = a.description;
                }
            });
            let viewRole = { roleName: row.innerText, cityName: cityName.innerText, description: desc };
            localStorage.setItem('viewRole', JSON.stringify(viewRole));
            location.href = "role-details.html";
        });
    });
}
//edit employee details
function onclickEditIcon() {
    let data = Array.from(document.getElementsByClassName("editDetails"));
    data.forEach(ele => {
        ele.addEventListener("click", function () {
            document.querySelector(".add-role-page").style.display = "none";
            document.querySelector(".add-role-form").style.display = "block";
            document.querySelector(".edit-button").style.display = "block";
            document.querySelector(".submit-button").style.display = "none";
            document.querySelector(".save-button").style.display = "none";
            let inputRole = document.getElementById("role-name-input");
            let inputDepartment = document.getElementById("department-dropdown");
            let inputLocation = document.getElementById("location-dropdown");
            let row = this.parentElement.parentElement;
            let roleName = row.querySelector(".role-name").querySelector("span").innerText;
            let departmentValue = row.querySelector(".department").querySelectorAll("span")[1].innerText;
            let locationValue = row.querySelector(".town").querySelectorAll("span")[1].innerText;
            inputRole ? inputRole.value = roleName : null;
            inputDepartment ? inputDepartment.value = departmentValue : null;
            inputLocation ? inputLocation.value = locationValue : null;
            inputRole ? inputRole.disabled = true : null;
            inputDepartment ? inputDepartment.disabled = true : null;
            inputLocation ? inputLocation.disabled = true : null;
            collectUnassignedEmployees("edit");
            document.querySelector(".searchEmployee").style.pointerEvents = "none";
            document.getElementById("description").disabled = true;
        });
    });
}
//to edit details
export function editRoleDetails(event) {
    event.preventDefault();
    let inputRole = document.getElementById("role-name-input");
    let inputDepartment = document.getElementById("department-dropdown");
    let inputLocation = document.getElementById("location-dropdown");
    inputDepartment ? inputDepartment.disabled = false : null;
    document.getElementById("description").disabled = false;
    document.querySelector(".searchEmployee").style.pointerEvents = "auto";
    document.querySelector(".edit-button").style.display = "none";
    document.querySelector(".submit-button").style.display = "none";
    document.querySelector(".save-button").style.display = "block";
}
export function saveRoleDetails(event) {
    event.preventDefault();
    let inputRole = document.getElementById("role-name-input");
    let inputDepartment = document.getElementById("department-dropdown");
    let inputLocation = document.getElementById("location-dropdown");
    roleDetails.forEach(r => {
        if (r.roleName == (inputRole === null || inputRole === void 0 ? void 0 : inputRole.value)) {
            r.department = inputDepartment === null || inputDepartment === void 0 ? void 0 : inputDepartment.value;
        }
    });
    let container = document.getElementById("card-container");
    container.innerHTML = " ";
    employee.forEach(r => {
        if (unassignedEmployee.includes(r.empNo)) {
            r.role = inputRole === null || inputRole === void 0 ? void 0 : inputRole.value;
        }
        if (r.role == (inputRole === null || inputRole === void 0 ? void 0 : inputRole.value)) {
            if (!unassignedEmployee.includes(r.empNo)) {
                r.role = "N/A";
            }
        }
    });
    localStorage.setItem('employee', JSON.stringify(employee));
    localStorage.setItem('roleDetails', JSON.stringify(roleDetails));
    createCards(roleDetails);
    document.querySelector(".add-role-page").style.display = "block";
    document.querySelector(".add-role-form").style.display = "none";
}
export function resetFilters() {
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterLocation").value = "";
    document.querySelector(".role-container").innerHTML = "";
    createCards(roleDetails);
}
