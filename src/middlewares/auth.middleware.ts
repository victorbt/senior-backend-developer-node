export const isAuth = (req: any, res: any, next: any) => {
    const auth = req.headers.authorization;
    if (auth === 'password') {
        next();
    } else {
        res.status(401);
        res.send('Access forbidden');
    }
}