
/* 
	Unit test module for HighScoreController
*/

describe("High Score Controller", function() {
	describe("Retrieve and display high scores", function() {
		beforeEach(module('JHangman'));

		//set up mock controller, scope, backend
		var scope, theController, $httpBackend;
		beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
			scope = $rootScope.$new();
			theController = $controller("HighScoreController", { $scope: scope});
			$httpBackend = _$httpBackend_;
		}));

		it("should display a 'New High Scores!' message", function() {
			$httpBackend.expectPOST('HighScore.php', {score: 10, date: new Date().toString()}, {action: 'updateScores'}, {'Content-Type': 'application/x-www-form-urlencoded'}).respond({"data":[{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},{"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},{"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},{"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},{"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},{"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}],"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"Content-Type":"application/x-www-form-urlencoded","url":"HighScore.php","data":{"action":"getScores"},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"});
			scope.getHighScores();
			expect(scope.notifications).toEqual([{msg: 'New High Scores!', type: 'success'}]);
		});

		it("should fetch up-to-date high score information from the backend upon loading the page", function() {	
			/* set up mock backend JSON response */	
			$httpBackend.expectPOST('HighScore.php', {score: 10, date: new Date().toString()}, {action: 'updateScores'}, {'Content-Type': 'application/x-www-form-urlencoded'}).respond({"data":[{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},{"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},{"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},{"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},{"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},{"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}],"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"Content-Type":"application/x-www-form-urlencoded","url":"HighScore.php","data":{"action":"getScores"},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"});
			scope.getHighScores();
			expect(scope.scores).not.toBeEmpty();
			//expect(scope.scores).toEqual();	
		});

		it("should display up-to-date high score information retrieved from the application backend", function() {

		});

		it("should display all high score information in descending order from highest to lowest", function() {

		});
	});
});
