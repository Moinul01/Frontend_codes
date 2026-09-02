const menuopenbutton  = document.querySelector("#menu-open-button");
const menuclosebutton  = document.querySelector("#menu-close-button");
menuopenbutton.addEventListener("click", ()=>{
  document.body.classList.toggle("show-mobile-menu");
});

menuclosebutton.addEventListener("click",()=> menuopenbutton.click());

// initilize swiper
const swiper = new Swiper('.slider-wrapper', {

  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


  breakpoints: {
    0: {
      slidesPerView: 1
    },
     768: {
      slidesPerView: 2
    },
     1024: {
      slidesPerView: 3
    },
  }
  
});

let lastScrollTop = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ignore tiny movements/bouncing on mobile
        if (Math.abs(currentScroll - lastScrollTop) <= 5) return;

        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scrolling DOWN and past 100px -> Hide header
            header.classList.add('hide');
        } else {
            // Scrolling UP -> Show header
            header.classList.remove('hide');
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
} else {
    console.log("Error: Header element not found!");
}


// Automatically close mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.navbar .nav-menu .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('show-mobile-menu');
    });
});