const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

const systemPrompt = `
You are AI PM UI Copilot, a senior AI product manager and UI architecture advisor.
Return only valid json. Do not wrap the response in markdown.

Generate a structured UI strategy for an AI product idea. The json must match this shape:
{
  "selectedCardId": "workspace",
  "cards": [
    {
      "id": "workspace",
      "tag": "推荐",
      "title": "string",
      "suitability": ["string"],
      "layoutDescription": "string",
      "coreComponents": ["string"],
      "keyStates": ["string"],
      "pros": "string",
      "cons": "string",
      "graphNodes": [
        {"id": "n1", "label": "string", "type": "concept", "explanation": "string"}
      ],
      "graphEdges": [{"from": "n1", "to": "n2"}]
    }
  ],
  "outputsByCard": {
    "workspace": {
      "brief": {
        "productType": "string",
        "targetUser": "string",
        "coreTasks": "string",
        "recommendedLayout": "string",
        "recommendedStyle": "string",
        "coreComponents": ["string"],
        "necessaryStates": ["string"],
        "notRecommended": ["string"]
      },
      "vibePrompt": "string",
      "checklist": [
        {"id": "c1", "rule": "string", "status": "satisfied", "description": "string"}
      ]
    }
  }
}

Rules:
- Use Chinese for all user-facing content.
- Generate exactly 3 cards with ids: workspace, taskflow, dashboard.
- For graphNodes.type use only: concept, layout, component, state, rule, output.
- For checklist.status use only: satisfied, supplementary, high_risk.
- Make recommendations specific to the user's product, not generic.
- Include practical UI states, error states, empty states, loading states, and anti-demo-quality guidance.
- The selectedCardId should be the best match for the user's frequency and product complexity.
- Ensure outputsByCard contains one StrategyOutput for every card id.
`;

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return false;
  }
  if (!Array.isArray(payload.cards) || payload.cards.length < 1) {
    return false;
  }
  if (!payload.outputsByCard || typeof payload.outputsByCard !== 'object') {
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'Missing DEEPSEEK_API_KEY' });
  }

  const preferences = req.body;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `请基于以下用户偏好输出 json：${JSON.stringify(preferences)}`,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 2600,
      }),
      signal: controller.signal,
    });

    const raw = await response.text();
    if (!response.ok) {
      return res.status(response.status).json({
        error: 'DeepSeek API request failed',
        detail: raw.slice(0, 500),
      });
    }

    const completion = JSON.parse(raw);
    const content = completion?.choices?.[0]?.message?.content;
    if (!content) {
      return res.status(502).json({ error: 'DeepSeek returned empty content' });
    }

    const payload = JSON.parse(content);
    if (!validatePayload(payload)) {
      return res.status(502).json({ error: 'DeepSeek returned invalid payload' });
    }

    return res.status(200).json(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  } finally {
    clearTimeout(timeout);
  }
}
