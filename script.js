const guillotinImg=document.querySelector(".guillotin-box img");
const keyboarddiv=document.querySelector(".keyboard");
const wordDisplay=document.querySelector(".word-display");
const guessText=document.querySelector(".guesses-text b");
const gameModal=document.querySelector(".game-modal");
const playAgainButton=document.querySelector(".play-again");
const streakText=document.querySelector(".streak-text b");

let currentWord,wrongGuessCount,correctLetters;
const maxGuess=6;
let streak=0;

const getRandomWord=()=>{
    const {word,hint}=wordsList[Math.floor(Math.random()*wordsList.length)];
    currentWord=word;
    document.querySelector(".hint-text b").innerHTML=hint;
    resetGame();
}

const resetGame=()=>{
    wrongGuessCount=0;
    correctLetters=[];
    guillotinImg.src=`images/hangman-${wrongGuessCount}.svg`;
    guessText.innerText=`${wrongGuessCount}/${maxGuess}`;
    keyboarddiv.querySelectorAll("button").forEach(b=>b.disabled=false);
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"> </li>`).join(""); 
    gameModal.classList.remove("show");
}

const gameOver=(victory)=>{
    streakText.innerText=streak;
    setTimeout(()=>{
       const modalText=victory?"You found the word: ":"The correct word was: ";
       gameModal.querySelector("img").src=`images/${victory?'victory':'lost'}.gif`;
       gameModal.querySelector("h4").innerText=`${victory?'Congrats!':'Game Over!'}`;
       gameModal.querySelector("p").innerHTML=`${modalText} <b>${currentWord}</b>`;
       gameModal.classList.add("show");

    },300);
}


const initGame=function(button,clickedLetter){
    if(currentWord.includes(clickedLetter)){
         [...currentWord].forEach((letter,index)=>{
            if(clickedLetter===letter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll(".letter")[index].innerText=letter;
                wordDisplay.querySelectorAll(".letter")[index].classList.add("guessed");
            }
         })
    }
    else{
        wrongGuessCount++;
        guillotinImg.src=`images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled=true;
    guessText.innerHTML=`${wrongGuessCount}/${maxGuess}`;
    
    if(wrongGuessCount===maxGuess){
        streak=0;
        return gameOver(false);
    }    
    if(correctLetters.length===currentWord.length){
        streak++;
        return gameOver(true);
    } 
}
//creating keyboard buttons
for(let i=97;i<=122;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboarddiv.appendChild(button);
    button.addEventListener('click',(e)=>initGame(e.target,String.fromCharCode(i)));
}

playAgainButton.addEventListener('click',getRandomWord)
getRandomWord();