import StyledLink from "@/components/core/StyledLink";

const games = [
  {
    name: "Bingo!",
    link: "/bingo",
    description: "Create your own custom bingo cards! Enter values you want to appear on the card and generate as many randomized cards as you want. Print them, play in your browser, or share them with your friends."
  },
  {
    name: "Word Guess",
    link: "/word-guess",
    description: "Create your own custom word guessing game. Set the word(s) and the number of guesses. Share it with your friends to determine who is the best guesser."
  },
  {
    name: "Sliding Puzzle",
    link: "/slide-puzzle",
    description: "Create your own sliding puzzle. Upload an image and set the size of the grid. Shuffle the puzzle and challenge yourself to solve it. You could also send it to a friend to solve and reveal a secret message..."
  }
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <h1>CustomMade Games</h1>
      <h2>Games & Generators</h2>

      { games.map( game => (
        <div key={game.name}>
          <h3><StyledLink href={game.link}>{game.name}</StyledLink></h3>
          <p>{game.description}</p>
        </div>
      )) }

      <h2>About</h2>
      <p>Custommade Games is a passion project for custom games/game generators. Our philosophy is that everything should work offline. All your data is stored on your device, preventing the need for user accounts. This has the added benefit of minimizing running costs to us, allowing us to keep the website free to use.</p>

      <p>Want to suggest a game or generator? <StyledLink href={"mailto:contact@custommade.games"}>Send us an email!</StyledLink></p>
    </div>
  );
}
