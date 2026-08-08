import { BingoCardData } from "@/data/bingo";
import SeededRng from "@/logic/shared/seeded-rng";
import { useMemo, useState } from "react";
import StyledInput from "../core/StyledInput";
import { BingoCardManage } from "@/logic/bingo/bingo-card-manage";
import { Dice1, Dices, Edit2, Play, Printer, Share2 } from "lucide-react";
import { IBingoCardActions } from "@/logic/bingo/bingo-actions";

interface Props {
    card: BingoCardManage,
    initialSeed?: number,
    actions?: IBingoCardActions
}

export default function BingoCardPreview({ card, initialSeed, actions }: Props) {

    const [ seed, setSeed ] = useState(initialSeed ?? Math.floor(Math.random() * 10000))

    const cardData = useMemo( () => card.getData(), [ card ] )
    const rows = useMemo( () => Array.from({ length: cardData.rows }, (_, i) => i), [ cardData ] )
    const cols = useMemo( () => Array.from({ length: cardData.rows }, (_, i) => i), [ cardData ] )

    const values = useMemo( () => {

        //Return empty list if card is missing
        if (!card){
            return Array.from({ length: 25 }, () => "" )
        }

        //Create seeded random number generator
        const rng = new SeededRng(seed);

        //Copy values
        const pool = cardData.values.map(x => x)
        const vals = []
        for (let i = 0; i < cardData.rows*cardData.cols; i++){

            //Insert free space
            if (
                cardData.hasFreeSpace &&
                i % cardData.rows == Math.floor(cardData.cols / 2) &&
                Math.floor(i / cardData.rows) == Math.floor(cardData.cols / 2)
            ){
                vals.push(cardData.freeSpaceText);
                continue;
            }

            if (pool.length == 0){
                vals.push("");
                continue;
            }

            //Get value for cell
            const nextIdx = rng.next(0, pool.length)
            vals.push(...pool.splice(nextIdx,1))
        }
        return vals;
    }, [card, seed] )

    const getValue = (row: number, col: number): string => {
        return values[row*cardData.cols + col]
    }

    return (
        <div>
            <div className="flex flex-row gap-5 items-center mb-5">
                <StyledInput
                    name="seed"
                    type="number"
                    value={seed}
                    onChange={e => setSeed(parseInt(e.target.value))}
                />
                <button
                    className="rounded p-2 border hover:text-yellow-300 hover:rotate-360"
                
                    onClick={() => setSeed(Math.round(Math.random()*10000))}>
                    <Dices />
                </button>
            </div>

        <table className="border-collapse border-3 border-color-black">
            <tbody>
            { rows.map( r => (
                <tr key={r}>
                    { cols.map( c => (
                        <td key={c} className="border-1">
                            <div className="flex justify-center items-center w-25 h-25">
                            <p className="text-center text-sm">{getValue(r,c)}</p>
                            </div>
                        </td>
                    ))}
                </tr>
            )) }
            </tbody>
        </table>
        <div className="flex flex-row justify-around mt-10">
            { actions?.edit &&
                <button 
                    className="rounded p-2 border"
                    onClick={() => actions.edit?.(card)}><Edit2 /></button>
            }
            { actions?.play &&
                <button 
                    className="rounded p-2 border"
                    onClick={() => actions.play?.(card,seed)}><Play /></button>
            }
            { actions?.print &&
                <button 
                    className="rounded p-2 border"
                    onClick={() => actions.print?.(card)}><Printer /></button>
            }
            { actions?.share &&
                <button
                    className="rounded p-2 border"
                    onClick={() => actions.share?.(card)}><Share2 /></button>
            }
        </div>
        </div>
    ) 
}