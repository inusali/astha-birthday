// 🔥 Firebase Config (ONLY THIS WAY – GitHub Pages SAFE)
const firebaseConfig = {
  apiKey: "AIzaSyAKBBE95EB0D4QSNNSDzjUCWmF7JQFQP24",
  authDomain: "inus-9e7bd.firebaseapp.com",
  databaseURL: "https://inus-9e7bd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inus-9e7bd",
  storageBucket: "inus-9e7bd.appspot.com",
  messagingSenderId: "45581453842",
  appId: "1:45581453842:web:749af1e2c2c7a303d166cb"
};

// ✅ Firebase init (v8 style)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* ======================
   🔐 LOGIN SYSTEM
====================== */
function checkLogin() {
  const name = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (pass === "bhootni" && name !== "") {
    localStorage.setItem("user", name);
    document.getElementById("login").style.display = "none";
    document.getElementById("birthday").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "Wrong password 😜";
  }
}

/* ======================
   💬 COMMENT SYSTEM
====================== */
function sendComment() {
  const text = document.getElementById("commentText").value.trim();
  const user = localStorage.getItem("user");

  if (!text || !user) return;

  db.ref("comments").push({
    name: user,
    message: text,
    time: Date.now()
  });

  document.getElementById("commentText").value = "";
}

// Live comments
db.ref("comments").on("child_added", (snap) => {
  const c = snap.val();
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `<b>${c.name}</b>: ${c.message}`;
  document.getElementById("commentList").appendChild(div);
});
