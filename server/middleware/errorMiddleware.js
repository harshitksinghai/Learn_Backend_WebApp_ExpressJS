// this will contain all functions for error-handling middlewares

// what if client sent an http request which did not match any routes?
const notFound = (req, res, next) => { // this does not have parameter 'err' so express identifies it as a normal middleware
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // check TermsMeaning for detailed explanation of this line of code
};

// let's have a custom error handling middleware
const errorHandler = (err, req, res, next) => { // this have parameter 'err' so express identifies it as an error handling middleware

    // if we are throwing a manual error (throw new Error()), the status might still be 200 (ok), and we don't want that
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // mongoose sometimes throws this error - CastError
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        // if project is in development then show the error stack
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };