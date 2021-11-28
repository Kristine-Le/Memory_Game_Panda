//Grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 9;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the data
const getData = () => [
    { imgSrc: "./images/Baby_panda.jpg", name: "Baby_panda"},
    { imgSrc: "./images/Bamboo.jpg", name: "Bamboo"},
    { imgSrc: "./images/Cute_panda.jpg", name: "Cute_panda"},
    { imgSrc: "./images/Hi_panda.jpg", name: "Hi_panda"},
    { imgSrc: "./images/Named_panda.png", name: "Named_panda"},
    { imgSrc: "./images/panda.jpg", name: "panda"},
    { imgSrc: "./images/Real_panda.jpg", name: "Real_panda"},
    { imgSrc: "./images/Red_panda.jpg", name: "Red_panda"},
    { imgSrc: "./images/Baby_panda.jpg", name: "Baby_panda"},
    { imgSrc: "./images/Bamboo.jpg", name: "Bamboo"},
    { imgSrc: "./images/Cute_panda.jpg", name: "Cute_panda"},
    { imgSrc: "./images/Hi_panda.jpg", name: "Hi_panda"},
    { imgSrc: "./images/Named_panda.png", name: "Named_panda"},
    { imgSrc: "./images/panda.jpg", name: "panda"},
    { imgSrc: "./images/Real_panda.jpg", name: "Real_panda"},
    { imgSrc: "./images/Red_panda.jpg", name: "Red_panda"},
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random()-0.5)
    return cardData;
};

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attatch the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attatch the cards to  the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
        card.classList.toggle("toggleCard");
        checkCards(e);
    });
 });
};
//Check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard")
    //Logic
    if(flippedCards.length === 2){
        if(
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
        ) {
          console.log("match");
          flippedCards.forEach(card => {
            card.classList.remove("flipped");
            card.style.pointerEvents = "none"
          });
        } else {
        console.log("wrong");
        flippedCards.forEach(card => {
            card.classList.remove("flipped");
            setTimeout(() => card.classList.remove("toggleCard"), 1000);
        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
        if(playerLives === 0) {
            restart("Try again");
        }
    }  
    }
    //Run a check to see if we won the game
    if (toggleCard.length === 16) {
        restart("You won");
    }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) =>{
        cards[index].classList.remove("toggleCard");
        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
        },1000)
    });
    playerLives = 9;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 1000);
};

cardGenerator();