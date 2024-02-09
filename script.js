const questions = [
    {
        question: "which is largest animal in the world",
        answer: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Garaffe", correct: false},
        ]
    },
    {
        question: " Which animal is known as the 'Ship of the Desert?",
        answer: [
            { text: "Elephant", correct: false},
            { text: "Sheep", correct: false},
            { text: "Camel", correct: true},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Rainbow consist of how many colours?",
        answer: [
            { text: "2", correct: false},
            { text: "5", correct: false},
            { text: "8", correct: false},
            { text: "7", correct: true},
        ]
    },
    {
        question: "Name the National bird of India?",
    answer: [
        { text: "Sparrow", correct: false},
        { text: "Pigeon", correct: false},
        { text: "Peacock", correct: true},
        { text: "Parrot", correct: false},
    ]
    },
    {
        question: " Name the biggest continent in the world?",
    answer: [
        { text: "Asia", correct: true},
        { text: "Afrika", correct: false},
        { text: "Arctic", correct: false},
        { text: "Australia", correct: false},
    ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex +1;
    questionElement.innerHTML = questionNumber +"." + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; 
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click" , () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
