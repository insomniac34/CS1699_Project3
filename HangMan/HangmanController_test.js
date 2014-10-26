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
	Given(function() { scope.theWord = "blah"; });
	When(function() { scope.reset(); }); /* reset button is pressed */
	Then(function() { expect(scope.theWord).toBe(''); });	

	Given(function() {scope.guessed.letters = ['b', 'l', 'a', 'h']; });
	When(function() {scope.reset();});
	Then(function() {expect(scope.guessed.letters).toBeUndefined();})
});

describe("When the user starts a new round", function () {
	Given(function() { scope.notifications = []; });
	When(function() { scope.startNewRound(); }); /* New round started */
	Then(function() { expect(scope.notifications).toContain({msg: 'New round has begun!', type: 'success'}); });


	//Given(function() {}); /* the user is on the Hangman game page*/
	//When(function() {});	
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