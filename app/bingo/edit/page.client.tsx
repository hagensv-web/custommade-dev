'use client';

import BingoCardEditForm from "@/components/bingo/BingoCardEditForm";
import type { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import { BingoRoutes } from "@/logic/bingo/bingo-routes";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function EditBingoCardClientPage(){
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true)

    const [card, setCard] = useState<BingoCardManage>()

    useEffect( () => {
        const loadClass = async () => {
            const { BingoCardManage } = await import("@/logic/bingo/bingo-card-manage")

            const currentId = searchParams.get("card")

            if (!currentId){
                const newCard = BingoCardManage.createBingoCard()
                window.location.href = BingoRoutes.edit(newCard);
                return;
            }

            const card = BingoCardManage.loadBingoCard(currentId);

            if (!card){
                //Todo: Error message
                return;
            }

            setCard(card);
            setLoading(false)
        }

        loadClass();
        
    }, [])

    return (
        <div className="flex flex-col justify-center m-auto">
            <h1 className="text-center">Bingo Card Editor</h1>
            { !loading && 
                <BingoCardEditForm 
                    card={card!}
                /> 
            }
        </div>
    )
}