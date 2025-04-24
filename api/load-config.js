export default async function handler(req, res) {
  const response = await fetch(
    'https://api.github.com/repos/neoshui/app_private_config/contents/dashy/conf.yml',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw'
      }
    }
  );

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to fetch config(配置加载失败)' });
  }

  const config = await response.text();
  res.setHeader('Content-Type', 'text/yaml');
  res.status(200).send(config);
}
