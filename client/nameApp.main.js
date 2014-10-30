angular.module('nameApp', ['ngRoute', 'lbServices'])
.controller('mainCtrl', function($scope, AddressBookData, Entry) {

 /*****************
 * Initialization *
 *****************/

// Get the entries data from our service. 

	$scope.getEntries = function () {
		Entry
			.find()
			.$promise
			.then(function (entries) {
					$scope.entries = entries;
					$scope.clearForm();
				}, function (error) {
					alert(error);
				});
	}


// Blank form for initializing the address form and resetting it after an add/edit

	var blankForm = {
		"name": "",
		"contactInfos": [{ "type": "email", "value": ""}, { "type": "phone", "value": ""}],
		"removedContactInfos": []
	};
	
	$scope.clearForm = function () {
		$scope.form = angular.copy(blankForm);
		$scope.edit = false; 
	};

// Load blank form once page is loaded

	$scope.$on('$viewContentLoaded', $scope.getEntries());

 /*************
 * Create New *
 *************/

// Add New Entry

	$scope.addEntry = function () {
		var entry = {
			name: $scope.form.name,
			contactInfos: $scope.form.contactInfos
		};
 
		Entry
			.create(entry)
			.$promise
			.then(function(newEntry) {
				$scope.entries.push(newEntry);
				$scope.clearForm();
			});
	};

// Add New contactInfo to Form

	$scope.addContactValue= function () {
		$scope.form.contactInfos.push(angular.copy(blankForm.contactInfos[0]));
	};

 /*************
 * Edit Entry *
 *************/

// editEntry sets up the form for editing an entry but does not save changes
	
	$scope.editEntry = function (entry) {
		$scope.form = angular.copy(entry);
		if (!$scope.form.contactInfos) {
			$scope.form.contactInfos = [];
		};
		$scope.form.removedContactInfos = [];
		$scope.edit = true;
	};

// updateEntry actually updates the entry in the addressbook and resets the form

	$scope.updateEntry = function () {
		var entry = {
			id: $scope.form.id,
			name: $scope.form.name,
			contactInfos: $scope.form.contactInfos
		};

		Entry
			.upsert(entry)
			.$promise
			.then(function (updatedEntry) {
				$scope.entries.forEach(function (entry) {
					if (entry.id === updatedEntry.id) {
						var i = $scope.entries.indexOf(entry);
						$scope.entries[i] = updatedEntry;
					};
				});
				$scope.clearForm();
			});
	};

 /*********
 * Delete *
 **********/

// Delete Entry

	$scope.removeEntry = function (entry) {
		Entry
			.deleteById(entry)
			.$promise
			.then(function () {
				var i = $scope.entries.indexOf(entry);
				$scope.entries.splice(i, 1);
			});
	};

// Delete contactInfo From Form 

	$scope.removeContactValue = function (contact) {
		var i = $scope.form.contactInfos.indexOf(contact);
		if ($scope.form.contactInfos[i].value) {
			$scope.form.removedContactInfos.push($scope.form.contactInfos[i]);
		};
		$scope.form.contactInfos.splice(i, 1);
	};

});
