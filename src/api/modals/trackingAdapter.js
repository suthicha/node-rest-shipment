const mssql = require('mssql');
const settings = require('../../settings');

exports.find = (userId, refno, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=> {
                const req = new mssql.Request(pool);
                req.input('reqno', mssql.VarChar, refno)
                .input('UserId', mssql.VarChar, userId)
                .execute('sp_tracking')
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