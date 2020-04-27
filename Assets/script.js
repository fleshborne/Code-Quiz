
var startBtn = document.querySelector("#start-btn");
var nextBtn = document.querySelector("#next-btn");
var timeSetup = document.querySelector(".nav-text");
var questionEl = document.querySelector("#question");
var questionElContainer = document.querySelector("#question-container")
var answerBtnElement = document.querySelector("#answer-buttons");
var count = 75;


let shuffledQuestions, currentQuestionIndex

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})
// get the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])

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
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnElement.appendChild(button)
    })
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
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

    shuffledQuestions = questions.sort(() => Math.random() - .5)
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
    return Math.round(correct * 2);
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
var questions = [
    {
        question: "What is the purpose Bootstrap",
        answers: [
            { text: "Space ship", correct: false },
            { text: "9", correct: false },
            { text: "pizza", correct: true },
            { text: "110", correct: false },
        ],
        score: 1


    },
    {
        question: "Where did the sun come from",
        answers: [
            { text: "Space ship", correct: false },
            { text: "9", correct: false },
            { text: "pizza", correct: true },
            { text: "110", correct: false }
        ]
    },

];

// for each loop to display all questions 








