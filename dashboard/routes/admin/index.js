let sitedatalari = require("../../database/models/analytics-site.js");



console.log("Admin/Index router loaded.");
app.get("/admin", global.checkAuth, async (req, res) => {
	
	let siteD = await Analytics.findOne({ id: config.clientID });
    res.render("admin/index.ejs", {
    	bot: bot,
        path: req.path,
        config: config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
      
        siteD: siteD
    })
});