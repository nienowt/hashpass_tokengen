'use strict';


let User = require('../models/user-model');


module.exports = (router) => {

  router.post('/new',(req, res) => {
    let base64ed = req.headers.authorization.split(' ')[1];
    let authArr = new Buffer(base64ed, 'base64').toString().split(':');
    let newUser = new User({name: authArr[0], password: authArr[1]});
    newUser.save((err, user) => {
      if (err) console.log(err);
      if(!user) res.write('Username taken')
      if(user) res.write('User Saved')
          res.end();
        });
    // User.find({name: newUser.name}, (err, user) => {
    //   if (err) console.log(err);
    //   if (user.length !== 0) {
    //     res.write('Username taken!');
    //     res.end();
    //
    //   } else {
    //     newUser.save((err, user) => {
    //       if (err) console.log(err);
    //       res.write('User Saved');
    //       console.log(user);
    //       res.end();
    //     });
    //   }
    // });
  });

  router.post('/login', (req, res) => {
    let base64ed = req.headers.authorization.split(' ')[1];
    let authArr = new Buffer(base64ed, 'base64').toString().split(':');

    User.findOne({name: authArr[0]}, (err, user) => {
      if (err) console.log(err);
      let valid = user.compareHash(authArr[1]);
      if (!valid) {
        res.write('Not today satan!');
        res.end();

      } else {
        res.json({token: user.generateToken()});
        res.end();
      }
    });
  });
};
