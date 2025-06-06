const data = [
  {
      place:'Sri Lanka - Dabulla',
      title:'SIGIRIYA',
      title2:'ROCK',
      description:'Sigiriya or Sinhagiri is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka.',
      image:'assets/sigiriya2.jpg'
  },
  {
      place:'Sri Lanka - Kandy',
      title:'DALADA',
      title2:'MALIGAVA',
      description:'Sri Dalada Maligawa, commonly known in English as the Temple of the Sacred Tooth Relic, is a Buddhist temple in Kandy, Sri Lanka. It is located in the Royal Palace Complex of the former Kingdom of Kandy, which houses the relic of the tooth of the Buddha.',
      image:'assets/kandy2.jpg'
  },
  {
      place:'Sri Lanka - Galle',
      title:'GALLE',
      title2:'KOTUVA',
      description:'Galle Fort, in the Bay of Galle on the southwest coast of Sri Lanka, was built first in 1588 by the Portuguese, then extensively fortified by the Dutch during the 17th century from 1649 onwards.',
      image:'assets/galle.jpg'
  },
  {
      place:'Sri Lanka - Anuradhapura',
      title:'JAYASIRI',
      title2:'MAHA BODHIYA',
      description:'Jaya Sri Maha Bodhi Tree is a historical sacred bo tree (Ficus religiosa) in the Mahamewuna Garden in historical city of Anuradhapura, Sri Lanka. This is believed to be a tree grown from a cutting of the southern branch from the historical sacred bo tree, Sri Maha Bodhi, which was destroyed during the time of Emperor Ashoka the Great, at Buddha Gaya in India, under which Siddhartha Gautama (Buddha) attained Enlightenment.',
      image:'assets/jayasiri_maha_bodiya.jpg'
  },
  {
      place:'Sri Lanka - Jaffna',
      title:'NALLUR',
      title2:'KOVIL',
      description:'Nallur Kandaswamy Kovil or Nallur Murugan Kovil is one of the most significant Hindu temples in the Jaffna District of Northern Province, Sri Lanka. The temple is a socially important institution for the Sri Lankan Tamils Hindu identity and many temples have been built in Europe and North America using the same name as a cultural memory',
      image:'assets/kovila2.jpg'
  },
  {
      place:'Sri Lanka - Alla',
      title:'NINE ARCH',
      title2:'BRIDGE',
      description:'The Nine Arch Bridge also called the Bridge in the Sky, is a viaduct bridge in Sri Lanka and one of the best examples of colonial-era railway construction in the country. The bridge was designed to accommodate a challenging nine-degree curve and steep gradient',
      image:'assets/ella.jpg'
  },
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="hcard" id="hcard${index}" style="background-image:url(${i.image})"  ></div>`).join('')

const cardContents = data.map((i, index)=>`<div class="hcard-content" id="hcard-content-${index}">
<div class="hcontent-start"></div>
<div class="hcontent-place">${i.place}</div>
<div class="hcontent-title-1">${i.title}</div>
<div class="hcontent-title-2">${i.title2}</div>
</div>`).join('')

const sildeNumbers = data.map((_, index)=>`<div class="hitem" id="hslide-item-${index}" >${index+1}</div>`).join('')
_('hdemo').innerHTML =  cards + cardContents
_('hslide-numbers').innerHTML =  sildeNumbers

const range = (n) =>
Array(n)
  .fill(0)
  .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
return `#hcard${index}`;
}
function getCardContent(index) {
return `#hcard-content-${index}`;
}
function getSliderItem(index) {
return `#hslide-item-${index}`;
}

