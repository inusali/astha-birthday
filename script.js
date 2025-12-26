// 🔥 Firebase Config (JO TUMNE COPY KIYA THA)
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  databaseURL: "PASTE_HERE",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔐 LOGIN
function checkLogin() {
  const name = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (pass === "bhootni" && name !== "") {
    localStorage.setItem("user", name);
    document.getElementById("login").style.display = "none";
    document.getElementById("birthday").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "Wrong password 😜";
  }
}

// 🎵 SONG
function playSong() {
  document.getElementById("song").play();
}

// 💬 SEND COMMENT
function sendComment() {
  const name = document.getElementById("cname").value;
  const msg = document.getElementById("cmsg").value;

  if (!name || !msg) return;

  db.ref("comments").push({
    name,
    msg
  });

  document.getElementById("cmsg").value = "";
}

// 📥 LOAD COMMENTS
db.ref("comments").on("value", snap => {
  const list = document.getElementById("commentList");
  list.innerHTML = "";

  snap.forEach(child => {
    const c = child.val();
    list.innerHTML += `
      <div class="comment">
        <b>${c.name}</b><br>${c.msg}
      </div>`;
  });
});
