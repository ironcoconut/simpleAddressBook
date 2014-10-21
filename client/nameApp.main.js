angular.module('nameApp', ['ngRoute', 'lbServices'])
.controller('mainCtrl', function($scope, AddressBookData, Entry, ContactInfo) {

 /*****************
 * Initialization *
 *****************/

// Get the entries data from our service. 

	$scope.getEntries = function () {
		Entry
			.find({
				filter: {
					include: 'contactInfos'	
					}
				})
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
		"contactInfos": [{ "type": "email", "value": ""}, { "type": "phone", "value": ""}]
	};
	
	$scope.clearForm = function () {
		$scope.form = angular.copy(blankForm);
		$scope.edit = false; 
		$scope.form.removedContactInfos = [];
	};

// Load blank form once page is loaded

	$scope.$on('$viewContentLoaded', $scope.getEntries() );

 /*************
 * Create New *
 *************/

// Add New Entry

	$scope.addEntry = function () {
		Entry
			.create($scope.form)
			.$promise
			.then(function(newEntry) {
				$scope.entries.push(newEntry);
				$scope.clearForm();
			});
	};

// Add New Contact to Form

	$scope.addContactValue= function () {
		$scope.form.contactInfos.push(angular.copy(blankForm.contactInfos[0]));
	};

 /*************
 * Edit Entry *
 *************/

// editEntry sets up the form for editing an entry but does not save changes
	
	$scope.editEntry = function (entry) {
		$scope.form = angular.copy(entry);
		if ($scope.form.contactInfos === null) {
			$scope.form.contactInfos = [];
		};
		$scope.form.removedContactInfos = [];
		$scope.edit = true;
	};

// updateEntry actually updates the entry in the addressbook and resets the form
 
// NOTE: THIS IS CURRENTLY NOT IMPLEMENTED IN THE API

	$scope.updateEntry = function () {
		Entry
			.upsert($scope.form)
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

// Delete Contact Info From Form 

	$scope.removeContactValue = function (contact) {
		var i = $scope.form.contactInfos.indexOf(contact);
		if ($scope.form.contactInfos[i].id) {
			$scope.form.removedContactInfos.push($scope.form.contactInfos[i]);
		};
		$scope.form.contactInfos.splice(i, 1);
	};

});
