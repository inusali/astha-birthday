// 🔥 Firebase Config (TUMHARA)
const firebaseConfig = {
  apiKey: "AIzaSyAKBBE95EbOD4QSNNSDZjUCWmF7JQFQP24",
  authDomain: "inus-9e7bd.firebaseapp.com",
  databaseURL: "https://inus-9e7bd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inus-9e7bd",
  storageBucket: "inus-9e7bd.appspot.com",
  messagingSenderId: "45581453842",
  appId: "1:45581453842:web:749af1e2c2c7a303d166cb"
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

// 💬 COMMENTS
function addComment() {
  const name = document.getElementById("cname").value;
  const msg = document.getElementById("cmsg").value;

  if (name && msg) {
    db.ref("comments").push({
      name: name,
      message: msg
    });
    document.getElementById("cmsg").value = "";
  }
}

db.ref("comments").on("child_added", snapshot => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `<b>${data.name}</b><br>${data.message}`;
  document.getElementById("commentList").appendChild(div);
});
