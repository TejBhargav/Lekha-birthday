const quizQuestions=[
  {
    question:"What is my favorite thing about our friendship?",
    options:[
      "The random conversations",
      "The food we share",
      "The memories",
      "All of these"
    ],
    answer:2
  },
  {
    question:"Who usually makes the conversation more chaotic?",
    options:[
      "Me",
      "You",
      "Both of us",
      "Nobody 😂"
    ],
    answer:1
  },
  {
    question:"What kind of memories do I value the most?",
    options:[
      "Expensive moments",
      "Perfect photographs",
      "Small random moments",
      "Big celebrations"
    ],
    answer:2
  },
  {
    question:"What do I think makes you special?",
    options:[
      "Your personality",
      "Your smile",
      "Your heart",
      "Everything about you"
    ],
    answer:3
  },
  {
    question:"What do I want our friendship to have?",
    options:[
      "More memories",
      "More laughs",
      "More random conversations",
      "All of them"
    ],
    answer:3
  }
];

let currentQuestion=0;
let score=0;

const quizQuestion=document.querySelector('#quizQuestion');
const quizOptions=document.querySelector('#quizOptions');
const quizProgress=document.querySelector('#quizProgress');
const quizScore=document.querySelector('#quizScore');
const quizProgressBar=document.querySelector('#quizProgressBar');
const quizResult=document.querySelector('#quizResult');
const quizResultTitle=document.querySelector('#quizResultTitle');
const quizResultText=document.querySelector('#quizResultText');
const quizRestart=document.querySelector('#quizRestart');

function loadQuestion(){
  if(!quizQuestion||!quizOptions)return;

  const question=quizQuestions[currentQuestion];

  quizQuestion.textContent=question.question;
  quizOptions.innerHTML='';

  if(quizProgress){
    quizProgress.textContent=`QUESTION ${String(currentQuestion+1).padStart(2,'0')} / ${quizQuestions.length}`;
  }

  if(quizScore){
    quizScore.textContent=`SCORE ${String(score).padStart(2,'0')}`;
  }

  if(quizProgressBar){
    quizProgressBar.style.width=`${(currentQuestion/quizQuestions.length)*100}%`;
  }

  question.options.forEach((option,index)=>{
    const button=document.createElement('button');

    button.type='button';
    button.className='quiz-option';
    button.textContent=option;

    button.addEventListener('click',()=>{
      selectAnswer(index,button);
    });

    quizOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex,selectedButton){
  const question=quizQuestions[currentQuestion];
  const buttons=quizOptions.querySelectorAll('.quiz-option');

  buttons.forEach(button=>{
    button.disabled=true;
  });

  if(selectedIndex===question.answer){
    selectedButton.classList.add('correct');
    score++;
  }else{
    selectedButton.classList.add('wrong');

    if(buttons[question.answer]){
      buttons[question.answer].classList.add('correct');
    }
  }

  if(quizScore){
    quizScore.textContent=`SCORE ${String(score).padStart(2,'0')}`;
  }

  setTimeout(()=>{
    if(currentQuestion<quizQuestions.length-1){
      currentQuestion++;
      loadQuestion();
    }else{
      showResult();
    }
  },700);
}

function showResult(){
  if(!quizQuestion||!quizOptions)return;

  quizQuestion.style.display='none';
  quizOptions.style.display='none';

  if(quizProgress){
    quizProgress.textContent='QUIZ COMPLETE';
  }

  if(quizProgressBar){
    quizProgressBar.style.width='100%';
  }

  if(quizResult){
    quizResult.classList.add('show');
    quizResult.style.display='block';
  }

  if(quizResultTitle){
    if(score===5){
      quizResultTitle.textContent='You know me too well. ❤️';
    }else if(score>=3){
      quizResultTitle.textContent='Not bad at all. ✦';
    }else{
      quizResultTitle.textContent='We need to talk. 😂';
    }
  }

  if(quizResultText){
    quizResultText.textContent=`You scored ${score} out of ${quizQuestions.length}.`;
  }
}

if(quizRestart){
  quizRestart.addEventListener('click',()=>{
    currentQuestion=0;
    score=0;

    quizQuestion.style.display='';
    quizOptions.style.display='';

    if(quizResult){
      quizResult.classList.remove('show');
      quizResult.style.display='none';
    }

    loadQuestion();
  });
}

loadQuestion();