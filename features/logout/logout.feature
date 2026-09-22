Feature: Logout

  Scenario: User can logout successfully
    Given I am logged in as "standard_user"
    When I logout
    Then I should be on the login page

  Scenario: Accessing protected page after logout redirects to login
    Given I am logged in as "standard_user"
    When I logout
    And I navigate directly to the inventory page
    Then I should be on the login page
