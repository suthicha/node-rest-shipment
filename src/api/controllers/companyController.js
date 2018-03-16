const helper = require('../utils/helper');
const Company = require('../modals/companyAdapter');
const NAME = 'companycontroller';

exports.get_company = (req, res, next) => {
    try {
        Company.get_company(req.params.userId, (data, error) => {
            if (error){
                helper.sendJson(req, res, 500, NAME, {message: error.message});
            } else {
                helper.sendJson(req, res, 200, NAME, {
                    data: data
                });
            }
        });

    }catch(e){
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
};

exports.insert_company = (req, res, next) => {
    try {
        const company = req.body;
        Company.insert_company(company, (data, error) => {
            if (error){
                helper.sendJson(req, res, 500, NAME, {message: error.message});
            } else {
                helper.sendJson(req, res, 201, NAME, {
                    message: 'create successfully'
                });
            }
        });

    }catch(e){
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
};

exports.update_company = (req, res, next) => {
    try {
        const company = req.body;
        Company.update_company(company, (data, error) => {
            if (error){
                helper.sendJson(req, res, 500, NAME, {message: error.message});
            } else {
                helper.sendJson(req, res, 201, NAME, {
                    message: 'update successfully'
                });
            }
        });

    }catch(e){
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
};

exports.delete_company = (req, res, next) => {
    try {
        const company = req.body;
        Company.delete_company(company, (data, error) => {
            if (error){
                helper.sendJson(req, res, 500, NAME, {message: error.message});
            } else {
                helper.sendJson(req, res, 201, NAME, {
                    message: 'delete successfuly'
                });
            }
        });

    }catch(e){
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
};