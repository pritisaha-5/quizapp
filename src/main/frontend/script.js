const quizData = {
  math: [
    { question: "2 + 2?", options: ["3","4","5","6"], answer: "4" },
    { question: "5 x 3?", options: ["8","15","10","12"], answer: "15" }
  ],
  general: [
    { question: "Capital of France?", options: ["Paris","London","Berlin","Madrid"], answer: "Paris" },
    { question: "Largest ocean?", options: ["Atlantic","Indian","Pacific","Arctic"], answer: "Pacific" }
  ]
};

let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let confettiElements = [];

const home = document.getElementById('home');
const quiz = document.getElementById('quiz');
const scorePage = document.getElementById('scorePage');
const questionCard = document.getElementById('questionCard');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// Category selection
document.querySelectorAll('.categoryBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    questions = quizData[btn.dataset.category];
    home.classList.add('hidden');
    quiz.classList.remove('hidden');
    loadQuestion();
  });
});

document.getElementById('retryBtn').addEventListener('click', () => {
  score = 0;
  currentQuestion = 0;
  scorePage.classList.add('hidden');
  home.classList.remove('hidden');
});

function loadQuestion() {
  if(currentQuestion >= questions.length) {
    showScore();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById('question').innerText = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.innerText = opt;
    btn.classList.add('optionBtn');
    btn.addEventListener('click', () => checkAnswer(opt));
    optionsDiv.appendChild(btn);
  });

  questionCard.classList.remove('hidden');

  let time = 15;
  document.getElementById('timer').innerText = time;
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById('timer').innerText = time;
    if(time <= 0) {
      clearInterval(timer);
      currentQuestion++;
      loadQuestion();
    }
  }, 1000);
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if(selected === correct) score++;
  currentQuestion++;
  questionCard.classList.add('hidden');
  setTimeout(loadQuestion, 300);
}

function showScore() {
  quiz.classList.add('hidden');
  scorePage.classList.remove('hidden');
  document.getElementById('score').innerText = `${score} / ${questions.length}`;
  if(score === questions.length) startConfetti();
}

// Simple confetti animation
function startConfetti() {
  confettiElements = [];
  for(let i=0;i<100;i++){
    confettiElements.push({
      x: Math.random()*confettiCanvas.width,
      y: Math.random()*confettiCanvas.height,
      r: Math.random()*6+4,
      d: Math.random()*20+10,
      color: `hsl(${Math.random()*360},100%,50%)`,
      tilt: Math.random()*10-10
    });
  }
  requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiElements.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r/2;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.r);
    ctx.stroke();
    c.y += 2;
    if(c.y > confettiCanvas.height) c.y = -10;
  });
  requestAnimationFrame(drawConfetti);
}

// Resize canvas
window.addEventListener('resize', () => {
  confettiCanvas.width = confettiCanvas.offsetWidth;
  confettiCanvas.height = confettiCanvas.offsetHeight;
});
confettiCanvas.width = confettiCanvas.offsetWidth;
confettiCanvas.height = confettiCanvas.offsetHeight;
