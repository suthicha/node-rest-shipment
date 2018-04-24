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
                    req.input('LoginName', mssql.VarChar, user.LoginName)
                    .input('Password', mssql.VarChar, user.Password)
                    .input('FirstName', mssql.VarChar, user.FirstName)
                    .input('LastName', mssql.VarChar, user.LastName)
                    .input('Email', mssql.VarChar, user.Email)
                    .input('PhoneNO', mssql.VarChar, user.PhoneNO)
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

exports.update = (user, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
        pool.connect()
            .then(()=>{
                const req = new mssql.Request(pool);
                req.input('LoginName', mssql.VarChar, user.LoginName)
                    .input('Password', mssql.VarChar, user.Password)
                    .input('FirstName', mssql.VarChar, user.FirstName)
                    .input('LastName', mssql.VarChar, user.LastName)
                    .input('Email', mssql.VarChar, user.Email)
                    .input('PhoneNO', mssql.VarChar, user.PhoneNO)
                    .input('UserGroupID', mssql.Int, user.UserGroupID)
                    .input('UserID', mssql.Int, user.UserID)
                    .execute('sp_update_user')
                    .then(result => {
                        callback(result);
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

exports.resetPassword = (user, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
    pool.connect()
        .then(()=>{
            const req = new mssql.Request(pool);
            req.input('NewPassword', mssql.VarChar, user.NewPassword)
                .input('UserID', mssql.Int, user.UserID)
                .execute('sp_reset_password')
                .then(result => {
                    callback(result);
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

exports.delete = (userId, callback) => {
    const pool = new mssql.ConnectionPool(settings.dbLocalSrv);
    pool.connect()
        .then(()=>{
            const req = new mssql.Request(pool);
            req.input('UserID', mssql.Int, userId)
                .execute('sp_delete_user')
                .then(result => {
                    callback(result);
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