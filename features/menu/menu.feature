Feature: Burger Menu

  Background:
    Given I am logged in as "standard_user"

  Scenario: Navigate to All Items via burger menu
    When I open the burger menu
    And I click "All Items" in the burger menu
    Then I should see "Products" as the page title

  Scenario: Navigate to About via burger menu
    When I open the burger menu
    And I click "About" in the burger menu
    Then I should be navigated to the Sauce Labs website

  Scenario: Reset App State clears the cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the burger menu
    And I click "Reset App State" in the burger menu
    And I close the burger menu
    Then the cart badge should not be visible

  Scenario: Close burger menu without action
    When I open the burger menu
    And I close the burger menu
    Then the burger menu should be closed
