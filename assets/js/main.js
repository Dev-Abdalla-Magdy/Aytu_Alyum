let aya = document.getElementById("aya");
let sura = document.getElementById("sura");
let chooseAyaBtn = document.getElementById("btn");
let copyBtn = document.getElementById("copy");
let numAyatBtn = document.getElementById("number_ayat");
let loadingPage = document.getElementById("loadin_page");
let infoBtn = document.getElementById("info");
let infoBox = document.getElementById("info_box");
let xMarkBtn = document.getElementById("xmark");
let loadingScript = document.getElementById("loading_script");
let langBtn = document.getElementById("lang_en");
let langIcon = document.getElementById("en");
let languageAr = "ar";
let languageEn = "en";
let language = languageAr;
/* =.=.=.=.= Loading Page Time =.=.=.=.= */
let loadingFunction = setInterval(() => {
  loadingPage.style.display = "none";
}, 3000);

info.addEventListener("click", showInfo);

xMarkBtn.addEventListener("click", hideInfo);

langBtn.addEventListener("click", changeLang);

function changeLang() {
  if (language === "ar" || language === "") {
    language = languageEn;
    langIcon.className = `fa-solid fa-a ico`;
    document.body.style.direction = "ltr";
    chooseAyaBtn.innerHTML = "Choose";
  } else if (language === "en") {
    language = languageAr;
    langIcon.className = `fa-solid fa-e ico`;
    document.body.style.direction = "rtl";
    chooseAyaBtn.innerHTML = "اختر لي";
  }
}

function showInfo() {
  infoBox.classList.remove("hide");
}
function hideInfo() {
  infoBox.classList.add("hide");
}

let hijri = document.getElementById("hijri");
let frinji = document.getElementById("frinji");
let day = document.getElementById("day");

let tDate = new Intl.DateTimeFormat(`ar-EG`, {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(Date.now());

let hDate = new Intl.DateTimeFormat(`ar-SA-islamic-umalqura`, {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(Date.now());

let dayDate = new Intl.DateTimeFormat(`ar-SA-islamic-umalqura`, {
  weekday: "long",
}).format(Date.now());

frinji.innerHTML = `${tDate}`;
hijri.innerHTML = `${hDate}`;
day.innerHTML = `${dayDate}`;

chooseAyaBtn.addEventListener("click", chooseRandom);

function chooseRandom() {
  aya.innerHTML = "";
  let currentAya, currentSura;

  fetch(`https://api.alquran.cloud/v1/quran/${language}.asad`)
    .then((res) => res.json())
    .then((data) => {
      let ranSura = Math.floor(Math.random() * data.data.surahs.length);
      currentSura = data.data.surahs[ranSura];

      let ranAya = Math.floor(Math.random() * currentSura.ayahs.length);

      if (+numAyatBtn.value >= 1) {
        for (let i = 0; i < +numAyatBtn.value; i++) {
          currentAya = currentSura.ayahs[ranAya + i];
          if (currentAya.numberInSurah) {
            let ayaText = ` ${currentAya.text} {${currentAya.numberInSurah}} `;
            if (language === languageAr) {
              nameOfSura = currentSura.name;
            } else {
              nameOfSura = currentSura.englishName;
            }
            let suraText = `-- ${nameOfSura} {${currentAya.numberInSurah}:${currentSura.number}} --`;
            if (currentAya.numberInSurah === 1 && currentSura.number !== 1) {
              if (
                currentAya.text.includes(
                  "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
                )
              ) {
                ayaText = `${currentAya.text.slice(38)} {${
                  currentAya.numberInSurah
                }} `;
              }
            }

            aya.innerHTML += ayaText;
            sura.innerHTML = suraText;

            copyBtn.addEventListener("click", copyText);

            function copyText() {
              navigator.clipboard.writeText(
                `===== ${dayDate} =====\n${hDate}\n${tDate} م\n" ${aya.innerHTML} "\n${suraText}
                `
              );
            }
          }
        }
      } else {
        aya.innerHTML = `" اكتب عدد الآيات التي تريد قرائتها "`;
        sura.innerHTML = `-- خطأ في العدد --`;
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
