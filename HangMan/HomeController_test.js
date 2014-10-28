/* 
    Unit test module for HomeController 
*/

describe("Tree menu functionality", function() {
    
    var scope, theController;
    beforeEach(module('JHangman'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        theController = $controller("HomeController", { $scope: scope });
    }));

    describe("A user clicks on a category in an non-expanded menu", function() {

        Given("no categories are currently expanded", function() {
            angular.forEach(scope.treeCategories, function(treeCategory) {
                treeCategory.activeSubCategories = [];
            });         
        });

        When("a user clicks on a category", function() {
            scope.onClick(1);
        });

        Then("it should be in an expanded state", function() {
            expect(scope.expanded).toBe(true);
            expect(scope.treeCategories[1].activeSubCategories).toContain(
                {name: 'Start New Game', link: '#hangman', dataTarget: "", toggle: ""}, 
                {name: 'Resume Previous Game', link: '#', dataTarget: "#gameModal", toggle: "modal"}
            );            
        });
    });
    
    describe("A user clicks on a non-expanded category while another category is already opened", function() {

        Given("A menu is in an open state", function() {
            scope.onClick(1);
        });

        When("A user clicks on a DIFFERENT category in the tree", function() {
            scope.onClick(2);
        });

        Then("The initial tree submenu should be closed", function() {
            expect(scope.treeCategories[1].activeSubCategories).toEqual([]);
            expect(scope.treeCategories[2].activeSubCategories).toEqual([
                {name: 'High Scores', link: '#highscore', dataTarget: "#", toggle: ""}, 
                {name: 'Other Stats', link: '#', dataTarget: "#", toggle: ""}
            ]);            
        });
    });

    describe("A user clicks on an already-expanded menu category", function() {
        
        Given("a submenu is already opened", function() {   
            scope.onClick(2);
        });

        When("the user clicks on the opened submenu submenu", function() {
            scope.onClick(2);
        });

        Then("the submenu should close", function() {
            expect(scope.treeCategories[2].activeSubCategories).toEqual([]);
        });        
    });
});