export default async function handler(req, res) {
  const contenuto = await req.text();
  const encoded = Buffer.from(contenuto).toString('base64');

  const check = await fetch("https://api.github.com/repos/sandrocossiga/assistente-consiglieri/contents/presenze_data.json", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json"
    }
  });

  const existing = await check.json();
  const sha = existing.sha;

  const payload = {
    message: "Update presenze",
    content: encoded,
    sha
  };

  const salva = await fetch("https://api.github.com/repos/sandrocossiga/assistente-consiglieri/contents/presenze_data.json", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!salva.ok) {
    return res.status(500).send("Errore nel salvataggio");
  }

  res.status(200).send("OK");
}
