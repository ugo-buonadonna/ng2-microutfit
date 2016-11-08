/**
 * Created by ugo on 05/11/16.
 */



let usersAndTokens = [];


const user_number = 2;                      // 2 minimum
const learningUnits_per_user = 2;           // 2 minimum
const resources_per_learningUnit = 2;       // 2 minimum

const not_authorized_error_code = 500;

// 1st is users (jwt)
// how much each mode
function initModels() {
    "use strict";


    beforeEach((done) => {


        let users = new Array(user_number);
        let savePromises = [];

        users.fill()
            .map(x => new mongoose.models.User({
                name: faker.name.firstName(),
                email: faker.internet.email()
            }))
            .map(user => {
                user.learningUnits = [];
                let learningUnits = new Array(learningUnits_per_user);
                learningUnits.fill()
                    .map(x => new mongoose.models.LearningUnit({
                        user: user._id,
                        topic: faker.lorem.word(),
                        resources: new Array(resources_per_learningUnit)
                            .fill()
                            .map(_ => new Object({
                                name: faker.commerce.product(),
                                link: faker.internet.url()
                            }))
                    }))
                    .map(lu => {
                        user.learningUnits.push(lu._id);
                        savePromises.push(lu.save());
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


    });


}