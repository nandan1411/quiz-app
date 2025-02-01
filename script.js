let quizData = [
    {
      question: "What does 'var' stand for in JavaScript?",
      answers: [
        { text: "Variation", isCorrect: false },
        { text: "Variable", isCorrect: true },
        { text: "Variance", isCorrect: false },
        { text: "Variety", isCorrect: false }
      ]
    },
    {
      question: "Which of the following is a JavaScript data type?",
      answers: [
        { text: "Number", isCorrect: true },
        { text: "String", isCorrect: true },
        { text: "Boolean", isCorrect: true },
        { text: "All of the above", isCorrect: true }
      ]
    },
    {
      question: "What does '=== ' operator signify in JavaScript?",
      answers: [
        { text: "Equal", isCorrect: false },
        { text: "Strictly equal", isCorrect: true },
        { text: "Approximately equal", isCorrect: false },
        { text: "Assignment", isCorrect: false }
      ]
    },
    {
      question: "What is 'NaN' in JavaScript?",
      answers: [
        { text: "Not a Null", isCorrect: false },
        { text: "Not a Number", isCorrect: true },
        { text: "Null and Naive", isCorrect: false },
        { text: "None", isCorrect: false }
      ]
    },
    {
      question: "Which method is used to round a number to the nearest integer in JavaScript?",
      answers: [
        { text: "Math.round()", isCorrect: true },
        { text: "Math.floor()", isCorrect: false },
        { text: "Math.ceil()", isCorrect: false },
        { text: "Math.random()", isCorrect: false }
      ]
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let username = '';
  
  const startQuiz = () => {
    username = document.getElementById('username').value;
    if (!username) {
      alert('Please enter your name to start the quiz.');
      return;
    }
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    showQuestion();
  };
  
  const showQuestion = () => {
    const question = quizData[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.onclick = () => handleAnswer(answer.isCorrect);
      answersDiv.appendChild(button);
    });
    document.getElementById('score').textContent = `Score: ${score}`;
  };
  
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showResults();
    }
  };
  
  const showResults = () => {
    saveToLeaderboard(username, score);
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';
    document.getElementById('final-score').textContent = `Your Score: ${score}`;
  };
  
  const saveToLeaderboard = (username, score) => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  };
  
  const showLeaderboard = () => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = leaderboard
      .sort((a, b) => b.score - a.score)
      .map(entry => `<p>${entry.username}: ${entry.score}</p>`)
      .join('');
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('leaderboard-screen').style.display = 'block';
  };
  
  const clearLeaderboard = () => {
    localStorage.removeItem('leaderboard');
    document.getElementById('leaderboard').innerHTML = '';
};
  
  const goHome = () => {
    document.getElementById('home-screen').style.display = 'block';
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById('leaderboard-screen').style.display = 'none';
  };
  