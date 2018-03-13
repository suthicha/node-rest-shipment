const helper = require('../utils/helper');
const Booking = require('../modals/bookingAdapter');
const NAME = "bookingcontroller";

exports.update = (req, res, next) => {
    try {
        const booking = req.body;
        Booking.insert(booking, (data, error) => {
            if (error) {
                helper.sendJson(req, res, 500, NAME, {
                    message: "Internal Server Error.|" + error.message
                });
            } else {
                helper.sendJson(req, res, 201, NAME, {
                    message: "update booking successfuly"
                })
            }
        });

    } catch(e) {
        helper.sendJson(req, res, 500, NAME, {
            message: e.message
        });
    }
};

exports.find = (req, res, next) => {
    try {
        
        Booking.find(req.params.type, req.params.refno, (data, error) => {
            if (error) {
                helper.sendJson(req, res, 500, NAME, {
                    message: "Internal Server Error.|" + error.message
                });
            } else {
                if (data && data.length > 0){
                    helper.sendJson(req, res, 200, NAME, {
                        bookings: data
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


