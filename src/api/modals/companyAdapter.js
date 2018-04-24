const mssql = require('mssql');
const settings = require('../../settings');

exports.get_company = (userId, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=> {
                const req = new mssql.Request(pool);
                    req.input('userId', mssql.Int, userId)
                    .execute('sp_select_company')
                    .then(result => {
                        callback(result.recordset);
                    })
                    .catch(error => {
                        callback(null, error);
                    })
            })
            .catch(error => {
                error.message = "Cannot connect local server."
                callback(null, error);
            })
};

exports.insert_company = (company, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=> {

                const req = new mssql.Request(pool);
                    req.input('CmpName', mssql.VarChar, company.CmpName)
                    .input('CmpTaxNo', mssql.VarChar, company.CmpTaxNo)
                    .input('CmpBranch', mssql.VarChar, company.CmpBranch)
                    .input('UserID', mssql.Int, company.UserID)
                    .execute('sp_insert_company')
                    .then(result => {
                        callback(result)
                    })
                    .catch(err => {
                        callback(null, err);
                    })

            })
            .catch(error => {
                error.message = "Cannot connect local server."
                callback(null, error);
            });
};

exports.update_company = (company, callback) => {
    console.log('update_company', company)
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=> {

                const req = new mssql.Request(pool);
                    req.input('CmpName', mssql.NVarChar, company.CmpName)
                    .input('CmpTaxNo', mssql.VarChar, company.CmpTaxNo)
                    .input('CmpBranch', mssql.VarChar, company.CmpBranch)
                    .input('UserID', mssql.Int, company.UserID)
                    .input('CmpID', mssql.Int, company.CmpID)
                    .execute('sp_update_company')
                    .then(result => {
                        callback(result)
                    })
                    .catch(err => {
                        callback(null, err);
                    })
                    
            })
            .catch(error => {
                error.message = "Cannot connect local server."
                callback(null, error);
            });
};

exports.delete_company = (company, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=> {

                const req = new mssql.Request(pool);
                    req.input('CmpID', mssql.Int, company.CmpID)
                    .input('UserID', mssql.Int, company.UserID)
                    .execute('sp_delete_company')
                    .then(result => {
                        callback(result)
                    })
                    .catch(err => {
                        callback(null, err);
                    })
                    
            })
            .catch(error => {
                error.message = "Cannot connect local server."
                callback(null, error);
            });
};