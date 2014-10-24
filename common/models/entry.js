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

		console.log(JSON.stringify(upsertEntry));
		console.log(contactInfos);
/*		if (upsertEntry.id) {
			entryName.id = upsertEntry.id;
		}
*/

		Entry.upsert(entryName, function (err, data) {

			// Check each contactInfo for entryId then save

			data.updateOrCreate();

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
