Feature: API Testing

  Scenario: GET list of users returns status 200
    When I send a GET request to "/api/users?page=1"
    Then the response status should be 200
    And the response should contain a list of users

  Scenario: GET single user returns correct data
    When I send a GET request to "/api/users/2"
    Then the response status should be 200
    And the user email should be "janet.weaver@reqres.in"

  Scenario: POST create user returns status 201
    When I send a POST request to "/api/users" with name "John" and job "SDET"
    Then the response status should be 201
    And the response should contain name "John"

  Scenario: PUT update user returns status 200
    When I send a PUT request to "/api/users/2" with name "John" and job "Senior SDET"
    Then the response status should be 200
    And the response should contain job "Senior SDET"

  Scenario: DELETE user returns status 204
    When I send a DELETE request to "/api/users/2"
    Then the response status should be 204
