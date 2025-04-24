export default async (req, res) => {
  try {
    const response = await fetch(process.env.CONFIG_REPO_URL, {
      headers: {
        'Authorization': `token ${process.env.GH_TOKEN}`,
        'Accept': 'application/vnd.github.raw',
        'User-Agent': 'Dashy-Config-Loader'
      }
    });
    
    if (!response.ok) throw new Error(`GitHub API 响应: ${response.status}`);
    
    res.setHeader('Content-Type', 'application/yaml');
    res.send(await response.text());
  } catch (error) {
    res.status(500).json({ error: `配置加载失败: ${error.message}` });
  }
}
