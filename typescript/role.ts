import { fetchData, role, Role } from "./common.js";
import { employee, roleDetails, RoleDetails, Employee } from "./common.js"
var exports: any = document;
fetchData();
createCards(roleDetails);


document.addEventListener("click", (event: Event) => {
    let target:EventTarget = event.target!;
    if ((<Element>target).className != "asssign-employees-container" && (<Element>target).className != "searchEmployee" && (<Element>target).className != "assign-employee" && (<Element>target).className != "assign-employee-details" && (<Element>target).className != "check-employee" && (<Element>target).className != "employee-check-box") {
        if ((<HTMLElement>document.querySelector(".asssign-employees-container")).style.display == "flex") {
            showUnassignedEmployees();
        }
    }
})

// to display the form
export function displayAddRoleForm():void {
    (<HTMLElement>document.querySelector(".add-role-page")).style.display = "none";
    (<HTMLElement>document.querySelector(".add-role-form")).style.display = "block";
    (<HTMLButtonElement>document.querySelector(".edit-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".submit-button")).style.display = "block";
    (<HTMLButtonElement>document.querySelector(".save-button")).style.display = "none";
    let inputRole:HTMLInputElement = document.getElementById("role-name-input") as HTMLInputElement;
    let inputDepartment:HTMLInputElement = document.getElementById("department-dropdown") as HTMLInputElement;
    let inputLocation:HTMLInputElement = document.getElementById("location-dropdown") as HTMLInputElement;
    inputDepartment.value = "";
    inputLocation.value = "";
    inputRole.value = "";
    (<HTMLInputElement>document.getElementById("description")).value = "";
    inputRole.disabled = false;
    inputDepartment.disabled = false;
    inputLocation.disabled = false;
    (<HTMLInputElement>document.getElementById("description")).disabled = false;
}

//show unassigned employess when click on assign employees
function getLocationBasedEmployees():void {
    collectUnassignedEmployees("addRole");
}

(<HTMLSelectElement>document.getElementById("location-dropdown")).addEventListener("change", function () :void{
    getLocationBasedEmployees();
});

var unassignedEmployee: string[] = [];
function collectUnassignedEmployees(pageType: string):void {
    (<HTMLElement>document.getElementById("assign-employee-section")).innerHTML = "";
    let inputLocation = (<HTMLSelectElement>document.getElementById("location-dropdown")).value;
    let a:number = 0;
    employee.forEach(r => {
        if (r.role == "N/A" && r.location == inputLocation) {
            let assignEmployeeDiv:HTMLDivElement = document.createElement("div");
            assignEmployeeDiv.classList.add("assign-employee");
            let assignEmployeeDetails = document.createElement("div");
            assignEmployeeDetails.classList.add("assign-employee-details");
            let assignEmployeeImg:HTMLImageElement = document.createElement("img");
            assignEmployeeImg.src = r.employeeImg;
            let employeeName:HTMLLabelElement = document.createElement("label");
            employeeName.classList.add("check-employee");
            employeeName.innerText = r.Name;
            employeeName.setAttribute("for", "chekCheckBox" + a);
            assignEmployeeDetails.appendChild(assignEmployeeImg);
            assignEmployeeDetails.appendChild(employeeName);
            let check:HTMLElement = document.createElement("INPUT");
            check.setAttribute("type", "checkbox");
            check.classList.add("employee-check-box");
            check.setAttribute('id', "chekCheckBox" + a);
            let id :string= r.empNo;
            check.onchange = function () :void{
                checkUnassignedEmployees(this, id);
            };
            a++;
            assignEmployeeDiv.appendChild(assignEmployeeDetails);
            assignEmployeeDiv.appendChild(check);
            (<HTMLElement>document.getElementById("assign-employee-section")).appendChild(assignEmployeeDiv);
        }
    })
    if (pageType == "edit") {
        let assignedrole:string = (<HTMLSelectElement>document.getElementById("role-name-input")).value;
        employee.forEach(r => {
            if (r.role == assignedrole && r.location == inputLocation) {
                let assignEmployeeDiv:HTMLDivElement = document.createElement("div");
                assignEmployeeDiv.classList.add("assign-employee");
                let assignEmployeeDetails = document.createElement("div");
                assignEmployeeDetails.classList.add("assign-employee-details");
                let assignEmployeeImg:HTMLImageElement = document.createElement("img");
                assignEmployeeImg.src = r.employeeImg;
                let employeeName:HTMLLabelElement = document.createElement("label");
                employeeName.innerText = r.Name;
                employeeName.classList.add("check-employee");
                employeeName.setAttribute("for", "chekCheckBox" + a);
                assignEmployeeDetails.appendChild(assignEmployeeImg);
                assignEmployeeDetails.appendChild(employeeName);
                let check:HTMLInputElement = document.createElement("INPUT") as HTMLInputElement;
                check.setAttribute("type", "checkbox");
                check.classList.add("employee-check-box");
                check.setAttribute('id', "chekCheckBox" + a);
                let id:string= r.empNo;
                check.checked = true;
                unassignedEmployee.push(id);
                check.onchange = function ():void {
                    checkUnassignedEmployees(this, id);
                };
                a++;
                assignEmployeeDiv.appendChild(assignEmployeeDetails);
                assignEmployeeDiv.appendChild(check);
                (<HTMLElement>document.getElementById("assign-employee-section")).appendChild(assignEmployeeDiv);
            }
        })
    }
}

var visible :boolean= false;
export function showUnassignedEmployees():void {
    if (visible) {
        closeUnassignedEmployees();
    }
    else {
        openUnassignedEmployees();
    }
    visible = !visible;
}

function openUnassignedEmployees():void {
    (<HTMLElement>document.getElementById("assign-employee-section")).style.display = "flex";
}

function closeUnassignedEmployees():void {
    (<HTMLElement>document.getElementById("assign-employee-section")).style.display = "none";
}


//check box checked
function checkUnassignedEmployees(className: GlobalEventHandlers, employeeID: string) :void {
    if (unassignedEmployee.includes(employeeID)) {
        unassignedEmployee.splice(unassignedEmployee.indexOf(employeeID), 1);
    }
    else {
        unassignedEmployee.push(employeeID);
    }
}

//submit details
export function submitRoleDetails(event: Event) :void{
    event.preventDefault();
    let inputRole:HTMLSelectElement = document.getElementById("role-name-input") as HTMLSelectElement;
    let inputDepartment :HTMLSelectElement= document.getElementById("department-dropdown") as HTMLSelectElement;
    let inputLocation:HTMLSelectElement = document.getElementById("location-dropdown") as HTMLSelectElement;
    let inputDescription :HTMLTextAreaElement= document.getElementById("description") as HTMLTextAreaElement;
    let isInvalid:number = 0;
    if (inputRole.value == "") {
        inputRole.classList.add("alert");
        (<HTMLElement>document.getElementById("valid-role")).innerText = "This field is required";
        (<HTMLElement>document.getElementById("valid-role")).classList.add("error");
        isInvalid = 1;
    }
    if (inputDepartment.value == "") {
        inputDepartment.classList.add("alert");
        (<HTMLElement>document.getElementById("valid-dept")).innerText = "This field is required";
        (<HTMLElement>document.getElementById("valid-dept")).classList.add("error");
        isInvalid = 1;
    }
    if (inputLocation.value == "") {
        inputLocation.classList.add("alert");
        (<HTMLElement>document.getElementById("valid-city")).innerText = "This field is required";
        (<HTMLElement>document.getElementById("valid-city")).classList.add("error");
        isInvalid = 1;
    }
    roleDetails.forEach(r => {
        if (r.location == inputLocation.value) {
            if (r.roleName == inputRole.value) {
                inputRole.classList.add("alert");
                (<HTMLElement>document.getElementById("valid-role")).innerText = "Role already exists";
                (<HTMLElement>document.getElementById("valid-role")).classList.add("error");
                isInvalid = 1;
            }
        }

    })
    if (isInvalid == 0) {
        let roleName:string = inputRole.value;
        let department:string = inputDepartment.value;
        let location:string = inputLocation.value;
        let description :string= inputDescription.value;
        let arr:RoleDetails = { roleName, department, location, description };
        roleDetails.push(arr);
        let container :HTMLElement= document.getElementById("card-container") as HTMLElement;
        container.innerHTML = " ";
        employee.forEach(r => {
            if (unassignedEmployee.includes(r.empNo)) {
                r.role = roleName;
            }
        })
        localStorage.setItem('employee', JSON.stringify(employee));
        localStorage.setItem('roleDetails', JSON.stringify(roleDetails));
        createCards(roleDetails);
        inputLocation.classList.remove("alert");
        (<HTMLElement>document.getElementById("valid-city")).innerText = "";
        (<HTMLElement>document.getElementById("valid-city")).classList.remove("error");
        inputDepartment.classList.remove("alert");
        (<HTMLElement>document.getElementById("valid-dept")).innerText = "";
        (<HTMLElement>document.getElementById("valid-dept")).classList.remove("error");
        inputRole.classList.remove("alert");
        (<HTMLElement>document.getElementById("valid-role")).innerText = "";
        (<HTMLElement>document.getElementById("valid-role")).classList.remove("error");
        document.querySelectorAll(".assign-employee").forEach(r => {
            (<HTMLElement>document.querySelector(".asssign-employees-container")).removeChild(r);
        });
        (<HTMLElement>document.querySelector(".add-role-page")).style.display = "block";
        (<HTMLElement>document.querySelector(".add-role-form")).style.display = "none";
    }
}

//to display the page
export function clearFeilds():void {
    let inputRole:HTMLSelectElement = document.getElementById("role-name-input") as HTMLSelectElement;
    let inputDepartment:HTMLSelectElement = document.getElementById("department-dropdown") as HTMLSelectElement;
    let inputLocation:HTMLSelectElement = document.getElementById("location-dropdown") as HTMLSelectElement;
    inputRole.value = "";
    let inputs:HTMLSelectElement[]= [inputRole, inputDepartment, inputLocation];
    inputs.forEach(ele => {
        ele.classList.remove("alert");
    })
    let vaildMsg:string[] = ["valid-city", "valid-dept", "valid-role"];
    vaildMsg.forEach(ele => {
        (<HTMLElement>document.getElementById(ele)).innerText = "";
        (<HTMLElement>document.getElementById(ele)).classList.remove("error");
    });
    (<HTMLElement>document.getElementById("assign-employee-section")).style.display = "none";
    inputDepartment.value = "";
    inputLocation.value = "";
    inputRole.disabled = false;
    inputDepartment.disabled = false;
    document.querySelectorAll(".assign-employee").forEach(r => {
        (<HTMLElement>document.querySelector(".asssign-employees-container")).removeChild(r);
    });
    (<HTMLElement>document.querySelector(".add-role-page")).style.display = "block";
    (<HTMLElement>document.querySelector(".add-role-form")).style.display = "none";
}

//create cards 
function createCards(roleDetails: RoleDetails[]):void {
    roleDetails.forEach(r => {
        let container:HTMLElement = document.getElementById("card-container") as HTMLElement;
        //division for card
        let division = document.createElement("div");
        division.classList.add("role-card");

        //division for name of the role
        let roleNameContainer:HTMLDivElement = document.createElement("div");
        roleNameContainer.classList.add("role-name");
        let roleName:HTMLSpanElement = document.createElement("span");
        roleName.innerText = r.roleName;
        let editImage:HTMLImageElement = document.createElement("img");
        editImage.src = "../assets/icons/edit.svg";
        editImage.classList.add("editDetails");
        roleNameContainer.appendChild(roleName);
        roleNameContainer.appendChild(editImage);

        //division for department
        let departmentDivision:HTMLDivElement = document.createElement("div");
        departmentDivision.classList.add("department");
        let departmentHeading :HTMLDivElement= document.createElement("div");
        departmentHeading.classList.add("dept");
        let departmentIcon:HTMLImageElement = document.createElement("img");
        departmentIcon.src = "../assets/icons/team.svg";
        departmentHeading.appendChild(departmentIcon);
        let departmentName :HTMLSpanElement= document.createElement("span");
        departmentName.innerText = "Department";
        departmentHeading.appendChild(departmentName);
        departmentDivision.appendChild(departmentHeading);
        let department:HTMLSpanElement = document.createElement("span");
        department.classList.add("dept-name-color");
        department.innerText = r.department;
        departmentDivision.appendChild(department);

        //division for city name
        let cityDivision :HTMLDivElement= document.createElement("div");
        cityDivision.classList.add("town");
        let cityNameContainer:HTMLDivElement = document.createElement("div");
        cityNameContainer.classList.add("dept");
        let cityImage:HTMLImageElement = document.createElement("img");
        cityImage.src = "../assets/icons/location.svg";
        cityNameContainer.appendChild(cityImage);
        let cityHeading:HTMLSpanElement = document.createElement("span");
        cityHeading.innerText = "Location";
        cityNameContainer.appendChild(cityHeading);
        cityDivision.appendChild(cityNameContainer);
        let cityName:HTMLSpanElement = document.createElement("span");
        cityName.innerText = r.location;
        cityName.classList.add("dept-name-color")
        cityDivision.appendChild(cityName);

        //total employees
        let totalEmployeeDivision:HTMLDivElement = document.createElement("div");
        totalEmployeeDivision.classList.add("total-emp");
        let totalEmployeeHeading:HTMLSpanElement = document.createElement("span");
        totalEmployeeHeading.innerText = "Total Employees";
        totalEmployeeDivision.appendChild(totalEmployeeHeading);

        //profile icons
        let profieIconsContainer :HTMLDivElement= document.createElement("div");
        profieIconsContainer.classList.add("icons");
        let displayImages:string[] = [];
        let cnt:number = 0;
        employee.forEach(ele => {
            if (ele.role == r.roleName && ele.location == r.location) {
                displayImages.push(ele.employeeImg);
                cnt++;
            }
        })
        if (cnt <= 4) {
            for (let i = 0; i < cnt; i++) {
                let image:HTMLImageElement = document.createElement("img");
                image.src = displayImages[i];
                image.setAttribute('class', 'employee-profile');
                profieIconsContainer.appendChild(image);
            }
        }
        else {
            for (let i = 0; i < 4; i++) {
                let image :HTMLImageElement= document.createElement("img");
                image.src = displayImages[i];
                image.setAttribute('class', 'employee-profile');
                profieIconsContainer.appendChild(image);
            }
            let image5:HTMLDivElement = document.createElement("div");
            let text1:string = "+";
            let text2:string = String(cnt - 4);
            let str:string = text1.concat(text2);
            image5.innerText = str;
            image5.setAttribute('id', 'total-count');
            profieIconsContainer.appendChild(image5);
        }
        totalEmployeeDivision.appendChild(profieIconsContainer);

        //roledetails page division
        let link :HTMLDivElement= document.createElement("div");
        link.classList.add("view-emp");
        let linkHeading:HTMLSpanElement = document.createElement("span");
        linkHeading.innerText = "View all Employess";
        let arrowImage :HTMLImageElement= document.createElement("img");
        arrowImage.src = "../assets/icons/view.png";
        link.appendChild(linkHeading);
        link.appendChild(arrowImage);
        division.appendChild(roleNameContainer);
        division.appendChild(departmentDivision);
        division.appendChild(cityDivision);
        division.appendChild(totalEmployeeDivision);
        division.appendChild(link);
        container.appendChild(division);

    })
    addViewEmployeeListner();
    addListnerToEditIcon();

}

var selectedOptions :string[]= ["", ""];
function getSelectedOptions():void {
    let deptValue:string = (<HTMLInputElement>document.getElementById("filterDepartment")).value;
    let locationValue:string = (<HTMLInputElement>document.getElementById("filterLocation")).value;
    selectedOptions = [deptValue, locationValue];

}

export function applyFilters():void {
    getSelectedOptions();
    if (selectedOptions[0] != "" || selectedOptions[1] != "") {
        let filterRoles :RoleDetails[]= roleDetails.filter(ele => {
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
        (<HTMLElement>document.querySelector(".role-container")).innerHTML = "";
        createCards(filterRoles);

    }
}

//adding link to view employees icon
function addViewEmployeeListner():void {
    document.querySelectorAll(".view-emp").forEach(r => {
        r.addEventListener("click", function ():void {
            let row :HTMLElement= (<HTMLElement>r!.parentElement!.querySelector(".role-name"));
            let cityName :HTMLElement= (<HTMLElement>r!.parentElement!.querySelector(".town")!.querySelector(".dept-name-color"));
            let desc:string="";
            roleDetails.forEach(a => {
                if (a.roleName == row.innerText) {
                    desc = a.description;
                }
            })
            let viewRole:Role= { roleName: row.innerText, cityName: cityName.innerText, description: desc };
            localStorage.setItem('viewRole', JSON.stringify(viewRole));
            location.href = "role-details.html";
        })
    })
}

//edit employee details
function addListnerToEditIcon():void {
    let data :Element[]= Array.from(document.getElementsByClassName("editDetails"));
    data.forEach(ele => {
        ele.addEventListener("click", function (this: HTMLElement):void {
            (<HTMLElement>document.querySelector(".add-role-page")).style.display = "none";
            (<HTMLElement>document.querySelector(".add-role-form")).style.display = "block";
            (<HTMLButtonElement>document.querySelector(".edit-button")).style.display = "block";
            (<HTMLButtonElement>document.querySelector(".submit-button")).style.display = "none";
            (<HTMLButtonElement>document.querySelector(".save-button")).style.display = "none";
            let inputRole:HTMLSelectElement = document.getElementById("role-name-input") as HTMLSelectElement;
            let inputDepartment:HTMLSelectElement = document.getElementById("department-dropdown") as HTMLSelectElement;
            let inputLocation:HTMLSelectElement = document.getElementById("location-dropdown") as HTMLSelectElement;
            let row:HTMLElement= this!.parentElement!.parentElement!;
            let roleName:string = row!.querySelector(".role-name")!.querySelector("span")!.innerText;
            let departmentValue:string = row!.querySelector(".department")!.querySelectorAll("span")[1].innerText;
            let locationValue:string = row!.querySelector(".town")!.querySelectorAll("span")[1].innerText;
            inputRole.value = roleName;
            inputDepartment.value = departmentValue;
            inputLocation.value = locationValue;
            inputRole.disabled = true;
            inputDepartment.disabled = true;
            inputLocation.disabled = true;
            collectUnassignedEmployees("edit");
            (<HTMLElement>document.querySelector(".searchEmployee")).style.pointerEvents = "none";
            (<HTMLTextAreaElement>document.getElementById("description")).disabled = true;
        })

    })
}

//to edit details
export function editRoleDetails(event: Event):void {
    event.preventDefault();
    let inputRole:HTMLSelectElement = document.getElementById("role-name-input") as HTMLSelectElement;
    let inputDepartment:HTMLSelectElement = document.getElementById("department-dropdown") as HTMLSelectElement;
    let inputLocation:HTMLSelectElement = document.getElementById("location-dropdown") as HTMLSelectElement;
    inputDepartment.disabled = false;
    (<HTMLTextAreaElement>document.getElementById("description")).disabled = false;
    (<HTMLElement>document.querySelector(".searchEmployee")).style.pointerEvents = "auto";
    (<HTMLButtonElement>document.querySelector(".edit-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".submit-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".save-button")).style.display = "block";
}

export function saveRoleDetails(event:Event):void {
    event.preventDefault();
    let inputRole:HTMLSelectElement = document.getElementById("role-name-input") as HTMLSelectElement;
    let inputDepartment:HTMLSelectElement = document.getElementById("department-dropdown") as HTMLSelectElement;
    let inputLocation:HTMLSelectElement = document.getElementById("location-dropdown") as HTMLSelectElement;
    roleDetails.forEach(r => {
        if (r.roleName == inputRole.value) {
            r.department = inputDepartment.value;
        }
    })
    let container:HTMLElement = document.getElementById("card-container") as HTMLElement;
    container.innerHTML = " ";
    employee.forEach(r => {
        if (unassignedEmployee.includes(r.empNo)) {
            r.role = inputRole.value;
        }
        if (r.role == inputRole.value) {
            if (!unassignedEmployee.includes(r.empNo)) {
                r.role = "N/A";
            }
        }
    })
    localStorage.setItem('employee', JSON.stringify(employee));
    localStorage.setItem('roleDetails', JSON.stringify(roleDetails));
    createCards(roleDetails);
    (<HTMLElement>document.querySelector(".add-role-page")).style.display = "block";
    (<HTMLElement>document.querySelector(".add-role-form")).style.display = "none";
}

export function reset():void {
    (<HTMLSelectElement>document.getElementById("filterDepartment")).value = "";
    (<HTMLSelectElement>document.getElementById("filterLocation")).value = "";
    (<HTMLElement>document.querySelector(".role-container")).innerHTML = "";
    createCards(roleDetails);
}

exports.displayAddRoleForm = displayAddRoleForm;
exports.submitRoleDetails = submitRoleDetails;
exports.clearFeilds = clearFeilds;
exports.applyFilters = applyFilters;
exports.editRoleDetails = editRoleDetails;
exports.saveRoleDetails = saveRoleDetails;
exports.reset = reset;
exports.showUnassignedEmployees = showUnassignedEmployees;


