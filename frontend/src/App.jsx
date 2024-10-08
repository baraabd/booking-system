import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import ServiceDetails from "./components/ServiceDetails";
import CalendarComponent from "./components/Calendar";
import TimeSlots from "./components/TimeSlots";
import BookingForm from "./components/BookingForm";
import BookingConfirmed from "./components/Confirmation";
import ThankYou from "./components/ThankYou"; // Import the ThankYou component

import "./styles.css";

function App() {
  const [stage, setStage] = useState(1);
  const [serviceDetails, setServiceDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState("");
  const [selectedTimeTo, setSelectedTimeTo] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [discount, setDiscount] = useState(0);

  // Step 1: Handle service selection
  const handleServiceSelect = (details) => {
    setServiceDetails(details);
    setStage(2); // Move to the next step (Calendar)
    console.log(details);
  };

  // Step 2: Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Step 3: Handle time slot selection
  const handleTimeSelect = (from, to) => {
    setSelectedTimeFrom(from);
    setSelectedTimeTo(to);
    console.log(from, to);
  };

  // Step 4: Proceed to the user info form after selecting date and time
  const handleProceedToUserInfo = () => {
    if (selectedDate && selectedTimeFrom && selectedTimeTo) {
      setStage(3); // Move to user info form
    } else {
      alert("Välj både datum och tid!");
    }
  };

  // Step 5: Function to check if user exists for discount
  const checkUserExists = async (email) => {
    const query = `
      query {
        checkUserExists(email: "${email}")
      }
    `;
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      return result.data?.checkUserExists ?? false;
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  // Step 6: Handle user info submission and set the discount
  const handleUserDetailsSubmit = (details) => {
    setUserDetails(details);
    setDiscount(details.discount); // Apply discount if user exists
    console.log(details);
    setStage(4); // Move to confirmation
  };

  // Step 7: Save booking to backend (this also triggers email sending)
  const saveBookingToBackend = async () => {
    const bookingDetails = {
      ...userDetails,
      ...serviceDetails,
      bookingDate: selectedDate ? selectedDate.toISOString() : null,
      bookingStart: selectedTimeFrom || "",
      bookingEnd: selectedTimeTo || "",
      discount: discount || 0,
      amount: serviceDetails.amount || 0,
    };


    console.log(bookingDetails)

    if (
      !bookingDetails.name ||
      !bookingDetails.email ||
      !bookingDetails.bookingDate
    ) {
      console.error("Missing booking details: ", bookingDetails);
      alert("Booking details are incomplete. Please try again.");
      return;
    }

    const query = `
      mutation {
        addBooking(
          name: "${bookingDetails.name}",
          email: "${bookingDetails.email}",
          phone: "${bookingDetails.phone}",
          address: "${bookingDetails.address}",
          postalCode: "${bookingDetails.postalCode}",
          bookingDate: "${bookingDetails.bookingDate}",
          bookingStart: "${bookingDetails.bookingStart}",
          bookingEnd: "${bookingDetails.bookingEnd}",
          serviceName: "${bookingDetails.serviceName}",
          pricePerSquareMeter: ${bookingDetails.pricePerSquareMeter},
          totalArea: ${bookingDetails.totalArea},
          discount: ${bookingDetails.discount},
          amount: ${bookingDetails.amount}
        ) {
          id
          name
        }
      }
    `;

    /* const query = `
      mutation {
        addBooking(
          name: "${bookingDetails.name}",
          email: "${bookingDetails.email}",
          phone: "${bookingDetails.phone}",
          address: "${bookingDetails.address}",
          postalCode: "${bookingDetails.postalCode}",
          bookingDate: "${bookingDetails.bookingDate}",
          bookingStart: "${bookingDetails.bookingStart}",
          bookingEnd: "${bookingDetails.bookingEnd}",
          serviceName: "${bookingDetails.serviceName}",
          servicePrice: ${bookingDetails.servicePrice},
          totalArea: ${bookingDetails.totalArea},
          discount: ${bookingDetails.discount},
          amount: ${bookingDetails.amount}
        ) {
          id
          name
        }
      }
    `;
 */
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error("Failed to save booking");
      const result = await response.json();
      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);

        // Check if email-related errors exist in the response
        const emailError = result.errors.find((error) =>
          error.message.includes("email")
        );
        if (emailError) {
          alert("Error sending confirmation email. Please contact support.");
        }

        return null;
      }

      return result.data;
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Error saving your booking. Please try again.");
      return null;
    }
  };

  // Step 8: Confirm booking and apply discount
  const handleConfirmBooking = async () => {
    const savedBooking = await saveBookingToBackend();
    if (savedBooking) {
      setStage(5); // Move to thank you screen
    }
  };
  
  // Function to handle going back to home
  const handleGoHome = () => {
    setStage(1); // Reset to the home page stage
  };
  
  return (
    <div className="app-container">
      <ProgressBar currentStage={stage} />
  
      {stage === 1 && <ServiceDetails onProceedToUser={handleServiceSelect} />}
      {stage === 2 && (
        <>
          <CalendarComponent onDateSelect={handleDateSelect} />
          <TimeSlots onTimeSelect={handleTimeSelect} />
          <div className="buttonDev">
            <button
              onClick={handleProceedToUserInfo}
              className="confirm-button-time"
            >
              Du är närmare, Ange dina uppgifter på nästa steg!
            </button>
          </div>
        </>
      )}
      {stage === 3 && (
        <BookingForm
          onConfirmBooking={handleUserDetailsSubmit}
          checkUserExists={checkUserExists}
          discount={discount}
        />
      )}
      {stage === 4 && (
        <>
          <BookingConfirmed
            bookingDetails={{
              ...userDetails,
              ...serviceDetails,
              bookingDate: selectedDate,
              timeFrom: selectedTimeFrom,
              timeTo: selectedTimeTo,
              discount, 
            }}
          />
          <button
            onClick={handleConfirmBooking}
            className="confirm-button-confirmation"
          >
            Bekräfta din bokning
          </button>
        </>
      )}
      {stage === 5 && (
        <ThankYou onGoHome={handleGoHome} /> // Thank you message with home button
      )}
    </div>
  );
}

export default App;
