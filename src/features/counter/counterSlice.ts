import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact, status } from "../../types";

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      const { firstName, lastName, status } = action.payload;

      state.contacts.push({ firstName, lastName, status });
    },

    // removing just by user firstname!! NOTE:
    removeContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.filter(
        (data) => data.firstName != action.payload.firstName
      );
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const { addContact, removeContact } = contactSlice.actions;

export default contactSlice.reducer;
