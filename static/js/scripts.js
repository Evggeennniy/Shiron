function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof url != "undefined") {
      window.location = url;
    }
  };
  gtag("event", "conversion", {
    send_to: "AW-671535935/Cyk1CKvu38oaEL-mm8AC",
    event_callback: callback,
  });
  return false;
}

const form = document.querySelector(".workwithus__form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Вiдправлено! Дякую.");

    gtag_report_conversion();

    setTimeout(() => {
      form.submit();
    }, 200); // 200–300 мс хватает
  });
}

document.querySelector(".products__list").addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("products__desc-btn")) {
    target.closest(".products__info").classList.toggle("active");
  }
});

document.querySelector(".bub-close-btn").addEventListener("click", (event) => {
  const target = event.target;
  document.querySelector(".orderform").classList.toggle("active");
  target.closest(".workwithus__form").reset();
});

document.querySelector(".btn-form-finder").addEventListener("click", () => {
  document.querySelector(".workwithus__form").scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
});

document
  .querySelector(".assemblies__list")
  .addEventListener("click", (event) => {
    const target = event.target;
    const clickedModelItem = target.closest(".assemblies__item");
    const clickedModelName = clickedModelItem.querySelector(
      ".assemblies__item-title"
    );

    if (target.classList.contains("order")) {
      const form = document.querySelector(".orderform");
      form.classList.toggle("active");
      const formModelName = form.querySelector(".input-model-name");
      formModelName.value = clickedModelName.textContent;
    }
  });

const list = document.querySelector(".gallery__list");
const prevBtn = document.querySelectorAll(".gallery__list-btn")[0];
const nextBtn = document.querySelectorAll(".gallery__list-btn")[1];
const visibleCount = 3;
const gap = 50;
let imageWidth = 0;
let currentIndex = visibleCount;

function cloneImages() {
  const items = Array.from(list.children);
  imageWidth = items[0].offsetWidth + gap;

  const clonesBefore = items
    .slice(-visibleCount)
    .map((el) => el.cloneNode(true));
  const clonesAfter = items
    .slice(0, visibleCount)
    .map((el) => el.cloneNode(true));

  clonesBefore.forEach((clone) => {
    clone.classList.remove("big");
    list.prepend(clone);
  });

  clonesAfter.forEach((clone) => {
    clone.classList.remove("big");
    list.append(clone);
  });
}

function updateGallery(animate = true) {
  const allItems = Array.from(list.children);
  Array.from(allItems).forEach((img) => img.classList.remove("big"));

  const centerOffset = Math.floor(visibleCount / 2);
  const centerItem = allItems[currentIndex + centerOffset];

  if (!centerItem) return;

  centerItem.classList.add("big");

  // === Новый способ: прокрутка к центру экрана ===
  const galleryRect = list.parentElement.getBoundingClientRect();
  const centerScreen = window.innerWidth / 2;
  const itemRect = centerItem.getBoundingClientRect();

  const currentScroll = list.style.transform.match(/-?[\d.]+/g);
  const currentTranslate = currentScroll ? parseFloat(currentScroll[0]) : 0;

  const delta = itemRect.left + itemRect.width / 2 - centerScreen;

  list.style.transition = animate ? "transform 0.4s ease" : "none";
  list.style.transform = `translateX(${currentTranslate - delta}px)`;
}

function resetPositionIfNeeded() {
  const total = list.children.length;
  const originalLength = total - visibleCount * 2;

  if (currentIndex >= total - visibleCount) {
    currentIndex = visibleCount;
    updateGallery(false);
  }

  if (currentIndex < visibleCount) {
    currentIndex = visibleCount + originalLength - 1;
    updateGallery(false);
  }
}

function moveNext() {
  currentIndex++;
  updateGallery();
}

function movePrev() {
  currentIndex--;
  updateGallery();
}

// === Init ===
cloneImages();
updateGallery(false);

nextBtn.addEventListener("click", () => {
  moveNext();
});

prevBtn.addEventListener("click", () => {
  movePrev();
});

list.addEventListener("transitionend", resetPositionIfNeeded);

// ANIMANIONS
const animatedSlideItem = document.querySelectorAll(".animated-slide");
function checkFade() {
  animatedSlideItem.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight * 0.85) {
      item.classList.add("active");
    }
  });
}
window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);
