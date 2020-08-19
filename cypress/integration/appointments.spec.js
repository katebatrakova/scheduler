describe("Appointments", () => {
  //separate the common test commands 
  beforeEach(() => {
    //reset the db in the beginning
    cy.request("GET", "/api/debug/reset")

    //visit the root of the web server
    cy.visit("/");
    // confirm that the DOM contains the text "Monday"
    cy.contains("Monday")
  })
  it("should book an interview", () => {
    //select the add button
    cy.get("[alt='Add']")
      // clicks the first button for the empty appointment 
      .first()
      .click()
    //find the input field
    cy.get('[data-testid=student-name-input]')
      //type the name 
      .type('Lydia Miller-Jones')

    //select the int interviewer 
    cy.get("[alt='Sylvia Palmer']")
      .click()
    //click the save button.
    cy.contains("Save")
      .click()
    //verify that we show the student and interviewer names 
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });


  it("should edit an interview", () => {

    //select the edit button
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    // //find the input field
    cy.get('[data-testid=student-name-input]')
      //clear the input field
      .clear()
      //type the name
      .type('Lydia Miller-Jones')
    // //select the int interviewer 
    cy.get("[alt='Tori Malcolm']")
      .click()
    //click the save button.
    cy.contains("Save")
      .click()
    // //verify updates  student and interviewer names are shown
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {

    //select the cancel button
    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm")
      .click()

    cy.contains("Deleting")
    cy.contains("Deleting").should('not.exist')

    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist')


  });

});