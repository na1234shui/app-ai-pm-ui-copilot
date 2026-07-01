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
- Treat the user's demandText as the only source of truth. Never reuse example demands, previous outputs, or demo data unless the user explicitly asks for them.
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

function buildCurrentInputFallback(preferences, reason = 'model_timeout') {
  const demand = preferences?.demandText?.trim() || '新的 AI 产品想法';
  const user = preferences?.userSegment || '目标用户';
  const frequency = preferences?.frequency || '偶尔使用工具';
  const tone = preferences?.styleTone || '专业可信';

  const cardConfigs = [
    {
      id: 'workspace',
      tag: '推荐',
      title: `${demand} - 专业工作台方案`,
      layout: '三栏式工作台：左侧为对象/知识/任务导航，中间为核心问答或生成主工作区，右侧为引用来源、质量诊断和操作建议。',
      components: ['需求/知识入口导航', '核心问答工作区', '答案来源引用面板', '质量诊断与下一步建议'],
      states: ['等待输入', '检索知识中', '生成回答中', '低置信度追问', '生成失败重试'],
    },
    {
      id: 'taskflow',
      tag: '轻量',
      title: `${demand} - 单页任务流方案`,
      layout: '单页聚焦任务流：顶部输入目标，中间展示生成过程，底部提供复制、继续追问、重新生成等明确动作。',
      components: ['单输入框任务入口', '分步生成状态条', '结果卡片', '复制/追问/重试操作区'],
      states: ['空白引导', '正在理解需求', '结果待确认', '继续追问', '网络超时重试'],
    },
    {
      id: 'dashboard',
      tag: '进阶',
      title: `${demand} - 长期运营看板方案`,
      layout: '看板式长期管理：上方展示核心指标和使用情况，中间管理历史问题/内容资产，右侧展示优化建议和风险提醒。',
      components: ['核心指标概览', '历史问答/内容资产列表', '用户反馈统计', '优化建议面板'],
      states: ['无历史数据', '指标加载中', '反馈待处理', '内容过期提醒', '权限不足提示'],
    },
  ];

  const cards = cardConfigs.map((config) => ({
    id: config.id,
    tag: config.tag,
    title: config.title,
    suitability: [`输入需求：${demand}`, `目标受众：${user}`, `使用频率：${frequency}`, `视觉调性：${tone}`],
    layoutDescription: config.layout,
    coreComponents: config.components,
    keyStates: config.states,
    pros: '直接围绕当前输入生成，不复用旧方案；结构完整，适合继续交给大模型或研发做下一轮细化。',
    cons: reason === 'model_timeout'
      ? 'DeepSeek 本次响应超时，因此这是服务端基于当前输入生成的可用基础方案。'
      : '模型返回结构不完整，因此这是服务端基于当前输入生成的可用基础方案。',
    graphNodes: [
      { id: 'n1', label: `当前需求: ${demand}`, type: 'concept', explanation: '本次方案只基于用户当前输入框内容生成。' },
      { id: 'n2', label: `布局: ${config.layout.split('：')[0]}`, type: 'layout', explanation: config.layout },
      { id: 'n3', label: '输出: Brief / Prompt / Checklist', type: 'output', explanation: '生成面向产品、设计和研发协作的交付物。' },
    ],
    graphEdges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
    ],
  }));

  const outputsByCard = Object.fromEntries(cardConfigs.map((config) => [
    config.id,
    {
      brief: {
        productType: demand,
        targetUser: `面向${user}`,
        coreTasks: `围绕「${demand}」完成需求输入、智能生成、结果校验、复制导出和持续优化。`,
        recommendedLayout: config.layout,
        recommendedStyle: `整体采用「${tone}」风格，优先保证信息清晰、操作明确、状态可感知。`,
        coreComponents: config.components,
        necessaryStates: config.states,
        notRecommended: ['复用旧需求内容', '生成与当前输入无关的方案', '只给营销口号不提供可执行组件', '没有错误重试和空状态'],
      },
      vibePrompt: `请基于以下当前需求设计一个可上线的 Web 产品界面：「${demand}」。目标用户是「${user}」，使用频率是「${frequency}」，视觉调性是「${tone}」。请输出完整页面结构、核心组件、关键状态、空状态、加载状态、错误重试状态，并避免复用任何旧需求或演示模板。推荐布局：${config.layout}`,
      checklist: [
        { id: 'ck1', rule: '是否只基于当前输入生成', status: 'satisfied', description: `本方案围绕「${demand}」生成，没有引用旧需求。` },
        { id: 'ck2', rule: '是否包含关键状态', status: 'satisfied', description: `已包含 ${config.states.join('、')}。` },
        { id: 'ck3', rule: '是否可继续交付给研发', status: 'supplementary', description: '下一步可补充真实数据结构、权限规则和接口边界。' },
      ],
    },
  ]));

  return {
    selectedCardId: 'workspace',
    cards,
    outputsByCard,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const preferences = req.body;
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(200).json(buildCurrentInputFallback(preferences, 'missing_api_key'));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8500);

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
        max_tokens: 1800,
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
      return res.status(200).json(buildCurrentInputFallback(preferences, 'invalid_payload'));
    }

    return res.status(200).json(payload);
  } catch (error) {
    const reason = error instanceof Error && error.name === 'AbortError' ? 'model_timeout' : 'model_error';
    return res.status(200).json(buildCurrentInputFallback(preferences, reason));
  } finally {
    clearTimeout(timeout);
  }
}
