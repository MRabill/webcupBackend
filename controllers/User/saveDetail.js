const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/save-detail", async (req, res) => {
  try {
    const { weakness, goal, equipment, user} = req.body;

    console.log(req.body)
    await knexDb("User")
      .update({
        weakness: weakness,
        goals:goal,
        equipment:equipment
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
