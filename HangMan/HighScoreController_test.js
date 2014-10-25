
/* 
	Unit test module for HighScoreController
*/

describe("High Score Controller", function() {
	describe("Retrieve and display high scores", function() {
		beforeEach(module('JHangman'));

		var scope, theController, $httpBackend;
		beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
			scope = $rootScope.$new();
			theController = $controller("HighScoreController", { $scope: scope});
			$httpBackend = _$httpBackend_;
		}));

		it("Should fetch up-to-date high score information from the backend upon loading the page", function() {		
			$httpBackend.expectPOST('HighScore.php', {score: 10, date: new Date().toString()}, {action: 'updateScores'}, {'Content-Type': 'application/x-www-form-urlencoded'});
		});

		it("Should display up-to-date high score information retrieved from the application backend", function() {

		});

		it("Should display all high score information in descending order from highest to lowest", function() {

		});
	});
});
