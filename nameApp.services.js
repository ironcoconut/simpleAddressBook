angular.module('nameApp')
	.service('AddressBookData', function () {
		var addresses = [{ 
				"name": "Joe",
				"contact": [
				{	"type": "email",
					"address": "joe@joe.com"
				},
				{	"type": "phone",
					"address": "832-555-5555"
				}
				]
			},
			{
				"name": "Bob",
				"contact": [
				{	"type": "email",
					"address": "bob@bob.com"
				},
				{	"type": "phone",
					"address": "713-555-5555"
				}
				]
			},
			{
				"name": "May",
				"contact": [
				{	"type": "email",
					"address": "may@may.com"
				},
				{	"type": "phone",
					"address": "713-555-5555"
				}
				]
			}
		];
		return addresses;
	});
