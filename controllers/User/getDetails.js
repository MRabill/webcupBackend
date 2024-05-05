const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-details/:username", async (req, res) => {
  try {
    const {username} = req.params
    const getUsers = await knexDb("User").select("*").where({ heroName: username }).first();

    console.log(getUsers)

    res.status(200).send({
      payload: getUsers,
      message: "Successfully fetched users",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
