describe("Home Controller", function() {
	
	var scope, theController;
	beforeEach(module('JHangman'));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		theController = $controller("HomeController", { $scope: scope });
	}));

	describe("Tree menu functionality when menus are in an closed state", function() {


		/* #1 */
		Given("no categories are currently expanded", function() {
			angular.forEach(scope.treeCategories, function(treeCategory) {
				treeCategory.activeSubCategories = [];
			});			
		});

		When("a user clicks on a category", function() {
			scope.onClick(0);
		});

		Then("it should expand to reveal its subcategories", function() {
			expect(scope.expanded).toBe(true);
		});


		/* #2 */
		Given("no categories are currently expanded", function() {
			angular.forEach(scope.treeCategories, function(treeCategory) {
				treeCategory.activeSubCategories = [];
			});			
		});

		When("a user clicks on a category", function() {
			scope.onClick(1);
		});

		Then("it shall reveal the appropriate subcategories for that category", function() {
			expect(scope.treeCategories[1].activeSubCategories).toContain(
				{name: 'Start New Game', link: '#hangman', dataTarget: "", toggle: ""}, 
				{name: 'Resume Previous Game', link: '#', dataTarget: "#gameModal", toggle: "modal"}
			);
		});
	});
	
	describe("Tree menu functionality when menus are in an already-opened state", function() {


		/* #1 */
		Given("A menu is in an open state", function() {
			scope.onClick(1);
		});

		When("A user clicks on a DIFFERENT category in the tree", function() {
			scope.onClick(0);
		});

		Then("The initial tree submenu should be closed", function() {
			expect(scope.treeCategories[1].activeSubCategories).toEqual([]);
		});


		/* #2 */
		Given("A menu is in an open state", function() {		
			scope.onClick(3);
		});

		When("A user clicks on a DIFFERENT category in the tree then is already open", function() {
			scope.onClick(2);
		});

		Then("it should display the newly clicked-on category's subcategories", function() {
			expect(scope.treeCategories[2].activeSubCategories).toEqual([
				{name: 'High Scores', link: '#highscore', dataTarget: "#", toggle: ""}, 
				{name: 'Other Stats', link: '#', dataTarget: "#", toggle: ""}
			]);
		});
		

		/* #3 */
		/*
		Given("a submenu is already opened", function() {	
			scope.onClick(2);
		});

		When("the user clicks on the opened submenu submenu", function() {
			scope.onClick(2);
		});

		Then("the submenu should close", function() {
			expect(scope.treeCategories[2].activeSubCategories).toEqual([]);
		});
		*/
	});
});