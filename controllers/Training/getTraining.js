const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-training", async (req, res) => {
  try {
    const getTraining = await knexDb("Training").select("*");

    res.status(200).send({
      payload: getTraining,
      message: "Successfully fetched training",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
