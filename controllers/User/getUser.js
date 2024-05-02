const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-user", async (req, res) => {
  try {
    const getUsers = await knexDb("User").select("*");

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
