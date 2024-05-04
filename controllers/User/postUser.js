// const { router, knexDb } = require("../../utils/routes.imports.utils");
const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/post-user", async (req, res) => {
  try {
    const { username } = req.body;
    await knexDb("User").insert({
      username: username,
      password:password
    });

    res.status(200).send({
      payload: [],
      message: "Successfully add user",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
