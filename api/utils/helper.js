exports.sendJson = (req, res, statusCode, methodName, message) => {
    res.status(statusCode).json(
        {
            method: methodName,
            ...message
        }
    );
}