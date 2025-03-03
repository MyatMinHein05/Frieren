const nextButton = document.querySelector(".next-btn");
const video = document.querySelector(".hero-video");

const movieList = [
  "video/hero-1.mp4",
  "video/hero-2.mp4",
  "video/hero-3.mp4",
  "video/hero-4.mp4",
  "video/hero-5.mp4",
];

let index = 0;
nextButton.addEventListener("click", () => {
  index++;
  video.src = movieList[index];
  if (index === 4) {
    index = -1;
  }

  video.play();
});

function openYouTubeVideo() {
  var videoId = "Iwr1aLEDpe4&pp=ygUPZnJpZXJlbiB0cmFpbGVy";
  var youtubeUrl =
    "https://www.youtube.com/watch?v=Iwr1aLEDpe4&pp=ygUPZnJpZXJlbiB0cmFpbGVy" +
    videoId;
  window.open(youtubeUrl);
}

// const about = document.querySelector(".about-section");
// const box = document.querySelector(".image-box");

// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("autoTakeFull");
//         console.log("intersecting", entry.target);
//         observer.unobserve(entry.target);
//       } else {
//         console.log("not intersecting", entry.target);
//       }
//     });
//   },
//   {
//     threshold: 0.5,
//   }
// );
// if (box) {
//   observer.observe(box);
// }

// const cards = document.querySelectorAll(".card");

// const observer1 = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("autoDisplay");
//         console.log("intersecting", entry.target);
//         observer1.unobserve(entry.target);
//       } else {
//         console.log("not intersecting", entry.target);
//       }
//     });
//   },
//   {
//     threshold: 0.9,
//   }
// );

// cards.forEach((card) => {
//   // Observe each card
//   observer1.observe(card);
// });

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const speed = 0.2;

// const colors = [
//   "#42beed",
//   "#58c7ef",
//   "#6cd0f1",
//   "#80d8f3",
//   "#92e1f5",
//   "#a5e9f8",
//   "#b7f0fb",
//   "#c9f8ff",
// ];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.background = `radial-gradient(circle, rgb(68, 196, 255) 0%, rgba(128, 216, 243, 1) 69%, rgba(183, 240, 251, 1) 100%)`;
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircle() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 10 + window.scrollX + "px";
    circle.style.top = y - 10 + window.scrollY + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * speed;
    y += (nextCircle.y - y) * speed;
  });
  requestAnimationFrame(animateCircle);
}
lowerCircleZIndex();
animateCircle();

function lowerCircleZIndex() {
  if (circles.length === 0) {
    console.log("No elements with class 'circle' found.");
    return;
  }

  circles.forEach((circle, index) => {
    circle.style.zIndex = String(circles.length * 1000 - index);
  });
}

// let play = document.getElementById("play");
// function playMusic() {
//   let audio = new Audio("audio/frierenOP.mp3");
//   audio.play();
// }
// play.addEventListener("click", playMusic);
let audio = new Audio("audio/frierenOP.mp3");
let hasAutoPlayed = false;
let play = document.getElementById("play");
let isPlaying = false;

function playMusic() {
  if (!hasAutoPlayed) {
    audio.play().catch((error) => {
      console.error("Autoplay failed:", error);
      if (error.name === "NotAllowedError" && play) {
        play.innerHTML = "▶";
        play.style.paddingLeft = "10px"; // Add padding here
        play.disabled = false;
        play.addEventListener("click", function firstClickPlay() {
          audio.play().catch((err) => {
            console.error("Second play failed:", err);
          });
          isPlaying = true;
          play.innerHTML = "⏸️";
          play.style.paddingLeft = "6px"; // Remove padding when playing
          play.removeEventListener("click", firstClickPlay);
        });
      }
    });
    hasAutoPlayed = true;
    isPlaying = true;
  } else {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      if (play) {
        play.innerHTML = "▶";
        play.style.paddingLeft = "10px"; // Add padding when paused
      }
    } else {
      audio.play().catch((error) => {
        console.log("Resume failed:", error);
      });
      isPlaying = true;
      if (play) {
        play.innerHTML = "⏸";
        play.style.paddingLeft = "6px"; // remove padding when playing
      }
    }
  }
}

setTimeout(playMusic, 2000);

if (play) {
  play.disabled = true;
  play.addEventListener("click", playMusic);
  play.innerHTML = "⏸";
  play.style.paddingLeft = "6px"; // Ensure no padding initially
}

audio.addEventListener("play", function () {
  if (play) {
    play.disabled = false;
    play.innerHTML = "⏸";
    play.style.paddingLeft = "6px"; // Ensure no padding when playing
  }
  isPlaying = true;
});

audio.addEventListener("pause", function () {
  if (play) {
    play.innerHTML = "▶";
    play.style.paddingLeft = "10px"; // Add padding when paused
  }
  isPlaying = false;
});

audio.play().catch((error) => {
  console.error("Autoplay failed:", error);
  if (error.name === "NotAllowedError") {
    if (play) {
      play.disabled = false;
      play.innerHTML = "▶";
      play.style.paddingLeft = "10px"; // Add padding on error
    }
  }
});
