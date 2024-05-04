const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/update-user-profile", async (req, res) => {
  try {
    const { userId, superpower, weakness, equipment } = req.body;
    const getId = async (table, data) => {
      if (data && data.id) {
        return data.id;
      } else {
        const [newId] = await knexDb(table).insert({
          [`${table}Name`]: data.name,
          [`${table}Description`]: data.description
        });
        return newId;      }
    };
    const superpowerId = await getId("Superpower", superpower);
    const weaknessId = await getId("Weakness", weakness);
    const equipmentId = await getId("Equipment", equipment);
    await knexDb("User_Superpower").insert({
      userId: userId,
      superpowerId: superpowerId
    }).onConflict().merge();
    await knexDb("User_Weakness").insert({
      userId: userId,
      weaknessId: weaknessId
    }).onConflict().merge();
    await knexDb("User_Equipment").insert({
      userId: userId,
      equipmentId: equipmentId
    }).onConflict().merge();

    res.status(200).send({
      message: "Successfully updated user profile",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send({
      payload: null,
      message: "Internal server error",
      success: false,
    });
  }
});

module.exports = router;
