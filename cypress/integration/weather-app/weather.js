import mockedNightWeather from '../../fixtures/weather-night.json'

context('WeatherApp', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows weather for warsaw', () => {
    cy.intercept('GET', 'https://api.openweathermap.org/**', { fixture: 'weather-night.json' }).as('getWeather')

    cy.get('[data-testId="location-btn"]').click()
    cy.get('[data-testId="location-modal"]').should('be.visible').within(() => {
      cy.get('[data-testId="city-input"]').type('warsaw')
      cy.get('[data-testId="save-city-btn"]').click()
    })

    cy.wait('@getWeather')

    cy.get('[data-testId="weather-div"]').should('have.class', 'weather--night')
    cy.get('[data-testId="current-weather"]').should('be.visible').within(() => {
      cy.contains(mockedNightWeather.current.temp)
      cy.contains(mockedNightWeather.current.weather[0].main)
      //cy.contains(mockedNightWeather.timezone)
    })
  })

  it('shows day theme for weather', () => {
    cy.intercept('GET', 'https://api.openweathermap.org/**', { fixture: 'weather-day.json' }).as('getWeather')

    cy.get('[data-testId="location-btn"]').click()
    cy.get('[data-testId="location-modal"]').should('be.visible').within(() => {
      cy.get('[data-testId="city-input"]').type('warsaw')
      cy.get('[data-testId="save-city-btn"]').click()
    })

    cy.wait('@getWeather')

    cy.get('[data-testId="weather-div"]').should('have.class', 'weather--day')
  })
})
