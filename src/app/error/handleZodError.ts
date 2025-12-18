import { ZodError } from 'zod';
import { type TErrorSources, type TGenericErrorResponse } from '../interface/error.js';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSources = err.issues.map(issue => ({
        // path: issue.path[issue.path.length - 1],
        path: issue.path.at(-1) as string | number,
        message: issue.message,
    }));

    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSources,
    };
};

export default handleZodError;
