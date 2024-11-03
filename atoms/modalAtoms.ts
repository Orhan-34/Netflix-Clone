import { atom } from "recoil";
import type { Movie } from "../typings";
import type { DocumentData } from "firebase/firestore";


export const modalState = atom({
    key: 'modalState',
    default: false
})

export const movieState = atom<Movie | DocumentData | null>({
    key: 'movieState',
    default: null
}) 