
/**
 * Removes the first occurrence of a value from a list, modifying the original list
 * @param list the list to modify
 * @param item the value to remove
 */
export function removeFirst<T>(list: T[], item: T) {
    const idx = list.findIndex( i => i === item)
    removeIndex(list,idx);
}

/**
 * Removes the last occurrence of a value from a list, modifying the original list
 * @param list the list to modify
 * @param item the value to remove
 */
export function removeLast<T>(list: T[], item: T) {
    const idx = list.findLastIndex( i => i === item)
    removeIndex(list,idx);
}

/**
 * Removes all instances of a value from the list. 
 * @param list the list
 * @param item the item to clear
 * @returns the new list without the item
 */
export function removeAll<T>(list: T[], item: T): T[] {
    return list.filter(i => i !== item)
}

/**
 * Removes the value at the provided index from a list, modifiying the original list
 * @param list the list to edit 
 * @param idx the index of the item to remove
 * @returns the value removed from the list
 */
export function removeIndex<T>(list: T[], idx: number): T {
    if (idx < 0){
        throw new Error("Index cannot be less than 0")
    }
    if (idx >= list.length){
        throw new Error("Index cannot exceed list size")
    }

    return list.splice(idx,1)[0]
}