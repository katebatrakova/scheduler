import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} name="Lydia Miller-Jones" />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    //with getByText we are confident that the element exists
    const { getByText } = render(<Form
      interviewers={interviewers}
      onSave={onSave} name={''}
    />);

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    //with queryByText we test for the absence of something, null value
    const { queryByText, getByText } = render(<Form
      interviewers={interviewers}
      onSave={onSave}
      name={'Lydia Miller-Jones'}
    />);

    /* 3. Click the save button */
    fireEvent.click(queryByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});
