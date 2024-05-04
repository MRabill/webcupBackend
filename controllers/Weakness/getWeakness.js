const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-weakness", async (req, res) => {
  try {
    const getWeakness = await knexDb("Weakness").select("*");

    res.status(200).send({
      payload: getWeakness,
      message: "Successfully fetched weakness",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
