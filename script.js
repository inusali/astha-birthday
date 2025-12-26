const btn = document.getElementById("playBtn");
const song = document.getElementById("song");

btn.addEventListener("click", () => {
  song.play();
  btn.innerText = "🎵 Playing...";
});
