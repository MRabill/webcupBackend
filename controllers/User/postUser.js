const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/post-user", async (req, res) => {
  try {
    const { name, password, email, superpower } = req.body;

    // Generate a random 4-digit number for OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Insert the user into the database
    await knexDb("User").insert({
      username: email,
      password: password,
      heroName: name,
      superpower: superpower,
    });

    res.status(200).send({
      payload: {
        otp: otp,
      },
      message: "Successfully add user",
      success: true,
    });
  } catch (e) {
    // Check if the error is due to duplicate entry for username
    if (e.code === "ER_DUP_ENTRY") {
      res.status(400).send({
        payload: null,
        message: "Username already exists",
        success: false,
      });
    } else {
      console.error({ error: e });
      res.status(500).send({
        payload: null,
        message: "Internal server error",
        success: false,
      });
    }
  }
});

module.exports = router;
