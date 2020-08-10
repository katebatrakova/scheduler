/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";



//describe used to group a series of related tests
describe("Appointment", () => {
  it("renders without crashing", () => { //it function is an alias to the test function
    render(<Appointment />);
  });
});

