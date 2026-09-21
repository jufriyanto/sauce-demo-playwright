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

  Scenario: Checkout requires zip code
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "Doe", and ""
    Then I should see a checkout error "Postal Code is required"

  Scenario: Checkout overview shows correct item
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "Doe", and "12345"
    Then the order overview should contain "Sauce Labs Backpack"

  Scenario: Back to shopping after order confirmation
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "Doe", and "12345"
    And I finish the order
    And I go back home
    Then I should see "Products" as the page title

  Scenario: Checkout overview shows correct item total
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "Doe", and "12345"
    Then the item total should be "Item total: $29.99"

  Scenario: Cancel from checkout overview
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "Doe", and "12345"
    And I cancel the order
    Then I should see "Products" as the page title

  Scenario: Cancel on checkout form returns to cart
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I cancel on the checkout form
    Then I should see "Your Cart" as the page title

  Scenario: Checkout overview shows tax and grand total
    When I add "Sauce Labs Backpack" to the cart
    And I go to the cart
    And I proceed to checkout
    And I fill checkout info with "John", "Doe", and "12345"
    Then the tax should be "Tax: $2.40"
    And the grand total should be "Total: $32.39"
