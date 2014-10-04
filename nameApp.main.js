var app = angular.module('nameApp', []);
app.controller('mainCtrl', function($scope, AddressBookData) {
	
	$scope.addressBook = AddressBookData;

	var blankForm = {
		"name": "",
		"contact": [{ "type": "phone", "address": ""}]
	};
	
	$scope.clearForm = function () {
		$scope.form = angular.copy(blankForm);
	};

	$scope.$on('$viewContentLoaded', $scope.clearForm());

	$scope.addEntry = function () {
			$scope.addressBook.push($scope.form);
			$scope.clearForm();
	};

	$scope.updateEntry = function () {
		var i = $scope.addressBook.indexOf($scope.edit);
		$scope.addressBook[i] = $scope.form;
		$scope.clearForm();
		$scope.edit = null;
	};

	$scope.removeEntry = function (entry) {
		var i = $scope.addressBook.indexOf(entry);
		$scope.addressBook.splice(i, 1);
	};

	$scope.editEntry = function (entry) {
		$scope.form = angular.copy(entry);
		$scope.edit = entry;
	};

	$scope.addAddress = function () {
//		$scope.form.contact.push({"type": "phone", "address": ""});
		$scope.form.contact.push(angular.copy(blankForm.contact[0]));
	};

	$scope.removeAddress = function (contact) {
		var i = $scope.form.contact.indexOf(contact);
		$scope.form.contact.splice(i, 1);
	};
});
