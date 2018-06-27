var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);
var Schema = mongoose.Schema;

var options = {discriminatorKey: 'userType'};
var Artist = userModel.discriminator('Artist',
    new mongoose.Schema({
        albums: [{
            title: String,
            songs: [{
                song: {
                    type: Schema.Types.ObjectId,
                    ref: 'song'
                }
            }],
            releaseDate: Date
        }]}, options));

var Listener = userModel.discriminator('Listener',
    new mongoose.Schema({
        playlist: [{
            title: String,
            createDate: Date,
            songs: [{
                artist: String
            }]
        }],
        history: [

        ]}, options));

var ProArtist = userModel.discriminator('ProArtist',
    new mongoose.Schema({
        albums: [{
            title: String,
            songs: [{
                song: {
                    type: Schema.Types.ObjectId,
                    ref: 'song'
                }
            }],
            releaseDate: Number
        }]}, options));


function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials)
    // return userModel.findOne(
    //     {username: username, password: password},
    //     function(err, username) {
    //         if (err) throw error;
    //         console.log("cannot find user by credentials");
    //         console.log(username);
    //     })
}

function findUserByUsername(username) {
	return userModel.findOne({username: username});
    // return userModel.findOne({username: username},
        // function(err, username) {
        //     if (err) throw error;
        //     console.log("cannot find user by username");
        //     console.log(username);
        // })
}

function deleteUser(userId) {
    return userModel.deleteOne({_id:userId});
}

function updateUser(userId, newUser) {
	return userModel.update({_id: userId}, {$set:newUser});
}

function findAllFollowing(userId) {
    return userModel.findById(userId, 'following', function (err, user) {
        if (err) throw error;
        console.log("cannot find followers for this user");
        console.log(userId);
    });
}

function findAllFollower(userId) {
    return userModel.findById(userId, 'follower', function (err, user) {
        if (err) throw error;
        console.log("cannot find followers for this user");
        console.log(userId);
    });
}

function followUser(currentUser, friendId) {
    // add current user as a follower to the person being followed
    userModel.update(
        {_id: friendId},
        { $push: { followers: currentUser}}
    );
    return userModel.update(
        {_id: currentUser},
        { $push: { following: friendId }});
}

function unfollowUser(currentUser, friendId) {
    userModel.update(
        {_id: friendId},
        { $pull: { followers: currentUser}}
    );
    return userModel.update(
        {_id: currentUser},
        { pull: { following: friendId }});
}


var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    deleteUser: deleteUser,
    updateUser: updateUser,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    findAllFollower: findAllFollower,
    findAllFollowing: findAllFollowing,
    followUser: followUser,
    unfollowUser: unfollowUser
};

module.exports = api;