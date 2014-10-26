
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

		it ("should have been assigned the appropriate page class string", function() {
			expect(scope.pageClass).toBe("page-highscore");
		});		

		it("should display a 'New High Scores!' message", function() {
			expect(scope.notifications).not.toEqual([]);
		});

		it("should display up-to-date high score information retrieved from the application backend upon loading the page", function() {
			var jsonPayload = {action: 'getScores'};
			$httpBackend.whenPOST('HighScore.php', jsonPayload, {'Content-Type': 'application/x-www-form-urlencoded'}).respond({"data":[{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},{"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},{"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},{"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},{"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},{"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}],"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"Content-Type":"application/x-www-form-urlencoded","url":"HighScore.php","data":{"action":"getScores"},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"});
	        HighScoreService.getHighScores(jsonPayload).then(function(result) {
	       	  scope.scores = result;
	          expect(scope.scores).toEqual([{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},{"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},{"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},{"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},{"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},{"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}] );
	        });		

		});

		it ("should sort the high score table by score when the user clicks on 'score' ", function() {

			/* out of order data */
			scope.scores = [{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},
							{"id":"3","scoreDate":"2014-10-23 23:00:40","score":"90"},
							{"id":"2","scoreDate":"2014-10-23 22:20:53","score":"85"},
							{"id":"1","scoreDate":"2014-10-23 22:20:41","score":"81"}];

			/* User clicks on 'score' in the table */
			scope.sortByScore();
			expect(scope.scores).toEqual([{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"}, 
										  {"id":"1","scoreDate":"2014-10-23 22:20:41","score":"81"}, 
										  {"id":"2","scoreDate":"2014-10-23 22:20:53","score":"85"}, 
										  {"id":"3","scoreDate":"2014-10-23 23:00:40","score":"90"}]);

		});

		it ("should sort the high score table by date when the user clicks on 'date' ", function() {		

			/* out of order data */
			scope.scores = [{"id":"6","scoreDate":"2014-10-23 16:20:41","score":"80"},
							{"id":"3","scoreDate":"2014-10-20 23:00:40","score":"90"},
							{"id":"2","scoreDate":"2014-10-21 22:20:53","score":"85"},
							{"id":"1","scoreDate":"2014-10-22 22:20:41","score":"81"}];	

			/* User clicks on 'date' in the table */
			scope.sortByDate();
			expect(scope.scores).toEqual([{"id":"3","scoreDate":"2014-10-20 23:00:40","score":"90"}, 
										  {"id":"2","scoreDate":"2014-10-21 22:20:53","score":"85"}, 
										  {"id":"1","scoreDate":"2014-10-22 22:20:41","score":"81"}, 
										  {"id":"6","scoreDate":"2014-10-23 16:20:41","score":"80"}]);
		});		
	});
});
