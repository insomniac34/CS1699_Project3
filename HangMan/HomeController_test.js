describe("Hangman home page functionality", function() {
	var scope, theController;
	beforeEach(module('JHangman'));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		theController = $controller("HomeController", { $scope: scope });
	}));

	it ("should expand properly if clicked", function() {
		expect(scope.expanded).toBe(false);
		scope.onClick(0);
		expect(scope.expanded).toBe(true);
	});

	

});