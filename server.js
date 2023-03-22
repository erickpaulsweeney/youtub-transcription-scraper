const express = require("express");
const { YoutubeTranscript } = require("youtube-transcript");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function fetchTranscript(url) {
  return YoutubeTranscript.fetchTranscript(url, {
    lang: "en",
  }).then((response) =>
    response.reduce((accu, curr) => accu + " " + curr.text, "")
  );
}

app.get("/transcript/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transcript = await fetchTranscript(
      `https://www.youtube.com/watch?v=${id}`
    );
    return res.status(200).send(transcript);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(8000, () => console.log("Server listening on port 8000"));
