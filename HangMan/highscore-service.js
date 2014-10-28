/*
 *  CS-1699 Project 3
 *  Written by Tyler Raborn
 *  Tested by Liz Davis and Tyler Raborn
 */

angular.module('JHangman')

.service("HighScoreService", ['$http', '$log', function HighScoreService($http, $log) {
	this.getHighScores = function(postParams) {
        return $http.post('HighScore.php', postParams, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function(response) {
          
          var ret = [];
          $log.info("JSON Result from HighScore.php: " + JSON.stringify(response));

          angular.forEach(response.data, function(dataRow) {
            ret.push(dataRow);
          });

          return ret;
        });  
	};	
}])

;