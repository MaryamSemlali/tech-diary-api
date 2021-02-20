
module.exports = (server) => {
    server.get('/test', function (req, res){
        res.send({
            version: 'v1',
            name: 'tech-diary-api'
        })
    })

};
