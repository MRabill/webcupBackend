const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/post-superpower", async (req, res) => {
  try {
    const { superpowerName,superpowerDescription } = req.body;
    await knexDb("Superpower").insert({
        superpowerName: superpowerName,
        superpowerDescription : superpowerDescription
    });

    res.status(200).send({
      payload: [],
      message: "Successfully add Superpower",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
