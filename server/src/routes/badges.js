const express = require("express");
const router  = express.Router();
const { getEarnedBadges } = require("../utils/storage");

router.get("/", (req, res) => {
  const badges = getEarnedBadges();
  res.json({
    badges,
    earned: badges.filter(b => b.earned).length,
    total:  badges.length,
  });
});

module.exports = router;
