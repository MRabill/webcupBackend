// const { router, knexDb } = require("../../utils/routes.imports.utils");
const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/post-news", async (req, res) => {
  try {
    const { newsName,newsDetails } = req.body;
    await knexDb("News").insert({
      newsName: newsName,
      newsDetails : newsDetails
    });

    res.status(200).send({
      payload: [],
      message: "Successfully add News",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
