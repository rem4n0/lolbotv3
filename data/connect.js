
module.exports = async () => {
    mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
        autoIndex: false
    }).then(() => {
    console.log("[vcodes.xyz]: Mongoose successfully connected.");
    }).catch(err => console.log("[vcodes.xyz]: An error occurred while connecting mongoose.", err));
}