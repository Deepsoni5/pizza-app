const Menu = require("../../models/menu")
function homeController() {
    return {
        async index(req, res) {
            // Menu.find().then(function (pizzas) {
            //     console.log(pizzas)
            //     res.render('home'), { pizzas: pizzas }
            // })

            const pizzas = await Menu.find()
            // console.log(pizzas)
            return res.render('home', { pizzas: pizzas })

        }
    }
}

module.exports = homeController
//render na second paramater ma pizzas pass kayro home page ma
//same e j variable home page ma available hse
//e variable ma db no select krelo bdho j data hse

//find method bdhi row ne select kre
//record bdha avse e pachi .then vadu function call thase
//and e function ma bdha database na data avi jase