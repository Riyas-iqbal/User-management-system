import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE ={
        username:''
}

const userSlice = createSlice({
    name: "user_part",
    initialState: INITIAL_STATE,
    reducers:{
        updateUsername:(state,action)=>{
            state.username=action.payload
        }
    }
})

export const { updateUsername } = userSlice.actions  

export default userSlice.reducer
