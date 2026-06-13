const PHOTOS = [
  "g1.jpg",
  "g2.jpg",
  "g3.jpg",
  "g4.jpg",
  "g5.jpg",
  "g6.jpg",
  "g7.jpg",
  "g8.jpg",
];

const WEDDING_DATE = new Date("2026-08-02T23:00:00+07:00");
const card = document.querySelector(".card");
const heart = document.querySelector(".heart");
const btn = document.querySelector(".open-btn");
// Petals
function createPetals() {
  const container = document.getElementById('petals');
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('span');
    s.className = 'petal';
    s.textContent = '\u{1F338}';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (12 + Math.random() * 12) + 's';
    s.style.animationDelay = (-Math.random() * 20) + 's';
    s.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(s);
  }
}
createPetals();

// Cover

function openCard() {

  // chống click nhiều lần
  if (card.classList.contains("opening")) {
    return;
  }

  card.classList.add("opening");

  // hiệu ứng nút
  btn.classList.add("bloom");

  // hoa nở
  bloom();

  // tim phóng lớn
  setTimeout(() => {
    heart.classList.add("open");
  }, 150);

  // card bay lên
  setTimeout(() => {
    card.classList.add("open");
  }, 450);

  // đợi animation hoàn tất
  setTimeout(() => {
    const cover = document.getElementById("cover");
    const main = document.getElementById("main");
    cover.classList.add("hide");

    // đợi cover fade xong
    setTimeout(() => {
      cover.style.display = "none";
      main.classList.remove( "hide" );
      requestAnimationFrame(() => {
        initGallery?.();
        initCalendar?.();
        startCountdown?.();
      });
    }, 200);
  }, 820);

}


// Gallery
let galleryIdx = 0;
function initGallery() {
  const img = document.getElementById('gallery-img');
  const idx = document.getElementById('gallery-idx');
  const total = document.getElementById('gallery-total');
  const thumbs = document.getElementById('thumbs');
  img.src = PHOTOS[0];
  idx.textContent = '1';
  total.textContent = PHOTOS.length;
  thumbs.innerHTML = '';
  PHOTOS.slice(0, 6).forEach((p, i) => {
    const btn = document.createElement('button');
    btn.className = 'thumb' + (i === 0 ? ' active' : '');
    btn.onclick = () => setGalleryIdx(i);
    const imgEl = document.createElement('img');
    imgEl.src = p;
    imgEl.alt = '';
    btn.appendChild(imgEl);
    thumbs.appendChild(btn);
  });
}
function setGalleryIdx(i) {
  galleryIdx = i;
  document.getElementById('gallery-img').src = PHOTOS[i];
  document.getElementById('gallery-idx').textContent = i + 1;
  document.querySelectorAll('.thumb').forEach((t, ti) => {
    t.classList.toggle('active', ti === i);
  });
}
function galleryPrev() { setGalleryIdx((galleryIdx - 1 + PHOTOS.length) % PHOTOS.length) }
function galleryNext() { setGalleryIdx((galleryIdx + 1) % PHOTOS.length) }

// Calendar
function initCalendar() {
  const grid = document.getElementById('calendar-grid');
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  days.forEach(d => {
    const el = document.createElement('div');
    el.className = 'dow';
    el.textContent = d;
    grid.appendChild(el);
  });
  const monthStart = new Date(2026, 7, 1);
  const startDow = (monthStart.getDay() + 6) % 7;
  const daysInMonth = 31;
  for (let i = 0; i < startDow; i++) {
    const el = document.createElement('div');
    el.className = 'day';
    grid.appendChild(el);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'day' + (d === 2 ? ' wedding' : '');
    el.textContent = d;
    grid.appendChild(el);
  }
}

// Countdown
function startCountdown() {
  function update() {
    const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// RSVP
let rsvpValue = null;
function selectRsvp(el) {
  rsvpValue = el.dataset.value;
  document.querySelectorAll('.rsvp-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
}
function submitRsvp(e) {
  e.preventDefault();
  const name = document.getElementById('rsvp-name').value.trim();
  if (!name || !rsvpValue) return false;
  document.getElementById('rsvp-btn').textContent = '\u2713 Cảm ơn bạn!';
  document.getElementById('rsvp-btn').disabled = true;
  return false;
}

// const sound = document.getElementById( "openSound" );

function bloom() {

  const wrap = document.createElement("div");

  wrap.className = "flower-burst";

  for (let i = 0; i < 14; i++) {
    const p = document.createElement("div");
    p.className = "flower-p";
    p.innerHTML = "🌸";
    const angle = Math.random() * 360;
    const dist = 100 + Math.random() * 150;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    p.style.setProperty("--x", x + "px");
    p.style.setProperty("--y", y + "px");
    wrap.appendChild(p);
  }

  card.appendChild(wrap);

  setTimeout(
    () => wrap.remove(),
    1000
  );

}

// function openCard() {
//   sound.currentTime = 0;
//   sound.play().catch(() => { });

//   btn.classList.add(
//     "bloom"
//   );

//   bloom();

//   setTimeout(() => {
//     heart.classList.add(
//       "open"
//     );
//   }, 150);

//   setTimeout(() => {
//     card.classList.add(
//       "open"
//     );
//   }, 350);

// }