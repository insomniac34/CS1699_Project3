#Tyler Raborn and Liz Davis
#CS-1699 project 3
#Feature Template for JHangman


#Tests located in HomeController_test.js
Feature: Tree menu functionality
    As a user
    I want to be able to easily and intuitively operate the application's main menu
    In order to easily navigate between the webapp's features

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


#Tests located in HangmanController_test.js
Feature: game restart button
    As a user
    I want to be able to restart at any point in the game
    In order to switch words when I am no longer enjoying myself

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
    As a user
    I want to be able to guess individual letters of the word
    In order to attempt to win the game

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

    Scenario: The user guesses a letter which has already been correctly guessed
        Given a letter has already been correctly guessed
        When the user attempts to guess the same letter
        Then the system should notify the user that the letter has already been guessed
        And the global score shall not be modified

Feature: HangMan word guessing functionality
    As a user
    I want to be able to guess the entire word 
    In order to attempt to win the game immediately

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


#Tests located in HighScoreController_test.js
Feature: High score table functionality
    As a user 
    I want to be able to view the latest high scores
    In order to compete with others to maximize enjoyment of the game

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
       

