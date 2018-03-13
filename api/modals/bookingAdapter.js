const mssql = require('mssql');
const settings = require('../../settings');

exports.insert = (booking, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
        .then(()=>{
            const req = new mssql.Request(pool);
                req.input('MasterJobNo', booking.MasterJobNo)
                .input('JobNo', booking.JobNo)
                .input('TaxNo', booking.TaxNo)
                .input('BranchNo', booking.BranchNo)
                .input('BookingNo', booking.BookingNo)
                .input('CustomerNo', booking.CustomerNo)
                .input('CustomerName', booking.CustomerName)
                .input('CarrierBookingNo', booking.CarrierBookingNo)
                .input('OBL', booking.OBL)
                .input('HBL', booking.HBL)
                .input('DestCode', booking.DestCode)
                .input('DestName', booking.DestName)
                .input('DepartureDate', booking.DepartureDate)
                .input('MotherVessel', booking.MotherVessel)
                .input('FeederVessel', booking.FeederVessel)
                .input('ArrivalDate', booking.ArrivalDate)
                .input('ContainerNo', booking.ContainerNo)
                .input('PortOfDischargeCode', booking.PortOfDischargeCode)
                .input('PortOfDischargeName', booking.PortOfDischargeName)
                .input('PortOfLoadingCode', booking.PortOfLoadingCode)
                .input('PortOfLoadingName', booking.PortOfLoadingName)
                .input('DeliveryDate', booking.DeliveryDate)
                .input('UserID', booking.UserID)
                .input('CreateDateTime', booking.CreateDateTime)
                .input('UpdateBy', booking.UserID)
                .input('UpdateDateTime', booking.UpdateDateTime)
                .input('ShipmentStatus', booking.ShipmentStatus)
                .input('Remark', booking.Remark)
                .input('RefId', booking.RefId)
                .input('TrxNo', booking.TrxNo)
                .execute('sp_post_shipment')
                .then(result => {
                    callback(result);
                })
                .catch(error => {
                    callback(null, error);
                })
        })
        .catch(error => {
            error.message = "Cannot connect local server";
            callback(null, error);
        })
};

exports.find = (type, refno, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=> {
                const req = new mssql.Request(pool);
                req.input(type === 'etd'? 'etd' : 'reqno', mssql.VarChar, refno)
                .execute(type === 'etd'? 'sp_order_select_etd' : 'sp_order_select_refno')
                .then(result => {
                    callback(result.recordset);
                })
                .catch(error => {
                    callback(null, error);
                })
            })
            .catch(error => {
                error.message = "Cannot connect local server.";
                callback(null, error);
            })
};

exports.select = (fromdate, todate, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
    pool.connect()
        .then(()=> {
            const req = new mssql.Request(pool);
            req.input('fromdate', mssql.VarChar, fromdate)
            .input('todate', mssql.VarChar, todate)
            .execute('sp_shipment_select')
            .then(result => {
                callback(result.recordset);
            })
            .catch(error => {
                callback(null, error);
            })
        })
        .catch(error => {
            error.message = "Cannot connect local server.";
            callback(null, error);
        })
};
