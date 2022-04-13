import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  // your config obj
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const colRef = collection(db, "challenges");

const challengesElem = document.querySelector(".challenges");
const dropDown = document.querySelector(".dropDown");
const dropElm = document.querySelector(".drop");
const levelElm = document.querySelectorAll(".level");
const levelNameElm = document.getElementsByClassName("levelName");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");
const chName = document.getElementsByClassName("challengeName");
const challengeModal = document.querySelector(".challenge-modal");

function getChallenges() {
  let challenges = [];
  getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        challenges.push({ ...doc.data(), id: doc.id });
      });
      setChallengeList(challenges);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function setChallengeList(data) {
  data.forEach((element) => {
    showChallenges(element);
  });
}

function showChallenges(data) {
  const challenge = document.createElement("div");
  challenge.classList.add("challenge");
  challenge.innerHTML = `
   <div class="challenge-img">
   <img
     src="${data.url}"
     alt=""
   />
 </div>
 <div class="challenge-info">
   <h5 class="challengeName">${data.title}</h5>
   <p><strong>Platform</strong> ${data.platform}</p>
   <p class="levelName"><strong>Level</strong> ${data.difficulty}</p>

 </div>`;
  challengesElem.appendChild(challenge);
  challenge.addEventListener("click", () => {
    showChallengeDetails(data);
  });
}

function showChallengeDetails(data) {
  challengeModal.classList.toggle("show");
  challengeModal.innerHTML = `   
  <button class="back">Back</button>
  <div class="modal">
    <div class="left-modal">
      <img
        src="${data.url}"
        alt=""
      />
      <div class="modal-info">
        <div class="inner-left inner">
          <p><strong>Platform: </strong> ${data.platform}</p>
          <p class="levelName"><strong>Level: </strong> ${data.difficulty}</p>
        </div>
        <div class="inner-right inner">
           <p><strong>Tags: </strong> ${data.tags}</p>
        </div>
      </div>
   
      <div class="right-modal">
        <h1>${data.title}</h1>
        <div>
          <div class="desc">
           <h3> Description </h3>
           <p> ${data.description} </p>
        </div>
          <div class="desc">
           <h3> Requirements </h3>
            <p> ${data.requirements} </p>
          </div>

          <div class="desc">
           <h3> Guidelines </h3>
           <p> ${data.guidelines} </p>
         </div>
        </div>
      </div>
   
  </div>
`;
  const back = challengeModal.querySelector(".back");
  back.addEventListener("click", () => {
    challengeModal.classList.toggle("show");
  });
}

dropDown.addEventListener("click", () => {
  dropElm.classList.toggle("showDropDown");
});

levelElm.forEach((element) => {
  element.addEventListener("click", () => {
    Array.from(levelNameElm).forEach((name) => {
      if (name.innerText.includes(element.innerText)) {
        name.parentElement.parentElement.style.display = "grid";
      } else {
        name.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

search.addEventListener("input", () => {
  Array.from(chName).forEach((ch) => {
    if (ch.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      ch.parentElement.parentElement.style.display = "grid";
    } else {
      ch.parentElement.parentElement.style.display = "none";
    }
  });
});

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fas");
});

//script start
getChallenges();
