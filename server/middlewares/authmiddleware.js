import JWT from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    try {
        //get token Bearer scdbkjsckh
        const token = req.headers["authorization"].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Un-Authorized user'
                });
            } else {
                //attach it to body the decoded pat
                req.body.id = decode.id;
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Please provide auth token',
            error
        })
    }
}