'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { BingoRoutes } from "@/logic/bingo/bingo-routes";
import type { BingoGameManage } from "@/logic/bingo/bingo-game-manage";
import BingoGameDetails from "./BingoGameDetails";

export default function BingoGameGrid(){
    const [games, setGames] = useState<BingoGameManage[]>([])

    useEffect( () => {
        const loadClass = async () => {
            const { BingoGameManage } = await import("@/logic/bingo/bingo-game-manage")

            const games = BingoGameManage.listBingoGameIds()

            const bingoCards = games
                .map(id => BingoGameManage.loadBingoGame(id))
                .filter(card => card != null)

            setGames(bingoCards);
        }

        loadClass();
    }, [])

    const deleteCard = (card: BingoGameManage) => {
        card.delete();
        setGames(prev => prev.filter(c => c.getData().id !== card.getData().id))
    }
    
    return (
        <div>
            {/* <Link href={BingoRoutes.create()} className="px-4 py-2 rounded-xl bg-violet-700 text-white">
                Create New Card
            </Link> */}

            <div className="mt-10 grid grid-cols-6 gap-4">
                { games.map( game => (
                    <div className="col-span-6 md:col-span-3 xl:col-span-2" key={game.getData().id}>
                        <BingoGameDetails game={game} deleteFunc={deleteCard} />
                    </div>
                ))}

                {!games && <p>Looks like you dont have any bingo cards.</p>}
                
            </div>
        </div>
    )
}