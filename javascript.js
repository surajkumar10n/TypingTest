const EASY = [
  "In modern times the first scrawny kitten is, in its own way, an input. An ostrich is the beginner of a roast. An appressed exhaust is a gun of the mind.What is your name?. Can you type your name please.",

  "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his",

  "The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their",

  "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great ex",
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam fe",
];
const MEDIUM = [
  "Authors often misinterpret the lettuce as a folklore rabbi, when in actuality it feels more like an uncursed bacon. Pursued distances show us how mother-in-laws can be charleses.",

  "In recent years, some teeming herons are thought of simply as numbers. Nowhere is it disputed that an unlaid fur is a marble of the mind. Far from the truth, few can name a glossy lier that isn't an ingrate bone.",

  "A tramp is a siamese from the right perspective. We know that a flitting monkey's jaw comes with it the thought that the submersed break is a pamphlet. Their cream was,in this moment, a seedy daffodil.",
];
const HARD = [
  "If this was somewhat unclear, a friend is a fridge from the right perspective. An upset carriage is a stitch of the mind. To be more specific, a temper is a pair from the right perspective. ",

  "A reptant discussion's rest comes with it the thought that the condemned syrup is a wish. The drake of a wallaby becomes a sonant harp. If this was somewhat unclear, spotty  show us how technicians can be jumps.",

  "Those cowbells are nothing more than elements. This could be, or perhaps before stockings, thoughts were only opinions. A coil of the exclamation is assumed to be a hurtless toy. A board is the cast religion. ",

  "A tramp is siamese from the right perspective. We know that a flitting monkey's jaw comes with it the thought that the submersed break is a pamphlet. Their cream was, in this moment.",
];

localStorage.setItem("EASY", JSON.stringify(EASY));
localStorage.setItem("MEDIUM", JSON.stringify(MEDIUM));
localStorage.setItem("HARD", JSON.stringify(HARD));

const typingText = document.querySelector(".showSentence p");
const inpField = document.getElementById("textarea");

let showTime = document
  .getElementById("timeclose")
  .getElementsByTagName("span")[0];
showTime.innerHTML = localStorage.getItem("Time") + ":00";

var TextElement = document
  .getElementById("timeclose")
  .getElementsByTagName("span")[1];
TextElement.innerHTML = localStorage.getItem("Text").toUpperCase();

//getting arrayName and array from local storage
let arrayName = localStorage.getItem("Text").toUpperCase();
let ArrayToParse = JSON.parse(localStorage.getItem(arrayName));

var timer;
var maxTime = localStorage.getItem("Time") * 60;
var timeLeft = maxTime;
var charIndex = 0;
var mistakes = 0;
var isTyping = 0;
let totalCorrectCharacters = 0;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * ArrayToParse.length);
  console.log(ranIndex);
  typingText.innerHTML = "";
  ArrayToParse[ranIndex].split("").forEach((char) => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  isTyping = false;

  // =================
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (timeLeft > 0) {
    if (charIndex < characters.length - 1) {
      if (!isTyping) {
        timer = setInterval(initTimer, 1000);
        isTyping = true;
      }
      if (typedChar == null) {
        if (charIndex > 0) {
          charIndex--;
          if (characters[charIndex].classList.contains("incorrect")) {
            mistakes--;
          }
          characters[charIndex].classList.remove("correct", "incorrect");
        }
      } else {
        if (characters[charIndex].innerText == typedChar) {
          characters[charIndex].classList.add("correct");
          totalCorrectCharacters++;
        } else {
          mistakes++;
          console.log("mistakes", mistakes);
          characters[charIndex].classList.add("incorrect");
        }
        charIndex++;
      }
      characters.forEach((span) => span.classList.remove("active"));
      characters[charIndex].classList.add("active");
    } else {
      inpField.value = "";
      if (timeLeft > 0) {
        loadParagraph();
        charIndex = 0;
        isTyping = true;
        characters[charIndex].classList.add("active");
      }
    }
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    showTime.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    let wpm = Math.round(
      (totalCorrectCharacters / 5 / (maxTime - timeLeft)) * 60
    );
    let Accuracy =
      (totalCorrectCharacters / (totalCorrectCharacters + mistakes)) * 100;
    let NetSpeed = wpm * (Accuracy / 100);
    localStorage.setItem("wpm", wpm);
    localStorage.setItem("Accuracy", Accuracy);
    localStorage.setItem("NetSpeed", NetSpeed);
  } else {
    window.location.href = "ResultPage.html";
    clearInterval(timer);
  }
}

loadParagraph();
inpField.addEventListener("input", initTyping);
