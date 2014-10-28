/*
    Unit test module for HangmanController 


*/

describe("Restart button functionality", function() {

    beforeEach(module('JHangman'));
    
    /* 
        Before each test, we need to use Angular's inject() function to insert any dependencies that the code requires.
        In order for each individual unit test to receive these injected values, we need to declare any dependencies as global values, in this case "var scope, theController" are our globals.
        We pass Angular variables into the function (denoted by '$'), and assign "scope" to the controller's scope and theController to the value of the $controller variable which represents our hangman controller function
    */

    var scope, theController;
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        theController = $controller("HangmanController", { $scope: scope});
    }));

    describe("The user presses the restart button once the word has been set", function () {
        Given("the word is set", function() { 
            scope.theWord = "blah"; 
        });

        When("the reset button is pressed", function() { 
            scope.reset(); /* reset button is pressed */
        }); 

        Then("the word should no longer be 'blah'", function() { 
            expect(scope.theWord).not.toBe("blah"); 
        }); 
    });

    describe("The user presses the restart button after several letters have already been guessed", function() {
        Given("a sequence of letters has been guessed", function() { 
            scope.guessed.letters = ['b', 'l', 'a', 'h'];
        });

        When("the reset button is pressed", function() { 
            scope.reset(); /* reset button is pressed */
        }); 

        Then("the system should clear all guessed letters", function() { 
            expect(scope.guessed.letters).toBeUndefined();
        });          
    });

    describe("the user presses the restart button after a round has been won", function() {
        Given("a user has just won a game round", function() { 
            scope.notifications.push([{msg: 'Congrats you won!', type: 'success'}]);
        });

        When("the user presses the reset button", function() { 
            scope.reset(); /* reset button is pressed */
        }); 

        Then("the system should clear all notifications", function() { 
            expect(scope.notifications).toEqual([]);
        });   
    });
});      

describe("A user guesses an individual letter", function() {

    beforeEach(module('JHangman'));
    var scope, theController;
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        theController = $controller("HangmanController", { $scope: scope});
    }));

    describe("the user succesfully guesses a letter", function() {
        Given("The game has started", function() {
            scope.theWord = "blah";
              scope.divList = new Array(scope.theWord.length);
              for (var i = 0; i < scope.theWord.length; i++) {
                scope.divList[i] = false; //initialize div colors...
                scope.letters.push({
                    name: scope.theWord.charAt(i), 
                    display: '?',
                    guessed: false,
                    guesses: 0,
                    id: i
                });
              }
              scope.guessed.letters = new Array(scope.theWord.length);
        });

        When("The user guesses the correct letter", function() {
            scope.guessed.letters[0] = 'b';
            scope.guess(0);
        });

        Then("The system should display the letter as guessed", function() {
            expect(scope.letters[0].display).toBe('b');
            expect(scope.divList[0]).toBe(true);
        });        
    });

    describe("The user incorrectly guesses a letter", function() {
        Given("The game has started", function() {
            scope.theWord = "blah";
              scope.divList = new Array(scope.theWord.length);
              for (var i = 0; i < scope.theWord.length; i++) {
                scope.divList[i] = false; //initialize div colors...
                scope.letters.push({
                    name: scope.theWord.charAt(i), 
                    display: '?',
                    guessed: false,
                    guesses: 0,
                    id: i
                });
              }
              scope.guessed.letters = new Array(scope.theWord.length);
        });
        
        When("A user enters a letter which does not match the letter at the position entered", function() {
            scope.guessed.letters[0] = 'z';
            scope.guess(0);            
        });

        Then("A question mark should still be displayed at the letter's position", function() {
            expect(scope.letters[0].display).toBe('?');
            expect(scope.divList[0]).toBe(false);
        });
    });
});

