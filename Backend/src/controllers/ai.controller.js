// const aiService = require("../services/ai.service");

// module.exports.getReview = async (req, res) => {
//   const code = req.body.code;

//   if (!code) {
//     return res.status(400).send("Prompt is required");
//   }

//   const response = await aiService(code);

//   res.send(response);
// };

const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Code is required." });
  }

  try {
    const response = await generateContent(code);
    res.json({ review: response }); // Ensure proper JSON response
  } catch (error) {
    res.status(500).json({ error: "Server Error: Unable to process request." });
  }
};
