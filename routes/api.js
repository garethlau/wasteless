module.exports =(app) => {
    app.get("/test", (req, res) => {
        res.send({message: "hello"})
    })
}