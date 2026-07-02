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
- Keep every card title within 20 Chinese characters. Do not copy the full user demand into card titles.
- The vibePrompt must be a senior prompt-engineering grade "super prompt", not a short description.
- The vibePrompt must include role, context, product goal, information architecture, screen requirements, interaction states, visual rules, anti-demo constraints, output format, and acceptance criteria.
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

function compactCardTitle(title = '', cardId = '') {
  const normalized = String(title).replace(/\s+/g, '').trim();
  if (normalized && normalized.length <= 20) {
    return normalized;
  }

  if (cardId === 'workspace' || normalized.includes('工作台') || normalized.includes('三栏')) {
    return '专业工作台方案';
  }
  if (cardId === 'taskflow' || normalized.includes('任务流') || normalized.includes('单页') || normalized.includes('轻量')) {
    return '单页任务流方案';
  }
  if (cardId === 'dashboard' || normalized.includes('看板') || normalized.includes('运营') || normalized.includes('长期')) {
    return '长期运营看板方案';
  }
  if (normalized.includes('数据') || normalized.includes('自动化')) {
    return '数据自动化方案';
  }
  if (normalized.includes('问答') || normalized.includes('助手')) {
    return '智能问答方案';
  }

  return normalized.slice(0, 18) || 'UI方案';
}

function buildSuperPrompt({ preferences = {}, card = {}, output = {} }) {
  const demand = preferences?.demandText?.trim() || output?.brief?.productType || '新的 AI 产品想法';
  const user = preferences?.userSegment || output?.brief?.targetUser || '目标用户';
  const frequency = preferences?.frequency || '未指定';
  const tone = preferences?.styleTone || output?.brief?.recommendedStyle || '专业可信';
  const brief = output?.brief || {};
  const layout = brief.recommendedLayout || card.layoutDescription || '根据产品任务设计清晰的信息架构';
  const components = Array.isArray(brief.coreComponents) && brief.coreComponents.length
    ? brief.coreComponents
    : card.coreComponents || [];
  const states = Array.isArray(brief.necessaryStates) && brief.necessaryStates.length
    ? brief.necessaryStates
    : card.keyStates || [];
  const avoid = Array.isArray(brief.notRecommended) && brief.notRecommended.length
    ? brief.notRecommended
    : ['营销页式空泛表达', '不可交互的假组件', '复用旧需求或演示模板'];

  return `# 超级 Prompt：AI PM 级 UI 方案生成器

## 1. 你的角色
你是一名资深 AI 产品经理 + SaaS UI 架构师 + 前端体验评审专家。请把模糊需求转化为可真实开发、可交付、可上线的产品界面方案。不要写营销文案，不要做概念 Demo。

## 2. 当前唯一输入
- 产品需求：${demand}
- 目标受众：${user}
- 使用频率：${frequency}
- 视觉调性：${tone}
- 推荐方案：${compactCardTitle(card.title, card.id)}

## 3. 产品目标
围绕当前需求设计一个真实可用的 Web 应用界面，让目标用户能完成核心任务。方案必须体现业务流程、页面结构、组件状态、异常处理和可操作路径。

## 4. 信息架构与页面布局
推荐布局：${layout}

请输出完整页面结构，至少包含：
1. 全局导航或上下文入口
2. 核心任务输入区
3. 主工作区或结果生成区
4. 辅助诊断/引用/配置区
5. 操作按钮区与反馈状态区

## 5. 核心组件要求
必须设计并描述这些组件：
${components.map((item, index) => `${index + 1}. ${item}`).join('\n')}

## 6. 关键交互状态
必须覆盖以下状态，不允许只画静态页面：
${states.map((item, index) => `${index + 1}. ${item}`).join('\n')}

同时补齐：空状态、加载状态、生成中状态、失败重试状态、低置信度追问状态、成功复制/导出状态。

## 7. 视觉与体验约束
- 风格必须符合「${tone}」，信息层级清晰，控件密度符合真实 SaaS 工具。
- 使用克制的中性色、明确的主按钮、清晰边框、真实表格/表单/面板，而不是装饰性卡片堆砌。
- 所有按钮、筛选、标签、输入框、开关、复制、重试、导出都必须有明确交互反馈。

## 8. 严禁事项
不要出现以下问题：
${avoid.map((item, index) => `${index + 1}. ${item}`).join('\n')}

额外禁止：复用旧需求、使用占位假数据糊弄、只输出一句口号、把页面做成落地页、忽略错误状态。

## 9. 输出格式
请按以下结构输出：
1. 产品定位一句话
2. 页面信息架构
3. 首屏布局说明
4. 核心组件清单
5. 关键状态与交互细节
6. 视觉设计规范
7. 前端实现要点
8. 质量验收清单

## 10. 验收标准
- 读完后前端可以直接开始搭页面
- 设计师可以据此画高保真
- 产品经理可以拿它评审需求完整度
- 页面必须像真实 SaaS 工具，而不是 AI 生成的演示模板`;
}

function normalizePayload(payload, preferences = {}) {
  const normalizedCards = payload.cards.map((card) => ({
    ...card,
    title: compactCardTitle(card.title, card.id),
  }));
  const cardsById = Object.fromEntries(normalizedCards.map((card) => [card.id, card]));
  const outputsByCard = Object.fromEntries(Object.entries(payload.outputsByCard).map(([id, output]) => [
    id,
    {
      ...output,
      vibePrompt: buildSuperPrompt({
        preferences,
        card: cardsById[id] || { id, title: id },
        output,
      }),
    },
  ]));

  return {
    ...payload,
    cards: normalizedCards,
    outputsByCard,
  };
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
      title: '专业工作台方案',
      layout: '三栏式工作台：左侧为对象/知识/任务导航，中间为核心问答或生成主工作区，右侧为引用来源、质量诊断和操作建议。',
      components: ['需求/知识入口导航', '核心问答工作区', '答案来源引用面板', '质量诊断与下一步建议'],
      states: ['等待输入', '检索知识中', '生成回答中', '低置信度追问', '生成失败重试'],
    },
    {
      id: 'taskflow',
      tag: '轻量',
      title: '单页任务流方案',
      layout: '单页聚焦任务流：顶部输入目标，中间展示生成过程，底部提供复制、继续追问、重新生成等明确动作。',
      components: ['单输入框任务入口', '分步生成状态条', '结果卡片', '复制/追问/重试操作区'],
      states: ['空白引导', '正在理解需求', '结果待确认', '继续追问', '网络超时重试'],
    },
    {
      id: 'dashboard',
      tag: '进阶',
      title: '长期运营看板方案',
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
      vibePrompt: buildSuperPrompt({
        preferences,
        card: {
          id: config.id,
          title: config.title,
          layoutDescription: config.layout,
          coreComponents: config.components,
          keyStates: config.states,
        },
        output: {
          brief: {
            productType: demand,
            targetUser: `面向${user}`,
            recommendedLayout: config.layout,
            recommendedStyle: `整体采用「${tone}」风格，优先保证信息清晰、操作明确、状态可感知。`,
            coreComponents: config.components,
            necessaryStates: config.states,
            notRecommended: ['复用旧需求内容', '生成与当前输入无关的方案', '只给营销口号不提供可执行组件', '没有错误重试和空状态'],
          },
        },
      }),
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

    return res.status(200).json(normalizePayload(payload, preferences));
  } catch (error) {
    const reason = error instanceof Error && error.name === 'AbortError' ? 'model_timeout' : 'model_error';
    return res.status(200).json(buildCurrentInputFallback(preferences, reason));
  } finally {
    clearTimeout(timeout);
  }
}
