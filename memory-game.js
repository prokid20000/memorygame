"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */
let c1 = null;
let c2 = null;
let noClick = false;
const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);




/** Shuffle array items in-place and return shuffled array. */

function shuffle(items){
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for(let i = items.length - 1; i > 0; i--){
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors){
  const gameBoard = document.getElementById("game");

  for(let color of colors){
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameBoard.append(newDiv);
  }
}

/** Flip a card face-up. */

function flipCard(card){
  card.style.backgroundColor = card.classList[0];
}

/** Flip a card face-down. */

function unFlipCard(card){
  c1.style.backgroundColor = "";
  c1.classList.remove("flipped");
  c1 = null;
  c2.style.backgroundColor = "";
  c2.classList.remove("flipped");
  c2 = null;
  noClick = false;
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt){
  if(noClick) return;
  if(evt.target.classList.contains("flipped")) return;

  let ccontain = evt.target;
  flipCard(ccontain);

  if(!c1 || !c2){
    ccontain.classList.add("flipped");
    c1 = c1 || ccontain;
    c2 = ccontain === c1 ? null : ccontain;
  }

  if(c1 && c2){
    noClick = true;

    if(c1.className === c2.className){
      c1.removeEventListener("click", handleCardClick);
      c2.removeEventListener("click", handleCardClick);
      c1 = null;
      c2 = null;
      noClick = false;
    } 
    else{
      setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS);
    }
  }
}