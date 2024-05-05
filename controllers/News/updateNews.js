const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/update-news", async (req, res) => {
  try {
    const {  newsName,newsDetails, id } = req.body;
    await knexDb("News")
      .update({
        newsName: newsName,
        newsDetails:newsDetails
      })
      .where({ id: id });

    res.status(200).send({
      payload: [],
      message: "Successfully updated news",
      success: true,a
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
