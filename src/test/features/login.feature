Feature: User Authentication tests

  Background:
    Given User navigates to the application

  Scenario: Login should be success
    And User enter the email as "medazizguennichi@gmail.com"
    And User enter the password as "Azerty@123"
    When User click on the login button
    Then Login should be success

  Scenario: Login should not be success
    Given User enter the email as "aziz@gmail.com"
    Given User enter the password as "helloworld"
    When User click on the login button
    But Login should fail
