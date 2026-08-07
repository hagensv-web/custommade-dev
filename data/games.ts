interface Game {
    name: string,
    description: string,
    baseUrl: string
}

export const games: Game[] = [
  {
    name: "Bingo!",
    baseUrl: "/bingo",
    description: "Create your own custom bingo cards for classrooms, family gatherings, or parties. Enter the items you want to appear on the card and generate as many randomized cards as you want. Print them to share with a group, or send them to your friends and play in your browser."
  },
]

export const comingSoon: Game[] = [
  {
    name: "Hidden Phrase",
    baseUrl: "/word-guess",
    description: "Create your own Wordle-like word guessing game with vast customization options. Choose any word for players to guess, or add multiple words for added replayability or to make players guess them all at the same time! Set the maximum number of guesses players have. Define your own set of valid words for guessing. The possibilities are endless! Share it with your friends to give them a unique guessing challenge."
  },
  {
    name: "Sliding Puzzle",
    baseUrl: "/slide-puzzle",
    description: "Create your own sliding puzzle. Upload an image and set the size of the grid. Shuffle the puzzle and challenge yourself to solve it. You could also send it to a friend to solve and reveal a secret message..."
  },
  {
    name: "Trivia Categories",
    baseUrl: "/category-trivia",
    description: "Create your own Jepoardy-like trivia game. Create your own categories, point scaling, bonuses and more! When your game is ready, share your screen and you're ready to host."
  },
  {
    name: "Crossword",
    baseUrl: "/crossword",
    description: "Create your own crossword or words fit game. Create your own list of words and provide clues for each one. Or for a different challenge, provide no clues and instead have players try to make the words fit into the puzzle"
  },
  {
    name: "Word Search",
    baseUrl: "/word-search",
    description: "Your classic word search, create your own word list and customize rules for "
  }
]