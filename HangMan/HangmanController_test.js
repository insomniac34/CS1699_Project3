/*
	Unit test module for HangmanController 


*/



describe("Hangman Controller", function() {

		
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

    describe("When the user presses the restart button", function () {

    	/* #1 */
    	Given("the word is set", function() { 
    		scope.theWord = "blah"; 
    	});

    	When("the reset button is pressed", function() { 
    		scope.reset(); /* reset button is pressed */
    	}); 

    	Then("the word should no longer be equal", function() { 
    		expect(scope.theWord).not.toBe("blah"); 
    	});	

    	/* #2 */
    	Given("a sequence of letters has been guessed", function() { 
    		scope.guessed.letters = ['b', 'l', 'a', 'h'];
    	});

    	When("the reset button is pressed", function() { 
    		scope.reset(); /* reset button is pressed */
    	}); 

    	Then("the system should clear all guessed letters", function() { 
    		expect(scope.guessed.letters).toBeUndefined();
    	});		

    	/* #3 */
    	Given("a user has just won the game", function() { 
    		scope.notifications.push([{msg: 'Congrats you won!', type: 'success'}]);
    	});

    	When("the user presses the reset button", function() { 
    		scope.reset(); /* reset button is pressed */
    	}); 

    	Then("the system should clear all notifications", function() { 
    		expect(scope.notifications).toEqual([]);
    	});			
    });

    describe("When the user starts a new round", function () {



    	//Given(function() {}); /* the user is on the Hangman game page*/
    	//When(function() {});	
    });		

    describe("The user succesfully guesses a letter", function() {
    	Given(function() {
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
    		expect(scope.succesfulGuesses).toBe(1);
    		expect(scope.letters[0].display).not.toBe('?');
    		expect(scope.letters[0].guessed).toBe(true)
        });
    });

    describe("The user incorrectly guesses a letter", function() {
        Given("A new game has begun", function() {
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

        Then("The appropriate variables should be set", function() {
        	expect(scope.succesfulGuesses).toBe(0);
        	expect(scope.letters[0].display).toBe('?');
        	expect(scope.letters[0].guessed).toBe(false);
        });
    });

	/*
	it ("should have been assigned the appropriate page class string", function() {
		expect(scope.pageClass).toBe("page-hangman");
	});


	it("should add a welcome message to the notifications array upon startup", function() {
		expect(scope.notifications).toEqual([{msg: 'Welcome!', type: 'success'}]);
	});

	it("should reset all controller variables and restart the game when the reset button is pushed", function() {
		
		scope.theWord = "blah";
		scope.guessed.letters = ['b', 'l', 'a', 'h'];
		scope.notifications.push([{msg: 'Congrats you won!', type: 'success'}]);

		scope.reset();

		expect(scope.theWord).toEqual('');
		expect(scope.guessed.letters).toBeUndefined();
		expect(scope.notifications).toEqual([{msg: 'Welcome!', type: 'success'}]);
		expect(scope.words).toEqual([]);
	});
	*/
	

		
});

/*
describe("assigning stuff to this", function() {
  Given(function() { this.number = 24; });
  Given(function() { this.number++; });
  When(function() { this.number *= 2; });
  Then(function() { return this.number === 50; });
  // or
  Then(function() { expect(this.number).toBe(50) });
});

describe("assigning stuff to variables", function() {
  var subject;
  Given(function() { subject = []; });
  When(function() { subject.push('foo'); });
  Then(function() { return subject.length === 1; });
  // or
  Then(function() { expect(subject.length).toBe(1); });
});
*/