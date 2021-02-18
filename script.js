const menuBar = document.querySelector(".menu-bar");
const innerNavContainer = document.querySelector(".inner-nav-container");
const outerNavContainer = document.querySelector(".outer-nav-container");
const navbar = document.querySelector("nav");
const links = document.querySelectorAll("a");
const goToTopBtn = document.querySelector(".top-btn");

// Sidebar functionality || onclick menubar
menuBar.addEventListener("click", () => {
  const outerContainerHeight = outerNavContainer.getBoundingClientRect().height;
  const innerContainerHeight = innerNavContainer.getBoundingClientRect().height;

  if (outerContainerHeight === 0) {
    outerNavContainer.style.height = `${innerContainerHeight}px`;
  } else {
    outerNavContainer.style.height = `0px`;
  }
});

// Sticky Navbar
window.addEventListener("scroll", () => {
  const navbarHeight = navbar.getBoundingClientRect().height;
  const howMuchScrolled = window.pageYOffset;

  if (howMuchScrolled > navbarHeight) {
    navbar.classList.add("sticky-nav");
  } else {
    navbar.classList.remove("sticky-nav");
  }

  // console.log(howMuchScrolled);

  // Only Show top link when we have scrolled to 85px
  if (howMuchScrolled > 85) {
    goToTopBtn.classList.add("show-top-btn");
  } else {
    goToTopBtn.classList.remove("show-top-btn");
  }
});

// Scroll to Specific position
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.getAttribute("href");
    const id = href.slice(1);
    const element = document.getElementById(id);
    const elPFTop = element.offsetTop;
    const navbarHeight = navbar.getBoundingClientRect().height;
    const isNavbarSticky = navbar.classList.contains("sticky-nav");
    let position = elPFTop - navbarHeight;

    if (isNavbarSticky !== true) {
      position -= navbarHeight;
    }

    const outerContainerHeight = outerNavContainer.getBoundingClientRect()
      .height;

    // When we click navlinks while the navbar is open
    //So we need to ADD that outerDiv height from position
    if (navbarHeight > 87) {
      position += outerContainerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });

    outerNavContainer.style.height = "0px";
  });
});
