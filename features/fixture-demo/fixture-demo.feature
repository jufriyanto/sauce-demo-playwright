Feature: Fixture Authentication Demo

  # Tidak perlu Background login — authenticatedPage fixture handle otomatis
  Scenario: View all products with fixture auth
    Given I am on the products page as an authenticated user
    Then I should see 6 products

  Scenario: Add item to cart with fixture auth
    Given I am on the products page as an authenticated user
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
