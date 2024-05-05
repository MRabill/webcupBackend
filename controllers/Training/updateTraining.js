const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/update-training", async (req, res) => {
  try {
    const { trainingName, id } = req.body;
    await knexDb("Training")
      .update({
        trainingName: trainingName,
      })
      .where({ id: id });

    res.status(200).send({
      payload: [],
      message: "Successfully updated user",
      success: true,a
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
