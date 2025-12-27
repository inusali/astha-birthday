// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAKBBE95EbOD4QSN5DzjUCWmf7JQFQP24",
  authDomain: "inus-9e7bd.firebaseapp.com",
  databaseURL: "https://inus-9e7bd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inus-9e7bd",
  storageBucket: "inus-9e7bd.appspot.com",
  messagingSenderId: "45581453842",
  appId: "1:45581453842:web:749af1e2c2c7a303d166cb"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* 🔐 LOGIN */
function checkLogin() {
  const name = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (pass === "bhootni" && name !== "") {
    localStorage.setItem("user", name);
    document.getElementById("login").style.display = "none";
    document.getElementById("birthday").classList.remove("hidden");
    document.getElementById("cname").value = name;
  } else {
    document.getElementById("error").innerText = "Wrong password 😜";
  }
}

/* 🎵 SONG */
function playSong() {
  document.getElementById("song").play();
}

/* 💬 ADD COMMENT */
function addComment() {
  const name = document.getElementById("cname").value.trim();
  const msg = document.getElementById("cmsg").value.trim();

  if (!name || !msg) {
    alert("Please fill both fields");
    return;
  }

  db.ref("comments").push({
    name: name,
    message: msg,
    time: Date.now()
  });

  document.getElementById("cmsg").value = "";
}

/* 📥 LOAD COMMENTS (REALTIME) */
db.ref("comments").on("child_added", (snapshot) => {
  const d = snapshot.val();

  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `<b>${d.name}</b><br>${d.message}`;

  document.getElementById("commentList").appendChild(div);
});
