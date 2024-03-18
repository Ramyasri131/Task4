document.getElementById("dismiss-btn")?.addEventListener("click",function(){
    closeNotification();
});

document.getElementById("accept-btn")?.addEventListener("click",function(){
    closeNotification();
});

document.getElementById("handle-logo")?.addEventListener("click",function(){
    toggleSideBar();
});

var sideBarOpen:boolean = true;

// toggle side Menu
var mobileViewSideBarOpen:boolean = false;
var sideBar :HTMLElement | null = document.getElementById("side-nav");
var notification :HTMLElement|null = document.querySelector(".pop-up");
var handleIcon :HTMLElement | null= document.getElementById("handle-logo");
var mainContent:HTMLElement |null= document.querySelector(".main-content");
var minSideBar:HTMLElement | null = document.querySelector(".minimized-side-nav") ;
var screenSize:MediaQueryList = window.matchMedia("(min-width: 720px)");

function toggleSideBar():void {
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
    sideBar?sideBar.style.display = "flex":null;
    handleIcon?.classList.add("rotate-360");
    handleIcon?.classList.remove("rotate-180");
}

function closemobileViewSideBar():void {
    sideBar?sideBar.style.display = "none":null;
    handleIcon?.classList.add("rotate-180");
    handleIcon?.classList.remove("rotate-360");
}

function openSideBar():void {
    notification?notification.style.display = "block":null;
    sideBar?sideBar.style.display = "flex":null;
    minSideBar?minSideBar.style.display = "none":null;
    mainContent?mainContent.style.width = "78%":null;
    handleIcon?.classList.add("rotate-360");
    handleIcon?.classList.remove("rotate-180");
}

function closeSideBar():void {
    sideBar?sideBar.style.display = "none":sideBar;
    minSideBar?minSideBar.style.display = "block":null;
    notification?notification.style.display = "none":null;
    mainContent?mainContent.style.width = "99%":null;
    handleIcon?.classList.add("rotate-180");
    handleIcon?.classList.remove("rotate-360");
}

export function closeNotification():void {
    var update :HTMLElement | null= document.querySelector('.pop-up-box');
    update?update.style.display="none":"";
}
