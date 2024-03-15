import { fetchData } from "./common.js";
import { employee, roleDetails, Employee } from "./common.js";

var exports: any = document;

fetchData();
createTable(employee);


window.document.addEventListener("DOMContentLoaded", function ():void {
    var today = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    document.getElementsByName("todaysdate")[0]?.setAttribute('min', today);
    let header:HTMLElement = document.querySelector(".header") as HTMLElement;
    let headerHeight = header.offsetHeight;
    let description:HTMLElement = document.querySelector(".employee-section") as HTMLElement;
    let descriptionHeight = description.offsetHeight;
    let filter :HTMLElement= document.querySelector(".filter-section") as HTMLElement;
    let filterHeight = filter.offsetHeight;
    let advanceFilter:HTMLElement = document.querySelector(".advance-filter-section") as HTMLElement;
    let advanceFilterHeight = advanceFilter.offsetHeight;
    let deleteSection:HTMLElement = document.querySelector(".delete-section") as HTMLElement;
    let deleteSectionHeight = deleteSection.offsetHeight;
    let totalHeight = headerHeight + descriptionHeight + filterHeight + advanceFilterHeight + deleteSectionHeight;
    totalHeight += 52;
    let tableHeight = "calc(100vh - " + totalHeight + "px)";
    let table:HTMLElement = document.querySelector(".table-div") as HTMLElement;
    table.style.height = tableHeight;
});

roleDetails.forEach(r => {
    let newOption:HTMLOptionElement = new Option(r.roleName, r.roleName);
    let dropDownRole:HTMLSelectElement = document.getElementById("roleDropDown") as HTMLSelectElement;
    dropDownRole.add(newOption, undefined);
})
attachListnerToChangeStatus();


