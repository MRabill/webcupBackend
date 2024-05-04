const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/post-weakness", async (req, res) => {
  try {
    const { weaknessName,weaknessDescription } = req.body;
    await knexDb("Weakness").insert({
      weaknessName: weaknessName,
      weaknessDescription : weaknessDescription
    });

    res.status(200).send({
      payload: [],
      message: "Successfully add Weakness",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
