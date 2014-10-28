
/* 
    Unit test module for HighScoreController

    CS-1699 project 3
    Tyler Raborn & Liz Davis
*/

describe("High score table functionality", function() {
    var scope, theController, $httpBackend, $http, HighScoreService;
    beforeEach(module('JHangman'));

    //set up mock controller, scope, backend
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _$http_, _HighScoreService_) {
        HighScoreService = _HighScoreService_;
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        theController = $controller("HighScoreController", { $scope: scope});
        $http = _$http_;
        var jsonPayload = {action: 'getScores'};
        $httpBackend.whenPOST('HighScore.php', jsonPayload, {'Content-Type': 'application/x-www-form-urlencoded'}).respond({"data":[
            {"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},
            {"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},
            {"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},
            {"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},
            {"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},
            {"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}],
            "status":200,
            "config": {
                "method":"POST",
                "transformRequest":[null],
                "transformResponse":[null],
                "Content-Type":"application/x-www-form-urlencoded",
                "url":"HighScore.php",
                "data":{"action":"getScores"},
                "headers":{
                    "Accept":"application/json, text/plain, */*",
                    "Content-Type":"application/json;charset=utf-8"
                }
            },
            "statusText":"OK"
        });
    }));

    describe("the user visits the high score page for the first time", function() {
        Given("the user has not yet visited the high scores page", function() {
            scope.scores = [];
        });

        When("the user visits the High Scores page", function() {
            var jsonPayload = {action: 'getScores'};
            HighScoreService.getHighScores(jsonPayload).then(function(result) {
              scope.scores = result;
            });                     
            scope.scores = [
                {"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},
                {"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},
                {"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},
                {"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},
                {"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},
                {"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}
            ];
        });

        Then("the high scores table should be populated with data retrieved from the application backend", function() {
            expect(scope.scores).toEqual([
                {"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},
                {"id":"3","scoreDate":"2014-10-23 23:00:40","score":"15"},
                {"id":"2","scoreDate":"2014-10-23 22:20:53","score":"11"},
                {"id":"1","scoreDate":"2014-10-23 22:20:41","score":"10"},
                {"id":"4","scoreDate":"2014-10-25 16:17:34","score":"0"},
                {"id":"5","scoreDate":"2014-10-25 16:18:51","score":"0"}
            ]);
        });         
    });

    describe("the high scores are updated after the user returns to the high scores page", function() {
        Given("the high scores page has not been updated yet", function() {
            scope.notifications = [];
            scope.scores = [];
        });

        When("the user visits the high score page", function() {
            scope.getHighScores();
        });

        Then("the appropriate message should be displayed to the user", function() {
            expect(scope.notifications).toContain({msg: 'New High Scores!', type: 'success'});
        });        
    });

    describe("the user sorts the high score table by score", function() {

        Given("The data in the table is not sorted by score", function() {
            scope.scores = [{"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"},
                            {"id":"3","scoreDate":"2014-10-23 23:00:40","score":"90"},
                            {"id":"2","scoreDate":"2014-10-23 22:20:53","score":"85"},
                            {"id":"1","scoreDate":"2014-10-23 22:20:41","score":"81"}];
        });

        When("the user clicks on 'score' in the table header", function() {
            scope.sortByScore();
        });

        Then("the data should be properly sorted by score", function() {
            expect(scope.scores).toEqual([
                {"id":"6","scoreDate":"2014-10-25 16:20:41","score":"80"}, 
                {"id":"1","scoreDate":"2014-10-23 22:20:41","score":"81"}, 
                {"id":"2","scoreDate":"2014-10-23 22:20:53","score":"85"}, 
                {"id":"3","scoreDate":"2014-10-23 23:00:40","score":"90"}
            ]);         
        });
    });

    describe("the user sorts the high score table by date", function() {

        /* #1 */
        Given("the data in the table is not sorted by date", function()  {
            scope.scores = [{"id":"6","scoreDate":"2014-10-23 16:20:41","score":"80"},
                            {"id":"3","scoreDate":"2014-10-20 23:00:40","score":"90"},
                            {"id":"2","scoreDate":"2014-10-21 22:20:53","score":"85"},
                            {"id":"1","scoreDate":"2014-10-22 22:20:41","score":"81"}];             
        });

        When("the user clicks on 'date' in the table header", function() {
            scope.sortByDate();
        });

        Then("the data should be sorted by date", function() {
            expect(scope.scores).toEqual([
                {"id":"3","scoreDate":"2014-10-20 23:00:40","score":"90"}, 
                {"id":"2","scoreDate":"2014-10-21 22:20:53","score":"85"}, 
                {"id":"1","scoreDate":"2014-10-22 22:20:41","score":"81"}, 
                {"id":"6","scoreDate":"2014-10-23 16:20:41","score":"80"}
            ]);                 
        });
    });
});
