describe('LineSummary Component', () => {
  beforeEach(() => {
    // Mock TFL API response
    cy.intercept('GET', '**/Line/Mode/Tube/Status**', {
      fixture: 'tflStatus.json',
    }).as('getTubeStatus');

    cy.visit('/');
    cy.wait('@getTubeStatus');
  });

  it('renders all line names', () => {
    cy.get('.line-name').contains('Central').should('exist');
    cy.get('.line-name').contains('Jubilee').should('exist');
  });

  it('renders correct line status', () => {
    cy.get('.line').contains('Central').parent().contains('Good service');
    cy.get('.line').contains('Jubilee').parent().contains('Good service');
    cy.get('.line')
      .contains('Metropolitan')
      .parent()
      .contains('Part Suspended');
  });

  it('does not trigger onClick for lines with no disruptions', () => {
    cy.get('.line').contains('Central').click();
    cy.get('.line').contains('Central').parent().contains('Good service');
  });

  it('triggers onClick for lines with disruptions', () => {
    cy.get('.line').contains('Metropolitan').click();
    // Reason text should now be visible
    cy.get('.line')
      .contains(
        'Metropolitan Line: No service between Wembley Park and Aldgate'
      )
      .should('exist');
  });

  it('Chevron points right when collapsed and down when expanded', () => {
    // Initially collapsed
    cy.get('.line')
      .contains('Metropolitan')
      .parent()
      .find('.button-container svg') // assuming Chevron renders an SVG
      .should('have.attr', 'data-direction', 'right');

    // Click to expand
    cy.get('.line').contains('Metropolitan').click();

    cy.get('.line')
      .contains('Metropolitan')
      .parent()
      .find('.button-container svg')
      .should('have.attr', 'data-direction', 'down');
  });

  it('displays disruption reason only when isOpen is true', () => {
    // Collapsed
    cy.get('.line')
      .contains('Metropolitan')
      .parent()
      .contains(
        'Metropolitan Line: No service between Wembley Park and Aldgate'
      )
      .should('not.exist');

    // Expanded
    cy.get('.line').contains('Metropolitan').click();

    cy.get('.line')
      .contains('Metropolitan')
      .parent()
      .contains(
        'Metropolitan Line: No service between Wembley Park and Aldgate'
      )
      .should('exist');
  });

  it('shows one column on mobile (width < 768)', () => {
    cy.viewport(375, 667);
    cy.get('.lines-container').should(($container) => {
      const style = getComputedStyle($container[0]);
      const columns = style.gridTemplateColumns.split(' ');
      expect(columns.length).to.eq(1);
    });
  });

  it('shows two columns on desktop (width >= 768)', () => {
    cy.viewport(1024, 768);
    cy.get('.lines-container').should(($container) => {
      const style = getComputedStyle($container[0]);
      const columns = style.gridTemplateColumns.split(' ');
      expect(columns.length).to.eq(2);
    });
  });
});
