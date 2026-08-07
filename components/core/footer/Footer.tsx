import { games } from "@/data/games";
import StyledLink from "../StyledLink";
import FooterSection from "./FooterSection";

export default function Footer(){
    return (
        <footer className="mt-20 pt-10 border-t-1 border-zinc-300 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid grid-cols-12">
                <div className="col-span-4 md:col-span-7"></div>
                <div className="col-span-4 md:col-span-2">
                    <FooterSection title="Generators">
                        { games.map( game => (
                            <p><StyledLink href={game.baseUrl}>{game.name}</StyledLink></p>
                        )) }
                    </FooterSection>
                </div>
                <div className="col-span-4 md:col-span-3">
                    <FooterSection title="Company">
                        <p><StyledLink href="/about">About</StyledLink></p>
                        <p><StyledLink href="/company/privacy">Privacy Policy</StyledLink></p>    
                    </FooterSection>
                </div>
            </div>
            <div className="mt-10">
                <p className="text-center text-xs">© {new Date().getFullYear()} CustomMade Games</p>
            </div>
        </footer>
    )
}