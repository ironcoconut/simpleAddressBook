module.exports = function(Entry) {

	Entry.saveEntry = function (upsertEntry) {

		//Initialize Variables
		var entryName = {};
		var savedEntry = {};

		//Validate Data
		
		//Write this at some point

		//Create Entry from sent data and save

		entryName.name = upsertEntry.name;
		if (upsertEntry.id) {
			entryName.id = upsertEntry.id;
		}

		Entry.update(entryName, function (err, data) {

			// Check each contactInfo for entryId then save

			console.log(JSON.stringify(Entry.app.models));
			data.name = 'woohoo';
			data.create;

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


		//Get saved Entry and Return

		savedEntry = Entry.find({
			where: {id: upsertEntry.id}, 
			include: 'contactInfos'
		});

		return savedEntry;
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
