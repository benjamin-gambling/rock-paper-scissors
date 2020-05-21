/* These count the score + rounds as the game goes on */
let playerInput = document.getElementById('input').children; 

for(let i = 0; i < playerInput.length; i++){
    playerInput[i].onclick = ('click', function(e) {
        game(playerInput[i].textContent);
    });
}

let playerScore = 0;
let computerScore = 0;


/* RANDOMLY SELECTS COMPUTERS WEAPON */
function computerPlay() {
    const choice = ["ROCK", "PAPER", "SCISSORS"]; 
    return choice[Math.floor(Math.random() * choice.length)];
}

/* PLAYS 1 ROUND */
function playRound(playerSelection) {
    let computerSelection = computerPlay();
    let outcome;

    /* THIS DETERMINES W/L/D */ 
    if (playerSelection == computerSelection){
        outcome = "tie";
    } else {
        switch (playerSelection) {
            case "ROCK":
                if (computerSelection == "PAPER") {
                    outcome = "lose";
                } else {
                    outcome = "win";
                }
                break;
            case "PAPER":
                if (computerSelection == "SCISSORS") {
                    outcome = "lose";
                } else {
                    outcome = "win";
                }
                break;
            case "SCISSORS":
                if (computerSelection == "ROCK") {
                    outcome = "lose";
                } else {
                    outcome = "win";
                }
                break;
        }
    }
    displayRound(outcome, playerSelection, computerSelection); /* Changes html id = result to winner */
    return outcome
}

/* THIS FUCNTION RUNS THE GAME */
function game(input){
    /* These get the ROUND 1 from HTML and then slice leaing just the number */
    let currentRound = document.getElementById("round").children[0];
    let roundNumber =  Number(currentRound.textContent.slice(-2));

    /* This plays the game until either player reaches five */
    if(playerScore < 5 && computerScore < 5){
        let roundResult = playRound(input);
        
        /* These two lines get the current score */
        let userPoints = document.getElementById("userScore"); 
        let compPoints = document.getElementById("compScore");
        
        /* Updates score if wins round  */ 
        let outcome; 

        if(roundResult == 'win'){
            outcome = userPoints;
            outcome.textContent = Number(outcome.textContent) + 1;
            playerScore++;
        } else if (roundResult == 'lose'){
            outcome = compPoints;
            outcome.textContent = Number(outcome.textContent) + 1;
            computerScore++;
        } 

        /* This increases the round number and then changes the text */
        roundNumber++
        currentRound.textContent = "ROUND " + roundNumber;
        
        if(playerScore == 5 || computerScore == 5) return winner();
    }
}

function winner(){
        let final;
        if(playerScore == 5){
        final = document.getElementById("win")
        } else {
        final = document.getElementById("lose")
        }

    final.classList.add("finish");
    final.style.visibility = 'visible';

    window.setTimeout(function(e){
        document.getElementById("round").children[0].textContent = "ROUND 1";
        document.getElementById("result").textContent = "Select your weapon...";

        document.getElementById("userScore").textContent = 0;
        document.getElementById("compScore").textContent = 0;
    }, 3000);

    final.ontransitionend = () => {
        final.classList.remove("finish");
        final.style.visibility = 'hidden';
    }
    /* Resets score */
    playerScore = 0;
    computerScore = 0;
}

function reset(){
    document.getElementById("round").children[0].textContent = "ROUND 1";
    document.getElementById("result").textContent = "Select your weapon...";

    document.getElementById("userScore").textContent = 0;
    document.getElementById("compScore").textContent = 0;
}

function displayRound(result, userInput, computerInput) {
    let message;

    switch (result) {
        case "tie":
            message = `It's a tie! you both picked ${userInput}`;
            break;
        case "win":
            message = `You won! ${userInput} beats ${computerInput}`;
            break;
        case "lose":
            message = `You lost! ${computerInput} beats ${userInput}`;
            break;
    }

    let roundOutcome = document.getElementById("result");
    roundOutcome.textContent = message;

}





