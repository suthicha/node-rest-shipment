const mssql = require('mssql');
const settings = require('../../settings');

exports.find = (filter, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbRemoteSrv);
        pool.connect()
        .then(()=> {
            let commandText = "SELECT TrxNo, ISNULL((SELECT TOP 1 VatRegistrationNo FROM slcu1 WHERE slcu1.CustomerCode=SEBL1.CustomerCode),'') AS TaxNo,"
            commandText +="'' AS BranchNo, ISNULL(JobNo,'') AS JobNo, ISNULL(BookingNo,'') AS BookingNo, ISNULL(CustomerCode,'') AS CustomerNo,"
            commandText +="ISNULL(CustomerName,'') AS CustomerName, ISNULL(UcrNo,'') AS CarrierBookingNo, ISNULL(OBLNo,'') AS OBL, ISNULL(BLNo,'') AS HBL,"
            commandText +="ISNULL(MasterJobNo,'') AS MasterJobNo, ISNULL(DestCode,'') AS DestCode, ISNULL(DestName,'') AS DestName,"
            commandText +="ISNULL(EtdDate, CONVERT(DATE,'19000101',112)) AS DepartureDate, ISNULL(MotherVesselName,'') AS MotherVessel,"
            commandText +="ISNULL(VesselName,'') AS FeederVessel, ISNULL(EtaDate, CONVERT(DATE,'19000101',112)) AS ArrivalDate,"
            commandText +="ISNULL(ContainerNo,'') AS ContainerNo, ISNULL(DeliveryOrderReleaseDate, CONVERT(DATE,'19000101',112)) AS DeliveryDate,"
            commandText +="ISNULL(PortOfDischargeCode,'') AS PortOfDischargeCode, ISNULL(PortOfDischargeName,'') AS PortOfDischargeName,"
            commandText +="ISNULL(PortOfLoadingCode,'') AS PortOfLoadingCode, ISNULL(PortOfLoadingName,'') AS PortOfLoadingName,"
            commandText +="ISNULL(VoyageNo,'') AS VoyageNo, '' AS [Status], '' AS Remark, '' AS Username "
            commandText +="FROM sebl1 "

            if (filter.type === 'ref'){
                commandText += "WHERE CONVERT(VARCHAR(6),ISNULL(EtdDate, CONVERT(DATE, '19000101', 112)),112) = LEFT(@etd,6) ";
                commandText += "AND (BookingNo LIKE '"+ filter.refno +"%' ";
                commandText += "OR OBLNo LIKE '"+ filter.refno +"%' ";
                commandText += "OR BLNo LIKE '"+ filter.refno +"%' ";
                commandText += "OR ContainerNo LIKE '"+ filter.refno +"%' ";    
                commandText += "OR MasterJobNo LIKE '"+ filter.refno +"%' ";
                commandText += "OR JobNo LIKE '"+ filter.refno +"%' ";            
                commandText += ")";
            }else {
                commandText +="WHERE ISNULL(EtdDate, CONVERT(DATE,'19000101',112)) = @etd "
            }
            
            const req = new mssql.Request(pool);
                req.input('etd', mssql.VarChar, filter.etd)
                .query(commandText)
                .then(result => {
                    callback(result.recordset);
                })
                .catch(error => {
                    callback(null, error);
                })
        })
        .catch(error => {
            error.message = "Cannot connect remote server.";
            callback(null, error);
        })
};