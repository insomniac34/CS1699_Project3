/*
	Unit test module for the HangmanController module
*/

describe("game start", function() {
	beforeEach(module('JHangman'));
	
	var scope, theController;

	beforeEach(inject(function($rootScope, $controller, $httpBackend) {
		scope = $rootScope.$new();
		theController = $controller("HangmanController", { $scope: scope});
	}));

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

	it("", function() {

	});
});

