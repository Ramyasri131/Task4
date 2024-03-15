import { fetchData, role, Role } from "./common.js";
import { employee, roleDetails, Employee } from "./common.js"
var exports: any = document;
fetchData();

(<HTMLInputElement>document.querySelector(".add-employee-role-name")).innerText = role.roleName;
createEmployeeDetailsCards();
createDescripton();
roleDetails.forEach(r => {
    let newOption :HTMLOptionElement= new Option(r.roleName, r.roleName);
    (<HTMLSelectElement>document.getElementById("roleDropDown")).add(newOption, undefined);
})
function createDescripton() :void{
    (<HTMLElement>document.getElementById("add-role-description")).innerText = role.description;
}
function createEmployeeDetailsCards():void {
    let count:number = 0;
    employee.forEach(ele => {
        if (ele.role == role.roleName && ele.location == role.cityName) {
            let roleCardContainer:HTMLElement = document.getElementById("details-card-container") as HTMLElement;

            let detailsCard:HTMLElement  = document.createElement("div");
            detailsCard.classList.add('details-card', 'd-flex');

            let cardContent:HTMLElement  = document.createElement("div");
            cardContent.classList.add("card-content");

            let employeeDetails:HTMLElement  = document.createElement("div");
            employeeDetails.classList.add("employee-card-details", "d-flex");
            let employeeImg:HTMLImageElement  = document.createElement("img");
            employeeImg.src = ele.employeeImg;
            employeeDetails.appendChild(employeeImg);

            let employeeName:HTMLElement  = document.createElement("div");
            employeeName.classList.add("employee-name", "d-flex");
            let nameOfEmployee:HTMLSpanElement  = document.createElement("span");
            nameOfEmployee.setAttribute('id', 'emp-name');
            nameOfEmployee.innerText = ele.Name;
            let roleOfEmployee:HTMLSpanElement  = document.createElement("span");
            roleOfEmployee.innerText = ele.role;
            employeeName.appendChild(nameOfEmployee);
            employeeName.appendChild(roleOfEmployee);
            employeeDetails.appendChild(employeeName);

            let IdOfEmployee:HTMLElement  = document.createElement("div");
            IdOfEmployee.classList.add("employee-information", "d-flex");
            let idImage:HTMLImageElement = document.createElement("img");
            idImage.src = "../assets/icons/emp-id.svg";
            let idNo:HTMLSpanElement = document.createElement("span");
            idNo.innerText = ele.empNo;
            IdOfEmployee.appendChild(idImage);
            IdOfEmployee.appendChild(idNo);

            let emailOfEmployee:HTMLElement = document.createElement("div");
            emailOfEmployee.classList.add("employee-information", "d-flex");
            let emailImage:HTMLImageElement = document.createElement("img");
            emailImage.src = "../assets/icons/email-icon.svg";
            let emailId:HTMLSpanElement = document.createElement("span");
            emailId.innerText = ele.mailId;
            emailOfEmployee.appendChild(emailImage);
            emailOfEmployee.appendChild(emailId);

            let deptOfEmployee:HTMLElement = document.createElement("div");
            deptOfEmployee.classList.add("employee-information", "d-flex");

            let deptImage:HTMLImageElement = document.createElement("img");
            deptImage.src = "../assets/icons/team.svg";
            let deptId:HTMLSpanElement = document.createElement("span");
            deptId.innerText = ele.department;
            deptOfEmployee.appendChild(deptImage);
            deptOfEmployee.appendChild(deptId);

            let locationOfEmployee:HTMLElement = document.createElement("div");
            locationOfEmployee.classList.add("employee-information", "d-flex");
            let locationImage:HTMLImageElement = document.createElement("img");
            locationImage.src = "../assets/icons/location.svg";
            let locationName:HTMLSpanElement = document.createElement("span");
            locationName.innerText = ele.location;
            locationOfEmployee.appendChild(locationImage);
            locationOfEmployee.appendChild(locationName);

            cardContent.appendChild(employeeDetails);
            cardContent.appendChild(IdOfEmployee);
            cardContent.appendChild(emailOfEmployee);
            cardContent.appendChild(deptOfEmployee);
            cardContent.appendChild(locationOfEmployee);

            let view:HTMLElement = document.createElement("div");
            view.classList.add("view");
            view.classList.add("d-flex");

            let heading:HTMLSpanElement = document.createElement("span");
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

    })
    if (count == 0) {
        let roleCardContainer:HTMLElement = document.getElementById("details-card-container") as HTMLElement;
        let detailsCard:HTMLElement = document.createElement("div");
        detailsCard.classList.add("details-card");

        detailsCard.innerText = "No Employees assigned for this role";
        roleCardContainer.appendChild(detailsCard);

    }
    addEditListner();
}

//open add employee form 
export function openAddEmployeeForm():void {
    editRoleDetails();
    (<HTMLElement>document.querySelector(".view-employees")).style.display = "none";
    (<HTMLElement>document.querySelector(".add-role-form")).style.display = "block";
    (<HTMLElement>document.querySelector(".form-container")).style.display = "none";
}

export function closeAddEmployeeForm():void {
    (<HTMLElement>document.querySelector(".view-employees")).style.display = "block";
    (<HTMLElement>document.querySelector(".add-role-form")).style.display = "none";
    (<HTMLElement>document.querySelector(".form-container")).style.display = "none";
}


export function editRoleDetails():void {
    let inputRole:HTMLSelectElement = document.getElementById("role-name-input") as HTMLSelectElement;
    let inputDepartment:HTMLSelectElement = document.getElementById("department-dropdown") as HTMLSelectElement;
    let inputLocation:HTMLSelectElement = document.getElementById("location-dropdown") as HTMLSelectElement;
    inputRole.value = role.roleName;
    inputLocation.value = role.cityName;
    inputDepartment.disabled = true;
    inputRole.disabled = true;
    inputLocation.disabled = true;
    (<HTMLInputElement>document.getElementById("description")).disabled = true;
    (<HTMLElement>document.querySelector(".searchEmployee")).style.pointerEvents = "auto";
    (<HTMLButtonElement>document.querySelector(".save-button")).style.display = "block";
}

collectUnassignedEmployees();
var unassignedEmployee: string[] = [];
function collectUnassignedEmployees():void {
    (<HTMLElement>document.getElementById("assign-employee-section")).innerHTML = "";
    (<HTMLSelectElement>document.getElementById("location-dropdown")).value;
    let a :number= 0;
    employee.forEach(r => {
        if (r.role == "N/A" && r.location == role.cityName) {
            let assignEmployeeDiv:HTMLElement = document.createElement("div");
            assignEmployeeDiv.classList.add("assign-employee");
            let assignEmployeeDetails:HTMLDivElement = document.createElement("div");
            assignEmployeeDetails.classList.add("assign-employee-details");
            let assignEmployeeImg:HTMLImageElement = document.createElement("img");
            assignEmployeeImg.src = r.employeeImg;
            let employeeName :HTMLLabelElement= document.createElement("label");
            employeeName.classList.add("check-employee");
            employeeName.innerText = r.Name;
            employeeName.setAttribute("for", "chekCheckBox" + a);
            assignEmployeeDetails.appendChild(assignEmployeeImg);
            assignEmployeeDetails.appendChild(employeeName);
            let check :HTMLElement= document.createElement("INPUT");
            check.setAttribute("type", "checkbox");
            check.classList.add("employee-check-box");
            check.setAttribute('id', "chekCheckBox" + a);
            let id :string= r.empNo;
            check.onchange = function () {
                checkUnassignedEmployees(this, id);
            };
            a++;
            assignEmployeeDiv.appendChild(assignEmployeeDetails);
            assignEmployeeDiv.appendChild(check);
            (<HTMLElement>document.getElementById("assign-employee-section")).appendChild(assignEmployeeDiv);
        }
    })
}
var visible:boolean = false;
export function showUnassignedEmployees():void {
    if (visible) {
        closeUnassignedEmployees();
    }
    else {
        openUnassignedEmployees();
    }
    visible = !visible;
}

export function openUnassignedEmployees():void {
    (<HTMLElement>document.getElementById("assign-employee-section")).style.display = "flex";
}

export function closeUnassignedEmployees():void {
    (<HTMLElement>document.getElementById("assign-employee-section")).style.display = "none";
}

//check box checked
function checkUnassignedEmployees(className: GlobalEventHandlers, employeeID: string):void {
    if (unassignedEmployee.includes(employeeID)) {
        unassignedEmployee.splice(unassignedEmployee.indexOf(employeeID), 1);
    }
    else {
        unassignedEmployee.push(employeeID);
    }
}

export function addRoleFormEmployee():void {
    let inputRole :HTMLSelectElement= document.getElementById("role-name-input") as HTMLSelectElement;
    employee.forEach(r => {
        if (unassignedEmployee.includes(r.empNo)) {
            r.role = inputRole.value;
        }
    })
    localStorage.setItem('employee', JSON.stringify(employee));

}
document.addEventListener("click", (event: Event):void => {
    let target:EventTarget = event.target!;
    if ((<Element>target).className != "asssign-employees-container" && (<Element>target).className != "searchEmployee" && (<Element>target).className != "assign-employee" && (<Element>target).className != "assign-employee-details" && (<Element>target).className != "check-employee" && (<Element>target).className != "employee-check-box") {
        if ((<HTMLElement>document.querySelector(".asssign-employees-container")).style.display == "flex") {
            showUnassignedEmployees();
        }
    }
})

function addEditListner():void {
    (document.querySelectorAll(".view") as NodeListOf<HTMLElement>).forEach(emp => {
        emp.addEventListener("click", function ():void {
            (document.querySelector(".view-employees") as HTMLElement).style.display = "none";
            (<HTMLElement>document.querySelector(".add-role-form")).style.display = "none";
            (<HTMLElement>document.querySelector(".form-container")).style.display = "block";
            (<HTMLInputElement>document.getElementById("firstName")).disabled = true;
            let employeeId:string = (<HTMLElement>emp!.parentElement!.querySelector(".card-content")!.querySelector(".employee-information")!).innerText;
            (<HTMLButtonElement>document.querySelector(".upload-image-btn")).disabled = true;
            let formInputs :string[]= ["mailId", "assignProject", "assignManager", "mobileNumber", "DepartmentDropDown", "dropDownLocation", "roleDropDown"];
            let employeeDataLabels:string[] = ["r.mailId", "r.project", "r.manager", "r.number", "r.department", "r.location", "r.role"];
            employee.forEach(r => {
                if (r.empNo == employeeId) {
                    let firstName:HTMLElement = document.getElementById("firstName")!;
                    let lastName:HTMLElement = document.getElementById("lastName")!;
                    let dob:HTMLElement = document.getElementById("dateOfBirth")!;
                    let dateofJoin:HTMLElement = document.getElementById("joinDate")!;
                    let id :HTMLElement= document.getElementById("empNo")!;
                    for (let i :number = 0; i < formInputs.length; i++) {
                        disableInputFields(document.getElementById(formInputs[i]) as HTMLInputElement, eval(employeeDataLabels[i]));
                    }
                    let [dd, mm, yy]:string[] = r.dateofJoin.split('/');
                    let formattedDOJ:string = yy + "-" + mm + "-" + dd;
                    disableInputFields(dateofJoin as HTMLInputElement, formattedDOJ);
                    let [ddd, mmm, yyy]:string[] = r.dateOfBirth.split('/');
                    let formattedDOB:string = yyy + "-" + mmm + "-" + ddd;
                    disableInputFields(dob as HTMLInputElement, formattedDOB);
                    let [fname, lname]:string[] = r.Name.split(" ");
                    if (lname == undefined) {
                        disableInputFields(lastName as HTMLInputElement, "");
                    }
                    else {
                        disableInputFields(lastName as HTMLInputElement, lname);
                    }
                    (<HTMLImageElement>document.getElementById("display-image")).src = r.employeeImg;
                    disableInputFields(firstName as HTMLInputElement, fname);
                    disableInputFields(id as HTMLInputElement, r.empNo);
                    (<HTMLButtonElement>document.querySelector(".upload-image-btn")).addEventListener("change", function (event: any) {
                        let imgdisplay :HTMLImageElement= document.getElementById("display-image") as HTMLImageElement;
                        imgdisplay.src = URL.createObjectURL(event.target.files[0]);
                        let reader:FileReader = new FileReader();
                        reader.onload = function () {
                            let imageData :string = String(reader.result);

                        }
                        reader.readAsDataURL(event.target.files[0]);
                    })
                }
            })

        })
    })
}

//to disable the items
function disableInputFields(ele: HTMLInputElement, val: string):void {
    ele!.value = val;
    ele!.disabled = true;
}

function closeForm():void {
    (<HTMLElement>document.querySelector(".view-employees")).style.display = "block";
    (<HTMLElement>document.querySelector(".add-role-form")).style.display = "none";
    (<HTMLElement>document.querySelector(".form-container")).style.display = "none";
}

exports.closeForm = closeForm;
exports.openAddEmployeeForm = openAddEmployeeForm;
exports.closeAddEmployeeForm = closeAddEmployeeForm;
exports.showUnassignedEmployees = showUnassignedEmployees;
exports.addRoleFormEmployee = addRoleFormEmployee;
