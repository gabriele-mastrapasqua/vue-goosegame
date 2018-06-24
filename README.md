# vue-goosegame

Simple goose game with vue and vuetify. 
The game logic is written in ES6 in the file game.js. Vue.js is used for UI state.

Goose game is a game where two or more players move pieces around a track by rolling a die. The aim of the game is to reach square number sixty-three before any of the other players and avoid obstacles. ([wikipedia](https://en.wikipedia.org/wiki/Game_of_the_Goose))

Read GooseGame.md for more details and the game rules.

## how to run

Clone this repository, then open the file index.html with a browser and play!

This game needs a minimum of two players to run.

## how to play

Add some player names in the text field. Use unique names from the others players. 
After 2 or more players are added, click "roll the dice" button to start the game.
When the button is clicked, the game will roll automatically the dice for each player then stop waiting for the next turn.

In the players box and game progress box it will show the game progression and the single player position on the board.

In the "game messages" box there'll be logged the game messages.