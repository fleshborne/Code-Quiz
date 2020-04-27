
var startBtn = document.querySelector("#start-btn");
var nextBtn = document.querySelector("#next-btn");
var timeSetup = document.querySelector(".nav-text");
var questionEl = document.querySelector("#question");
var questionElContainer = document.querySelector("#question-container")
var answerBtnElement = document.querySelector("#answer-buttons");
var scoreContainer = document.querySelector("#score-container");

var questions = [
    {
        question: "What is the purpose Bootstrap?",
        answers: [
            { text: "Space ship", correct: false },
            { text: "9", correct: false },
            { text: "pizza", correct: true },
            { text: "110", correct: false },
        ],
    },
    {
        question: "Where did the sun come from?",
        answers: [
            { text: "Space ship", correct: false },
            { text: "9", correct: false },
            { text: "pizza", correct: true },
            { text: "110", correct: false }
        ],

    },
    {
        question: "Who had the high ground?",
        answers: [
            { text: 'Anakin Skywalker', correct: true },
            { text: 'Barack Obama', correct: false },
            { text: 'Obiwan Kanobi', correct: false },
            { text: 'The Mario Brothers', correct: false }
        ],

    },
    {
        question: "Who does all the base belong to?",
        answers: [
            { text: 'Us', correct: true },
            { text: 'You', correct: false },
            { text: 'Everybody!', correct: false },
            { text: 'We live in a society', correct: false }
        ],

    },
]
var count = 75;

var score = 0;

function evalQuestion() {
    console.log(this)
}

let shuffledQuestions, currentQuestionIndex

//

// get the next question

function setNextQuestion() {
    // console.log(this.value)
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
    if (questions === true) {
        score++;

        return score;

    } else {
        timeSetup - 5;
    }

}
// go back to default after each question
function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild)
    }
}
function showQuestion(question) {
    //show the first question => we need a function that's going to showQuestion
    questionEl.innerText = question.question
    // for each loop to display all questions 
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        button.setAttribute('id', 'btnAnswer')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            score++;
            console.log(score)
        }
        button.addEventListener('click', selectAnswer)
        answerBtnElement.appendChild(button)

    })
    var btnAnswerEl = document.getElementById("btnAnswer")
    btnAnswerEl.addEventListener("click", evalQuestion);
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    // var wrong = selectedButton.dataset.false
    setStatusClass(document.body, correct)
    Array.from(answerBtnElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Save your Score!'
        nextBtn.innerText = 'Restart!'
        startBtn.classList.remove('hide')
        nextBtn.classList.remove('hide')
        endQuiz();
    }
}

function startQuiz() {


    // console.log(questions[0].question);
    // console.log(questions[0].answer);
    // console.log("Started");

    //   hide initial screen
    startBtn.classList.add("hide")
    questionElContainer.classList.remove("hide")
    currentQuestionIndex = 0;

    //    variable to store the current count, set to 0. Decrement the current count

    //    start the timer - we need a timer function track time setInterval of 75000 ms



    var myCounter = setInterval(function () {

        if (count <= 0) {
            endQuiz();

            return;


        }
        count--;
        //    update the current count
        timeSetup.textContent = count;
        return count;
        if (myCounter === 0) {
            clearInterval(myCounter);
            endQuiz();
        }
        //    every time interval runs, decrement current count by 1
        //    re-render the current count
    }, 1000);


    // shuffle questions so they never appear in same order 

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    setNextQuestion();

};
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function calculateScore() {
    return Math.round(score * 2);
}
function saveScore(score) {
    //    create a score object to put in local storage
    var scoreObject = {
        score: score,
    };
    // add this score object to the current scores
    // 1. get all of the scores from local storage
    var scores = getScores();

    // 2. JSON.parse the value from local storage to get an array
    // 3. Pushour score object onto the existing score array
    scores.push(scoreObject);
    // 4. JSON.stringify to turn our array into a string
    var scoresJSON = JSON.stringify(scores);
    // 5. store our new JSON in local storage
    localStorage.getItem('scores', scoresJSON)
}
function getScores() {
    var scores = localStorage.getItem("scores");
    if (scores) {
        return JSON.parse(scores);
    }
    return [];
}
function veiwScores() {
    scoreContainer.classList.remove('hide');
    var scores = getScores();
    var tableBodyElement = document.createElement("<div>#score-body</div>")
    scores.forEach(function (score) {
        var tableRowElement = document.createElement("<tr>");
        var scoreTd = document.createElement("<td>")
            ("<td>").textContent = text(score.score);
        tableRowElement.append(scoreTd);
        tableBodyElement.append(tableRowElement);

    })

}

function endQuiz() {
    // call this inside interval
    // call this when on last question
    // alert("The Quiz has Ended!")
    clearInterval(timeSetup);
    var score = calculateScore();
    var scoreElement = document.querySelector("#score");
    scoreElement.classList.remove('hide');
    return;


};


startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", function () {

    currentQuestionIndex++
    setNextQuestion();
})












