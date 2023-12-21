let aya = document.getElementById("aya");
let sura = document.getElementById("sura");
let chooseAyaBtn = document.getElementById("btn");
let copyBtn = document.getElementById("copy");
let loadingPage = document.getElementById("loadin_page");
let infoBtn = document.getElementById("info");
let infoBox = document.getElementById("info_box");
let xMark = document.getElementById("xmark");
let loadingScript = document.getElementById("loading_script");

/* =.=.=.=.= Loading Page Time =.=.=.=.= */
let loadingFunction = setInterval(() => {
  loadingPage.style.display = "none";
  loadingScript.remove();
}, 3500);

info.addEventListener("click", showInfo);

function showInfo() {
  infoBox.classList.remove("hide");
}

xMark.addEventListener("click", () => {
  infoBox.classList.add("hide");
});

chooseAyaBtn.addEventListener("click", chooseRandom);

function chooseRandom() {
  let currentAya, currentSura;

  fetch("https://api.quran.com/api/v4/quran/verses/indopak")
    .then((data) => {
      let res = data.json();
      return res;
    })
    .then((data) => {
      let ranAyah = Math.floor(Math.random() * data.verses.length);
      currentAya = data.verses[ranAyah].text_indopak;
      aya.innerHTML = `" ${currentAya} "`;

      let regex = /([^:\s]+)/g;
      let currentSuraId = parseInt(
        data.verses[ranAyah].verse_key.match(regex)[0]
      );
      let currentAyaId = parseInt(
        data.verses[ranAyah].verse_key.match(regex)[1]
      );
      fetch("https://api.alquran.cloud/v1/surah")
        .then((data) => {
          let res = data.json();
          return res;
        })
        .then((data) => {
          currentSura = data.data[currentSuraId - 1].name;
          sura.innerHTML = `-- ${currentSura} (${currentAyaId}) --`;
        });
      return currentAya;
    });

  copyBtn.addEventListener("click", copyText);

  function copyText() {
    navigator.clipboard.writeText(`${currentAya}`);
  }

  gsap.fromTo(
    aya,
    {
      opacity: 0,
      x: 200,
    },
    {
      duration: 1,
      opacity: 1,
      x: 0,
      ease: "ease",
    }
  );

  gsap.fromTo(
    sura,
    {
      opacity: 0,
      x: -200,
    },
    {
      duration: 1,
      opacity: 1,
      x: 0,
      ease: "ease",
    }
  );
}