'use client'

import { zlibCompress, zlibDecompress } from "../shared/compress";
import { BingoCardData } from "@/data/bingo";

const BINGO_CARD_STORAGE = "/bingo/cards/";
const BINGO_CARD_FORMAT = "/bingo/data-format";
const CURRENT_FORMAT = "0";

const getCardStoragePath = (id: string) => BINGO_CARD_STORAGE+id;

const DEFAULT_NAME = "Custom Bingo Card";
const DEFAULT_ROWS = 5;
const DEFAULT_COLS = 5;
const DEFAULT_HAS_FREE_SPACE = true;
const DEFAULT_FREE_SPACE_TEXT = "Free";
const DEFAULT_THEME = "default";

const updateCardsList = (ids: string[]) => {
    localStorage.setItem(BINGO_CARD_STORAGE, JSON.stringify(ids))
}

const migrateFormat = () => {
    const clientFormat = localStorage.getItem("/bingo/data-format")
    if (clientFormat === null){
        localStorage.setItem(BINGO_CARD_FORMAT,CURRENT_FORMAT);
        return;
    }
    if (clientFormat === CURRENT_FORMAT){
        
    }
}

export class BingoCardManage {
    static {
        migrateFormat();
    }

    private constructor(
        private cardData: BingoCardData, 
        private temporary: boolean = false //tracks if the card was loaded in as temporary data from an import
    ) {
        //Save changes
        if (!cardData.id){
            throw new Error("Card is missing a valid ID!")
        }

        if (!cardData.lastEdited){
            cardData.lastEdited = Date.now();
        }

        if (!cardData.name){
            cardData.name = DEFAULT_NAME;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.rows){
            cardData.rows = DEFAULT_ROWS;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.cols){
            cardData.cols = DEFAULT_COLS;
            cardData.lastEdited = Date.now();
        }

        if (cardData.hasFreeSpace === undefined){
            cardData.hasFreeSpace = DEFAULT_HAS_FREE_SPACE;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.freeSpaceText){
            cardData.freeSpaceText = DEFAULT_FREE_SPACE_TEXT;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.theme){
            cardData.theme = DEFAULT_THEME;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.values){
            cardData.values = [];
            cardData.lastEdited = Date.now();
        }

        this.save();
    }

    static listBingoCardIds(): string[] {
        const json = localStorage.getItem(BINGO_CARD_STORAGE)
        if (!json){
            return [];
        }
        return JSON.parse(json);
    }

    static createBingoCard(){
        const newId = crypto.randomUUID();

        const cards = this.listBingoCardIds();
        cards.push(newId);
        updateCardsList(cards);

        return new BingoCardManage({
            id: newId,
            name: DEFAULT_NAME,
            rows: DEFAULT_COLS,
            cols: DEFAULT_ROWS,
            hasFreeSpace: DEFAULT_HAS_FREE_SPACE,
            freeSpaceText: DEFAULT_FREE_SPACE_TEXT,
            theme: DEFAULT_THEME,
            values: [],
            lastEdited: Date.now()
            
        })
    }

    static loadBingoCard(id: string): BingoCardManage | null {
        const json = localStorage.getItem(getCardStoragePath(id));
        if (!json){
            return null;
        }

        const cardData = JSON.parse(json) as BingoCardData;
        return new BingoCardManage(cardData)
    }

    static importBingoCard(compressedData: string): BingoCardManage {
        const json = zlibDecompress(compressedData);
        const cardData = JSON.parse(json) as BingoCardData;

        return new BingoCardManage(cardData, true);
    }

    getData(): BingoCardData {
        return {
            ...this.cardData
        };
    }

    updateData(data: Partial<Omit<BingoCardData, "id" | "lastEdited">>) {
        this.cardData = {
            ...this.cardData,
            ...data
        }

        this.save()
    }

    export(): string {
        const json = JSON.stringify(this.cardData);
        const compressed = zlibCompress(json);
        return compressed;
    }

    save(){
        if (this.temporary){
            //Add card to list
            const cards = BingoCardManage.listBingoCardIds()

            cards.push(this.cardData.id)

            updateCardsList(cards)

            this.temporary = false
        }

        this.cardData.lastEdited = Date.now();
        
        localStorage.setItem(
            getCardStoragePath(this.cardData.id),
            JSON.stringify(this.cardData)
        )
    }

    delete(){
        localStorage.removeItem(getCardStoragePath(this.cardData.id))
        
        const ids = BingoCardManage.listBingoCardIds()

        const newIds = ids.filter(id => id !== this.cardData.id)

        updateCardsList(newIds);        
    }
}