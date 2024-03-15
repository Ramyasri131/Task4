var exports: any = document;

export interface Employee {
    employeeImg:string;
    Name: string;
    mailId: string;
    location: string;
    dateofJoin: string;
    department: string;
    role: string;
    empNo: string;
    status: string;
    dateOfBirth: string;
    manager: string;
    project: string;
    number: number
};

var employeeMockData: Employee[] = [
    {
        employeeImg: "../assets/images/profie-icon.png",
        Name: "Edger Jones",
        mailId: "edger@tezo.com",
        location: "Hyderabad",
        dateofJoin: "04/02/2023",
        department: "Quality Assurance",
        role: "QA",
        empNo: "TZ1234",
        status: "In-Active",
        dateOfBirth: "12/01/2002",
        manager: "Ankitha",
        project: "Project1",
        number: 9876543210
    },
    {
        employeeImg: "../assets/images/profie-icon.png",
        Name: "Sandeep d",
        mailId: "sandeep.d@tezo.com",
        location: "Banglore",
        dateofJoin: "04/02/2023",
        department: "Quality Assurance",
        role: "Lead Developer",
        empNo: "TZ1231",
        status: "In-Active",
        dateOfBirth: "12/01/2002",
        manager: "Ankitha",
        project: "Project1",
        number: 9876543210
    },
    {
        employeeImg: "../assets/images/profie-icon.png",
        Name: "Test d",
        mailId: "sandeep.d@tezo.com",
        location: "Banglore",
        dateofJoin: "04/02/2023",
        department: "Quality Assurance",
        role: "N/A",
        empNo: "TZ12312",
        status: "In-Active",
        dateOfBirth: "12/01/2002",
        manager: "Ankitha",
        project: "Project1",
        number: 9876543210
    },
    {
        employeeImg: "../assets/images/profie-icon.png",
        Name: "User9 d",
        mailId: "sandeep.d@tezo.com",
        location: "Banglore",
        dateofJoin: "04/02/2023",
        department: "Quality Assurance",
        role: "N/A",
        empNo: "TZ12319",
        status: "In-Active",
        dateOfBirth: "12/01/2002",
        manager: "Ankitha",
        project: "Project1",
        number: 9876543210
    },
    {
        employeeImg: "../assets/images/profie-icon.png",
        Name: "Sandeep Bhaskar",
        mailId: "sandeep@tezo.com",
        location: "Banglore",
        dateofJoin: "04/02/2023",
        department: "Quality Assurance",
        role: "Lead Developer",
        empNo: "TZ1235",
        status: "In-Active",
        dateOfBirth: "12/01/2002",
        manager: "Ankitha",
        project: "Project1",
        number: 9876543210
    }
];

export interface RoleDetails {
    roleName: string;
    department: string;
    location: string;
    description: string
}

var roleMockDetails: RoleDetails[] = [
    {
        roleName: "QA",
        department: "Quality Assurance",
        location: "Hyderabad",
        description: "Configure the providers that are available to users when they sign in"
    },
    {
        roleName: "Lead Developer",
        department: "Product Engg",
        location: "Banglore",
        description: "Configure the providers that are available to users when they sign in"
    }
];

export interface Role {
    roleName: string;
    cityName: string;
    description: string
}

export var employee: Employee[];
export var roleDetails: RoleDetails[];
export var role: Role;
employee = JSON.parse(localStorage.getItem('employee')!)?.length ? JSON.parse(localStorage.getItem('employee')!) : localStorage.setItem('employee', JSON.stringify(employeeMockData));
roleDetails = JSON.parse(localStorage.getItem('roleDetails')!)?.length ? JSON.parse(localStorage.getItem('roleDetails')!) : localStorage.setItem('roleDetails', JSON.stringify(roleMockDetails));

export function fetchData() :void {
    roleDetails = JSON.parse(localStorage.getItem('roleDetails')!);
    employee = JSON.parse(localStorage.getItem('employee')!);
    role = JSON.parse(localStorage.getItem('viewRole')!);
}

// toggle side Menu
var sideBarOpen:boolean = true;
var mobileViewSideBarOpen:boolean = false;
var sideBar:HTMLElement = document.getElementById("side-nav") as HTMLElement;
var notification:HTMLElement = document.querySelector(".pop-up") as HTMLElement;
var handleIcon :HTMLElement= document.getElementById("handle-logo") as HTMLElement;
var mainContent:HTMLElement = document.querySelector(".main-content") as HTMLElement;
var minSideBar:HTMLElement = document.querySelector(".minimized-side-nav") as HTMLElement;
var screenSize:MediaQueryList = window.matchMedia("(min-width: 720px)");

export function toggleSideBar():void {
    if (screenSize.matches) {
        if (sideBarOpen) {
            closeSideBar();
        }
        else {
            openSideBar();
        }
        sideBarOpen = !sideBarOpen;
    }
    else {
        if (mobileViewSideBarOpen) {
            closemobileViewSideBar();
        }
        else {
            openmobileViewSideBar();
        }
        mobileViewSideBarOpen = !mobileViewSideBarOpen;
    }
};

function openmobileViewSideBar():void {
    sideBar.style.display = "flex";
    handleIcon.classList.add("rotate-360");
    handleIcon.classList.remove("rotate-180");
}

function closemobileViewSideBar():void {
    sideBar.style.display = "none";
    handleIcon.classList.add("rotate-180");
    handleIcon.classList.remove("rotate-360");
}

function openSideBar():void {
    notification.style.display = "block";
    sideBar.style.display = "flex";
    minSideBar.style.display = "none";
    mainContent.style.width = "78%";
    handleIcon.classList.add("rotate-360");
    handleIcon.classList.remove("rotate-180");
}

function closeSideBar():void {
    sideBar.style.display = "none";
    minSideBar.style.display = "block";
    notification.style.display = "none";
    mainContent.style.width = "99%";
    handleIcon.classList.add("rotate-180");
    handleIcon.classList.remove("rotate-360");
}

export function closeNotification():void {
    var update :HTMLElement= document.querySelector('.pop-up-box') as HTMLElement;
    update.style.display = "none";
}

exports.toggleSideBar=toggleSideBar;
exports.closeNotification=closeNotification;