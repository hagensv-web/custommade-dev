import StyledLink from "@/components/core/StyledLink";

export default function CompanyPage(){

    return (
        <div>
        <h1>About</h1>
        <h2>Purpose</h2>
        <p>Custommade Games is a passion project for custom games/game generators. Our philosophy is that everything should work offline. All your data is stored on your device, preventing the need for user accounts. This has the added benefit of minimizing running costs to us, allowing us to keep the website free to use.</p>

        <h2>Our Story</h2>
        <p>CustomMade Games started in late 2025 as nothing more than a simple idea: a bingo card generator. The challenge was to create a bingo card generator capable of creating printable bingo cards. An additional challenge was to make it work entirely in-browser, without requiring an accounts to stave user data. This was decided in part to avoid privacy issues, but mostly because it would be easier and cheaper.</p>
        <p>The first version of the site was thrown together in February 2026 and hosted on Github Pages. From there, the vision expanded. We wanted the ability to create more custom games of various types, such as Sliding Puzzles, Word Guessing. Thats when we came up with the name CustomMade Games and bought the domain <StyledLink href="/">custommade.games</StyledLink>.</p>
        <p>Eventually we hit a wall. We had been using a custom component library for development. This vastly sped up the process of making the website, but it left the site feeling too generic and boring. Thats when we took some time off to really focus on branding.</p>
        </div>
    )
}