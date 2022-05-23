
module.exports = async () => {
    mongoose.connect(config.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    useFindAndModify:false,
        autoIndex: false
    }).then(() => {
    console.log("Mongoose successfully connected.");
    }).catch(err => console.log(": An error occurred while connecting mongoose.", err));
}
