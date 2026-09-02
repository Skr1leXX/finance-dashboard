export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { byCategory } = req.body || {};
  if (!byCategory || typeof byCategory !== 'object' || Object.keys(byCategory).length === 0) {
    return res.status(400).json({ error: 'Нет данных для анализа' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'AI-сервис не настроен' });
  }

  const summary = Object.entries(byCategory)
    .map(([category, amount]) => `${category}: ${amount}₽`)
    .join(', ');

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'Ты финансовый ассистент. Тебе дают агрегированные траты по категориям за период. Дай 2-3 предложения на русском: одно наблюдение о паттерне трат и одну конкретную рекомендацию. Без приветствий и лишних вступлений, сразу по делу.',
          },
          { role: 'user', content: `Траты по категориям: ${summary}` },
        ],
        temperature: 0.6,
        max_tokens: 200,
      }),
    });

    if (!groqRes.ok) {
      const text = await groqRes.text();
      console.error('Groq API error:', groqRes.status, text);
      return res.status(502).json({ error: 'AI-сервис временно недоступен' });
    }

    const data = await groqRes.json();
    const insight = data.choices?.[0]?.message?.content?.trim();

    if (!insight) {
      return res.status(502).json({ error: 'Пустой ответ от AI-сервиса' });
    }

    res.status(200).json({ insight });
  } catch (err) {
    console.error('Insights handler error:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}
