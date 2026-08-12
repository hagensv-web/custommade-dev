import BingoCardGrid from "@/components/bingo/BingoCardGrid";
import BingoGameGrid from "@/components/bingo/BingoGameGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bingo Home",
    description: "Create and play your own custom bingo cards. Print cards for in-person play, or share them with friends for digital play.",
}

export default function BingoHome(){
    return (
        <div>
            <h1>Custom Bingo Card Generator</h1>
            <section>
                <p>Generate custom bingo cards instantly. Play in browser, print them, or share with a link. Perfect for classrooms, parties, or virtual events. No signup required.</p>
            </section>

            <h2>Bingo Cards</h2>

            <BingoCardGrid />

            <h2>Bingo Games</h2>
            
            <BingoGameGrid />

            <h2>How to Create a Bingo Card</h2>
            <ol>
                <li>Click "Create New Card"</li>
                <li>Set the name</li>
                <li>Set the size</li>
                <li>Customize the free space</li>
                <li>Enter values for your bingo card</li>
            </ol>

            <h2>Sample Use Cases:</h2>
            <ul>
                <li>Annual Bingo Cards</li>
                <li>Wedding Party Games</li>
                <li>Bible Bingo</li>
                <li>Classroom volcabulary bingo</li>
                <li>Holiday Party Games</li>
            </ul>

            <h2>FAQ</h2>

            <h3>Is this free?</h3>
            <p>Absolutely! You can generate and share as many bingo cards as you like! Every bingo card that you create is saved so that you can come back and generate new cards any time.</p>

            <h3>Do I need an account?</h3>
            <p>No, all of your data is stored in your browser. When you share a bingo card, all of the data is embedded in the share link.</p>

            <h3>Can I print bingo cards?</h3>
            <p>Yes, our bingo generator was designed with print functionality in mind. Once you make a bingo card, use the print button to print the current card or bulk print randomized cards to share with a group.</p>

            <h3>How can I transfer my data?</h3>
            <p>The only way to transfer your data currently is to create individual share links for all of your bingo cards and open them on your new device or browser. We recognize that this system is currently inconvenient and are working on a feature to download all of your data.</p>
        </div>
    )
}