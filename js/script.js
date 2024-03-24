// deklarasi tombol dan menu
const tombol = document.querySelector('.tombol');
const menu = document.querySelector('.menu');

// membuat event click
// pada saat tombol di click, tambahkan class aktif pada class menu
// saat diklik lagi, maka class aktif dihilangkan dari class menu (toggle)
tombol.addEventListener('click', () => {
		menu.classList.toggle('aktif');
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 35);
});

// testimoni
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);





// form
// function handleGetFormData() {
//     const formData = {
//         name: document.getElementById('name').value,
//         city: document.getElementById('city').value,
//         email: document.getElementById('email').value,
//         zipCode: document.getElementById('zip-code').value,
//         status: document.getElementById('status').checked
//     };
//     return formData;
// }

// function isNumber(str) {
//     for (let i = 0; i < str.length; i++) {
//         if (isNaN(parseInt(str[i]))) {
//             return false;
//         }
//     }
//     return true;
// }


// function checkboxIsChecked() {
//     return document.getElementById('status').checked;
// }

// function validateFormData(formData) {
//     return (
//         formData !== null &&
//         !isNaN(formData.zipCode) &&
//        checkboxIsChecked()
//     );
// }

// function submit(event) {
//     event.preventDefault();
//     const isValid = validateFormData(handleGetFormData(formData));
//     const warningDiv = document.getElementById('warning');

//     if (isValid) {
//         warningDiv.innerText = '';
//     } else {
//         warningDiv.innerText = 'Periksa form anda sekali lagi';
//     }
// }

// document.querySelector('form').addEventListener('submit', submit);

function handleGetFormData() {
    const formData = {
        name: document.getElementById('name').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
        zipCode: document.getElementById('zip-code').value,
        status: document.getElementById('status').checked
    };
    return formData;
  }
  
  function isNumber(str) {
    for (let i = 0; i < str.length; i++) {
        if (isNaN(parseInt(str[i]))) {
            return false;
        }
    }
    return true;
  }
  
  
  function checkboxIsChecked() {
    return document.getElementById('status').checked;
  }
  
  function validateFormData(formData) {
    return (
        formData !== null &&
        !isNaN(formData.zipCode) &&
       checkboxIsChecked()
    );
  }
  
  function submit(event) {
    event.preventDefault();
    const isValid = validateFormData(handleGetFormData(formData));
    const warningDiv = document.getElementById('warning');
  
    if (isValid) {
        warningDiv.innerText = '';
    } else {
        warningDiv.innerText = 'Periksa form anda sekali lagi';
    }
  }
  
  document.querySelector('form').addEventListener('submit', submit);