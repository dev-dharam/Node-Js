const URLModel = require("../models/urlModel");
const shortId = require('shortid')

async function handleURLGenerator(req, res) {

    try {
        const body = req.body;

        if (!body.url) {
            return res.send("Url Not Found!");
        }

        const shortID = shortId.generate();

        await URLModel.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: []
        });

        return res.render("home", {id: shortID});

    } catch (error) {
        console.log("Error in url generate", error);
        return res.json({ message: "Error in url generate", err: error })
    }
}


// REDIRECT URL
async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;

    try {
        const entry = await URLModel.findOneAndUpdate({ shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        )
        if (entry) {
            const redirectURL = entry.redirectUrl.startsWith("http://") || entry.redirectUrl.startsWith("https://") 
            ? entry.redirectUrl 
            : `http://${entry.redirectUrl}`;
            console.log("redirectURL:-", redirectURL)
            res.redirect(redirectURL);
        }else{
            res.status(404).send("URL not found");
        }

    } catch (error) {
        console.log("Error in redirect", error);
        res.json({ success: "Error in redirect" });
    }
}




// ANALYTICS URL
async function handleAnalytics(req, res){

    const shortId = req.params.shortId;

    try {
        const urlData = await URLModel.findOne({shortId})
        return res.send(urlData)
    } catch (error) {
        console.log("Error in analytics");
    }

}

module.exports = {
    handleURLGenerator,
    handleRedirectUrl,
    handleAnalytics
}