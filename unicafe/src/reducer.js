const initialState = {
    good: 0,
    ok: 0,
    bad: 0    
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD': {       
            const newState = { ...state, good: state.good + 1 }   
            return newState
        }
        case 'OK': {
            const newState = { ...state, ok: state.ok + 1 }   
            return newState
        }
        case 'BAD': {
            const newState = { ...state, bad: state.bad + 1 }   
            return newState
        }
        case 'ZERO': {
            state.good = 0
            state.ok = 0
            state.bad = 0
            return state
        }
        default:
            return state
    }
}

export default counterReducer