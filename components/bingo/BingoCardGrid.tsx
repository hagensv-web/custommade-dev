'use client';

import type { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import Link from "next/link";
import { useEffect, useState } from "react";
import BingoCardDetails from "./BingoCardDetails";
import { BingoRoutes } from "@/logic/bingo/bingo-routes";

export default function BingoCardGrid(){
    const [cards, setCards] = useState<BingoCardManage[]>([])

    useEffect( () => {
        const loadClass = async () => {
            const { BingoCardManage } = await import("@/logic/bingo/bingo-card-manage")

            const cards = BingoCardManage.listBingoCardIds()

            const bingoCards = cards
                .map(id => BingoCardManage.loadBingoCard(id))
                .filter(card => card != null)

            setCards(bingoCards);
        }

        loadClass();
        
    }, [])

    const deleteCard = (card: BingoCardManage) => {
        card.delete();
        setCards(prev => prev.filter(c => c.getData().id !== card.getData().id))
    }
    
    return (
        <div>
            <Link href={BingoRoutes.create()} className="px-4 py-2 rounded-xl bg-violet-700 text-white">
                Create New Card
            </Link>

            <div className="mt-10 grid grid-cols-6 gap-4">
                { cards.map( card => (
                    <div className="col-span-6 md:col-span-3 xl:col-span-2" key={card.getData().id}>
                        <BingoCardDetails card={card} deleteFunc={deleteCard} />
                    </div>
                ))}

                {!cards && <p>Looks like you dont have any bingo cards.</p>}
                
            </div>
        </div>
    )
}