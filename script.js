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
 window.onload = onWindowLoad;

 function onWindowLoad() {
     const response = prompt('Enter the number of questions: ');

     if (response) {
       totalQuestion = response;
     } else {
       alert('You did not enter any number.');
       totalQuestion = 5;
     } 
     _totalQuestion.textContent = totalQuestion;
 }

 async function loadQuestion(){
     const APIUrl = 'https://opentdb.com/api.php?amount=1';
     const result = await fetch(`${APIUrl}`)
     const data = await result.json();
     _result.innerHTML = "";
     showQuestion(data.results[0]);

 }

 function eventListeners(){
     _checkBtn.addEventListener('click', checkAnswer);
     _playAgainBtn.addEventListener('click', restartTrivia);
 }

 document.addEventListener('DOMContentLoaded', function(){
     loadQuestion();
     eventListeners();
     _totalQuestion.textContent = totalQuestion;
     _correctScore.textContent = correctScore;
 });

 function showQuestion(data){
     _checkBtn.disabled = false;
     correctAnswer = data.correct_answer;
     let incorrectAnswer = data.incorrect_answers;
     let optionsList = incorrectAnswer;
     optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);


     _question.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
     _options.innerHTML = `
         ${optionsList.map((option, index) => `
             <li> ${index + 1}. <span>${option}</span> </li>
         `).join('')}
     `;
     selectOption();
 }
 function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function checkAnswer(){
    _checkBtn.disabled = true;
    const _correct = new Audio('correct.mp3');
    const _wrong = new Audio('wrong.mp3');

    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
            _correct.play();
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
            _wrong.play();
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}
