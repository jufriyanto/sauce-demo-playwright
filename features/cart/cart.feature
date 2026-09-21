Feature: Shopping Cart

  Background:
    Given I am logged in as "standard_user"

  Scenario: Add a product to cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  Scenario: Add multiple products to cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"

  Scenario: View cart contents
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    Then I should see "Sauce Labs Backpack" in the cart

  Scenario: Remove a product from cart
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty
