// const { router, knexDb } = require("../../utils/routes.imports.utils");
const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/save-training", async (req, res) => {
  try {
    const { training, user } = req.body;

    console.log(req.body);
    await knexDb("User")
      .update({
        currentTraining: training,
      })
      .where({ heroName: user });

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
