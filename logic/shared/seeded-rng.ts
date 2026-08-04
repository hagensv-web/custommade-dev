export default class SeededRng {
    a: number
    c: number
    m: number
    x: number

    constructor(seed: number){
        this.a = 1664525;
        this.c = 1013904223;
        this.m = 2**32;
        this.x = seed;
    }

    next(min: number = 0, max: number = 2**32){
        if (min > max){
            throw new Error("Min cannot be greater than max")
        }
        
        this.x = (this.a*this.x + this.c) % this.m
        return (this.x % (max-min)) - min;
    }
}