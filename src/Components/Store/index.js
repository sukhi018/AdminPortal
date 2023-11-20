import {createSlice, configureStore} from "@reduxjs/toolkit";

const quesSlice = createSlice({
  name: 'questionBank',
  initialState: {
    data: [],  
    valid: false,
    trigger:false
  },
  reducers: {
    trigger(state, action) {
      state.trigger = !state.trigger
    },
    setData(state,action)
    {
      state.data = action.payload.data
    },
    setValid(state,action)
    {
      state.valid = action.payload.val
    }
  },

});

const reduxstore = configureStore({
    reducer: {
        quesBank: quesSlice.reducer
    }
})

export const storeActions = quesSlice.actions
export default reduxstore;