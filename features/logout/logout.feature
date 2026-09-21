Feature: Logout

  Scenario: User can logout successfully
    Given I am logged in as "standard_user"
    When I logout
    Then I should be on the login page
