function admin(req, res, next) {
    // console.log(req.user.id.role)
    if (req.isAuthenticated() && req.user.id === '641c30e332936be261a3c63e') {
        return next()
    }
    return res.redirect('/')
}

module.exports = admin