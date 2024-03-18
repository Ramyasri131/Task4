var _a, _b;
;
var employeeMockData = [
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
var roleMockDetails = [
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
export var employee;
export var roleDetails;
export var role;
employee = ((_a = JSON.parse(localStorage.getItem('employee'))) === null || _a === void 0 ? void 0 : _a.length) ? JSON.parse(localStorage.getItem('employee')) : localStorage.setItem('employee', JSON.stringify(employeeMockData));
roleDetails = ((_b = JSON.parse(localStorage.getItem('roleDetails'))) === null || _b === void 0 ? void 0 : _b.length) ? JSON.parse(localStorage.getItem('roleDetails')) : localStorage.setItem('roleDetails', JSON.stringify(roleMockDetails));
export function fetchData() {
    roleDetails = JSON.parse(localStorage.getItem('roleDetails'));
    employee = JSON.parse(localStorage.getItem('employee'));
    role = JSON.parse(localStorage.getItem('viewRole'));
}
