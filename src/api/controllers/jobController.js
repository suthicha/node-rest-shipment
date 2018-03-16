const helper = require('../utils/helper');
const Job = require('../modals/jobAdapter');
const NAME = "jobcontroller";

exports.find = (req, res, next) => {
    try {
        const filter = {
            type: req.params.refno? 'ref':'etd',
            etd: req.params.etd,
            refno: req.params.refno? req.params.refno:''
        };

        Job.find(filter, (data, error) => {
            if (error){
                helper.sendJson(req, res, 500, NAME, {
                    message: "Internal Server Error.|" + error.message
                });
            } else {
                if (data && data.length > 0) {
                    helper.sendJson(req, res, 200, NAME, {
                        jobs: data
                    });
                } else {
                    helper.sendJson(req, res, 404, NAME, {
                        message: "Find not found etd equal " + req.params.etd
                    });
                }
            }
        });
    } catch(e) {
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
}