// creating table
function createTable(data: Employee[]):void {
    let tbody :HTMLTableElement= document.getElementById("tableBody") as HTMLTableElement;
    let i;
    for (i = 0; i < data.length; i++) {
        let tableRow:HTMLTableRowElement = document.createElement("tr");
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
    </td>`
        tbody?.append(tableRow);
        // In active
        if (data[i].status == "In-Active") {
            document.querySelectorAll("#changeBackGround")[i].classList.remove("active");
            document.querySelectorAll("#changeBackGround")[i].classList.add("in-active");
        }

    }
    addListnerToEditOption();
    (<HTMLButtonElement>document.getElementById("delete-btn")).disabled = true;
}

//change the status of the employee
function attachListnerToChangeStatus():void {
    let array:Array<HTMLElement>= Array.from(document.getElementsByClassName("status-option")as HTMLCollectionOf<HTMLElement>);
    array.forEach(icon => {
        icon.addEventListener("click", function ():void {
            let row:HTMLElement|null= icon!.parentElement!.parentElement!.parentElement!.parentElement;
            let col:NodeListOf<HTMLTableCellElement> = row!.querySelectorAll("td");
            let employeeId: string;
            col.forEach(cell => {
                if (cell.cellIndex === 5) {
                    employeeId = cell.innerText.trim();
                }
                if (cell.cellIndex === 6) {
                    let division:HTMLElement = document.createElement("div");
                    if (cell.innerText == "In-Active") {
                        changeStatus(cell, division, "Active", "active", icon as HTMLElement, employeeId);
                    }
                    else if (cell.innerText == "Active") {
                        changeStatus(cell, division, "In-Active", "in-active", icon as HTMLElement, employeeId);
                    }
                    localStorage.setItem('employee', JSON.stringify(employee));
                }
            })
            applyDropDownFilter();
        })
    })
}

function changeStatus(cell: HTMLElement, division: HTMLElement, status: string, className: string, icon: HTMLElement, employeeId: string):void {
    cell.innerText = "";
    division.innerText = status;
    division.classList.add(className);
    cell.appendChild(division);
    icon.innerText = status == "Active" ? "Mark as In-Active" : "Mark as Active";
    employee.forEach(r => {
        if (r.empNo == employeeId) {
            r.status = status;
        }
    })
}

//to enable and edit the details of an emoloyee
export function editEmployeeDetails(event: Event):void {
    event.preventDefault();
    (<HTMLButtonElement>document.querySelector(".upload-image-btn")).disabled = false;
    let formInputs :Array<string>= ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "dropDownLocation", "roleDropDown", "DepartmentDropDown", "joinDate", "assignManager", "assignProject"];
    formInputs.forEach(ele => {
        (<HTMLInputElement>document.getElementById(ele)).disabled = false;
    });
    (<HTMLButtonElement>document.querySelector(".edit-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".save-button")).style.display = "block";
}


export function saveEmployeeDetails(event:Event):void {
    event.preventDefault();
    let id :string= (<HTMLInputElement>document.getElementById("empNo")).value;
    let formInputs:Array<string> = ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "joinDate"];
    let validMsg :Array<string>= ["validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join"];
    let isInvalid:number = 0;
    let j :number= 0;
    for (let i:number = 0; i < formInputs.length; i++) {
        if ((<HTMLInputElement>document.getElementById(formInputs[i])).value.length < 1) {
            if (formInputs[i] == "mailId") {
                j += 1;
            }
            invalidInput(document.getElementById(validMsg[i])!, document.getElementById(formInputs[i]), "This field is required");
            isInvalid = 1;
        }
    }
    if ((<HTMLInputElement>document.getElementById("mobileNumber")).value.length < 10) {
        invalidInput(document.getElementById("phone-number")!, document.getElementById("mobileNumber"), "Enter 10 digits");
        isInvalid = 1;
    }
    let st:number=0;
    for (let i = 0; i < (<HTMLInputElement>document.getElementById("mailId")).value.length; i++) {
        if ((<HTMLInputElement>document.getElementById("mailId")).value[i] == '@') {
            st = i + 1;
        }
    }
    let result:string = (<HTMLInputElement>document.getElementById("mailId")).value.slice(st);
    if (result != "tezo.com" && j == 0) {
        invalidInput(document.getElementById("valid")!, document.getElementById("mailId"), "Email invalid");
        isInvalid = 1;
    }
    let inputDOJ:string  = (<HTMLInputElement>document.getElementById("joinDate")).value;
    let [yy, mm, dd]:Array<string> = inputDOJ.split('-');
    let formattedDOJ :string = dd + "/" + mm + "/" + yy;
    let [yyy, mmm, ddd]:Array<string>  = (<HTMLInputElement>document.getElementById("dateOfBirth")).value.split('-');
    let formattedDOB:string = ddd + "/" + mmm + "/" + yyy;
    employee.forEach(r => {
        if (r.empNo == id) {
            r.employeeImg = imageData ? imageData : r.employeeImg;
            r.Name = (<HTMLInputElement>document.getElementById(formInputs[0])).value + " " + (<HTMLInputElement>document.getElementById(formInputs[1])).value;
            r.mailId = (<HTMLInputElement>document.getElementById(formInputs[3])).value;
            r.location = (<HTMLInputElement>document.getElementById("dropDownLocation")).value;
            r.dateofJoin = formattedDOJ;
            r.department = (<HTMLInputElement>document.getElementById("DepartmentDropDown")).value;
            r.role = (<HTMLInputElement>document.getElementById("roleDropDown")).value?.length ? (<HTMLInputElement>document.getElementById("roleDropDown")).value : "N/A";
            r.dateOfBirth = formattedDOB;
            r.manager = (<HTMLInputElement>document.getElementById("assignManager")).value;
            r.project = (<HTMLInputElement>document.getElementById("assignProject")).value;
        }

    })
    localStorage.setItem('employee', JSON.stringify(employee));
    let tbody :HTMLTableElement= document.getElementById("tableBody") as HTMLTableElement;
    tbody.innerHTML = ' ';
    applyDropDownFilter();
    if (isInvalid != 1) {
        (<HTMLElement>document.querySelector(".employeetable-container")).style.display = "block";
        (<HTMLElement>document.querySelector(".form-container")).style.display = "none";
        (<HTMLElement>document.querySelector(".save-button")).style.display = "none";
        (<HTMLElement>document.querySelector(".submit-button")).style.display = "block";
    }
}

// edit employee details
function addListnerToEditOption() :void{
    document.querySelectorAll(".edit-employee").forEach(emp => {
        emp.addEventListener("click", function ():void {
            (<HTMLElement>document.querySelector(".employeetable-container")).style.display = "none";
            (<HTMLElement>document.querySelector(".form-container")).style.display = "block";
            (<HTMLButtonElement>document.querySelector(".submit-button")).style.display = "none";
            (<HTMLButtonElement>document.querySelector(".edit-button")).style.display = "block";
            (<HTMLInputElement>document.getElementById("firstName")).disabled = true;
            let row :HTMLElement|null= emp!.parentElement!.parentElement!.parentElement!.parentElement;
            let employeeId: string;
            let col:NodeListOf<HTMLTableCellElement>= row!.querySelectorAll("td");
            col.forEach(cell => {
                if (cell.cellIndex === 5) {
                    employeeId = cell.innerText.trim();
                }
            });
            (<HTMLButtonElement>document.querySelector(".upload-image-btn")).disabled = true;
            let formInputs :Array<string>= ["mailId", "assignProject", "assignManager", "mobileNumber", "DepartmentDropDown", "dropDownLocation", "roleDropDown"];
            let employeeDataLabels:Array<string> = ["r.mailId", "r.project", "r.manager", "r.number", "r.department", "r.location", "r.role"];
            employee.forEach(r => {
                if (r.empNo == employeeId) {
                    let firstName:HTMLElement = document.getElementById("firstName")!;
                    let lastName:HTMLElement  = document.getElementById("lastName")!;
                    let dob:HTMLElement  = document.getElementById("dateOfBirth")!;
                    let dateofJoin:HTMLElement  = document.getElementById("joinDate")!;
                    let id:HTMLElement  = document.getElementById("empNo")!;
                    for (let i = 0; i < formInputs.length; i++) {
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
                    (<HTMLElement>document.querySelector(".upload-image-btn")).addEventListener("change", function (event: any):void {
                        let imgdisplay:HTMLImageElement = document.getElementById("display-image") as HTMLImageElement;
                        imgdisplay.src = URL.createObjectURL(event.target.files[0]);
                        let fileReader :FileReader= new FileReader();
                        fileReader.onload = function ():void {
                            imageData = <string>fileReader.result;
                        }
                        fileReader.readAsDataURL(event.target.files[0]);
                    })
                }
            })

        })
    })
}

//to disable the items
function disableInputFields(ele: HTMLInputElement, val: string):void {
    ele.value = val;
    ele.disabled = true;
}

//function to handle the display of options    
var hidden :boolean= true;
export function displayhiddenOptions(x: HTMLElement):void {
    if (hidden) {
        openhiddenOptions(x);
    }
    else {
        closehiddenOptions(x);
    }
    hidden = !hidden;
}

// to display the options
function openhiddenOptions(x: HTMLElement):void {
    (<HTMLElement>x.querySelector(".options")).style.visibility = "visible";
}

//to hide the options
function closehiddenOptions(x: HTMLElement):void {
    (<HTMLElement>x.querySelector(".options")).style.visibility = "hidden";
}

//to hide the options wherever i click on page
document.addEventListener("click", (event: Event):void => {
    let target:EventTarget = event.target!;
    let optionsContainer:Array<Element>= Array.from(document.getElementsByClassName("hidden-options"));
    if ((<Element>target).className != "more-options" && (<Element>target).className != "options") {
        optionsContainer.forEach(r => {
            if ((<HTMLElement>r.querySelector(".options")).style.visibility == "visible") {
                displayhiddenOptions(r as HTMLElement);
            }
        })
    }
})

//to delete the row
function deleteRow(x: HTMLTableRowElement):void {
    let row:HTMLElement = x!.parentElement!.parentElement!.parentElement!.parentElement!;
    let empNo: string;
    let col:NodeListOf<HTMLTableCellElement>= row!.querySelectorAll("td");
    col.forEach(cell => {
        if (cell.cellIndex == 5) {
            empNo = cell!.textContent!.trim();
        }
    })
    let count :number = 0;
    employee.forEach(r => {
        if (r.empNo == empNo) {
            employee.splice(count, 1);
        }
        count++;
        localStorage.setItem('employee', JSON.stringify(employee));
    })
    applyDropDownFilter();
}



//open form
var imageData:string;
function openEmployeeForm() :void{
    (<HTMLElement>document.querySelector(".employeetable-container")).style.display = "none";
    (<HTMLElement>document.querySelector(".form-container")).style.display = "block";
    (<HTMLButtonElement>document.querySelector(".upload-image-btn")).disabled = false;
    let imgdisplay:HTMLImageElement = document.getElementById("display-image") as HTMLImageElement;
    imgdisplay.src = "../assets/images/upload-image.png";
    let formInputs :string[]= ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "dropDownLocation", "DepartmentDropDown", "roleDropDown", "joinDate", "empNo", "assignManager", "assignProject"];
    formInputs.forEach(r => {
        (<HTMLInputElement>document.getElementById(r)).disabled = false;
        (<HTMLInputElement>document.getElementById(r)).value = "";
    });
    (<HTMLButtonElement>document.querySelector(".upload-image-btn")).addEventListener("change", function (event: any) {
        let imgdisplay :HTMLImageElement= document.getElementById("display-image") as HTMLImageElement;
        imgdisplay.src = URL.createObjectURL(event.target.files[0]);
        let fileReader:FileReader = new FileReader();
        fileReader.onload = function () {
            imageData = <string>fileReader.result;
        }
        fileReader.readAsDataURL(event.target.files[0]);
    })
}

// hiding  and opening the advance filter when we add click on filter icon
var filter :boolean= true;
function hideAdvanceFilter():void {
    const advanceFilter:HTMLElement = document.querySelector(".advance-filter-section") as HTMLElement;
    const table :HTMLTableElement= document.querySelector(".table-container") as HTMLTableElement;
    const tableBody:HTMLTableElement = document.querySelector(".table-div") as HTMLTableElement;
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
function displaySearchedName(event: { keyCode: number; }):void {
    var input:string = (<HTMLInputElement>document.getElementById("searchBar")).value.toUpperCase();
    if (event.keyCode == 13 && input.length >= 3) {
        searchTable(input);
    }
    else {
        let tbody:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
        tbody.innerHTML = ' ';
        createTable(employee);
        attachListnerToChangeStatus();
    }
}

function searchTable(input: string) :void{
    var tableData :HTMLTableElement= document.querySelector(".table") as HTMLTableElement;
    var tr:Element[] = Array.from(tableData.getElementsByClassName("row"));
    let tableRow: Employee[] = [];
    tr.forEach(r => {
        let rowData: any = [];
        let col:NodeListOf<HTMLTableCellElement> = r.querySelectorAll("td");
        col.forEach(cell => {
            if (cell.cellIndex === 1) {
                let image:HTMLImageElement= cell.querySelector("img") as HTMLImageElement;
                rowData.employeeImg = image.src;
                let userdata :string= cell.innerText.trim();
                let [name, email]:string[] = userdata.split("\n");
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
    })
    let arr: Employee[] = [];
    tableRow.forEach(r => {
        let txtValue:string = r.Name;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            arr.push(r);
        }
    })
    let tbody:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
    tbody.innerHTML = ' ';
    createTable(arr);
    attachListnerToChangeStatus();
}

//  alphabet filter 
applyalphabetFilter();
var btn :string = "";
function applyalphabetFilter():void {
    document.querySelectorAll(".alphabets").forEach(button => {
        button.addEventListener("click", function (this: HTMLButtonElement) {
            var currentButton:HTMLButtonElement = this;
            btn = currentButton.innerText;
            if (selectedData[0] == "null" && selectedData[1] == "null" && selectedData[2] == "null") {
                if (currentButton.style.background == "rgb(244, 72, 72)") {
                    currentButton.style.background = "rgb(240, 240, 240)";
                    currentButton.style.color = "var(--gray)";
                    let filteredData:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
                    filteredData.innerHTML = '';
                    createTable(employee);
                    attachListnerToChangeStatus();
                    btn = "";
                }
                else {
                    (document.querySelectorAll(".alphabets") as NodeListOf<HTMLElement>).forEach(bt => {
                        bt.style.background = "rgb(240, 240, 240)";
                        bt.style.color = "var(--gray)";
                    });
                    currentButton.style.background = "#F44848";
                    currentButton.style.color = "white";

                    let char :string= currentButton.innerText;
                    let res :Employee[]= employee.filter(ele => {
                        let startLetter = ele.Name.charAt(0).toUpperCase();
                        return startLetter == char;
                    });
                    let tableBody:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
                    tableBody.innerHTML = '';
                    createTable(res);
                    attachListnerToChangeStatus();
                }
            }
            else {
                if (currentButton.style.background == "rgb(244, 72, 72)") {
                    currentButton.style.background = "rgb(240, 240, 240)";
                    currentButton.style.color = "var(--gray)";
                    let tableBody:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
                    tableBody.innerHTML = '';
                    let arr :Employee[]= dropDown(employee, selectedData[0], selectedData[1], selectedData[2]);
                    createTable(arr);
                    attachListnerToChangeStatus();
                    btn = "";
                }
                else {
                    let arr :Employee[]= dropDown(employee, selectedData[0], selectedData[1], selectedData[2]);
                    let tbody :HTMLTableElement= document.getElementById("tableBody") as HTMLTableElement;
                    tbody.innerHTML = ' ';
                    (document.querySelectorAll(".alphabets") as NodeListOf<HTMLElement>).forEach(bt => {
                        bt.style.background = "rgb(240, 240, 240)";
                        bt.style.color = "var(--gray)";
                    });
                    currentButton.style.background = "#F44848";
                    currentButton.style.color = "white";

                    let char:string = currentButton.innerText;
                    let res:Employee[] = arr.filter(ele => {
                        let startLetter = ele.Name.charAt(0).toUpperCase();
                        return startLetter == char;
                    });
                    let tableData:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
                    tableData.innerHTML = '';
                    createTable(res);
                    attachListnerToChangeStatus();
                }
            }

        });
    });
}

//to fetch the select data on clicking the apply
var selectedData :string[]= ["null", "null", "null"];
function collectSelectedDropDownValue():void{
    let status:string = (<HTMLSelectElement>document.getElementById("statusDropDown")).value;
    let location :string= (<HTMLSelectElement>document.getElementById("locationDropDown")).value;
    let dept:string = (<HTMLSelectElement>document.getElementById("deptDropDown")).value;
    let selectedDropDownData:string[] = [status, location, dept];
    selectedData = selectedDropDownData;

}

//apply dropdown
function applyDropDownFilter():void {
    collectSelectedDropDownValue();
    let data:Employee[] = [];
    if (btn == "") {
        data = employee;
    }
    else {
        let res:Employee[] = employee.filter(ele => {
            let startLetter = ele.Name.charAt(0).toUpperCase();
            return startLetter == btn;
        });

        data = res;
    }

    let arr:Employee[] = dropDown(data, selectedData[0], selectedData[1], selectedData[2]);
    let tbody :HTMLTableElement= document.getElementById("tableBody") as HTMLTableElement;
    tbody.innerHTML = ' ';
    createTable(arr);
    attachListnerToChangeStatus();
}

function dropDown(input: Employee[], status: string, location: string, dept: string):Employee[]{
    if (location != "null" || status != "null" || dept != "null") {
        let ans:Employee[] = input.filter(ele => {
            let statusVal:string = ele.status;
            let locationVal :string= ele.location;
            let deptVal:string = ele.department;
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
        })
        return ans;
    }
    else {
        return input;
    }
}

//check box
function enableCheckBox() :void{
    let checkBox:NodeListOf<HTMLInputElement> = document.querySelectorAll(".check-box") as NodeListOf<HTMLInputElement>;
    let delBtn:HTMLButtonElement = document.getElementById("delete-btn") as HTMLButtonElement;
    checkBox.forEach(a => {
        if (a.checked) {
            delBtn.style.background = "var(--red-300)";
            (<HTMLButtonElement>document.getElementById("delete-btn")).disabled = false;
        }
        else {
            let checkCount = document.querySelectorAll("input[type='checkbox']:checked").length > 0;
            if (!checkCount) {
                delBtn.style.background = "#F89191";
            }
        }
    })
}

//delete
function deleteSelectedEmployeeRows():void {
    let checkBox:NodeListOf<HTMLInputElement> = document.querySelectorAll(".check-box") as NodeListOf<HTMLInputElement>;
    checkBox.forEach(a => {
        if (a.checked) {
            let row:HTMLElement = a!.parentElement!.parentElement!;
            let empNo: string;
            let col:NodeListOf<HTMLTableCellElement>= row!.querySelectorAll("td");
            col.forEach(cell => {
                if (cell.cellIndex == 5) {
                    empNo = cell!.textContent!.trim();
                }
            })
            let count :number= 0;
            employee.forEach(r => {
                if (r.empNo == empNo) {
                    employee.splice(count, 1);
                    console.log(employee);
                }
                count++;
            })
            localStorage.setItem('employee', JSON.stringify(employee));
            applyDropDownFilter();
            let delBtn :HTMLButtonElement= document.getElementById("delete-btn") as HTMLButtonElement;
            delBtn.style.background = "#F89191";
            (<HTMLInputElement>document.getElementById("headerCheckBox")).checked = false;
        }
    });
}

// check all
function checkAllCheckBoxes():void{
    let mainCheck: HTMLInputElement = document.getElementById("headerCheckBox") as HTMLInputElement;
    let del:HTMLButtonElement = document.getElementById("delete-btn") as HTMLButtonElement;
    let check:NodeListOf<HTMLInputElement> = document.querySelectorAll(".check-box") as NodeListOf<HTMLInputElement>;
    check.forEach(a => {
        a.checked = mainCheck.checked;
    })
    let checkCount:boolean = document.querySelectorAll("input[type='checkbox']:checked").length > 0;
    if (!checkCount) {
        del.style.background = "#F89191";
    }
    else {
        del.style.background = "var(--red-300)";
        (<HTMLButtonElement>document.getElementById("delete-btn")).disabled = false;
    }
}


// sort the table
var sortingOrders: string[] = [];
function sortEmployeeTable(n: number):void {
    let tbody:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
    let trow:Array<Element> = Array.from(document.querySelectorAll(".row"));
    if (!(n in sortingOrders)) {
        sortingOrders[n] = 'asc';
    }

    trow.sort((a, b) => {
        let row1:string = a.querySelectorAll(".details")[n]!.textContent!.trim();
        let row2 :string= b.querySelectorAll(".details")[n]!.textContent!.trim();
        return sortingOrders[n] === 'asc' ? row1.localeCompare(row2) : row2.localeCompare(row1);
    });
    sortingOrders[n] = sortingOrders[n] === 'asc' ? 'desc' : 'asc';
    tbody.innerHTML = '';
    trow.forEach(r => {
        tbody.appendChild(r);
    });
}


// form formSubmission

function formSubmission(event: Event) :void{
    event.preventDefault();
    (<HTMLButtonElement>document.querySelector(".save-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".edit-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".submit-button")).style.display = "block";
    SubmitEmployeeDetails(event);
}
function SubmitEmployeeDetails(event: Event):void {
    let formInputs:string[] = ["empNo", "firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "joinDate", "dropDownLocation", "DepartmentDropDown", "assignManager", "assignProject"];
    let validMsg:string[] = ["validEmpNo", "validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join", "city", "dept", "manager", "project"];
    let isInvalid:number = 0;
    let k:number = 0, j:number= 0;
    for (let i:number = 0; i < formInputs.length; i++) {
        if ((<HTMLInputElement>document.getElementById(formInputs[i])).value.length < 1) {
            if (formInputs[i] == "empNo") {
                k += 1;
            }
            if (formInputs[i] == "mailId") {
                j += 1;
            }
            invalidInput(document.getElementById(validMsg[i])!, document.getElementById(formInputs[i]), "This field is required");
            isInvalid = 1;
        }
    }
    let id :HTMLInputElement= document.getElementById("empNo") as HTMLInputElement;
    let idres:string = id.value.slice(0, 2);
    let idnum :string= id.value.slice(2, id.value.length);
    if (k == 0) {
        if ((idres != 'TZ' && idres != 'tz')) {
            invalidInput(document.getElementById("validEmpNo")!, id, "Enter valid employee ID");
            isInvalid = 1;
        }
        if (id.value.length < 3) {
            invalidInput(document.getElementById("validEmpNo")!, id, "Enter valid employee ID");
            isInvalid = 1;
        }
        employee.forEach(r => {
            if (r.empNo == id.value) {
                invalidInput(document.getElementById("validEmpNo")!, id, "Employee already exists");
                isInvalid = 1;
            }
        })
    }
    let number:HTMLInputElement = document.getElementById("mobileNumber") as HTMLInputElement;
    if (number.value.length < 10) {
        invalidInput(document.getElementById("phone-number")!, number, "Enter 10 digits");
        isInvalid = 1;
    }
    let st:number=0;
    let mailId = document.getElementById("mailId") as HTMLInputElement;
    for (let i = 0; i < mailId.value.length; i++) {
        if (mailId.value[i] == '@') {
            st = i + 1;
        }
    }
    let result:string = mailId.value.slice(st);
    if (result != "tezo.com" && j == 0) {
        invalidInput(document.getElementById("valid")!, mailId, "Email invalid");
        isInvalid = 1;
    }
    let inputDOJ:string = (<HTMLInputElement>document.getElementById("joinDate")).value;
    let [yy, mm, dd]:string[] = inputDOJ.split('-');
    let formattedDOJ:string = dd + "/" + mm + "/" + yy;
    let [yyy, mmm, ddd] :string[]= (<HTMLInputElement>document.getElementById("dateOfBirth")).value.split('-');
    let formattedDOB :string= ddd + "/" + mmm + "/" + yyy;
    if (isInvalid == 1) {
        event.preventDefault();
    }
    else {
        let formData: Employee = {
            employeeImg: imageData ? imageData : "../assets/images/upload-image.png",
            Name: (<HTMLInputElement>document.getElementById(formInputs[1])).value + " " + (<HTMLInputElement>document.getElementById(formInputs[2])).value,
            mailId: (<HTMLInputElement>document.getElementById(formInputs[4])).value,
            location: (<HTMLInputElement>document.getElementById(formInputs[7])).value,
            dateofJoin: formattedDOJ,
            department: (<HTMLInputElement>document.getElementById(formInputs[8])).value,
            role: (<HTMLInputElement>document.getElementById("roleDropDown")).value?.length ? (<HTMLInputElement>document.getElementById("roleDropDown")).value : "N/A",
            empNo: (<HTMLInputElement>document.getElementById(formInputs[0])).value.toUpperCase(),
            status: "Active",
            dateOfBirth: formattedDOB,
            manager: (<HTMLInputElement>document.getElementById(formInputs[9])).value,
            project: (<HTMLInputElement>document.getElementById(formInputs[10])).value,
            number: Number((<HTMLInputElement>document.getElementById(formInputs[5])).value)
        };

        employee.push(formData);
        localStorage.setItem('employee', JSON.stringify(employee));
        let tbody:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
        tbody.innerHTML = ' ';
        applyDropDownFilter();
        formInputs.forEach(ele => {
            (<HTMLInputElement>document.getElementById(ele)).value = "";
            (<HTMLInputElement>document.getElementById(ele)).classList.remove('error');
        })
        let validMsg:string[] = ['validEmpNo', "validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join", "city", "role-error", "dept", "manager", "project"];
        validMsg.forEach(ele => {
            (<HTMLInputElement>document.getElementById(ele)).innerText = "";
        })
        let imgdisplay:HTMLImageElement = document.getElementById("display-image") as HTMLImageElement;
        imgdisplay.src = "../assets/images/upload-image.png";
        (<HTMLElement>document.querySelector(".employeetable-container")).style.display = "block";
        (<HTMLElement>document.querySelector(".form-container")).style.display = "none";
        event.preventDefault();
    }
}

function invalidInput(element: HTMLElement, id: HTMLElement | null, msg: string):void {
    element!.innerText = msg;
    element!.classList.add('alert-msg');
    id!.classList.add("error");
}

//clear fields
function clearInputFeilds(event: Event) :void{
    (<HTMLButtonElement>document.querySelector(".edit-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".save-button")).style.display = "none";
    (<HTMLButtonElement>document.querySelector(".submit-button")).style.display = "block";
    let formInputs:string[] = ["firstName", "lastName", "dateOfBirth", "mailId", "mobileNumber", "dropDownLocation", "DepartmentDropDown", "roleDropDown", "joinDate", "empNo", "assignManager", "assignProject"];
    formInputs.forEach(r => {
        (<HTMLInputElement>document.getElementById(r)).disabled = false;
        (<HTMLInputElement>document.getElementById(r)).value = "";
        (<HTMLInputElement>document.getElementById(r)).classList.remove("error");
    });
    (<HTMLElement>document.querySelector(".employeetable-container")).style.display = "block";
    (<HTMLElement>document.querySelector(".form-container")).style.display = "none";
    let validMsg:string[] = ['validEmpNo', "validFirstName", "validLastName", "date-of-birth", "valid", "phone-number", "date-of-join", "city", "role-error", "dept", "manager", "project"];
    validMsg.forEach(ele => {
        (<HTMLElement>document.getElementById(ele)).innerText = "";
    })
}

// reset function
function resetFilters():void {
    let tbody:HTMLTableElement = document.getElementById("tableBody") as HTMLTableElement;
    tbody.innerHTML = ' ';
    (document.querySelectorAll(".alphabets") as NodeListOf<HTMLElement>).forEach(btn => {
        btn.style.background = "rgb(240, 240, 240)";
        btn.style.color = "var(--gray)";
    });
    (<HTMLSelectElement>document.getElementById("statusDropDown")).selectedIndex = 0;
    (<HTMLSelectElement>document.getElementById("locationDropDown")).selectedIndex = 0;
    (<HTMLSelectElement>document.getElementById("deptDropDown")).selectedIndex = 0;
    btn = "";
    collectSelectedDropDownValue();
    createTable(employee);
    attachListnerToChangeStatus();
}

//export file to excel
function exportToExcel():void {
    let table:HTMLTableElement = document.getElementById("employeeTable") as HTMLTableElement;
    let tableContent: string | number | boolean="";
    let headData = table.querySelectorAll(".table-header");
    console.log(headData);
    headData.forEach(r => {
        let cells = r.querySelectorAll("th");
        cells.forEach((ele, index) => {
            tableContent += '"' + (ele.innerText || '').replace(/"/g, '""') + '"' + (index < cells.length - 1 ? ',' : '\n');
        })
    })
    let row = table.querySelectorAll(".row");
    row.forEach(r => {
        let cells = r.querySelectorAll("td");
        cells.forEach((ele, index) => {
            tableContent += '"' + (ele.innerText || '').replace(/"/g, '""') + '"' + (index < cells.length - 1 ? ',' : '\n');
        })
    })
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