angular.module('nameApp', ['ngRoute', 'lbServices'])
.controller('mainCtrl', function($scope, AddressBookData, Entry, ContactInfo) {
	
// Get the entries data from our service. 

	$scope.entries = Entry.find({
		filter: {
			include: 'contactInfos'	
		}
		});

// Blank form for initializing the address form and resetting it after an add/edit

	var blankForm = {
		"name": "",
		"contactInfos": [{ "type": "email", "value": ""}, { "type": "phone", "value": ""}]
	};
	
	$scope.clearForm = function () {
		$scope.form = angular.copy(blankForm);
		$scope.edit = null; // edit holds the original copy of the entry being edited
	};

	$scope.$on('$viewContentLoaded', $scope.clearForm());

	$scope.addEntry = function () {
			Entry.create($scope.form);
			$scope.entries.push($scope.form);
			$scope.clearForm();
	};

// updateEntry actually updates the entry in the addressbook and resets the form

	$scope.updateEntry = function () {
		Entry.upsert($scope.form);
//		ContactInfo.upsert($scope.form.contactInfos[0]);
		for (i = 0; i < $scope.form.contactInfos.length; i++) {
			ContactInfo.upsert($scope.form.contactInfos[i]);
		}
		var i = $scope.entries.indexOf($scope.edit);
		$scope.entries[i] = $scope.form;
		$scope.clearForm();
	};

	$scope.removeEntry = function (entry) {
		Entry.deleteById(entry);
		var i = $scope.entries.indexOf(entry);
		$scope.entries.splice(i, 1);
	};

// editEntry sets up the form for editing an entry but does not save any changes to the addressbook

	$scope.editEntry = function (entry) {
		$scope.form = angular.copy(entry);
		$scope.edit = entry;
	};

// Address as used in the functions below refers to the contact methods (phone, email) of an entry

	$scope.addContactValue= function () {
		$scope.form.contactInfos.push(angular.copy(blankForm.contactInfos[0]));
	};

	$scope.removeContactValue = function (contact) {
		var i = $scope.form.contactInfos.indexOf(contact);
		$scope.form.contactInfos.splice(i, 1);
	};

});
