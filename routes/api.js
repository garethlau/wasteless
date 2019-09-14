const vision = require('@google-cloud/vision');
const axios = require('axios');
const fetch = require("node-fetch");

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'apiKey.json'
});
const fs = require('fs');





module.exports = app => {
    app.get("/test", (req, res) => {
        res.send({message: "hello"})
    })

    app.post("/getFruits", async (req, res) => {
        const client = new vision.ImageAnnotatorClient({
            keyFilename: './routes/apiKey.json'
          });
          const request = {
            image: {content: fs.readFileSync('veggiesfruits.jpg')},
          };
        
        //   console.log("1")
          const [result] = await client.objectLocalization(request);
          const objects = result.localizedObjectAnnotations;
          const fruits = []
          objects.forEach(object => {
            console.log("Name: " + object.name);
            console.log("Confidence: " + object.score);
            // const vertices = object.boundingPoly.normalizedVertices;
            // vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
            if(object.name != "Vegetable" && object.name != "Food" && object.name != "Fruit"){
                fruits.push(object.name);
                console.log(object.name);
            }
        })

        let url = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + fruits.join(",+") + "&ignorePantry=true&apiKey=b68cedbfb5cc42939208a4b5bb63c5e3";

        fetch(url)
		.then((data) => data.json())
		.then((res) => console.log(res));
    });


}

