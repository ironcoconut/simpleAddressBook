module.exports = function(Entry) {

	Entry.saveEntry = function (upsertEntry, cb) {

		//Initialize Variables
		var entryName = {};
		var savedEntry = {};
		var contactInfos = [];

		//Validate Data
		
		//Write this at some point

		//Create Entry from sent data and save

		entryName.id = upsertEntry.id;
		entryName.name = upsertEntry.name;
		contactInfos = upsertEntry.contactInfos;
		removedContactInfos = upsertEntry.removedContactInfos;

/*		if (upsertEntry.id) {
			entryName.id = upsertEntry.id;
		}
*/

		Entry.upsert(entryName, function (err, data) {
			console.log(data.contactInfos);
			savedEntry = data;
			savedEntry.contactInfos = [];
			savedEntry.removedContactInfos = [];

			if (contactInfos) {
				contactInfos.forEach(function(entry) {
					data.contactInfos.upsert(entry, function(e, d) {
						savedEntry.contactInfos.push(d);
					});
				});
			}

			if (removedContactInfos) {
				removedContactInfos.forEach(function(entry) {
					data.contactInfos.destroyById(entry.id);
				});
			};

			// Check each contactInfo for entryId then save
			console.log(savedEntry);


/*			data.contactInfo.upsert(contactInfos, function (e, d) {
				savedEntry.contactinfos = d;
			});
*/
			cb(null, savedEntry);

/*			data.contactInfo.upsert({
				type: "email",
				value: "test@email.com",
				entryId: 1
			}, function (e, d) {
				if (e) {
					console.log(e);
				} else {
					console.log(d);
				};
			});
/*			upsertEntry.contactInfos.forEach(function (info, i) {
				if(!info.entryId) {
					upsertEntry.contactInfos[i].entryId = upsertEntry.id;
				};
				data.contactInfos.upsert(info);
			});
*/		});
	};

	Entry.remoteMethod(
		'saveEntry',
		{
			accepts: {
				arg: 'upsertEntry',
				type: 'object'
			},
			returns: {arg: 'savedEntry', type: 'object'}
		}
	);
};
