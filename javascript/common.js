var _a, _b, _c;
(_a = document.getElementById("dismiss-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    closeNotification();
});
(_b = document.getElementById("accept-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    closeNotification();
});
(_c = document.getElementById("handle-logo")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    toggleSideBar();
});
var sideBarOpen = true;
// toggle side Menu
var mobileViewSideBarOpen = false;
var sideBar = document.getElementById("side-nav");
var notification = document.querySelector(".pop-up");
var handleIcon = document.getElementById("handle-logo");
var mainContent = document.querySelector(".main-content");
var minSideBar = document.querySelector(".minimized-side-nav");
var screenSize = window.matchMedia("(min-width: 720px)");
function toggleSideBar() {
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
}
;
function openmobileViewSideBar() {
    sideBar ? sideBar.style.display = "flex" : null;
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.add("rotate-360");
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.remove("rotate-180");
}
function closemobileViewSideBar() {
    sideBar ? sideBar.style.display = "none" : null;
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.add("rotate-180");
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.remove("rotate-360");
}
function openSideBar() {
    notification ? notification.style.display = "block" : null;
    sideBar ? sideBar.style.display = "flex" : null;
    minSideBar ? minSideBar.style.display = "none" : null;
    mainContent ? mainContent.style.width = "78%" : null;
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.add("rotate-360");
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.remove("rotate-180");
}
function closeSideBar() {
    sideBar ? sideBar.style.display = "none" : sideBar;
    minSideBar ? minSideBar.style.display = "block" : null;
    notification ? notification.style.display = "none" : null;
    mainContent ? mainContent.style.width = "99%" : null;
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.add("rotate-180");
    handleIcon === null || handleIcon === void 0 ? void 0 : handleIcon.classList.remove("rotate-360");
}
export function closeNotification() {
    var update = document.querySelector('.pop-up-box');
    update ? update.style.display = "none" : "";
}
