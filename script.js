window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const hint = document.getElementById("scrollHint");
    if (hint) {
      hint.classList.add("hidden");
    }
  }, 2000);
});

// [3] Viewport height → CSS 변수
function setVhVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVhVariable();
window.addEventListener('resize', setVhVariable);

// [4] 슬라이드 코드 (기존과 동일)
const slidesWrapper = document.getElementById('slidesWrapper');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let current = 0;
const slideIndicator = document.getElementById('slideIndicator');

slidesWrapper.style.width = `${totalSlides * 100}vw`;

function updateSlide() {
  slidesWrapper.style.transform = `translateX(-${current * 100}vw)`;
  slideIndicator.textContent = `${current + 1} / ${totalSlides}`;
  prevBtn.style.display = current === 0 ? 'none' : 'block';
  nextBtn.style.display = current === totalSlides - 1 ? 'none' : 'block';
}

function changeSlide(direction) {
  slidesWrapper.style.transition = 'transform 0.5s ease';
  current += direction;
  if (current < 0) current = 0;
  if (current >= totalSlides) current = totalSlides - 1;
  updateSlide();
  showArrowsTemporarily();
}

// [5] 터치 이벤트 처리
let startX = 0, startY = 0;
let endX = 0, endY = 0;
let isPinchZoom = false;

document.addEventListener('touchstart', (e) => {
  if (e.touches.length > 1) {
    isPinchZoom = true;
    return;
  }
  isPinchZoom = false;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
  if (isPinchZoom || e.changedTouches.length > 1) return;
  endX = e.changedTouches[0].clientX;
  endY = e.changedTouches[0].clientY;
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);
  if (Math.abs(deltaX) > 50 && (angle < 15 || angle > 165)) {
    showArrowsTemporarily();
    if (deltaX < 0) changeSlide(1);
    else changeSlide(-1);
  }
});

// [6] 인스타 버튼
const menuList = document.getElementById("menuList");
const instaLink = document.createElement("a");
instaLink.href = "https://www.instagram.com/scfest.official/";
instaLink.target = "_blank";
instaLink.style.display = "flex";
instaLink.style.alignItems = "center";
instaLink.style.gap = "6px";
instaLink.style.margin = "10px";
instaLink.style.fontSize = "0.85rem";
instaLink.style.color = "#fff";
instaLink.style.textDecoration = "none";

const instaIcon = document.createElement("img");
instaIcon.src = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png";
instaIcon.alt = "Instagram Icon";
instaIcon.style.width = "16px";
instaIcon.style.height = "16px";

const instaText = document.createElement("span");
instaText.textContent = "축제 공식 계정";

instaLink.appendChild(instaIcon);
instaLink.appendChild(instaText);
menuList.appendChild(instaLink);

// [7] 메뉴 외 클릭 시 닫기
document.addEventListener('click', function(event) {
  const menu = document.getElementById('menuList');
  const menuBtn = document.querySelector('.menu-btn');
  if (menu.classList.contains('show') &&
      !menu.contains(event.target) &&
      !menuBtn.contains(event.target)) {
    menu.classList.remove('show');
  }
});
