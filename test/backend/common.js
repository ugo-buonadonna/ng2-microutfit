/**
 * Created by ugo on 05/11/16.
 */

"use strict";
module.exports = (function (global) {
    //console.log(typeof global);
})(global);





////
//[person,outfit,garment],[2,2,2],['people','outfits','garments']

/*



 users.fill()
 .map(x => PersonModel.upsert(
 {firstName: faker.name.firstName(),
 email: faker.internet.email(),
 password: faker.internet.password()}))
 .map(person => {
 person.outfits = [];
 let learningUnits = new Array(outfits_per_person);
 learningUnits.fill()
 .map(_ =>  OutfitModel.upsert({name: faker.lorem.word()}))
 .map(lu => {
 person.outfits.push(lu._id);
 savePromises.push(PersonModel.upser({id: person.id, outfits:}));
 });
 savePromises.push(user.save());
 });

 Promise.all(savePromises).then(saved => {

 usersAndTokens = saved.filter(x => x.email).map(user => new Object({
 user: user,
 token: jwt.sign({
 iss: 'my.domain.com',
 sub: user._id,
 iat: moment().unix(),
 exp: moment().add(7, 'days').unix()
 }, process.env.TOKEN_SECRET),
 lunitsPopulated: saved.filter(x => x.user === user._id)
 }));
 done();
 });