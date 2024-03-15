import { fetchData, role } from "./common.js";
import { employee, roleDetails } from "./common.js";
var exports = document;
fetchData();
document.querySelector(".add-employee-role-name").innerText = role.roleName;
createEmployeeDetailsCards();
createDescripton();
roleDetails.forEach(r => {
    let newOption = new Option(r.roleName, r.roleName);
    document.getElementById("roleDropDown").add(newOption, undefined);
});
function createDescripton() {
    document.getElementById("add-role-description").innerText = role.description;
}
function createEmployeeDetailsCards() {
    let count = 0;
    employee.forEach(ele => {
        if (ele.role == role.roleName && ele.location == role.cityName) {
            let roleCardContainer = document.getElementById("details-card-container");
            let detailsCard = document.createElement("div");
            detailsCard.classList.add('details-card', 'd-flex');
            let cardContent = document.createElement("div");
            cardContent.classList.add("card-content");
            let employeeDetails = document.createElement("div");
            employeeDetails.classList.add("employee-card-details", "d-flex");
            let employeeImg = document.createElement("img");
            employeeImg.src = ele.employeeImg;
            employeeDetails.appendChild(employeeImg);
            let employeeName = document.createElement("div");
            employeeName.classList.add("employee-name", "d-flex");
            let nameOfEmployee = document.createElement("span");
            nameOfEmployee.setAttribute('id', 'emp-name');
            nameOfEmployee.innerText = ele.Name;
            let roleOfEmployee = document.createElement("span");
            roleOfEmployee.innerText = ele.role;
            employeeName.appendChild(nameOfEmployee);
            employeeName.appendChild(roleOfEmployee);
            employeeDetails.appendChild(employeeName);
            let IdOfEmployee = document.createElement("div");
            IdOfEmployee.classList.add("employee-information", "d-flex");
            let idImage = document.createElement("img");
            idImage.src = "../assets/icons/emp-id.svg";
            let idNo = document.createElement("span");
            idNo.innerText = ele.empNo;
            IdOfEmployee.appendChild(idImage);
            IdOfEmployee.appendChild(idNo);
            let emailOfEmployee = document.createElement("div");
            emailOfEmployee.classList.add("employee-information", "d-flex");
            let emailImage = document.createElement("img");
            emailImage.src = "../assets/icons/email-icon.svg";
            let emailId = document.createElement("span");
            emailId.innerText = ele.mailId;
            emailOfEmployee.appendChild(emailImage);
            emailOfEmployee.appendChild(emailId);
            let deptOfEmployee = document.createElement("div");
            deptOfEmployee.classList.add("employee-information", "d-flex");
            let deptImage = document.createElement("img");
            deptImage.src = "../assets/icons/team.svg";
            let deptId = document.createElement("span");
            deptId.innerText = ele.department;
            deptOfEmployee.appendChild(deptImage);
            deptOfEmployee.appendChild(deptId);
            let locationOfEmployee = document.createElement("div");
            locationOfEmployee.classList.add("employee-information", "d-flex");
            let locationImage = document.createElement("img");
            locationImage.src = "../assets/icons/location.svg";
            let locationName = document.createElement("span");
            locationName.innerText = ele.location;
            locationOfEmployee.appendChild(locationImage);
            locationOfEmployee.appendChild(locationName);
            cardContent.appendChild(employeeDetails);
            cardContent.appendChild(IdOfEmployee);
            cardContent.appendChild(emailOfEmployee);
            cardContent.appendChild(deptOfEmployee);
            cardContent.appendChild(locationOfEmployee);
            let view = document.createElement("div");
            view.classList.add("view");
            view.classList.add("d-flex");
            let heading = document.createElement("span");
            heading.innerText = "View";
            let arrowImg = document.createElement("img");
            arrowImg.src = "../assets/icons/view.png";
            view.appendChild(heading);
            view.appendChild(arrowImg);
            detailsCard.appendChild(cardContent);
            detailsCard.appendChild(view);
            roleCardContainer.appendChild(detailsCard);
            count += 1;
        }
    });
    if (count == 0) {
        let roleCardContainer = document.getElementById("details-card-container");
        let detailsCard = document.createElement("div");
        detailsCard.classList.add("details-card");
        detailsCard.innerText = "No Employees assigned for this role";
        roleCardContainer.appendChild(detailsCard);
    }
    addEditListner();
}
//open add employee form 
export function openAddEmployeeForm() {
    editRoleDetails();
    document.querySelector(".view-employees").style.display = "none";
    document.querySelector(".add-role-form").style.display = "block";
    document.querySelector(".form-container").style.display = "none";
}
export function closeAddEmployeeForm() {
    document.querySelector(".view-employees").style.display = "block";
    document.querySelector(".add-role-form").style.display = "none";
    document.querySelector(".form-container").style.display = "none";
}
export function editRoleDetails() {
    let inputRole = document.getElementById("role-name-input");
    let inputDepartment = document.getElementById("department-dropdown");
    let inputLocation = document.getElementById("location-dropdown");
    inputRole.value = role.roleName;
    inputLocation.value = role.cityName;
    inputDepartment.disabled = true;
    inputRole.disabled = true;
    inputLocation.disabled = true;
    document.getElementById("description").disabled = true;
    document.querySelector(".searchEmployee").style.pointerEvents = "auto";
    document.querySelector(".save-button").style.display = "block";
}
collectUnassignedEmployees();
var unassignedEmployee = [];
function collectUnassignedEmployees() {
    document.getElementById("assign-employee-section").innerHTML = "";
    document.getElementById("location-dropdown").value;
    let a = 0;
    employee.forEach(r => {
        if (r.role == "N/A" && r.location == role.cityName) {
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
}
var visible = false;
export function showUnassignedEmployees() {
    if (visible) {
        closeUnassignedEmployees();
    }
    else {
        openUnassignedEmployees();
    }
    visible = !visible;
}
export function openUnassignedEmployees() {
    document.getElementById("assign-employee-section").style.display = "flex";
}
export function closeUnassignedEmployees() {
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
export function addRoleFormEmployee() {
    let inputRole = document.getElementById("role-name-input");
    employee.forEach(r => {
        if (unassignedEmployee.includes(r.empNo)) {
            r.role = inputRole.value;
        }
    });
    localStorage.setItem('employee', JSON.stringify(employee));
}
document.addEventListener("click", (event) => {
    let target = event.target;
    if (target.className != "asssign-employees-container" && target.className != "searchEmployee" && target.className != "assign-employee" && target.className != "assign-employee-details" && target.className != "check-employee" && target.className != "employee-check-box") {
        if (document.querySelector(".asssign-employees-container").style.display == "flex") {
            showUnassignedEmployees();
        }
    }
});
function addEditListner() {
    document.querySelectorAll(".view").forEach(emp => {
        emp.addEventListener("click", function () {
            document.querySelector(".view-employees").style.display = "none";
            document.querySelector(".add-role-form").style.display = "none";
            document.querySelector(".form-container").style.display = "block";
            document.getElementById("firstName").disabled = true;
            let employeeId = emp.parentElement.querySelector(".card-content").querySelector(".employee-information").innerText;
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
                        let reader = new FileReader();
                        reader.onload = function () {
                            let imageData = String(reader.result);
                        };
                        reader.readAsDataURL(event.target.files[0]);
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
function closeForm() {
    document.querySelector(".view-employees").style.display = "block";
    document.querySelector(".add-role-form").style.display = "none";
    document.querySelector(".form-container").style.display = "none";
}
exports.closeForm = closeForm;
exports.openAddEmployeeForm = openAddEmployeeForm;
exports.closeAddEmployeeForm = closeAddEmployeeForm;
exports.showUnassignedEmployees = showUnassignedEmployees;
exports.addRoleFormEmployee = addRoleFormEmployee;