function animate(target, duration, properties) {
return new Promise((resolve) => {
  gsap.to(target, {
    ...properties,
    duration: duration,
    onComplete: resolve,
  });
});
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
const [active, ...rest] = order;
const detailsActive = detailsEven ? "#hdetails-even" : "#hdetails-odd";
const detailsInactive = detailsEven ? "#hdetails-odd" : "#hdetails-even";
const { innerHeight: height, innerWidth: width } = window;
offsetTop = height - 430;
offsetLeft = width - 830;

gsap.set("#hpagination", {
  top: offsetTop + 330,
  left: offsetLeft,
  y: 200,
  opacity: 0,
  zIndex: 60,
});
gsap.set("nav", { y: -200, opacity: 0 });

gsap.set(getCard(active), {
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
});
gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
gsap.set(`${detailsInactive} .htext`, { y: 100 });
gsap.set(`${detailsInactive} .htitle-1`, { y: 100 });
gsap.set(`${detailsInactive} .htitle-2`, { y: 100 });
gsap.set(`${detailsInactive} .hdesc`, { y: 50 });
gsap.set(`${detailsInactive} .hcta`, { y: 60 });

gsap.set(".hprogress-sub-foreground", {
  width: 500 * (1 / order.length) * (active + 1),
});

rest.forEach((i, index) => {
  gsap.set(getCard(i), {
    x: offsetLeft + 400 + index * (cardWidth + gap),
    y: offsetTop,
    width: cardWidth,
    height: cardHeight,
    zIndex: 30,
    borderRadius: 10,
  });
  gsap.set(getCardContent(i), {
    x: offsetLeft + 400 + index * (cardWidth + gap),
    zIndex: 40,
    y: offsetTop + cardHeight - 100,
  });
  gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
});

gsap.set(".hindicator", { x: -window.innerWidth });

const startDelay = 0.6;

gsap.to(".hcover", {
  x: width + 400,
  delay: 0.5,
  ease,
  onComplete: () => {
    setTimeout(() => {
      loop();
    }, 500);
  },
});
rest.forEach((i, index) => {
  gsap.to(getCard(i), {
    x: offsetLeft + index * (cardWidth + gap),
    zIndex: 30,
    delay: 0.05 * index,
    ease,
    delay: startDelay,
  });
  gsap.to(getCardContent(i), {
    x: offsetLeft + index * (cardWidth + gap),
    zIndex: 40,
    delay: 0.05 * index,
    ease,
    delay: startDelay,
  });
});
gsap.to("#hpagination", { y: 0, opacity: 1, ease, delay: startDelay });
gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
return new Promise((resolve) => {
  order.push(order.shift());
  detailsEven = !detailsEven;

  const detailsActive = detailsEven ? "#hdetails-even" : "#hdetails-odd";
  const detailsInactive = detailsEven ? "#hdetails-odd" : "#hdetails-even";

  document.querySelector(`${detailsActive} .hplace-box .htext`).textContent =
    data[order[0]].place;
  document.querySelector(`${detailsActive} .htitle-1`).textContent =
    data[order[0]].title;
  document.querySelector(`${detailsActive} .htitle-2`).textContent =
    data[order[0]].title2;
  document.querySelector(`${detailsActive} .hdesc`).textContent =
    data[order[0]].description;

  gsap.set(detailsActive, { zIndex: 22 });
  gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
  gsap.to(`${detailsActive} .htext`, {
    y: 0,
    delay: 0.1,
    duration: 0.7,
    ease,
  });
  gsap.to(`${detailsActive} .htitle-1`, {
    y: 0,
    delay: 0.15,
    duration: 0.7,
    ease,
  });
  gsap.to(`${detailsActive} .htitle-2`, {
    y: 0,
    delay: 0.15,
    duration: 0.7,
    ease,
  });
  gsap.to(`${detailsActive} .hdesc`, {
    y: 0,
    delay: 0.3,
    duration: 0.4,
    ease,
  });
  gsap.to(`${detailsActive} .hcta`, {
    y: 0,
    delay: 0.35,
    duration: 0.4,
    onComplete: resolve,
    ease,
  });
  gsap.set(detailsInactive, { zIndex: 12 });

  const [active, ...rest] = order;
  const prv = rest[rest.length - 1];

  gsap.set(getCard(prv), { zIndex: 10 });
  gsap.set(getCard(active), { zIndex: 20 });
  gsap.to(getCard(prv), { scale: 1.5, ease });

  gsap.to(getCardContent(active), {
    y: offsetTop + cardHeight - 10,
    opacity: 0,
    duration: 0.3,
    ease,
  });
  gsap.to(getSliderItem(active), { x: 0, ease });
  gsap.to(getSliderItem(prv), { x: -numberSize, ease });
  gsap.to(".hprogress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
    ease,
  });

  gsap.to(getCard(active), {
    x: 0,
    y: 0,
    ease,
    width: window.innerWidth,
    height: window.innerHeight,
    borderRadius: 0,
    onComplete: () => {
      const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
      gsap.set(getCard(prv), {
        x: xNew,
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        zIndex: 30,
        borderRadius: 10,
        scale: 1,
      });

      gsap.set(getCardContent(prv), {
        x: xNew,
        y: offsetTop + cardHeight - 100,
        opacity: 1,
        zIndex: 40,
      });
      gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

      gsap.set(detailsInactive, { opacity: 0 });
      gsap.set(`${detailsInactive} .htext`, { y: 100 });
      gsap.set(`${detailsInactive} .htitle-1`, { y: 100 });
      gsap.set(`${detailsInactive} .htitle-2`, { y: 100 });
      gsap.set(`${detailsInactive} .hdesc`, { y: 50 });
      gsap.set(`${detailsInactive} .hcta`, { y: 60 });
      clicks -= 1;
      if (clicks > 0) {
        step();
      }
    },
  });

  rest.forEach((i, index) => {
    if (i !== prv) {
      const xNew = offsetLeft + index * (cardWidth + gap);
      gsap.set(getCard(i), { zIndex: 30 });
      gsap.to(getCard(i), {
        x: xNew,
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        ease,
        delay: 0.1 * (index + 1),
      });

      gsap.to(getCardContent(i), {
        x: xNew,
        y: offsetTop + cardHeight - 100,
        opacity: 1,
        zIndex: 40,
        ease,
        delay: 0.1 * (index + 1),
      });
      gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
    }
  });
});
}

async function loop() {
await animate(".hindicator", 2, { x: 0 });
await animate(".hindicator", 0.8, { x: window.innerWidth, delay: 0.3 });
set(".hindicator", { x: -window.innerWidth });
await step();
loop();
}

async function loadImage(src) {
return new Promise((resolve, reject) => {
  let img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});
}

async function loadImages() {
const promises = data.map(({ image }) => loadImage(image));
return Promise.all(promises);
}

async function start() {
try {
  await loadImages();
  init();
} catch (error) {
  console.error("One or more images failed to load", error);
}
}

start()