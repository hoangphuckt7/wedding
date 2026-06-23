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
      main.classList.remove("hide");
      requestAnimationFrame(() => {
        initGallery?.();
        // initCalendar?.();
        render("groom");
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
function initCalendar(targetDate) {
  const grid = document.getElementById('calendar-grid');
  const weddingDay = targetDate.getDate();
  grid.innerHTML = "";
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  days.forEach(d => {
    const el = document.createElement('div');
    el.className = 'dow';
    el.textContent = d;
    grid.appendChild(el);
  });
  const monthStart = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    1
  ); // 01/08/2026
  const startDow = (monthStart.getDay() + 6) % 7;
  const daysInMonth = 31;
  for (let i = 0; i < startDow; i++) {
    const el = document.createElement('div');
    el.className = 'day';
    grid.appendChild(el);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'day' + (d === weddingDay ? ' wedding' : '');
    el.textContent = d;
    grid.appendChild(el);
  }
}

// Countdown
let countdownTimer = null;
function startCountdown(targetDate) {

  // luôn dừng timer cũ
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  function update() {
    const now = Date.now();
    let diff = targetDate.getTime() - now;

    if (diff < 0) {
      diff = 0;
      clearInterval(countdownTimer);
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

  }
  update();
  countdownTimer = setInterval(update, 1000);

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

// button toggle
const wedding = {
  groom: {
    dateObj: new Date("2026-08-02T11:00:00+07:00"),
    title: "Thông tin tiệc cưới nhà trai",
    time: "11:00",
    day: "Chủ Nhật",
    date: "02",
    month: "THÁNG 08",
    year: "2026",
    monyea: "Tháng 8 / 2026",
    note: "(Tức ngày 13/06 âm lịch)",
    detail:
      `<p><span style="color:var(--muted-fg)">Đón khách</span>: <strong>17:30</strong></p>
       <p><span style="color:var(--muted-fg)">Khai tiệc</span>: <strong>19:00</strong></p>
      `,
    maps: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d683.3154409319504!2d108.00106475415461!3d14.345328904927433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316bff9e19e85733%3A0xc09277f89e4774d5!2zMzAgQuG6oWNoIMSQ4bqxbmcsIEtvbiBUdW0sIFF14bqjbmcgTmfDo2ksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1782205198371!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`,
    location: "30 Bạch Đằng, P.Kon Tum, Tỉnh Quãng Ngãi",
    timeline1: "10:00",
    timeline2: "11:00",
    timeline3: "11:30",
  },

  bride: {
    dateObj: new Date("2026-07-25T19:00:00+07:00"),
    title: "Thông tin tiệc cưới nhà gái",
    time: "19:00",
    day: "Thứ bảy",
    date: "25",
    month: "THÁNG 07",
    year: "2026",
    monyea: "Tháng 7 / 2026",
    note: "(Tức ngày 12/06 âm lịch)",
    detail:
      `<p><span style="color:var(--muted-fg)">Đón khách</span>: <strong>17:30</strong></p>
       <p><span style="color:var(--muted-fg)">Khai tiệc</span>: <strong>19:00</strong></p>
      `,
    maps: `<iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.7472056588902!2d106.63245691805383!3d10.828907473199253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175297c4ec70295%3A0xde1c94578afa91ba!2sOscar%20Palace!5e0!3m2!1svi!2s!4v1782191547391!5m2!1svi!2s"
            width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"></iframe>`,
    location: "100 Phan Huy Ích, P.Tân Sơn, TP HCM",
    timeline1: "17:30",
    timeline2: "18:30",
    timeline3: "19:00",
  }
};
const DOM = {
  title: document.getElementById("title"),
  time: document.getElementById("time"),
  date: document.getElementById("date"),
  month: document.getElementById("month"),
  year: document.getElementById("year"),
  monyea: document.getElementById("monyea"),
  note: document.getElementById("note"),
  detail: document.getElementById("detail"),
  maps: document.getElementById("maps"),
  location: document.getElementById("location"),
  timeline1: document.getElementById("timeline1"),
  timeline2: document.getElementById("timeline2"),
  timeline3: document.getElementById("timeline3"),
};

function render(side) {
  const data = wedding[side];
  Object.keys(DOM).forEach(
    k => {
      if (DOM[k])
        DOM[k].innerHTML = data[k] ?? "";
    }
  );
  startCountdown(data.dateObj);
  initCalendar(data.dateObj);
}

const toggle = document.querySelector(".toggle");
const tabs = document.querySelectorAll(".tab");
tabs.forEach(
  (btn, index) => {
    btn.onclick = () => {
      tabs.forEach(
        t => t.classList.remove("active")
      );
      btn.classList.add("active");
      btn.classList.add("active");

      toggle.classList.toggle("right", index === 1);

      render(btn.dataset.side);
    };
  });
createPetals();


// ============================
// CONFIG
// ============================




// const card =
//   document.querySelector(
//     ".card"
//   );

// const heart =
//   document.querySelector(
//     ".heart"
//   );

// const btn =
//   document.querySelector(
//     ".open-btn"
//   );

// const toggle =
//   document.querySelector(
//     ".toggle"
//   );

// const tabs =
//   document.querySelectorAll(
//     ".tab"
//   );

// const DOM = {

//   title:
//     document.getElementById(
//       "title"
//     ),

//   time:
//     document.getElementById(
//       "time"
//     ),

//   date:
//     document.getElementById(
//       "date"
//     ),

//   month:
//     document.getElementById(
//       "month"
//     ),

//   year:
//     document.getElementById(
//       "year"
//     ),

//   monyea:
//     document.getElementById(
//       "monyea"
//     ),

//   note:
//     document.getElementById(
//       "note"
//     ),

//   detail:
//     document.getElementById(
//       "detail"
//     )

// };

// // ============================
// // PETALS
// // ============================

// function createPetals() {

//   const c =
//     document.getElementById(
//       "petals"
//     );

//   if (!c) return;

//   for (
//     let i = 0;
//     i < 14;
//     i++
//   ) {

//     const p =
//       document.createElement(
//         "span"
//       );

//     p.className =
//       "petal";

//     p.textContent =
//       "🌸";

//     p.style.left =
//       Math.random() * 100 +
//       "%";

//     p.style.animationDuration =
//       (
//         12 +
//         Math.random() * 10
//       ) + "s";

//     p.style.animationDelay =
//       (
//         -Math.random() * 20
//       ) + "s";

//     c.appendChild(
//       p
//     );

//   }

// }

// // ============================
// // COVER
// // ============================

// function openCard() {

//   if (
//     card.classList.contains(
//       "opening"
//     )
//   )
//     return;

//   card.classList.add(
//     "opening"
//   );

//   btn.classList.add(
//     "bloom"
//   );

//   bloom();

//   setTimeout(
//     () => heart.classList.add(
//       "open"
//     ),
//     150
//   );

//   setTimeout(
//     () => card.classList.add(
//       "open"
//     ),
//     450
//   );

//   setTimeout(() => {

//     document
//       .getElementById(
//         "cover"
//       )

//       .classList.add(
//         "hide"
//       );

//     const main =
//       document
//         .getElementById(
//           "main"
//         );

//     main.classList.remove(
//       "hide"
//     );

//     requestAnimationFrame(() => {

//       initGallery();

//       initCalendar();

//       render(
//         "groom"
//       );

//     });

//   }, 850);

// }

// // ============================
// // BLOOM
// // ============================

// function bloom() {

//   const wrap =
//     document.createElement(
//       "div"
//     );

//   wrap.className =
//     "flower-burst";

//   for (
//     let i = 0;
//     i < 14;
//     i++
//   ) {

//     const p =
//       document.createElement(
//         "div"
//       );

//     p.className =
//       "flower-p";

//     p.textContent =
//       "🌸";

//     const angle =
//       Math.random()
//       * 360;

//     const dist =
//       100 +
//       Math.random()
//       * 150;

//     p.style
//       .setProperty(
//         "--x",
//         Math.cos(angle)
//         * dist + "px"
//       );

//     p.style
//       .setProperty(
//         "--y",
//         Math.sin(angle)
//         * dist + "px"
//       );

//     wrap.appendChild(
//       p
//     );

//   }

//   card.appendChild(
//     wrap
//   );

//   setTimeout(
//     () => wrap.remove(),
//     1000
//   );

// }

// // ============================
// // GALLERY
// // ============================

// let galleryIdx = 0;

// function initGallery() {

//   const thumbs =
//     document.getElementById(
//       "thumbs"
//     );

//   if (
//     thumbs.dataset.ready
//   )
//     return;

//   thumbs.dataset.ready =
//     1;

//   setGalleryIdx(
//     0
//   );

//   PHOTOS.forEach(
//     (src, i) => {

//       const b =
//         document.createElement(
//           "button"
//         );

//       b.className =
//         "thumb";

//       b.onclick =
//         () => setGalleryIdx(
//           i
//         );

//       b.innerHTML =
//         `<img src="${src}">`;

//       thumbs.appendChild(
//         b
//       );

//     }

//   );

// }

// function setGalleryIdx(
//   i
// ) {

//   galleryIdx = i;

//   document
//     .getElementById(
//       "gallery-img"
//     )

//     .src =
//     PHOTOS[i];

//   document
//     .getElementById(
//       "gallery-idx"
//     )

//     .textContent =
//     i + 1;

//   document
//     .getElementById(
//       "gallery-total"
//     )

//     .textContent =
//     PHOTOS.length;

//   document
//     .querySelectorAll(
//       ".thumb"
//     )

//     .forEach(
//       (el, idx) => {

//         el.classList.toggle(
//           "active",
//           idx === i
//         );

//       }

//     );

// }

// function galleryPrev() {

//   setGalleryIdx(
//     (
//       galleryIdx - 1 +
//       PHOTOS.length
//     )
//     %
//     PHOTOS.length
//   );

// }

// function galleryNext() {

//   setGalleryIdx(
//     (
//       galleryIdx + 1
//     )
//     %
//     PHOTOS.length
//   );

// }

// // ============================
// // CALENDAR
// // ============================

// function initCalendar() {

//   const grid =
//     document.getElementById(
//       "calendar-grid"
//     );

//   if (
//     grid.dataset.ready
//   )
//     return;

//   grid.dataset.ready =
//     1;

//   grid.innerHTML =
//     "";

//   const days =
//     [
//       "T2",
//       "T3",
//       "T4",
//       "T5",
//       "T6",
//       "T7",
//       "CN"
//     ];

//   days.forEach(
//     d => {

//       grid.innerHTML +=
//         `<div class="dow">${d}</div>`;

//     }

//   );

// }

// // ============================
// // COUNTDOWN
// // ============================

// let timer;

// function startCountdown(
//   date
// ) {

//   clearInterval(
//     timer
//   );

//   function update() {

//     const diff =
//       Math.max(
//         0,
//         date -
//         Date.now()
//       );

//     const d =
//       Math.floor(
//         diff / 86400000
//       );

//     const h =
//       Math.floor(
//         diff / 3600000
//       ) % 24;

//     const m =
//       Math.floor(
//         diff / 60000
//       ) % 60;

//     const s =
//       Math.floor(
//         diff / 1000
//       ) % 60;

//     cd-days.textContent == String(d).padStart(2,0);

//     cd-hours.textContent==
//     String(h)
//       .padStart(
//         2,
//         0
//       );

//     cd-minutes.textContent==
//     String(m)
//       .padStart(
//         2,
//         0
//       );

//     cd-seconds.textContent==
//     String(s)
//       .padStart(
//         2,
//         0
//       );

//   }

//   update();

//   timer =
//     setInterval(
//       update,
//       1000
//     );

// }

// // ============================
// // TOGGLE
// // ============================

// function render(
//   side
// ) {

//   const data =
//     wedding[side];

//   Object
//     .keys(
//       DOM
//     )

//     .forEach(
//       k => {

//         if (
//           DOM[k]
//         )

//           DOM[k]
//             .innerHTML =
//             data[k] ??
//             "";

//       }

//     );

//   startCountdown(
//     data.dateObj
//   );

// }

// tabs.forEach(
//   (tab, index) => {

//     tab.onclick = () => {

//       tabs.forEach(
//         t =>
//           t.classList.remove(
//             "active"
//           )
//       );

//       tab.classList.add(
//         "active"
//       );

//       toggle.classList.toggle(
//         "right",
//         index === 1
//       );

//       render(
//         tab.dataset.side
//       );

//     };

//   });

// createPetals();