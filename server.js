const vMyBot = require('./bot.js');
vMyBot.mLogin();
const express = require("express");
const app = express();
app.use(express.static("public"));
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
app.get("/", (request, response) => {
    response.send(vMyBot.mClient().user.username + " online ! ");
});
