const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-superpower", async (req, res) => {
  try {
    const getSuperpowers = await knexDb("Superpower").select("*");

    res.status(200).send({
      payload: getSuperpowers,
      message: "Successfully fetched superpowers",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
