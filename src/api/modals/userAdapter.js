const mssql = require('mssql');
const settings = require('../../settings');

exports.find = (userId, password, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
    pool.connect()
        .then(()=> {
            const req = new mssql.Request(pool);
                req.input('LoginName', mssql.VarChar, userId)
                .input('Password', mssql.VarChar, password)
                .execute('sp_auth_user').then(result => {
                    callback(result.recordset);
                })
                .catch(error => {
                    callback(null, error);
                });
        })
        .catch(error => {
            error.message = 'Cannot connect database.';            
            callback(null, error);
        })
};

exports.select_all = (userId, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
    pool.connect()
        .then(() => {
            const req = new mssql.Request(pool);
                req.input('UserId', mssql.VarChar, userId)
                .execute('sp_select_users').then(result => {
                    callback(result.recordset);
                })
                .catch(error => {
                    callback(null, error);
                });
        })
        .catch(error => {
            error.message = 'Cannot connect database.';            
            callback(null, error);
        })
};

exports.select = (userId, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
    pool.connect()
        .then(() => {
            const req = new mssql.Request(pool);
                req.input('UserId', mssql.VarChar, userId)
                .execute('sp_select_user').then(result => {
                    callback(result.recordset);
                })
                .catch(error => {
                    callback(null, error);
                });
        })
        .catch(error => {
            error.message = 'Cannot connect database.';            
            callback(null, error);
        })
};


exports.insert = (user, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=> {
                const req = new mssql.Request(pool);
                    req.input('LoginName', mssql.VarChar, user.loginName)
                    .input('Password', mssql.VarChar, user.password)
                    .input('FirstName', mssql.VarChar, user.firstName)
                    .input('LastName', mssql.VarChar, user.lastName)
                    .input('Email', mssql.VarChar, user.email)
                    .input('PhoneNO', mssql.VarChar, user.phoneNo)
                    .execute('sp_insert_user')
                    .then(result => {
                        callback(result);
                    })
                    .catch(error => {
                        callback(null, error);
                    })
            })
            .catch(error => {
                error.message = 'Cannot connect database.';
                callback(null, error);
            })
};