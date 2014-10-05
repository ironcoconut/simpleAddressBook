var app = angular.module('nameApp', []);
app.controller('mainCtrl', function($scope, AddressBookData, Entry) {
	
// Get the addressbook data from our service. Maybe I'll add a loopback server underneath?

	$scope.addressBook = AddressBookData;

// Blank form for initializing the address form and resetting it after an add/edit

	var blankForm = {
		"name": "",
		"contact": [{ "type": "phone", "address": ""}]
	};
	
	$scope.clearForm = function () {
		$scope.form = angular.copy(blankForm);
		$scope.edit = null; // edit holds the original copy of the entry being edited
	};

	$scope.$on('$viewContentLoaded', $scope.clearForm());

	$scope.addEntry = function () {
			$scope.addressBook.push($scope.form);
			$scope.clearForm();
	};

// updateEntry actually updates the entry in the addressbook and resets the form

	$scope.updateEntry = function () {
		var i = $scope.addressBook.indexOf($scope.edit);
		$scope.addressBook[i] = $scope.form;
		$scope.clearForm();
	};

	$scope.removeEntry = function (entry) {
		var i = $scope.addressBook.indexOf(entry);
		$scope.addressBook.splice(i, 1);
	};

// editEntry sets up the form for editing an entry but does not save any changes to the addressbook

	$scope.editEntry = function (entry) {
		$scope.form = angular.copy(entry);
		$scope.edit = entry;
	};

// Address as used in the functions below refers to the contact methods (phone, email) of an entry

	$scope.addAddress = function () {
		$scope.form.contact.push(angular.copy(blankForm.contact[0]));
	};

	$scope.removeAddress = function (contact) {
		var i = $scope.form.contact.indexOf(contact);
		$scope.form.contact.splice(i, 1);
	};
});
