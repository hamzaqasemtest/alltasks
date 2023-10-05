function play(element) {

    var playerChoice = element.getAttribute('value');
    var Choices = ["rock", "paper", "scissors"];
    var computerChoice = Choices[Math.floor(Math.random() * Choices.length)];

    const isPlayerWinner = {
        rock: { scissors: true, paper: false },
        paper: { rock: true, scissors: false },
        scissors: { paper: true, rock: false }
    };

    let images = {
        rock: './Rock.png',
        paper: './paper.png',
        scissors: './scissors.png',
    };

    let outMessage;
    if (playerChoice === computerChoice) {
        outMessage =  "YOU TIED!";
    } else if(isPlayerWinner[playerChoice][computerChoice]){
        outMessage =  "YOU WIN!";
    } else {
        outMessage =  "YOU LOST!";
    }

    var cards = document.getElementsByClassName('card');

    for (var i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none';
    }

    element.parentElement.parentElement.style.display = 'block';
    element.parentElement.parentElement.querySelector("#item-text").style.display = "none";


    var outCard = `
    <div id="computer-result" class="card computer-result">
        <div class="item-logo">
            <a onclick="play(this)" value="paper">
                <img src="${images[computerChoice]}" alt="${computerChoice}">
            </a>
        </div>
    </div>
`;


    var outdiv = document.createElement('div');
    outdiv.innerHTML = outCard;
    element.parentElement.parentElement.parentElement.appendChild(outdiv.firstElementChild);


    document.getElementById("title").innerHTML = outMessage;
    document.getElementById("try-again").style.display = "block";
}

document.getElementById("try-again").addEventListener("click", function() {
    location.reload();
});

