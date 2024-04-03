import { createContext, useEffect,useReducer} from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

// Create a context for managing user state
export const UserContext = createContext({
    currentUser: null, // Default value for currentUser
    setCurrentUser: () => null, // Default value for setCurrentUser
});

export const USER_ACTION_TYPES={
    SET_CURRENT_USER:'SET_CURRENT_USER'
}

const userReducer=(state,action)=>{
    console.log('dispatched')
    console.log(action)
    const{type,payload}=action;

    switch(type){
        case 'USER_ACTION_TYPES.SET_CURRENT_USER':
            return{
                ...state,
                currentUser:payload
            }
        
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE={
    currentUser:null
}


export const UserProvider = ({ children }) => {
    // State to hold the current user
    // const [currentUser, setCurrentUser] = useState(null);
    const[{currentUser},dispatch]=useReducer(userReducer,INITIAL_STATE);
    console.log(currentUser)

    const setCurrentUser=(user)=>{
        dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user});
    }



    // Value object to be passed down through context
    const value = { currentUser, setCurrentUser };

    // useEffect hook to handle authentication state changes
    useEffect(() => {
        // Subscribe to authentication state changes
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                // If user is authenticated, create user document in Firebase
                createUserDocumentFromAuth(user);
            }
            // Set the current user state
            setCurrentUser(user);
        });

        // Unsubscribe from authentication state changes when component unmounts
        return unsubscribe;
    }, []); // Dependency array is empty, meaning this effect only runs once on component mount

    // Provide the UserContext.Provider with the value and render children
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};



