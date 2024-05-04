const { router, knexDb } = require("../../utils/routes.imports.utils");

router.post("/APIBACKEND/update-user-profile", async (req, res) => {
  try {
    const { userId, superpowers, weaknesses, equipment } = req.body;

    const getId = async (table, dataArray) => {
      const ids = [];
      for (const data of dataArray) {
        if (data && data.id) {
          ids.push(data.id);
        } else {
          const [newId] = await knexDb(table).insert({
            [`${table}Name`]: data.name,
            [`${table}Description`]: data.description
          });
          ids.push(newId);
        }
      }
      return ids;
    };

    const superpowerIds = await getId("Superpower", superpowers);
    const weaknessIds = await getId("Weakness", weaknesses);
    const equipmentIds = await getId("Equipment", equipment);

    for (const superpowerId of superpowerIds) {
      await knexDb("User_Superpower").insert({
        userId: userId,
        superpowerId: superpowerId
      }).onConflict().merge();
    }

    for (const weaknessId of weaknessIds) {
      await knexDb("User_Weakness").insert({
        userId: userId,
        weaknessId: weaknessId
      }).onConflict().merge();
    }

    for (const equipmentId of equipmentIds) {
      await knexDb("User_Equipment").insert({
        userId: userId,
        equipmentId: equipmentId
      }).onConflict().merge();
    }

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
