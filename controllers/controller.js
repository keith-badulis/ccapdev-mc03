const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        db.findMany(User, {}, null, function (result) {
            if (result != null) {
                res.render('home', {contacts: result});
            } else {
                res.render('error');
            }
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        db.findOne(User, {number: req.query.number}, null, function (result) {
            if (result != null)
                res.send(result)
            else
                res.send('')
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        var user = {
            name: req.query.name,
            number: req.query.number
        }

        db.insertOne(User, user, function (flag) {
            if (flag)
                res.render('partials/card', 
                    {name: user.name, number: user.number}, 
                    function (err, html) {
                        if (!err) res.send(html);
                    });
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        
        db.deleteOne(User, {number: req.query.number}, function (flag) {
            if (flag) res.send('success');
        })

    }

}

module.exports = controller;
