'use client';

import type { BingoGameManage } from "@/logic/bingo/bingo-game-manage";
import SeededRng from "@/logic/shared/seeded-rng";
import { useEffect, useMemo, useState } from "react";

interface Props {
    game: BingoGameManage,
}

export default function InteractiveBingoCard({ game }: Props){

    const card = useMemo( () => game.getData().card, [ game ] )
    const seed = useMemo( () => game.getData().seed, [ game ] )
    const rows = useMemo( () => Array.from({ length: card.rows }, (_, i) => i), [ card ] )
    const cols = useMemo( () => Array.from({ length: card.cols }, (_, i) => i), [ card ] )

    const values = useMemo( () => {

        //Return empty list if card is missing
        if (!card){
            return Array.from({ length: 25 }, () => "" )
        }

        //Create seeded random number generator
        const rng = new SeededRng(seed);

        //Copy values
        const pool = card.values.map(x => x)
        const vals = []
        for (let i = 0; i < card.rows*card.cols; i++){

            //Insert free space
            if (
                card.hasFreeSpace &&
                i % card.rows == Math.floor(card.cols / 2) &&
                Math.floor(i / card.rows) == Math.floor(card.cols / 2)
            ){
                vals.push(card.freeSpaceText);
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

    const [dirty, setDirty] = useState(false)
    useEffect( () => {
        if (dirty){
            setDirty(false)
        } 
    }, [dirty])

    const getValue = (row: number, col: number): string => {
        return values[row*card.cols + col]
    }

    const clearHighlighted = () => {
        game.clearHighlights();
        setDirty(true);
    }

    const toggleCell = (row: number, col: number): void => {
        game.toggleCell(row,col);
        setDirty(true)
    }

    const isHighlighted = (row: number, col: number): boolean => {
        return game.isHighlighed(row, col);
    }

    return (
        <div>
        <table className="hyphens-auto break-all text-xs lg:break-normal lg:text-sm border-collapse border-3 border-color-black w-full table-fixed max-w-150 m-auto">
            <tbody>
            { rows.map( r => (
                <tr key={r}>
                    { cols.map( c => (
                        <td key={c} className="border-1">
                            <div 
                                className={`p-1 flex justify-center items-center w-full aspect-square${ isHighlighted(r,c) ? ' bg-yellow-300/30' : '' }`}
                                onClick={() => toggleCell(r,c)}
                            >
                            <p className="text-center">{getValue(r,c)}</p>
                            </div>
                        </td>
                    ))}
                </tr>
            )) }
            </tbody>
        </table>
        <div className="flex flex-row justify-center items-center mt-5">
        <button 
            className="px-4 py-2 rounded-xl bg-violet-700 text-white"
            onClick={() => clearHighlighted()}>Clear</button>
        </div>
        </div>
    ) 
}