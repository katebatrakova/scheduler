import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Application from "components/Application";
import { waitForElement } from "@testing-library/react";
import { getByText, getByLabelText, getAllByTestId, getByPlaceholderText, getByDisplayValue, getByAltText, getByTitle, getByRole } from "@testing-library/react";
import { prettyDOM } from '@testing-library/react'



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

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));


    console.log(prettyDOM(container));

    // const appointments = getAllByTestId(container, "appointment");
    // const appointment = appointments[0];
    // fireEvent.click(getByAltText(appointment, "Add"));

    // fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    //   target: { value: "Lydia Miller-Jones" }
    // });

    // fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // fireEvent.click(getByText("Save"));

  });
})