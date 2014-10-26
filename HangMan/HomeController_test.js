describe("Home Controller", function() {
	describe("Main menu functionality", function() {
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

		it ("should display the appropriate subcategories when a category is clicked", function() {
			
			/* display submenus */
			scope.onClick(1);
			expect(scope.expanded).toBe(true);
			expect(scope.treeCategories[1].subCategories).toContain({name: 'Start New Game', link: '#hangman', dataTarget: "", toggle: ""}, {name: 'Resume Previous Game', link: '#', dataTarget: "#gameModal", toggle: "modal"});
		});

		it ("should close an already-opened set of subcategories when another category is clicked", function() {

			/* click on "Game" category */
			scope.onClick(1);
			expect(scope.expanded).toBe(true);
			expect(scope.treeCategories[1].activeSubCategories).toContain({name: 'Start New Game', link: '#hangman', dataTarget: "", toggle: ""}, {name: 'Resume Previous Game', link: '#', dataTarget: "#gameModal", toggle: "modal"});

			/* click on "User" category */
			scope.onClick(0);

			/* verify "Game" submenumenu is closed */
			expect(scope.treeCategories[1].activeSubCategories).toEqual([]);			
		});


		it ("should display a newly clicked-on button's subcategories after it closes an already-opened submenu's subcategories", function() {
			
			/* click on "Game" category */
			scope.onClick(1);
			expect(scope.expanded).toBe(true);
			expect(scope.treeCategories[1].activeSubCategories).toContain({name: 'Start New Game', link: '#hangman', dataTarget: "", toggle: ""}, {name: 'Resume Previous Game', link: '#', dataTarget: "#gameModal", toggle: "modal"});

			/* click on "User" category */
			scope.onClick(0);
			expect(scope.treeCategories[1].activeSubCategories).toEqual([]);			
			
			/* verify "User" submenumenu is displayed */
			expect(scope.treeCategories[0].activeSubCategories).toContain({name: 'Login', link: '#', dataTarget: "#", toggle: ""}, {name: 'Register', link: '#', dataTarget: '#userRegistrationModal', toggle: "modal"});
		});
			
	});
});