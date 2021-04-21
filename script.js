"use strict";

const rollDiceBtn = document.querySelector(`.btn--roll`);
const dice = document.querySelector(`.dice`);
const restart = document.querySelector(`.btn--new`);
const holdBtn = document.querySelector(`.btn--hold`);
const player0 = document.querySelector(`.player--0`);
const player1 = document.querySelector(`.player--1`);
const rules = document.querySelector(`.btn--rules`);
const modal = document.querySelector(`.modal`);
const closeBtn = document.querySelector(`.close`);

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

dice.classList.add(`hidden`);

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle(`player--active`);
  player1.classList.toggle(`player--active`);
};

rollDiceBtn.addEventListener(`click`, () => {
  if (playing) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove(`hidden`);
    dice.src = `./public/dice-${randomDice}.png`;
  
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener(`click`, () => {
  if (playing) {
    console.log(scores[activePlayer]);
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});


const modalHidden = function() {
    modal.classList.toggle(`hidden`);
}

restart.addEventListener(`click`, () => {
    location.reload()
})

rules.addEventListener(`click`, modalHidden);
closeBtn.addEventListener(`click`, modalHidden);