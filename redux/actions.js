import {
    FETCH_CHARACTERS,
    FETCH_CHARACTER,
    ADD_FAV
} from './actionTypes';

import { db } from '../config/firebaseConfig';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const charactersCollection = "characters"
const collectionRef = collection(db, charactersCollection)


export const fetchCharacters = () => async (dispatch) => {
    try {
        const response = await fetch("https://hp-api.onrender.com/api/characters/house/gryffindor");
        const data = await response.json();

        dispatch({ type: FETCH_CHARACTERS, payload: data });
    } catch (error) {
        console.error("Error fetching characters:", error);
    }
};

export const fetchCharacter = (id) => async (dispatch) => {
    try {
        const response = await fetch(`https://hp-api.onrender.com/api/character/${id}`);
        const data = await response.json();

        dispatch({ type: FETCH_CHARACTER, payload: data });
    } catch (error) {
        console.error("Error fetching character:", error);
    }
};

export const addFavCharacter = (character) => async (dispatch) => {
    try {
        console.log(`Trying to save Fav Character to database : ${JSON.stringify(character)}`);

        const q = query(collectionRef, where("name", "==", character.name)); // Query by name

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log("Character already exists in favorites.");
            return false; // Character already exists, return false
        }

        const docRef = await addDoc(collectionRef, character);

        console.log(`document saved successfully: ${docRef.id}`);

        dispatch({
            type: ADD_FAV,
            payload: {
                id: docRef.id,
                ...character
            }
        })
        return true;
    } catch (error) {
        console.error("Error adding favorite character:", error);
    }
};

export const fetchFavCharacters = (setFavCharacters) => {
    try {
        console.log(`Trying to fetch favorite characters to database.`);

        getDocs(collectionRef).then((snapshot) => {
            setFavCharacters(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        })
        
    } catch (error) {
        console.error("Error fetching favorite characters: ", error);
    }
};
