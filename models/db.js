const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/healtcare")
.then(()=>console.log("healthcare is connected with DB......"))
.catch((err)=>console.log(err));
