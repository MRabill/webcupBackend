// const { router, knexDb } = require("../../utils/routes.imports.utils");
const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/update-user", async (req, res) => {
  try {
    const { username, id } = req.body;
    await knexDb("User")
      .update({
        username: username,
      })
      .where({ id: id });

    res.status(200).send({
      payload: [],
      message: "Successfully updated user",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
