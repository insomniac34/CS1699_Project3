#Feature: Serve coffee
#    Coffee should not be served until paid for
#    Coffee should not be served until the button has been pressed
#    If there is no coffee left then money should be refunded

#  Scenario: Buy last coffee
#    Given there are 1 coffees left in the machine
#    And I have deposited 1$
#    When I press the coffee button
#    Then I should be served a coffee


#Home Controller Tests
Feature: Tree menu functionality
    Scenario: User clicks on a category in an unexpanded menu
        Given no menu categories are currently expanded
        When a user clicks on some category in the menu
        Then that menu shall be in an expanded state
        And that submenu shall open to reveal the correct subcategories

    Scenario: User clicks on a non-expanded category while another category is in an expanded state
        Given a menu is in an open state
        When a user clicks on a different category in the tree from the one that is open
        Then the initial submenu should close
        And it should display the newly clicked on category's subcategories

    Scenario: User clicks on an already-expanded menu category
        Given a menu is in an open state
        When a user clicks on the same category that is already expanded
        Then the expanded subcategory should revert to a closed state


#Hangman Controller Tests
Feature: game restart button
    Scenario: The user presses the restart button once the word has been set
        Given the word is set to "blah"
        When the reset button is pressed
        Then the word should no longer be "blah"

    Scenario: The user presses the restart button after several letters have been guessed
        Given a sequence of letters has been guessed
        When the reset button is pressed
        Then the system should clear all guessed letters

    Scenario: The user presses the restart button after a round has been won
        Given the user has just won a game round
        When the reset button is clicked
        Then the system should clear all notifications

Feature: HangMan individual letter guessing functionality
    Scenario: The user succesfully guesses a letter 
        Given the game has begun
        When the user guesses the correct letter "b"
        Then the system shall display "b" instead of a question mark
        And the background of the letter shall change from red to green

    Scenario: The user incorrectly guesses a letter
        Given the game has begun
        When the user incorrectly guesses "z"
        Then the system shall display "?"
        And the background of the letter shall be red

Feature: HangMan word guessing functionality
    Scenario: The user correctly guesses the word
        Given the word is set to "blah"
        When the user guesses "blah"
        Then the user shall receive a score increase
        And a new round should begin

    Scenario: The user incorrectly guesses the word
        Given the word is set to "bar"
        When the user guesses "foo"
        Then the user score shall remain the same
        And a new round should begin


#High Score Controller Tests
Feature: High score table functionality
    Scenario: The user visits the high scores page for the first time
        Given the user has not yet visited the high scores page
        When the user visits the high scores page
        Then the High Scores table should be populated with data retrieved from the application backend
     
    Scenario: the high scores are updated after when the user returns to the high score page
        Given the user has already visited the high score page
        When the user visits the page again
        Then the application should inform the user that new data was retrieved

    Scenario: The user sorts the high score table by score
        Given that the data in the table is not sorted by score
        When the user clicks on 'score' in the table header
        Then the data should be properly sorted by score

    Scenario: The user sorts the high score table by date
        Given that the data in the table is not sorted by date
        When the user clicks on 'date' in the table header
        Then the data should be properly sorted by date        
       

