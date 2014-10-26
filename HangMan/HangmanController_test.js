/*
	Unit test module for HangmanController 
*/

describe("Hangman Controller", function() {
	describe("game start", function() {
		
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

			/* Press restart button */
			scope.reset();

			expect(scope.theWord).toEqual('');
			expect(scope.guessed.letters).toBeUndefined();
			expect(scope.notifications).toEqual([{msg: 'Welcome!', type: 'success'}]);
			expect(scope.words).toEqual([]);
		});
	});
});