import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ILogin {
    authing: boolean,
    userId: string | undefined
}

const initialState: ILogin = {
    authing: false,
    userId: ''
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        toggleAuth: (state, action: PayloadAction<boolean>) => {
            state.authing = !state.authing
        },
        getUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        }
    }
})

export const { toggleAuth, getUserId } = loginSlice.actions
export default loginSlice.reducer;