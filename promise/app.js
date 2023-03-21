const horses = document.querySelectorAll(".horse");
const startButton = document.getElementById("start-button");
const rails = document.querySelectorAll(".rail");

function runHorse(horse) {
  const rail = horse.parentElement;
  const distance = rail.offsetWidth - horse.offsetWidth;

  horse.style.transitionDuration = "0ms";
  horse.style.transform = "translateX(0)";

  const intervalId = setInterval(() => {
    const time = Math.floor(Math.random() * 4000) + 1000;

    if (Math.random() < 0.1) {
      horse.style.transitionDuration = `${time}ms`;
      setTimeout(() => {
        horse.style.animationPlayState = "paused";
        horse.style.transitionDuration = "0ms";
      }, time / 2);
    } else {
      horse.style.transitionDuration = `${time}ms`;
      horse.style.transform = `translateX(${distance}px)`;

      setTimeout(() => {
        if (!horse.classList.contains("arrived")) {
          horse.classList.add("arrived");
        }
      }, time);
    }
  }, 0);

  horse.addEventListener("mouseover", () => {
    clearInterval(intervalId);
    horse.style.transitionDuration = "0ms";
  });

  horse.addEventListener("mouseout", () => {
    runHorse(horse);
  });
}

startButton.addEventListener("click", () => {
  horses.forEach((horse) => {
    if (horse.classList.contains("arrived")) {
      horse.classList.remove("arrived");
      rails.forEach((rail) => {
        if (rail.contains(horse)) {
          const distance = rail.offsetWidth - horse.offsetWidth;
          horse.style.transform = `translateX(${distance}px)`;
        }
      });
    } else {
      runHorse(horse);
    }
  });
});
