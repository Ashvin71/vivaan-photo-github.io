const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent("Wedding inquiry for Vivaan Photo");
    const body = encodeURIComponent(
      `Name: ${data.get("name") || ""}\nEmail: ${data.get("email") || ""}\nPhone: ${data.get("phone") || ""}\nWedding Date: ${data.get("date") || ""}\nWedding Location: ${data.get("location") || ""}\n\nMessage:\n${data.get("message") || ""}`
    );
    const note = contactForm.querySelector(".form-note");
    if (note) note.textContent = "Opening your email app with the message ready.";
    window.location.href = `mailto:vivaanphoto@yahoo.com?subject=${subject}&body=${body}`;
  });
}

let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slider .slide");

function changeSlide() {
  if (!slides.length) return;
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

if (slides.length > 1) {
  setInterval(changeSlide, 4000);
}

const serviceSlides = document.querySelectorAll(".service-slider .service-slide");
let serviceSlideIndex = 0;

function changeServiceSlide() {
  if (!serviceSlides.length) return;
  serviceSlides[serviceSlideIndex].classList.remove("active");
  serviceSlideIndex = (serviceSlideIndex + 1) % serviceSlides.length;
  serviceSlides[serviceSlideIndex].classList.add("active");
}

if (serviceSlides.length > 1) {
  setInterval(changeServiceSlide, 3500);
}

const albumSlider = document.querySelector(".album-slider");
const albumSlides = document.querySelectorAll(".album-slide");
const albumToggle = document.querySelector(".album-toggle");
let albumSlideIndex = 0;
let albumPlaying = true;
let albumTimer;

function showAlbumSlide(index) {
  if (!albumSlides.length) return;
  albumSlides[albumSlideIndex].classList.remove("active");
  albumSlideIndex = (index + albumSlides.length) % albumSlides.length;
  albumSlides[albumSlideIndex].classList.add("active");
}

function startAlbumSlider() {
  if (!albumSlides.length) return;
  stopAlbumSlider();
  albumTimer = setInterval(() => showAlbumSlide(albumSlideIndex + 1), 3500);
}

function stopAlbumSlider() {
  clearInterval(albumTimer);
}

if (albumSlider && albumSlides.length > 1) {
  startAlbumSlider();
}

if (albumToggle) {
  albumToggle.addEventListener("click", () => {
    albumPlaying = !albumPlaying;
    albumToggle.textContent = albumPlaying ? "Pause" : "Play";
    albumPlaying ? startAlbumSlider() : stopAlbumSlider();
  });
}

const siteMusic = document.querySelector(".site-music");
const siteMusicToggle = document.querySelector(".site-music-toggle");

function updateMusicButton(isPlaying) {
  if (!siteMusicToggle) return;
  siteMusicToggle.textContent = isPlaying ? "Music Off" : "Music On";
  siteMusicToggle.setAttribute("aria-pressed", String(isPlaying));
}

if (siteMusic && siteMusicToggle) {
  const wantedMusic = localStorage.getItem("vivaanMusic") === "on";
  updateMusicButton(wantedMusic);

  if (wantedMusic) {
    siteMusic.play().catch(() => updateMusicButton(false));
  }

  siteMusicToggle.addEventListener("click", async () => {
    if (siteMusic.paused) {
      try {
        await siteMusic.play();
        localStorage.setItem("vivaanMusic", "on");
        updateMusicButton(true);
      } catch (error) {
        siteMusicToggle.textContent = "Add music.mp3";
      }
    } else {
      siteMusic.pause();
      localStorage.setItem("vivaanMusic", "off");
      updateMusicButton(false);
    }
  });
}