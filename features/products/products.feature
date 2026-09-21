Feature: Products

  Background:
    Given I am logged in as "standard_user"

  Scenario: Products page shows all items
    Then I should see "Products" as the page title
    And I should see 6 products

  Scenario: Sort products by name Z to A
    When I sort products by "za"
    Then the first product should be "Test.allTheThings() T-Shirt (Red)"

  Scenario: Sort products by price low to high
    When I sort products by "lohi"
    Then the first product should be "Sauce Labs Onesie"

  Scenario: View product detail page
    When I click on product "Sauce Labs Backpack"
    Then I should see product detail for "Sauce Labs Backpack"

  Scenario: Return to products from detail page
    When I click on product "Sauce Labs Backpack"
    And I go back to products
    Then I should see "Products" as the page title

  Scenario: Sort products by name A to Z
    When I sort products by "az"
    Then the first product should be "Sauce Labs Backpack"

  Scenario: Sort products by price high to low
    When I sort products by "hilo"
    Then the first product should be "Sauce Labs Fleece Jacket"

  Scenario: Add product to cart from detail page
    When I click on product "Sauce Labs Backpack"
    And I add the product to cart from the detail page
    Then the cart badge should show "1"
