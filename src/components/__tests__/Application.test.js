import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Application from "components/Application";
import { waitForElement } from "@testing-library/react";
import { getByText, queryByAltText, getAllByAltText, queryByText, getAllByTestId, getByPlaceholderText, getByAltText } from "@testing-library/react";
// import { prettyDOM } from '@testing-library/react'

import axios from "axios";


afterEach(cleanup);

//The asynchronous function has been defined as one using the async keyword.
describe("Application", () => {


  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // Promise chain can be hidden by using the await keyword.
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });



  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving ...")).toBeInTheDocument();
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(container, "You sure you want to delete this interview?")).toBeInTheDocument()
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(container, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(container, "Deleting ...")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getAllByAltText(container, "Add"));
    // 8. Check that the shoe container  is not displayed
    expect(queryByText(container, "Archie Cohen")).toBeNull();
    // 9. Check that the DayListItem with the text "Tuesday" increased spots by 1".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 4. Check that the appointment  is shown.
    getByAltText(appointment, 'Tori Malcolm').click()
    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving ...")).toBeInTheDocument();
    // 7. Wait until the element with the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(appointment, "Archie Cohen"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    //  8. Check that the DayListItem with the text "Monday" also has unchanged spots '1 spot remaining'.
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  // mockRejectedValueOnce() used to mock to revert to the default behaviour after the single request that this test generates is complete. 
  // This replaces the mock from our src / __mocks__ / axios.js module temporarily, until the put function is called once.
  it("shows the save error when failing to save an appointment", async () => {
    await axios.put.mockRejectedValueOnce("Could not save the appointment. Try again");
  });



  //fake the delete mock rejection 
  it("shows the delete error when failing to delete an existing appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });

})