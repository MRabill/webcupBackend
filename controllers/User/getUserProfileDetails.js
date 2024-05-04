const { router, knexDb } = require("../../utils/routes.imports.utils");

router.get("/APIBACKEND/get-user-profile-details/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;       
    // Retrieve user details along with associated superpower, weakness, and equipment using inner joins
    const getUserProfile = await knexDb("User")
      .where("User.userId", userId)
      .leftJoin("User_Superpower", "User.userId", "=", "User_Superpower.userId")
      .leftJoin("Superpower", "User_Superpower.superpowerId", "=", "Superpower.superpowerId")
      .leftJoin("User_Weakness", "User.userId", "=", "User_Weakness.userId")
      .leftJoin("Weakness", "User_Weakness.weaknessId", "=", "Weakness.weaknessId")
      .leftJoin("User_Equipment", "User.userId", "=", "User_Equipment.userId")
      .leftJoin("Equipment", "User_Equipment.equipmentId", "=", "Equipment.equipmentId")
      .select("User.*", "Superpower.*", "Weakness.*", "Equipment.*");

    res.status(200).json({
      payload: getUserProfile,
      message: "Successfully fetched user profile",
      success: true,
    });
  } catch (e) {
    console.error({ error: e });
    res.status(500).send([]);
  }
});

module.exports = router;
