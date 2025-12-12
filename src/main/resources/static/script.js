document.addEventListener("DOMContentLoaded", () => {

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

  let currentQuestion = 0;
  let score = 0;
  let currentQuestions = [];

  // Category buttons
  document.querySelectorAll('.categoryBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      startQuiz(category);
    });
  });

  // Retry button
  document.getElementById('retryBtn').addEventListener('click', () => {
    score = 0;
    currentQuestion = 0;
    document.getElementById('scorePage').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
  });

  function startQuiz(category) {
    currentQuestions = quizData[category];
    currentQuestion = 0;
    score = 0;

    document.getElementById('home').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');

    loadQuestion();
  }

  function loadQuestion() {
    if(currentQuestion >= currentQuestions.length){
      showScore();
      return;
    }

    const q = currentQuestions[currentQuestion];
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
  }

  function checkAnswer(selected) {
    const correct = currentQuestions[currentQuestion].answer;
    if(selected === correct) score++;
    currentQuestion++;
    loadQuestion();
  }

  function showScore() {
    document.getElementById('quiz').classList.add('hidden');
    const scorePage = document.getElementById('scorePage');
    scorePage.classList.remove('hidden');
    document.getElementById('score').innerText = `${score} / ${currentQuestions.length}`;
  }

});
