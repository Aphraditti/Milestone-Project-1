const _question = document.getElementById('question');
 const _options = document.querySelector('.trivia-options');
 const _checkBtn = document.getElementById('check-answer');
 const _playAgainBtn = document.getElementById('play-again');
 const _result = document.getElementById('result');
 const _correctScore = document.getElementById('correct-score');
 const _totalQuestion = document.getElementById('total-question');

 let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 0;

 var audio = new Audio('background.mp3');
 audio.loop = true;

 document.body.addEventListener("mousemove", function () {
     audio.play();
 });
