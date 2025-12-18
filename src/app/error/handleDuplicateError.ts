import { type TGenericErrorResponse, type TErrorSources } from "../interface/error.js";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    

    const extractedMessage = match && match[1];

    const errorSources: TErrorSources =  [
        {
            path: '',
            message: `${extractedMessage } is already exists`,
        },
    ]

    return {
        statusCode: 409,
        message: 'Duplicate entry error',
        errorSources,
    }
}

export default handleDuplicateError;