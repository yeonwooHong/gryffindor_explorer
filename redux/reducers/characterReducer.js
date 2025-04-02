import { 
    FETCH_CHARACTERS,
    FETCH_CHARACTER,
    ADD_FAV 
} from "../actionTypes";

const initialState = {
    characters: [],
    selectedCharacter: null,
    favorites: [],
};

export const characterReducer = (state = initialState, action) => {

    console.log(`characterReducer received action: ${action.type}
        \n payload : ${JSON.stringify(action.payload)}`);
        
    switch (action.type) {
        case FETCH_CHARACTERS:
            return {
                ...state,
                characters: action.payload,
            };

        case FETCH_CHARACTER:
            return {
                ...state,
                selectedCharacter: action.payload,
            };

        case ADD_FAV:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };

        default:
            return state;
    }
};