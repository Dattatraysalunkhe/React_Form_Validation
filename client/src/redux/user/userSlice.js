import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    // error:null,
    // loading:null
}

const userSlice=createSlice({
    name: 'user', 
    initialState,
    reducers:{
  
        signInSuccess: (state,action) => {

            state.currentUser=action.payload;
            state.loading=false;
     
        },
        signoutUser: (state) => {
               state.currentUser=null
        }

    }

})

export const {signStart,signInSuccess,signoutUser} =userSlice.actions;

export default userSlice.reducer