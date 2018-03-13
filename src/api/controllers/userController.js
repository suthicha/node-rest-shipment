const jwt = require('jsonwebtoken');
const settings = require('../../settings');
const helper = require('../utils/helper');
const User = require('../modals/userAdapter');
const NAME = "usercontroller";

exports.login = (req, res, next) => {
    try {
        const { userId, password } = req.body;
        User.find(userId, password, (data, error)=>{
            if (error){
                helper.sendJson(req, res, 500, NAME, {
                    error: error.message
                });
            } else {
                
                if (data.length === 0 || data[0].LoggedStatus === 404) {
                    helper.sendJson(req, res, 404, NAME, { 
                        message: 'auth fail'
                    });
                } else {
                    const token = jwt.sign(
                        {
                            userId: data[0].LoginName,
                            groupId: data[0].UserGroupID,
                            email: data[0].Email
                        }, 
                        settings.JWT_KEY,
                        {
                            expiresIn: "1h"    
                        }
                        );
                    helper.sendJson(req, res, 200, NAME, {
                        message: "Auth successfully",
                        token: token
                    });
                };
            };
        });
    } catch (e) {
        helper.sendJson(req, res, 500, NAME, e.message);
    }
};

exports.get_user_all = (req, res, next) => {
    try {
        const userId = req.params.userId;
        User.select_all(userId, (data, error) => {
            if (error){
                helper.sendJson(req, res, 500, NAME, {
                    message: 'Internal Server Error.|' + ex.message
                });
            } else {
                if ( data && data.length > 0){
                    helper.sendJson(req, res, 200, NAME, {
                        users: data
                    });
                } else {
                    helper.sendJson(req, res, 404, NAME, {
                        message: 'Permission not allow userId ' + userId
                    });
                }
            }
        });

    } catch (e) {
        helper.sendJson(req, res, 500, NAME, e.message);
    }
};

exports.get_user = (req, res, next) => {
    try {
        const userId = req.params.userId;
        User.select(userId, (data, error) => {
            if (error){
                helper.sendJson(req, res, 500, NAME, {
                    message: 'Internal Server Error.|' + ex.message 
                });
            } else {
                if ( data && data.length > 0){
                    helper.sendJson(req, res, 200, NAME, {
                        user: data[0]
                    });
                } else {
                    helper.sendJson(req, res, 404, NAME, {
                        message: 'Find not found userId ' + userId
                    });
                }
            }
        });

    } catch (e) {
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
}

exports.signup = (req, res, next) => {
    try {
        const user = req.body;
        User.insert(user, (data, error) => {
            if (error) {
                helper.sendJson(req, res, 500, NAME, { 
                    message: "Internal Server Error.|" + error.message
                });
            } else {
                helper.sendJson(req, res, 201, NAME, { 
                    message: "signup user successfully"
                });
            }
        });

    } catch (e) {
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
};
