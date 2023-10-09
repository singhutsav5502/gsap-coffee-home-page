// LENIS SMOOTH SCROLL
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let scrollTimeline = gsap.timeline({
  defaults: {
    ease: 'power4.inOut'
  },
  scrollTrigger: {
    trigger: '.main_container',
    pin: true,
    start: 'top top',
    end: `+=${document.querySelector('.scroll_container').offsetHeight}}`,
    scrub: true,
  }
})

scrollTimeline
  .to('#scroll_element_one', {
    yPercent: -90,
    duration: 3
  })
  .to('#scroll_element_two', {
    yPercent: -189,
    duration: 3
  },)
  .to('#scroll_element_three', {
    yPercent: -288,
    duration: 3
  },)
  .to('#scroll_element_four', {
    yPercent: -387,
    duration: 3
  })


// LINK LOGIC

let links = gsap.utils.toArray('.link a');
const firstLink = links[0];
linksRest = links.slice(1)

// definition for first link
let element = document.querySelector(firstLink.getAttribute("href")),
  linkSTFirst = ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
  });
ScrollTrigger.create({
  trigger: element,
  start: "top bottom",
  end: "top center",
  onToggle: self => self.isActive && setActive(firstLink)
});
firstLink.addEventListener("click", e => {
  e.preventDefault();
  gsap.to(window, { duration: 1, scrollTo: linkSTFirst.start, overwrite: "auto" });
});

// defintion for rest of the links
linksRest.forEach((a) => {
  const element = document.querySelector(a.getAttribute("href"));
  const markerTrigger = element.querySelector(`h1`);
  ScrollTrigger.create({
    trigger: markerTrigger,
    start: "top 60%",
    end: "top 10%",
    onToggle: self => self.isActive && setActive(a)
  });
});

function setActive(link) {
  console.log(link.getAttribute("href"))
  links.forEach(el => el.closest('.link').classList.remove("focused"));
  link.closest(".link").classList.add("focused");
}
linksRest.forEach((link, index) => {
  const totalHeight = document.querySelector('.main_container').offsetHeight;
  const scrollDistance = ((window.innerHeight * (index + 1) / totalHeight)) * totalHeight;
  link.addEventListener("click", e => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: scrollDistance
      }, overwrite: "auto"
    });

  });
})