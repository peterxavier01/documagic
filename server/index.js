require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Replicate = require("replicate");

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Set up Replicate API
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Endpoint to get extract Latex string from images
app.post("/api/extract-equation", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const result = await replicate.run(
      "mickeybeurskens/latex-ocr:b3278fae4c46eb2798804fc66e721e6ce61a450d072041a7e402b2c77805dcc3",
      {
        input: {
          image_path: imageUrl,
        },
      }
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint to get extract text from images
app.post("/api/extract-text", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const result = await replicate.run(
      "abiruyt/text-extract-ocr:a524caeaa23495bc9edc805ab08ab5fe943afd3febed884a4f3747aa32e9cd61",
      {
        input: {
          image: imageUrl,
        },
      }
    );

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
