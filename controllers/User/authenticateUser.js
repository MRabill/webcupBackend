const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/authenticate-user", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knexDb("User").where({
      username: username,
      password: password
    }).first();

    if (user) {
      res.status(200).send({
        payload: user,
        message: "Authentication successful",
        success: true,
      });
    } else {
      res.status(401).send({
        payload: null,
        message: "Invalid username or password",
        success: false,
      });
    }
  } catch (e) {
    console.error({ error: e });
    res.status(500).send({
      payload: null,
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
