
//chech if there is local storage color option
let mainColors = localStorage.getItem("color-option");

if (mainColors!==null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));

    //remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
            
        element.classList.remove("active");
        
        //add active class on element with data color===local storage
        if (element.dataset.color===mainColors) {
            //add active class
            element.classList.add("active");
            }
        });
};


//random background option
let backgroundOption = true;

//variable to control the interval
let backgroundInterval;

//check if there is  local storage random backgrond item
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
    
    if (backgroundLocalItem === 'true') {
        
        backgroundOption = true;
    } else {

        backgroundOption = false;
    }

    //remove active class from all spans
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem==='true') {
        
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        
        document.querySelector(".random-background .no").classList.add("active");
    }
}

//click on setting gear
document.querySelector(".toggle-settings .fa-gear").onclick = function () {

    this.classList.toggle("fa-spin");

    //toggle class on main settings box
    document.querySelector(".settings-box").classList.toggle("open-win");
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

//loop on all list items
colorsLi.forEach(li => {

    //click on every list items
    li.addEventListener("click", (e) => {

        //set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set color in local storage
        localStorage.setItem("color-option", e.target.dataset.color);
        
        handeleActive(e);
    });
});

//switch random background option
const randomBackEl = document.querySelectorAll(".random-background span");

//loop on all spans
randomBackEl.forEach(span => {

    //click on every span
    span.addEventListener("click", (e) => {

        handeleActive(e);

        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);
        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    });
});

//select landing page element
let landingPage = document.querySelector(".landing-page");

//get array of images
let imgsArray = ["2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];


//function to randomize imgs
function randomizeImgs() {

    if (backgroundOption === true) {
        
        backgroundInterval= setInterval(() => {

            //get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            
            //change images background url
            landingPage.style.backgroundImage = `url("images/` + imgsArray[randomNumber] + `")`;
        }, 10000);
    };
};
randomizeImgs();

//select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //skills offset top 
    let skillsOffSetTop = ourSkills.offsetTop;
    
    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    
    //window height
    let windowHeight = this.innerHeight;
    
    //window scroll top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach((Skill) => {

            Skill.style.width = Skill.dataset.progress;
        });
    }
};

//create the popup in the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {
        
        //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay div
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement("div");

        //add class to overlay div
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            //create heading
            let imgHeading = document.createElement("h3");
            //create text for heading
            let imgText = document.createTextNode(img.alt);

            //append the text to the heading
            imgHeading.appendChild(imgText);

            //append the heading to popup box
            popupBox.appendChild(imgHeading);
        }

        //create the image
        let popupImage = document.createElement("img");
        
        //set image source
        popupImage.src = img.src;

        //add image to popup box
        popupBox.appendChild(popupImage);

        //append the popup box to body
        document.body.appendChild(popupBox);

        //create close span
        let closeButton = document.createElement("span");

        //create the close button text
        let closeButtonText = document.createTextNode("x");

        //append text to close button
        closeButton.appendChild(closeButtonText);

        //add class to close button
        closeButton.className = 'close-button';

        //add close button to popup box
        popupBox.appendChild(closeButton);

    });
});

//close popup
document.addEventListener("click", function (e) {
    
    if (e.target.className === "close-button") {
        
        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//select all bullet
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");


function scrollToLinks(elements) {
    elements.forEach(ele => {

        ele.addEventListener('click', (e) => {
        
            e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })

    })
})
};

scrollToLinks(allBullets);
scrollToLinks(allLinks);

//handle active status
function handeleActive(ev) {

     //remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
            
            element.classList.remove("active");
    });
    
        //add active class on self
        ev.target.classList.add("active");
};

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem!==null) {
    
    bulletsSpan.forEach(span => {
        
        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {
        
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }
    else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }

}

bulletsSpan.forEach(span => {

    span.addEventListener('click', (e) => {
        
        if (span.dataset.display === "show") {
            
            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets-option", 'block');
            
        } else {
            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets-option", 'none');
        }
        handeleActive(e);
    });
});

//reset button
document.querySelector(".reset-options").onclick = function () {

    //localStorage.clear();
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullets-option");

    //reload window
    window.location.reload();
}

//toggle menu
let togglebtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

togglebtn.onclick = function (e) {
    
    //stop propagation
    e.stopPropagation();
    //toggle class "menu-active" on button
    this.classList.toggle("menu-active");
    //toggle class"open" on links
    tLinks.classList.toggle("open");
};

//click anywhere outside menu and toggle
document.addEventListener("click", (e) => {
    
    if (e.target !== togglebtn && e.target !== tLinks) {
        
        //check if menu is open
        if (tLinks.classList.contains("open")) {
            
             //toggle class "menu-active" on button
            togglebtn.classList.toggle("menu-active");
            //toggle class"open" on links
            tLinks.classList.toggle("open");
        }
    };
});

//stop propagation in menu
tLinks.onclick = function (e) {

    e.stopPropagation();
}