describe("Hangman word-guessing functionality", function() {

    beforeEach(module('JHangman'));
    var scope, theController;
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        theController = $controller("HangmanController", { $scope: scope});
    }));

    describe("The user correctly guesses the word", function() {
        Given("The word is set to (*[b][l][a][h]$)", function() {
            scope.pageClass='page-hangman';
            scope.theWord = " ";
            scope.letters = []; //an array containing each of the letters of the word.
            scope.guessed = {};
            scope.succesfulGuesses = 0;
            scope.notifications = [];
            scope.words = []; //for ensuring no duplicates IN A SINGLE ROUND. Duplicates arent checked for in between restarts obviously.

            scope.globalScore = 0;
            scope.totalGuesses = 0;
            scope.incorrectGuesses = 0;
            scope.started = true;
            scope.showWord = false;
            scope.totalRounds = 0;
            scope.roundsWon = 0;

            scope.master = {};
            scope.guessedList = [];
            scope.guessedWord = "";

            scope.theWord = "blah";
            scope.divList = new Array(scope.theWord.length);
            for (var i = 0; i < scope.theWord.length; i++) {
                scope.divList[i] = false; //initialize div colors...
                scope.letters.push({
                    name: scope.theWord.charAt(i), 
                    display: '?',
                    guessed: false,
                    guesses: 0,
                    id: i
                });
            }
            scope.guessed.letters = new Array(scope.theWord.length);
        });

        When("the user guesses (*[b][l][a][h]$)", function() {
            scope.guessedWord = "blah";
            scope.guessWord();
        });

        Then("the user shall receive a score increase and a new round shall begin", function() {
            expect(scope.globalScore).not.toBe(0);
        });
    });

    describe("The user incorrectly guesses the word", function() {
        Given("The word is set to (*[b][a][r]$)", function() {
            
            scope.pageClass='page-hangman';
            scope.theWord = " ";
            scope.letters = []; //an array containing each of the letters of the word.
            scope.guessed = {};
            scope.succesfulGuesses = 0;
            scope.notifications = [];
            scope.words = []; //for ensuring no duplicates IN A SINGLE ROUND. Duplicates arent checked for in between restarts obviously.

            scope.globalScore = 0;
            scope.totalGuesses = 0;
            scope.incorrectGuesses = 0;
            scope.started = true;
            scope.showWord = false;
            scope.totalRounds = 0;
            scope.roundsWon = 0;

            scope.master = {};
            scope.guessedList = [];
            scope.guessedWord = "";

            scope.theWord = "bar";
            scope.divList = new Array(scope.theWord.length);
            for (var i = 0; i < scope.theWord.length; i++) {
                scope.divList[i] = false; //initialize div colors...
                scope.letters.push({
                    name: scope.theWord.charAt(i), 
                    display: '?',
                    guessed: false,
                    guesses: 0,
                    id: i
                });
            }
            scope.guessed.letters = new Array(scope.theWord.length);
        });

        When("the user guesses (*[f][o][o]$)", function() {
            scope.guessedWord = "foo";
            scope.guessWord();
        });

        Then("the user score shall remain the same and a new round shall begin", function() {
            expect(scope.globalScore).toBe(0);
        });
    });

    describe("the user guesses a letter which has already been correctly guessed", function() {
        Given("a letter has already been correctly guessed", function() {
            scope.theWord = "blah";
            scope.notifications = [];
            scope.globalScore = 20;
              scope.divList = new Array(scope.theWord.length);
              for (var i = 0; i < scope.theWord.length; i++) {
                scope.divList[i] = false; //initialize div colors...
                scope.letters.push({
                    name: scope.theWord.charAt(i), 
                    display: '?',
                    guessed: false,
                    guesses: 0,
                    id: i
                });
              }
              scope.guessed.letters = new Array(scope.theWord.length);
              scope.guessed.letters = 'b';
              scope.guess(0);
        });

        When("the user attempts to guess the same letter", function() {
            scope.guessed.letters='b';
            scope.guess(0);
        });

        Then("the system shall notify the user that the letter has already been guessed and the global score shall be unmodified", function() {
            expect(scope.notifications).toContain({msg: 'You already guessed that letter!', type: 'failure'});
            expect(scope.globalScore).toBe(20);
        });
    });
});