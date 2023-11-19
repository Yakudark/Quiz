// const startBtn = document.querySelector('.math');
const mathBtn = document.querySelector('.mathBtn');
const francaisBtn = document.querySelector('.francaisBtn');
const anglaisBtn = document.querySelector('.anglaisBtn');

const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

// startBtn.onclick = () => {
//     popupInfo.classList.add('active');
//     main.classList.add('active');
// }
mathBtn.addEventListener('click', () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
    loadQuestions(questions);
});

francaisBtn.addEventListener('click', () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
    loadQuestions(questionsGrammaire);
});

anglaisBtn.addEventListener('click', () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
    loadQuestions(questionsAnglais);
});
//modif avant
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active')
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');

    } else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


//nouveau code
function loadQuestions(selectedQuestions) {
    if (selectedQuestions === questions) {
        currentQuestions = questions;
        // Afficher les questions de mathématiques
        showQuestions(0); // Afficher la première question
    } else if (selectedQuestions === questionsGrammaire) {
        currentQuestions = questionsGrammaire;
        // Afficher les questions de grammaire française
        showQuestions(0); // Afficher la première question
    } else if (selectedQuestions === questionsAnglais) {
        currentQuestions = questionsAnglais;
        // Afficher les questions de grammaire française
        showQuestions(0); // Afficher la première question
    }
}

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${currentQuestions[index].numb}. ${currentQuestions[index].question}`;

    const shuffledOptions = shuffleArray([...currentQuestions[index].options]); // Mélange des options

    let optionTag = '';
    shuffledOptions.forEach(option => {
        optionTag += `<div class="option"><span>${option}</span></div>`;
    });

    optionList.innerHTML = optionTag;

    const option = optionList.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = currentQuestions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1; // Incrémentation uniquement si la réponse est correcte
        headerScore(); // Mettre à jour le score affiché
    } else {
        answer.classList.add('incorrect');

        //if answer is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    //once user selected disabled all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${currentQuestions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${currentQuestions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = resultBox.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${currentQuestions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / currentQuestions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue += 1;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
        console.log(progressStartValue);

        if (progressStartValue >= progressEndValue) {
            clearInterval(progress);
        }
    }, speed);

    console.log('User Score:', userScore);
}