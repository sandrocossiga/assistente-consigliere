export default async function handler(req, res) {
  const response = await fetch("https://api.github.com/repos/sandrocossiga/assistente-consiglieri/contents/presenze_data.json", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json"
    }
  });

  if (!response.ok) {
    return res.status(500).send("Errore nel caricamento");
  }

  const data = await response.json();
  const decoded = Buffer.from(data.content, 'base64').toString();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(decoded);
}
