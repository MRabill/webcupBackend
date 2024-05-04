// const { router, knexDb } = require("../../utils/routes.imports.utils");
const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/post-training", async (req, res) => {
  try {
    const { username } = req.body;
    await knexDb("Training").insert({
      trainingName: trainingName,
    });

    res.status(200).send({
      payload: [],
      message: "Successfully add Training",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
