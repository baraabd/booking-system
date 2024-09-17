import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for booking information
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    selectedDate: null,
    selectedTimeFrom: '',
    selectedTimeTo: '',
    serviceDetails: null,
    userDetails: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTime: (state, action) => {
      state.selectedTimeFrom = action.payload.from;
      state.selectedTimeTo = action.payload.to;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setServiceDetails: (state, action) => {
      state.serviceDetails = action.payload;
    },
    resetBooking: (state) => {
      state.selectedDate = null;
      state.selectedTimeFrom = '';
      state.selectedTimeTo = '';
      state.serviceDetails = null;
      state.userDetails = null;
    }
  }
});

// Export actions
export const { setSelectedDate, setSelectedTime, setUserDetails, setServiceDetails, resetBooking } = bookingSlice.actions;

// Configure the Redux store
const store = configureStore({
  reducer: {
    booking: bookingSlice.reducer,
  },
});

export default store;
