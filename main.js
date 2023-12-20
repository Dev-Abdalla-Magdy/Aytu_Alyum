const aya = document.getElementById("aya");
const sura = document.getElementById("sura");
const btn = document.getElementById("btn");
const copy = document.getElementById("copy");

btn.addEventListener("click", chooseRandom);

function chooseRandom() {
  let currentAya, currentSura;

  fetch("https://api.quran.com/api/v4/quran/verses/indopak")
    .then((data) => {
      const res = data.json();
      return res;
    })
    .then((data) => {
      const ranAyah = Math.floor(Math.random() * data.verses.length);
      currentAya = data.verses[ranAyah].text_indopak;
      aya.innerHTML = `" ${currentAya} "`;

      const regex = /([^:\s]+)/g;
      let currentSuraId = parseInt(
        data.verses[ranAyah].verse_key.match(regex)[0]
      );
      let currentAyaId = parseInt(
        data.verses[ranAyah].verse_key.match(regex)[1]
      );
      fetch("https://api.alquran.cloud/v1/surah")
        .then((data) => {
          const res = data.json();
          return res;
        })
        .then((data) => {
          currentSura = data.data[currentSuraId - 1].name;
          sura.innerHTML = `-- ${currentSura} (${currentAyaId}) --`;
        });
      return currentAya;
    });

  copy.addEventListener("click", copyText);

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

gsap.to(".title", {
  yoyo: true,
  repeat: -1,
  ease: "ease",
  duration: 2,
  textShadow: "5px 5px 10px #00ffff",
});

gsap.fromTo(
  ".footer",
  {
    textShadow: "0px 0px 5px #000",
  },
  {
    yoyo: true,
    repeat: -1,
    ease: "ease",
    duration: 1,
    textShadow: "0px 0px 10px #00ffff",
  }
);

gsap.fromTo(
  ".container",
  {
    boxShadow: "0px 0px 10px #fff",
  },
  {
    yoyo: true,
    repeat: -1,
    ease: "ease",
    duration: 2,
    boxShadow: "0px 0px 25px #00ffff",
  }
);
