So this is not going to work at all with MongoDB.

The issue is that when MongoDB is connected as you datasource, the ability to access methods does not exist. If you use the default connector ('db'), the functionality works but is still limited, ie, there is no upsert method on the related models, just exists, findByID, create, basic CRUD.

The other way to do it would be to incorporate all the elements in a single mongo document and run the validations on server side. This incorporates less will with loopback as you cannot use the built in validations on sub-objects, as far as I know at least.

Oh well.

This branch is abandoned as a result of this discovery.
