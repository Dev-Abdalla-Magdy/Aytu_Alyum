gsap.to(".loading-box", {
  duration: 1,
  scale: 0.1,
  repeat: -1,
  yoyo: true,
  stagger: {
    grid: "auto",
    from: "end",
    amount: 1,
    each: 0.5,
    repeat: -1,
    yoyo: true,
  },
});
