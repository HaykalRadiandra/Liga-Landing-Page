// deklarasi tombol dan menu
const tombol = document.querySelector('.tombol');
const menu = document.querySelector('.menu');

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

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; 
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; 
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);




function handleGetFormData() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let city = document.getElementById("city").value;
    let zipCode = document.getElementById("zip-code").value;
    let message = document.getElementById("message").value;
    let status = document.getElementById("status").checked;
  
    return {
      name: name,
      email: email,
      city: city,
      zipCode: zipCode,
      message: message,
      status: status,
    };
  }
  
  function isNumber(string) {
    if (isNaN(string)) {
      return false;
    } else {
      return true;
    }
  }
  
  function checkboxIsChecked() {
    let status = document.getElementById("status");
    if (status.checked == true) {
      return true;
    } else {
      return false;
    }
  }
  
  function validateFormData(handleGetFormData) {
    if (
      handleGetFormData !== null &&
      isNumber(handleGetFormData.zipCode) &&
      checkboxIsChecked()
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  function submit() {
    let divWarning = document.getElementById("warning");
    if (validateFormData(handleGetFormData()) == false) {
      divWarning.textContent = "Periksa form anda sekali lagi";
      divWarning.style.display = "block";
    } else {
      divWarning.textContent = "";
      divWarning.style.display = "none";
    }
  
    return divWarning;
  }
  
  const btnSubmit = document.getElementById("submit-form");
  btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    submit();
  });
  