const searchModel = require('../model/Admin');

module.exports = {
    search: function(req, res) {
        var search = req.query.s;
        searchModel.search(req.con, search, function(err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    }
}