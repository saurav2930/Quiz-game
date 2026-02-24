const questionObj = {
  category: "Food & Drink",
  id: "qa-1",
  correctAnswer: "Three",
  options: ["Two", "Three", "Four", "Five"],
  question: "How many pieces of bun are in a Mcdonald's Big Mac?",
};

const quesJSON = [
  {
    correctAnswer: "Three",
    options: ["Two", "Three ", "Four", "Five"],
    question: "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: "L. Frank Baum",
    options: [
      "Suzanne Collins",
      "James Fenimore Cooper",
      "L. Frank Baum",
      "Donna Leon",
    ],
    question: "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: "Atlanta United",
    options: [
      "Atlanta United",
      "Atlanta Impact",
      "Atlanta Bulls",
      "Atlanta Stars",
    ],
    question: "Which of these is a soccer team based in Atlanta?",
  },
  {
    correctAnswer: "A Nanny",
    options: ["A Sow", "A Lioness", "A Hen", "A Nanny"],
    question: "A female goat is known as what?",
  },
  {
    correctAnswer: "P. L. Travers",
    options: [
      "J. R. R. Tolkien",
      "P. L. Travers",
      "Lewis Carroll",
      "Enid Blyton",
    ],
    question: "Which author wrote 'Mary Poppins'?",
  },
];

var currentQuestion = 0;

let correctAnswer;
let options;
let question;
function destucture(currentQuestion) {
  if (currentQuestion <= quesJSON.length - 1) {
    ({
      correctAnswer: correctAnswer,
      options: options,
      question: question,
    } = quesJSON[currentQuestion]);
  }
}
destucture(currentQuestion);

const questionEl = document.querySelector("#question");
questionEl.textContent = question;

const optionsEl = document.querySelector("#options");
let suffleOptionsExtract = suffleOptions(options);

function addOption() {
  suffleOptionsExtract.forEach((item) => {
    let button = document.createElement("button");
    button.textContent = item;
    button.className = "btnOption";
    optionsEl.appendChild(button);
  });
}

addOption();

const score = document.querySelector("#score");
let currentScore = 0;
let countClick = 0;

let optionBtn = document.querySelectorAll(".btnOption");
let next = document.querySelector("#btn");

function addEvents() {
  optionBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (
        this.innerText === correctAnswer &&
        countClick <= 1 &&
        currentQuestion <= quesJSON.length - 1
      ) {
        countClick = countClick + 2;
        currentScore++;
        score.innerText = `Score:${currentScore} / ${quesJSON.length}`;

        if (currentQuestion <= quesJSON.length - 1) {
          if (currentQuestion === quesJSON.length - 1) {
            questionEl.textContent = "Quiz Completed!";
            optionsEl.style.display = "none";
            next.style.display = "none";
            return;
          }
          currentQuestion = currentQuestion + 1;
          destucture(currentQuestion);
          loadQuestionOption();
        }
      } else if (
        this.innerText !== correctAnswer &&
        countClick <= 1 &&
        currentQuestion <= quesJSON.length - 1
      ) {
        countClick = countClick + 2;

        currentScore = currentScore - 0.25;
        score.innerText = `Score:${currentScore} / ${quesJSON.length}`;

        if (currentQuestion <= quesJSON.length - 1) {
          if (currentQuestion === quesJSON.length - 1) {
            questionEl.textContent = "Quiz Completed!";
            optionsEl.style.display = "none";
            next.style.display = "none";
            return;
          }
          currentQuestion = currentQuestion + 1;
          destucture(currentQuestion);
          loadQuestionOption();
        }
      }
    });
  });
}

addEvents();

function suffleOptions(option) {
  for (let i = option.length - 1; i >= 0; i--) {
    let randomeIndex = Math.floor(Math.random() * i);
    [option[i], option[randomeIndex]] = [option[randomeIndex], option[i]];
  }
  return option;
}

function loadQuestionOption() {
  // ({
  //   correctAnswer: correctAnswer,
  //   options: options,
  //   question: question,
  // } = quesJSON[currentQuestion]);

  questionEl.textContent = question;
  optionsEl.innerHTML = "";
  suffleOptionsExtract = suffleOptions(options);
  addOption();
  countClick = 0;
  optionBtn = document.querySelectorAll(".btnOption");
  addEvents();
}

next.addEventListener("click", () => {
  if (currentQuestion === quesJSON.length - 1) {
    questionEl.textContent = "Quiz Completed!";
    optionsEl.style.display = "none";
    next.style.display = "none";
     score.innerText = `Score:${currentScore} / ${quesJSON.length}`;
    return;
  }
  currentQuestion = currentQuestion + 1;
  console.log(currentQuestion);

  destucture(currentQuestion);
  loadQuestionOption();
});
