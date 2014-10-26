
/* 
	Unit test module for HighScoreController
*/

describe("High Score Controller Function", function() {
	describe("show high score information to the user", function() {
		var scope, theController, $httpBackend, $http, HighScoreService;
		beforeEach(module('JHangman'));

		//set up mock controller, scope, backend
		beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _$http_, _HighScoreService_) {
			HighScoreService = _HighScoreService_;
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			theController = $controller("HighScoreController", { $scope: scope});
			$http = _$http_;
		}));

		it("should display a 'New High Scores!' message", function() {
			expect(scope.notifications).not.toEqual([]);
		});

		it("should display up-to-date high score information retrieved from the application backend upon loading the page", function() {
			var jsonPayload = {action: 'getScores'};
			$httpBackend.whenPOST('HighScore.php', jsonPayload, {'Content-Type': 'application/x-www-form-urlencoded'}).respond({"data":[{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},{"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},{"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},{"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},{"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},{"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}],"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"Content-Type":"application/x-www-form-urlencoded","url":"HighScore.php","data":{"action":"getScores"},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"});
	        
	        HighScoreService.getHighScores(jsonPayload).then(function(result) {
	       	  scope.scores = result;
	          expect(scope.scores).toEqual([{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},{"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},{"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},{"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},{"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},{"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}]);
	        });		
		});

		it("should display all high score information in descending order from highest to lowest", function() {

		});
	});
});
