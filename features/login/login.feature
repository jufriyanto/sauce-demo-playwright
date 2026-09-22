Feature: Login

  Scenario: Login with valid credentials
    Given I am on the login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page

  Scenario: Login with invalid username
    Given I am on the login page
    When I login with username "wrong_user" and password "secret_sauce"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with empty credentials
    Given I am on the login page
    When I login with username "" and password ""
    Then I should see an error message "Epic sadface: Username is required"

  Scenario: Login with locked out user
    Given I am on the login page
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out"

  Scenario: Login with invalid password
    Given I am on the login page
    When I login with username "standard_user" and password "wrong_password"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with empty password
    Given I am on the login page
    When I login with username "standard_user" and password ""
    Then I should see an error message "Epic sadface: Password is required"
