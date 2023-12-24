let aya = document.getElementById("aya");
let sura = document.getElementById("sura");
let chooseAyaBtn = document.getElementById("btn");
let copyBtn = document.getElementById("copy");
let loadingPage = document.getElementById("loadin_page");
let infoBtn = document.getElementById("info");
let infoBox = document.getElementById("info_box");
let xMarkBtn = document.getElementById("xmark");
let loadingScript = document.getElementById("loading_script");

/* =.=.=.=.= Loading Page Time =.=.=.=.= */
let loadingFunction = setInterval(() => {
  loadingPage.style.display = "none";
  loadingScript.remove();
}, 3000);

info.addEventListener("click", showInfo);

xMarkBtn.addEventListener("click", hideInfo);

function showInfo() {
  infoBox.classList.remove("hide");
}
function hideInfo() {
  infoBox.classList.add("hide");
}

let hijri = document.getElementById("hijri");
let frinji = document.getElementById("frinji");
let day = document.getElementById("day");

let tDate = new Intl.DateTimeFormat("ar-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(Date.now());

let hDate = new Intl.DateTimeFormat("ar-US-u-ca-islamic", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(Date.now());

let dayDate = new Intl.DateTimeFormat("ar-US-u-ca-islamic", {
  weekday: "long",
}).format(Date.now());

frinji.innerHTML = `${tDate} م`;
hijri.innerHTML = `${hDate}`;
day.innerHTML = `${dayDate}`;

chooseAyaBtn.addEventListener("click", chooseRandom);

function chooseRandom() {
  let currentAya, currentSura;

  fetch("https://api.alquran.cloud/v1/quran/ar.asad")
    .then((res) => res.json())
    .then((data) => {
      let ranSura = Math.floor(Math.random() * data.data.surahs.length);
      currentSura = data.data.surahs[ranSura];

      let ranAya = Math.floor(Math.random() * currentSura.ayahs.length);
      currentAya = currentSura.ayahs[ranAya];

      let ayaText = `" ${currentAya.text} "`;
      let suraText = `-- ${currentSura.name} (${currentAya.numberInSurah}) --`;

      if (currentAya.numberInSurah === 1) {
        if (
          currentAya.text.includes("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ")
        ) {
          ayaText = `"${currentAya.text.slice(38)}"`;
        }
      }

      aya.innerHTML = ayaText;
      sura.innerHTML = suraText;

      copyBtn.addEventListener("click", copyText);

      function copyText() {
        navigator.clipboard.writeText(
          `===== ${dayDate} =====\n${hDate}\n${tDate} م\n${ayaText}\n${suraText}
        `
        );
      }
    });

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
