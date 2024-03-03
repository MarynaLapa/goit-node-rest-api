export const ctrlWrapper = ctrl => {
    const func = async(req, res, next) => {
        try {
            console.log('req', req.body)
            await ctrl(req, res, next);
        } catch (error) {
            next(error)
        }
    }

    return func
}

