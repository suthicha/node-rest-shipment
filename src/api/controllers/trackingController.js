const helper = require('../utils/helper');
const Tracking = require('../modals/trackingAdapter');
const NAME = "trackingcontroller";

exports.find = (req, res, next) => {
    try {
        const { userId, refno } = req.params;

        Tracking.find(userId, refno, (data, error) => {
            if (error) {
                helper.sendJson(req, res, 500, NAME, {
                    message: "Internal Server Error.|" + error.message
                });
            } else {
                if (data && data.length > 0){
                    helper.sendJson(req, res, 200, NAME, {
                        shipments: data
                    })
                } else {
                    helper.sendJson(req, res, 404, NAME, {
                        message: "Find not found " + req.params.refno
                    })
                }
            }
        });

    } catch(e) {
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
};
