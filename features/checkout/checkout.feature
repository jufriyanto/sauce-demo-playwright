Feature: Checkout

  Background:
    Given I am logged in as "standard_user"

  Scenario: Complete checkout successfully
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "Doe", and "12345"
    And I finish the order
    Then I should see the order confirmation "Thank you for your order!"

  Scenario: Checkout requires first name
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "", "Doe", and "12345"
    Then I should see a checkout error "First Name is required"

  Scenario: Checkout requires last name
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "", and "12345"
    Then I should see a checkout error "Last Name is required"
