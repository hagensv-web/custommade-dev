import StyledLink from "@/components/core/StyledLink";
import { comingSoon, games } from "@/data/games"

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <h1>Games & Generators</h1>
      <h2>Popular</h2>
      { games.map( game => (
        <div key={game.name}>
          <h3><StyledLink href={game.baseUrl}>{game.name}</StyledLink></h3>
          <p>{game.description}</p>
        </div>
      )) }

      <h2>Coming Soon</h2>
      { comingSoon.map( game => (
        <div key={game.name}>
          <h3>{game.name}</h3>
          <p>{game.description}</p>
        </div>
      ))}
      
      <p>Want to suggest a game or generator? <StyledLink href={"mailto:contact@custommade.games"} rel="nofollow">Send us an email!</StyledLink></p>
    </div>
  );
}
