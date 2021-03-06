
/*
 *  CS-1699 Project 3
 *  Written by Tyler Raborn
 *  Tested by Liz Davis and Tyler Raborn
 */

//angular.module('ModalControl', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])

angular.module( 'JHangman', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])

    .config(function($routeProvider) {
      $routeProvider
      .when('/', {templateUrl: 'page-home.html', controller: 'HomeController'})
      .when('/highscore', {templateUrl: 'page-highscore.html', controller: 'HighScoreController'})
      .when('/hangman', {templateUrl: 'page-hangman.html', controller: 'HangmanController'})
      ;
    })

    .controller('HighScoreController', ['$scope', '$http', '$log', 'HighScoreService', function HighScoreController($scope, $http, $log, HighScoreService) {
      $scope.pageClass='page-highscore';
      $scope.notifications = [];
      $scope.scores = [];   

      $scope.getHighScores = function() {
        $scope.notifications.push({msg: 'New High Scores!', type: 'success'});
        var jsonPayload = {action: 'getScores'};
        HighScoreService.getHighScores(jsonPayload).then(function(scores) {
          $scope.scores = scores;
          $log.info("scores: " + JSON.stringify(scores));
        });

      };

      /* fetch high score data from backend */
      $scope.getHighScores();      

      $scope.closeNotification = function(index) {
          $scope.notifications.splice(index, 1);
      };        

      $scope.sorted = {};
      $scope.sorted["score"] = false;
      $scope.sorted["date"] = false;

      $scope.sortByDate = function() {
        $scope.scores = ($scope.sorted['date']) ? reverseSortByKey($scope.scores, 'scoreDate') : sortByKey($scope.scores, 'scoreDate');
        $scope.sorted["date"] = ($scope.sorted["date"]) ? false : true;
      };

      $scope.sortByScore = function() {
        $scope.scores = ($scope.sorted['score']) ? reverseSortByKey($scope.scores, 'score') : sortByKey($scope.scores, 'score');
        $scope.sorted["score"] = ($scope.sorted["score"]) ? false : true;
      };      

      function sortByKey(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }

      function reverseSortByKey(array, key) {
        return array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
      }
  }])

    .controller('HangmanController', ['$scope', '$http', '$log', '$modal', '$rootScope', '$location', function HangmanController($scope, $http, $log, $modal, $rootScope, $location) {
      
      $scope.pageClass='page-hangman';
      $scope.theWord = " ";
      $scope.letters = []; //an array containing each of the letters of the word.
      $scope.guessed = {};
      $scope.succesfulGuesses = 0;
      $scope.notifications = [];
      $scope.words = []; //for ensuring no duplicates IN A SINGLE ROUND. Duplicates arent checked for in between restarts obviously.

      $scope.globalScore = 0;
      $scope.totalGuesses = 0;
      $scope.incorrectGuesses = 0;
      $scope.started = true;
      $scope.showWord = false;
      $scope.totalRounds = 0;
      $scope.roundsWon = 0;

      $scope.divList = [];
      $scope.master = {};
      $scope.guessedList = [];
      $scope.guessedWord = "";

      $scope.notifications.push({msg: 'Welcome!', type: 'success'});

      //check for event emitted by external modal window controller function, use this to trigger next word
      $rootScope.$on('modalResult', function(result) {$scope.giveUp(); $scope.startNewRound()});

      $scope.startNewRound = function() {
        $scope.notifications.push({msg: 'New round has begun!', type: 'success'});
        $scope.started = false;
        $http.post('Hangman.php', {action: 'getNewWord'}, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function(response) {
          
          //check if word has already been used or if words are done...
          if ($scope.words.length === 39) {
            $scope.notifications.push({msg: 'Congratulations, you won!', type: 'success'});
            return;
          }

          if ($scope.words.indexOf(response.data[0][0]) != -1) {
            $scope.reset();
            return;
          }

          $scope.theWord = response.data[0][0];
          $log.info("The word is: " + $scope.theWord);

          $scope.divList = new Array($scope.theWord.length);
          for (var i = 0; i < $scope.theWord.length; i++) {
            $scope.divList[i] = false; //initialize div colors...
            $scope.letters.push({
                name: $scope.theWord.charAt(i), 
                display: '?',
                guessed: false,
                guesses: 0,
                id: i
            });
          }
          $scope.guessed.letters = new Array($scope.theWord.length);
        });
      };

      $scope.guess = function(id) {
        if (!$scope.guessed.letters[id]) {
          return;
        }
        //ensure letter has not already been guessed:
        if ($scope.guessedList.indexOf($scope.guessed.letters[id]) != -1) {
          $scope.guessed.letters[id] = ''; //clear if already guessed
          $scope.notifications.push({msg: 'You already guessed that letter!', type: 'failure'});
          return;
        }
        if ($scope.guessed.letters[id].length > 1) {
          return;
        }

        $scope.guessedList.push(angular.copy($scope.guessed.letters[id])); //add to global list of guessed letters
        $log.info("guessing letter # " + id + " of word " + $scope.theWord);
        var shouldBeCleared = false;

        angular.forEach($scope.letters, function(obj) {
          $log.info("Checking if " + $scope.guessed.letters[id] + " is equal to " + obj.name);
          if (obj.name.localeCompare($scope.guessed.letters[id]) === 0) {
            $scope.divList[obj.id] = true;
            $scope.guessed.letters[obj.id] = angular.copy($scope.guessed.letters[id]);
            $scope.letters[obj.id].display = angular.copy($scope.guessed.letters[id]);
            $scope.letters[obj.id].guessed = true;
            //$scope.letters[obj.id].guesses+=1;
            if (obj.id !== id) $scope.succesfulGuesses+=1;
          }

          if (obj.id === id) {
            obj.guesses+=1;
            $log.info("comparing " + $scope.guessed.letters[id] + " to " + obj.name);
            if ($scope.guessed.letters[id].localeCompare(obj.name) == 0) {
              $log.info("succesful guess of letter " + $scope.guessed.letters[id] + " in " + $scope.theWord);
              obj.display = obj.name;
              obj.guessed = true;
              $scope.succesfulGuesses+=1;
              $scope.divList[id] = true;
            }
            else {
              $scope.incorrectGuesses+=1;
              shouldBeCleared = true;
            }
          }
        });

        if (shouldBeCleared) {
          $scope.guessed.letters[id] = ''; //clear guessed only if incorrect; else leave it
        }

        $scope.totalGuesses+=1;
        if ($scope.incorrectGuesses === 7) {
          $scope.totalRounds+=1;
          $scope.notifications = [];
          $scope.notifications.push({msg: 'You lose! The word was ' + $scope.theWord, type: 'danger'});
          $scope.reset();
          $scope.globalScore = 0;
          //$scope.startNewRound();
        }
        else if ($scope.succesfulGuesses === $scope.theWord.length) {
          $scope.roundsWon+=1;
          $scope.totalRounds+=1;
          $scope.notifications = [];
          var winningPercentage = $scope.roundsWon / $scope.totalRounds;

          $scope.notifications.push({msg: 'Congratulations, you guessed the word! Winning Percentage: ' + winningPercentage + '\nTotal Rounds Played: ' + $scope.totalRounds + '\nTotal Rounds Won: ' + $scope.roundsWon, type: 'success'});
          
          /* update backend w/ latest high scores */
          var jsonPayload = {score: $scope.globalScore, date: new Date().toString(), action: 'updateScores'};
          $http.post('HighScore.php', jsonPayload, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function(response) {
            $log.info("JSON Result from HighScore.php: " + JSON.stringify(response));
            $scope.notifications.push({msg: 'High score has been updated!', type: 'success'});
          });

          $scope.globalScore+=(10*(8-$scope.incorrectGuesses)); //UPDATE SCORE!
          $scope.reset();
        }
      };

      $scope.closeNotification = function(index) {
          $scope.notifications.splice(index, 1);
      };  

      $scope.giveUp = function() {
        $scope.showWord = true;
        $scope.theWord = '';
        $scope.letters.length = 0; 
        $scope.guessed = angular.copy($scope.master);
        $scope.succesfulGuesses = 0;
        $scope.incorrectGuesses = 0;
        $scope.globalScore = 0;
        $scope.totalGuesses = 0; 
        $scope.guessedList = [];       
      };

      $scope.reset = function() {
        $scope.words.length = 0;
        $scope.guessedList = [];
        $scope.showWord = false;
        $scope.theWord = '';
        $scope.letters.length = 0; 
        $scope.guessed = angular.copy($scope.master);
        $scope.succesfulGuesses = 0;
        $scope.incorrectGuesses = 0;
        $scope.totalGuesses = 0;
        $scope.startNewRound();
        $scope.notifications = [];
        };    

        $scope.guessWord = function() {

          if (angular.equals($scope.guessedWord, "") || $scope.guessedWord.length > 31) {
            return;
          }

          $scope.totalGuesses+=1;
          if (angular.equals($scope.guessedWord, $scope.theWord)) {
            $scope.roundsWon+=1;
            $scope.totalRounds+=1;
            $scope.notifications = [];
            var winningPercentage = $scope.roundsWon / $scope.totalRounds;
            $scope.notifications.push({msg: 'Congratulations, you guessed the word! Winning Percentage: ' + winningPercentage + '\nTotal Rounds Played: ' + $scope.totalRounds + '\nTotal Rounds Won: ' + $scope.roundsWon, type: 'success'});
            
            /* update backend w/ latest high scores */
            var jsonPayload = {score: $scope.globalScore, date: new Date().toString(), action: 'updateScores'};
            $http.post('HighScore.php', jsonPayload, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function(response) {
              $log.info("JSON Result from HighScore.php: " + JSON.stringify(response));
              $scope.notifications.push({msg: 'High score has been updated!', type: 'success'});
            });

            $scope.globalScore+=(10*(8-$scope.incorrectGuesses)); //UPDATE SCORE!
            $scope.reset();          

          }
          else {
            $scope.totalRounds+=1;
            $scope.notifications = [];
            $scope.notifications.push({msg: 'You lose! The word was ' + $scope.theWord, type: 'danger'});
            $scope.reset();
            $scope.globalScore = 0;
          }

          $scope.guessedWord = "";
        };   
    }])

    /*
      Controller module for the homepage/main menu. Handles functionality of the menu system. 
    */
    .controller('HomeController', ['$scope', '$log', function HomeController($scope, $log) {
      $scope.pageClass='page-home';
      
      $scope.treeCategories = [
                                {id: 0, name: 'User', subCategories: [{name: 'Login', link: '#', dataTarget: "#", toggle: ""}, {name: 'Register', link: '#', dataTarget: '#userRegistrationModal', toggle: "modal"}], activeSubCategories: []}, 
                                {id: 1, name: 'Game', subCategories: [{name: 'Start New Game', link: '#hangman', dataTarget: "", toggle: ""}, {name: 'Resume Previous Game', link: '#', dataTarget: "#gameModal", toggle: "modal"}], activeSubCategories: []}, 
                                {id: 2, name: 'High Scores & Achievements', subCategories: [{name: 'High Scores', link: '#highscore', dataTarget: "#", toggle: ""}, {name: 'Other Stats', link: '#', dataTarget: "#", toggle: ""}], activeSubCategories: []},
                                {id: 3, name: 'About', subCategories: [{name: 'Technical', link: 'https://angularjs.org/', dataTarget: "#", toggle: ""}, {name: 'Legal', link: '#', dataTarget: "#", toggle: ""}], activeSubCategories: []}
                              ];

      //$scope.pageClass = 'index';
      $scope.subCategories = [];
      $scope.curNode = -1;
      $scope.expanded = false;

      $log.info("page name is " + $(document).find("title").text());

      $scope.onClick = function(nodeId) {

        if ($scope.expanded) {
          if ($scope.curNode === nodeId) {
            $scope.curNode = -1;
            $scope.expanded = false;

            while($scope.treeCategories[nodeId].activeSubCategories.length > 0) {
                $scope.treeCategories[nodeId].activeSubCategories.pop();
            }                
          }
          else { 
            //else a new menu is being clicked on. this is allowed. FIRST close current menu
            while($scope.treeCategories[$scope.curNode].activeSubCategories.length > 0) {
                $scope.treeCategories[$scope.curNode].activeSubCategories.pop();
            }

            //NOW open new menu:    
            $scope.curNode = nodeId;
            angular.forEach($scope.treeCategories[nodeId].subCategories, function(category) {
              var subCategory = angular.copy(category);
              $scope.treeCategories[nodeId].activeSubCategories.push(subCategory);
            });                             
          }
        }
        else {
          $scope.curNode = nodeId;
          $scope.expanded = true;

          angular.forEach($scope.treeCategories[nodeId].subCategories, function(category) {
            var subCategory = angular.copy(category);
            $scope.treeCategories[nodeId].activeSubCategories.push(subCategory);
          });     
        }
      };

    }])

  ;

  //controller for launching modal window
  var ModalController = function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'modalContent.html',
      controller: ModalInstanceController,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

//controller for modal window instance
var ModalInstanceController = function ($scope, $modalInstance, items, $rootScope) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $rootScope.$emit('modalResult', true);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
