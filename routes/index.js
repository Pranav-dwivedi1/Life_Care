var express = require("express");
var router = express.Router();

const userModel = require("../models/usermodels");
const patientModel = require("../models/patientmodels");

console.log("Server is running on port 4000");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/location", function (req, res, next) {
  res.render("location", { title: "location" });
});
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Page" });
});

router.get("/service_care", function (req, res, next) {
  res.render("service_care", { title: "Service & Care" });
});


//SignUp
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "sign up new user" });
});

router.post("/signup", function (req, res, next) {
  const newUser = new userModel(req.body);
  newUser
    .save()
    .then(() => res.redirect("/signin"))
    .catch((err) => res.send(err));
});


//signin
router.get("/signin", function (req, res, next) {
  res.render("signin", { title: "sign in user" });
});

router.post("/signin", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user === null) {
      return res.send(`user not found. <a herf="/signin">signin</a>`);
    }
    if (user.password !== password) {
      return res.send(`incorrect password. <a herf="/signin">signin</a>`);
    }
    res.redirect("/patients");
  } catch (error) {
    res.send(error);
  }
});

//patients
router.get("/patients", async function (req, res, next) {
  try {
    const users = await userModel.find();
    res.render("patients", {
      title: "patients",
      users,
    });
  } catch (error) {
    res.send(error);
  }
  res.render("signin", { title: "sign in user" });
});

// delete
router.get("/delete/:id", async function (req, res, next) {
  // res.render('profile',{title: "homepage"});
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/patients");
  } catch (error) {
    res.send(error);
  }
});

//
router.get("/reset/:id", async function (req, res, next) {
  res.render("reset", { title: "reset password", id: req.params.id });
});

router.post("/reset/:id", async function (req, res, next) {
  try {
    const { oldpassword, password } = req.body;
    const user = await userModel.findById(req.params.id);

    if (oldpassword !== user.password) {
      return res.send(
        `Incorrect password. <a herf ="/reset/&{user._id}">Reset Again </a>`
      );
    }
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/patients");
  } catch (error) {
    res.send(error);
  }
});

// update

router.get("/update/:id", async function (req, res, next) {
  try {
    const user = await userModel.findById(req.params.id);

    res.render("update", { title: "update", user });
  } catch (error) {
    res.send(error);
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/patients");
  } catch (error) {
    res.send(error);
  }
});

// appoiments

router.get("/appointment", function (req, res, next) {
  res.render("appointment", { title: "list of patients" });
});

router.post("/appointment", function (req, res, next) {
  const newPatient = new patientModel(req.body);
  newPatient
    .save()
    .then(() => res.redirect("/appointSuccess"))
    .catch((err) => res.send(err));
});



// appointmentsuccess
router.get("/appointSuccess",async function (req, res, next) {
   try{
    const patientlist = await patientModel.find();
    res.render("appointSuccess",{
      title: "appointSuccess",
      patientlist,
    });
   } catch (error) {
    res.send(error);
   }
  res.render("appointSuccess",{ title: "Appointment list"})

  res.render("appointSuccess");
});


module.exports = router;
