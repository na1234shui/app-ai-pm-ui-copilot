import { UserPreferences, RecommendationCard, StrategyOutput } from './types';

/**
 * Generates recommendation cards for the layout selection based on user input & preference keywords
 */
export function generateRecommendations(prefs: UserPreferences): RecommendationCard[] {
  const user = prefs.userSegment || '全部岗位';
  const tone = prefs.styleTone || '专业可信';
  const demand = prefs.demandText || '公司内部数据自动化工具完整展开（全岗位提效）';
  const freq = prefs.frequency || '高频工作台';

  const isDataAutomation = 
    demand.includes('数据') || 
    demand.includes('自动化') || 
    demand.includes('提效') || 
    demand.includes('重复') || 
    demand.includes('分析师');

  if (isDataAutomation) {
    // Card 1: All-in-one Collaboration Workspace (Recommended)
    const card1: RecommendationCard = {
      id: 'workspace',
      tag: '推荐',
      title: '全岗位智能数据自动协作中台 (All-in-One Data Hub)',
      suitability: [`面向：${user} (跨岗位提效协同)`, `频次：${freq}`, '多表自动合并 & 在线脏数据修正'],
      layoutDescription: `高能三栏式协作工作台。左侧为「6大岗效中心抽屉（覆盖分析师、运营、产品、财务、客服、研发）」，中间为「Excel 零代码清洗规则合并编辑器」，右侧为「清洗溯源及流式数据核对视窗」，解决普遍内耗。`,
      coreComponents: ['6大岗效提效控制面板', '零代码 Excel 数据清洗引擎', '多表自动关联主键树 (Merge Tree)', '脏数据在线修正交互表', '指标一致性血缘字典'],
      keyStates: ['脏数据待交互核对', '指标口径冲突高亮强预警', '定时导出任务自动化就绪', '合并运行流式诊断'],
      pros: '一站式打破多岗位数据孤岛，支持可视化的多表 Merge 树和零代码 Excel 快速清洗，内置账目/工单在线一键核对流，彻底解脱人工导表痛苦。',
      cons: '由于功能覆盖全岗位，界面信息密度极高，初次使用的业务人员需要进行 30 秒的“角色中心”引导。',
      graphNodes: [
        { id: 'n1', label: `受众: ${user}`, type: 'concept', explanation: `针对跨岗位（数据分析师、运营、产品、财务、客服、研发）提效，需要将多个独立需求收拢。` },
        { id: 'n2', label: '痛点: 导表/合并/清洗内耗', type: 'concept', explanation: '重复导表、手工 Excel 清洗、多源对账以及脏数据修正耗费大量人力。' },
        { id: 'n3', label: `调性: ${tone}`, type: 'rule', explanation: `使用【${tone}】调性，采用中性色 Slate / Zinc，无华丽渐变，纯正 SaaS 生产力工具风，突出严肃可信。` },
        { id: 'n4', label: '框架: 6大岗效中心 + 三栏 Workspace', type: 'layout', explanation: '左侧角色侧滑舱，中间工作编辑域，右侧数据清洗流式日志及运行视窗。' },
        { id: 'n5', label: '组件: 拖拽式多表 Merge 树 + 脏数据校验表', type: 'component', explanation: '可视化合并主键、财务在线差异账件高亮格、NLP分类智能对照反馈。' },
        { id: 'n6', label: '状态: 指标冲突拦截 / 流式清洗 / 报表定时就绪', type: 'state', explanation: '异常数值或指标口径不一致时强报警，自动清洗时右侧流式 Token 展现处理日志。' },
        { id: 'n7', label: '拒绝 Tech-Larping (防AI Slop)', type: 'rule', explanation: '杜绝模拟 ping、不可互动的死雷达图、伪信号波形。所有数据行可导出，状态行可执行。' },
        { id: 'n8', label: '产出: 全能型数据自动化 Brief / Prompt', type: 'output', explanation: '翻译为强调无缝合并逻辑、错误高亮修正、定时推送规则的 Brief 与高保真 Prompt 模板。' }
      ],
      graphEdges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n4' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' },
        { from: 'n5', to: 'n6' },
        { from: 'n6', to: 'n7' },
        { from: 'n7', to: 'n8' }
      ]
    };

    // Card 2: Self-Service Data Workspace (Lightweight)
    const card2: RecommendationCard = {
      id: 'taskflow',
      tag: '轻量',
      title: '极简多岗位数据自助取数流 (Self-Service Pipeline)',
      suitability: ['低频自助数据导出', '非技术小白业务员', '极速 Excel 表格合并'],
      layoutDescription: `单页焦点任务流。摒弃复杂的配置侧栏，将焦点集中于「手工 Excel 一键拖入」与「自动规则过滤」。中置多源拖拽区，一键选择清洗模板，右侧柔滑推入标准干净 Excel 导出与分发。`,
      coreComponents: ['Excel Drag-and-Drop 作业仓', '格式自适应清洗开关', '快捷对账/分类映射表', '一键飞书/钉钉分发组件'],
      keyStates: ['等待拖入源表', '字段自适应对齐中', '智能清洗成功预览', '分发成功气泡'],
      pros: '零配置开箱即用，财务、运营和客服小白最快可在 30 秒内完成多张 Excel 的合并去重，并一键发给特定部门，学习成本为零。',
      cons: '不具备企业级指标元数据字典统一能力，无法满足研发对高并发只读数仓取数 API 的精细控制。',
      graphNodes: [
        { id: 'n1', label: `目标: 零门槛小白提效`, type: 'concept', explanation: `针对使用频率较低或非技术人员，需要将“合并表”操作降维到极简拖拽。` },
        { id: 'n2', label: '意图: 快速导表干净下载', type: 'concept', explanation: '核心任务是“输入乱格式 Excel - 得到格式归一的合并表 - 下载或发送”。' },
        { id: 'n3', label: `视觉: 温暖易用`, type: 'rule', explanation: `适当采用 rounded-xl 柔和边角，强调步骤指示 (Step 1-2-3)，低压视觉。` },
        { id: 'n4', label: '框架: 居中卡片流程 + 侧滑预览抽屉', type: 'layout', explanation: '主屏保持开阔的拖拽操作环境，右滑推入预览与分发面板。' },
        { id: 'n5', label: '组件: 映射参数开关 + Excel 可视面板', type: 'component', explanation: '包含去空格、转换日期格式、剔除异常值等便捷开关，直接预览清洗前后行数对比。' },
        { id: 'n6', label: '防错: 自动补齐缺失主键提示', type: 'state', explanation: '检测到表格主键（如手机号）缺失时，醒目高亮提示并建议使用姓名或 ID 自动关联。' },
        { id: 'n7', label: '输出: 任务流 Brief', type: 'output', explanation: '交付为强调快速交互、错误拦截和极简下载动作的 Prompt 描述。' }
      ],
      graphEdges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n4' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' },
        { from: 'n5', to: 'n6' },
        { from: 'n6', to: 'n7' }
      ]
    };

    // Card 3: Metrics Directory & Pipeline (Advanced)
    const card3: RecommendationCard = {
      id: 'dashboard',
      tag: '进阶',
      title: '指标字典规范与自动化定时中心 (Metrics & Timer Manager)',
      suitability: ['分析师指标对齐管理', '研发定时调度与数据流', '只读从库 API 自助服务'],
      layoutDescription: `长效字典及报表分发看板。专攻指标口径不统一、每日固定报表以及研发导数内耗。上半屏为「指标血缘一致性管理视图」，下半屏为「高可靠数据定时 Pipeline 调度器」。`,
      coreComponents: ['数据口径血缘追踪图谱', '定时调度器 (Cron Builder)', '只读从库 API 生成看板', '提效监控雷达仪表盘'],
      keyStates: ['冷启动 Skeleton 占位', '调度执行成功闪烁', 'API 延迟波动曲线监控', '指标冲突自动标红阻断'],
      pros: '从源头上规范全公司指标口径，通过配置化 API 释放研发 15% 生产力，通过定时调度自动推送飞书，无需每次人工写脚本从库导表。',
      cons: '后台技术属性较强，非技术性运营或财务人员需要角色指引方可理解 Cron 表达式与 API 参数。',
      graphNodes: [
        { id: 'n1', label: `管理: 指标字典与调度`, type: 'concept', explanation: `面向研发与分析师，重点在于指标的一致性标准 (Single Source of Truth)。` },
        { id: 'n2', label: '意图: 长效稳定定时调度', type: 'concept', explanation: '需要将每日报表自动化分发，确保生产数据库不受临时高频大查询冲击。' },
        { id: 'n3', label: `调性: 科技智能 / 现代 SaaS`, type: 'rule', explanation: `使用等宽字体呈现运行日志，高品质 SVG 数据血缘图，极细单色线段。` },
        { id: 'n4', label: '框架: 拓扑字典 + 时序 Pipeline 网格', type: 'layout', explanation: '顶部指标血缘地图，下部定时任务网格与取数 API 性能仪表。' },
        { id: 'n5', label: '组件: D3 数据血缘节点 + 定时表达式构建器', type: 'component', explanation: '可视化 Cron 指令组合，自动将取数 SQL 解析成图形流。' },
        { id: 'n6', label: '状态: 数据为空 skeleton / 报警日志流', type: 'state', explanation: '调度失败时高亮错误代码，并在控制台提供一键触发修复和重新部署。' },
        { id: 'n7', label: '输出: 指标与定时 Brief', type: 'output', explanation: '翻译为注重持久化存储、并发保护、口径匹配算法的交付 Brief 与 Prompt 文本。' }
      ],
      graphEdges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' },
        { from: 'n5', to: 'n6' },
        { from: 'n6', to: 'n7' }
      ]
    };

    return [card1, card2, card3];
  }

  // Fallback to default PM tool if not matched
  const card1: RecommendationCard = {
    id: 'workspace',
    tag: '推荐',
    title: '专业三栏式 IDE 工作台',
    suitability: [`面向${user}`, `${freq}`],
    layoutDescription: `最契合【${user}】高频作答与评测心智。采用三栏式无刷新流畅布局，左边筛选、中间高强度沉浸书写、右边流式获取深度质量诊断，避免了单调的跳转。`,
    coreComponents: ['题库分类抽屉 (Category Drawer)', '多模态编辑器 (word counters)', 'AI 诊断视窗 (打字机流)'],
    keyStates: ['等待作答', '输入自动暂存', 'AI 诊断流中 (Token 打字)', '诊断就绪展示'],
    pros: '同屏高密度，提供极其专业的侧边打字机诊断流反馈，让高频使用的专业用户感到得心应手，杜绝营销感的浮躁。',
    cons: '对窄屏/移动端小屏幕不够友好，需要进行响应式层叠折叠设计。',
    graphNodes: [
      { id: 'n1', label: `用户: ${user}`, type: 'concept', explanation: `针对工作频次为高频的用户，需要一屏内完成全部工作闭环。` },
      { id: 'n2', label: '意图: 高能作答 & 深度复盘', type: 'concept', explanation: '由于包含大厂对齐和重修对照需求，必须同时展现题目、作答区与诊断面板。' },
      { id: 'n3', label: `调性: ${tone}`, type: 'rule', explanation: `匹配【${tone}】，使用优雅冷静的冷灰中性色卡作为组件的主色，突出智能诊断。` },
      { id: 'n4', label: '框架: 三栏 IDE Workspace', type: 'layout', explanation: '左侧 Category/题目树；中间作答编辑器 (Rich Area); 右侧智能诊断视窗。' },
      { id: 'n5', label: '组件: 多端状态机 + 流式 Token反馈', type: 'component', explanation: '包含自动保存指示器、AI 状态加载骨架，以及分维度的滑动条与段落润色对比组件。' },
      { id: 'n6', label: '状态: 等待中/流式展现/就绪/重试', type: 'state', explanation: '通过轻量骨架屏(Skeleton)和状态呼吸灯优雅过渡，确保无空白状态尴尬。' },
      { id: 'n7', label: '拒绝 Landing Page 营销口口号', type: 'rule', explanation: '杜绝大面积渐变背景与华丽的海报幻灯片，专注于高密度答题行为本身。' },
      { id: 'n8', label: '产出: Brief / Prompt / 清单', type: 'output', explanation: '将高密度的 IDE 产品形态翻译为精确的 Prompts、Brief 条目与研发清单。' }
    ],
    graphEdges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n4' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n7', to: 'n8' }
    ]
  };

  const card2: RecommendationCard = {
    id: 'taskflow',
    tag: '轻量',
    title: '聚焦单页焦点任务流',
    suitability: ['碎片化练习体验', '极佳新手轻量心智'],
    layoutDescription: `适合新手体验与快速碎片化加练。页面省去复杂的侧栏遮挡，每次只将一道最核心的产品经理真题赫然放置在屏幕中心，作答后从右侧柔顺弹入轻量级诊断抽屉。`,
    coreComponents: ['Focused Sheet 考题作业仓', 'Quest Progress Bar', 'Slide-over 反馈抽屉'],
    keyStates: ['审题就绪', 'AI 分步局部打磨 (带有呼吸光效)', '反馈抽屉推入就绪', '清空并重做二次验证'],
    pros: '极其清爽，视觉信息密度适中，完美规避由于系统过于庞杂而产生的抵触心理，有利于引导初学者和低频用户开始第一次答题。',
    cons: '无法同屏对比多道题。对经常处于复盘状态、翻阅历史作答的高级 PM 而言，频繁的操作滑动会导致效率略低。',
    graphNodes: [
      { id: 'n1', label: `目标: ${user}`, type: 'concept', explanation: `对需要极简聚焦的用户，需要减负，过滤一切多余的操作按键。` },
      { id: 'n2', label: '意图: 秒级作答并了解好坏', type: 'concept', explanation: '不在于大厂雷达宏观分析，而在于“写一个答卷 - 获得一个分数/优化金句”。' },
      { id: 'n3', label: `调性: ${tone}`, type: 'rule', explanation: `匹配【${tone}】，使用微圆角 (rounded-xl) 卡片作为主体，突出呼吸感与低压力设计。` },
      { id: 'n4', label: '框架: 居中卡片作业仓', type: 'layout', explanation: '主屏只留下本题卡片，右上角气泡式的进度和简洁成就进度。' },
      { id: 'n5', label: '组件: 侧滑半浮窗 (Diagnostic Drawer)', type: 'component', explanation: '作答后，诊断结果以清爽的侧弹底盒呈现，配有一键复制修改模板的按钮。' },
      { id: 'n6', label: '状态: 卡片置顶审题 / 呼吸波动发光 / 右弹反馈', type: 'state', explanation: '提交评测时，本题卡片浮现亮金光波动，提示 AI 在用 5 秒诊断，右弹窗滑入完成。' },
      { id: 'n7', label: '防错: 拒绝粗暴的报错', type: 'rule', explanation: '网络超时或接口挂起时在卡片里展示可点击的“重发”，绝不提示荒诞的 API 内部错误码。' },
      { id: 'n8', label: '输出: 任务 Brief', type: 'output', explanation: '转化成强调单页自闭环和轻盈呼吸感状态机的 Brief 与 Prompt 指导。' }
    ],
    graphEdges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n4' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n7', to: 'n8' }
    ]
  };

  const card3: RecommendationCard = {
    id: 'dashboard',
    tag: '进阶',
    title: '能力成长分析仪表盘',
    suitability: ['长效数据追踪', '大厂考评对齐图景'],
    layoutDescription: `专攻长效复盘与能力剖析。顶部提供「行业 PM 匹配度大厂分」与「AI 主考官评估分」，左侧有数据驱动的五维能力雷达属性图，右侧动态加载薄弱项攻坚列表。`,
    coreComponents: ['五维成长雷达 (Performance Radar)', '薄弱攻坚题集 Grid', '练习足迹量化波动曲线'],
    keyStates: ['冷启动 skeleton 占位', '筛选点击与数据联动', '攻坚同步中亮圈微动效', 'reload 失败重试'],
    pros: '极强的数据成就激励，强化用户的职业化“获得感”，高度彰显产品的智能底座，适合用于重度付费 and 进阶 SaaS 定位。',
    cons: '作为答题核心入口相对较深，需要进行 2 次跳转才能开始一道新的题目答题。',
    graphNodes: [
      { id: 'n1', label: `目标: ${user}`, type: 'concept', explanation: `针对重度用户的【${user}】，核心需要直观展现其每天的进步与短板。` },
      { id: 'n2', label: `意图: 量化成长`, type: 'concept', explanation: `不仅仅需要完成练习，还要识别“数据背后的改进点”。` },
      { id: 'n3', label: `调性: ${tone}`, type: 'rule', explanation: `匹配【${tone}】，使用优雅的冷灰色为主调，仪表采用极细单色实线，高质感图表，杜绝刺眼红绿。` },
      { id: 'n4', label: '框架: 仪表盘 + 侧边活动流', type: 'layout', explanation: '顶部为宏观指标与雷达分配图，底部为历次训练清单，支持下钻关联 to 作答详情。' },
      { id: 'n5', label: '组件: 练习时间轴 + 弱项推荐列表', type: 'component', explanation: '包含 D3-like 极简雷达指标，时间序列交互卡片，AI 自动生成的分类薄弱建议。' },
      { id: 'n6', label: '状态: 数据为空与多项筛选', type: 'state', explanation: '如果用户还未练习，仪表盘处于虚线“骨架屏”状态，而不是突兀报错。' },
      { id: 'n7', label: '质量规避: 拒绝虚假统计', type: 'rule', explanation: '不使用未说明算法的进度百分比，每个数值指标都具有对应的交互动作 and 底层意义。' },
      { id: 'n8', label: '输出: 工作台 Brief', type: 'output', explanation: '翻译为重视状态、状态机细节、业务表格配置的 Prompt 描述。' }
    ],
    graphEdges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
      { from: 'n6', to: 'n7' },
      { from: 'n7', to: 'n8' }
    ]
  };

  return [card1, card2, card3];
}

/**
 * Returns customized strategy output (Brief, Prompt, Checklist) based on chosen layout template and preferences
 */
export function generateStrategyOutput(cardId: string, prefs: UserPreferences): StrategyOutput {
  const demand = prefs.demandText || '公司内部数据自动化工具完整展开（全岗位提效）';
  const user = prefs.userSegment || '全部岗位';
  const tone = prefs.styleTone || '专业可信';
  const freq = prefs.frequency || '高频工作台';

  const dynamics = prefs.dynamicAnswers || {};
  // Extra dynamic questions
  const defaultFocus = dynamics['q_feedback_format'] || '数据分析师-自助拖拽取数与指标口径定义';
  const correctionStyle = dynamics['q_enterprise_match'] || '双栏对比改写：左源数据(脏)，右输入修正(带字段校验)';

  const feedbackFormat = defaultFocus;
  const enterpriseMatch = correctionStyle;

  const isDataAutomation = 
    demand.includes('数据') || 
    demand.includes('自动化') || 
    demand.includes('提效') || 
    demand.includes('重复') || 
    demand.includes('分析师');

  if (isDataAutomation) {
    let toneThemeText = '';
    let preventDirectives: string[] = [];
    let aestheticGuidelines = '';

    switch (tone) {
      case '专业可信':
        toneThemeText = '低饱和度冷灰 SaaS（Slate/Zinc），超高信息密度布局，高对比层级，精细边框，配合紧凑的表格组件边界与绝对严谨排版。';
        preventDirectives = ['高纯度霓虹发光', '不必要的渐变色卡片背景', '不可交互的死雷达图', '带有营销感的情绪化大标语'];
        aestheticGuidelines = '使用单色极细边框 (1px border-slate-200)、深灰至纯黑文字，主色点缀高雅黑或深靛蓝。';
        break;
      case '简洁高效':
        toneThemeText = '极简主义，零冗余背景，高密度网格，几乎全白的白净画布，重用纯文本提示语和极细黑白单色交互。';
        preventDirectives = ['多余的装饰性插画', '不必要的投影和发光', '占用高度的顶部 Banner'];
        aestheticGuidelines = '大面积留白与超高对比度，操作点对点直接呈现实时表格，拒绝一切拖慢取数流的操作动画。';
        break;
      case '科技智能':
        toneThemeText = '深灰/钛金为主的极简暗中深色调，注重实时计算日志输出，配备流微渐变的单色发光点（如 emerald-500 指示灯）。';
        preventDirectives = ['科幻太空模拟信号波形', '花哨但不可读的环形进度条'];
        aestheticGuidelines = '利用 JetBrains Mono 等等宽字体呈现清洗日志。使用精致的 SVG 图表渲染多表合并逻辑树。';
        break;
      default:
        toneThemeText = '低饱和度中性 SaaS 范式（Zinc/Slate），强调功能优先和数据的可操作性，配以优雅精细表格。';
        preventDirectives = ['营销页大渐变背景', '过多虚假的 Mock 信息'];
        aestheticGuidelines = '中性冷灰色调。重点在于状态转换（未连接、同步中、对账错误拦截、数据干净就绪）。';
    }

    if (cardId === 'workspace') {
      return {
        brief: {
          productType: '企业级全岗位数据自动化协作中台 (Enterprise All-in-One Data Platform)',
          targetUser: `面向：${user} (跨岗位多岗位业务提效协同)。解决公司级内耗困境。`,
          coreTasks: `1. 6大岗效中心快速一键切岗 ➔ 2. 托拽多表并合并(多源 Merge) ➔ 3. 智能清洗去噪(去重/格式归一) ➔ 4. 在线核对脏数据并『${correctionStyle}』 ➔ 5. 统一口径自助极速取数与定时报表自动推送飞书/钉钉。`,
          recommendedLayout: '专业高密度三栏式作业空间：左侧【6大角色提效侧边舱】，中间【多表合并与零代码清洗主控制台】，右侧【流式清洗诊断控制台与脏数据一键核对面板】。',
          recommendedStyle: `遵循【${tone}】基调。${toneThemeText}`,
          coreComponents: [
            '6大角色专属提效侧滑舱 (Data Analyst / Operations / Product / Finance / Customer Service / R&D)',
            '可视化 Excel 拖拽合并主键树 (Drag Merge Table Tree)',
            `脏数据人工在线修正工作流 (采用指定形式:「${correctionStyle}」)`,
            `多岗位提效仪表盘 (着重展示:「${defaultFocus}」)`,
            '企业级指标字典与一致性元数据字典',
            '定时自动报表分发器 (Cron Web Console)'
          ],
          necessaryStates: [
            '脏数据核对拦截：对账失败或遇到缺失值时，右侧对应单元格自动标红，显示修改建议与改写比对',
            '指标口径冲突强预警：检测到不同岗位对同一指标（如“日活”）定义有冲突时，顶部弹窗强拦截并导向口径字典一键对齐',
            '自动清洗流式处理：合并多张巨量表时，右侧实时流式滚屏输出 SQL 运行日志和进度百分比',
            '定时分发自动化就绪：定时推送成功后，看板显示带有飞书/钉钉微标的“绿灯”状态，标注推送时间、时效、分发渠道',
            '取数冷启动空态：首次进入某岗效中心，提供一键填充“10万行真实脏数据合并清洗场景”的新手演示'
          ],
          notRecommended: [
            ...preventDirectives,
            '不可交互、仅仅是一幅死图的伪雷达图',
            '未说明计算公式的虚假进度统计',
            '直接拉取生产库（不安全、高风险），必须限制为只读从库'
          ]
        },
        vibePrompt: `请为我设计并实现一个「${demand}」的专业级全岗位数据自动化提效中台 Web UI 界面原型。

【核心定位】
面向全岗位（数据分析师、运营、产品、财务、客服、研发），核心解决多表合并、脏数据人工修正、手工 Excel 清洗等公司普遍内耗，期望调性为「${tone}」。

【页面布局骨架】
必须采用三栏高生产力 IDE 布局：
1. **左侧【岗效角色仓】(Role Sidebar)**: 
   - 包含 6 大岗位专属入口面板（数据分析师、运营、产品、财务、客服、研发）。
   - 用户可以一键切换不同的岗位特权和特有提效工具组件。
2. **中间【数据清洗与多表合并编辑器】(Central Sandbox)**:
   - 包含 Excel/CSV 拖拽上传作业区（支持多源拖入）。
   - 自动推演并图形化展示“多表 Merge 树”，支持勾选关联主键。
   - 丰富的零代码清洗开关（去空格、去除特殊字符、日期格式归一、去重复）。
3. **右侧【流式诊断与脏数据在线核对控制台】(Diagnostic & Verification Panel)**:
   - 展现 AI 洗数据时的流式运行日志。
   - 脏数据在线核对：提供「${correctionStyle}」，允许用户一键修正，对对账差异进行高亮拦截并一秒纠偏。

【视觉调性标准】
- 视觉风格：${toneThemeText}。
- 视觉细节：${aestheticGuidelines}。
- 严厉规避：${preventDirectives.join('、')}。
- 信息密度：极高密度。排版务必克制、像真正银行或顶级 SaaS 的精密管理控制台，而非华而不实的概念 Demo。

【必须体现的状态】
- **脏数据冲突拦截状态**: 合并出差异账件或拼写乱码时，右侧表格以醒目浅红底高亮，提供修正输入框。
- **指标口径一致性校验**: “活跃用户”等指标名称冲突时，拦截提醒并一键同步字典口径。
- **自动清洗定时分发**: 配置好定时任务后，分发模块高亮亮绿灯状态，支持“立即测试发送”。

【技术交付规范】
所有表格、参数滑块、切换角色 Tab、规则开关必须 100% 可点击并有状态交互。所有异常值支持双击修改或侧边一键核正。`,
        checklist: [
          { id: 'ck1', rule: '多岗位切换层级是否一目了然', status: 'satisfied', description: '左侧角色仓可以一键切换 6 大岗位专属控制面板，各岗位功能互不干扰，逻辑清晰。' },
          { id: 'ck2', rule: '多源合并与清洗去噪是否功能可用', status: 'satisfied', description: '中间工作台提供了可视化的多表 Merge 树和丰富开关，财务与运营可实现零代码 Excel 归一。' },
          { id: 'ck3', rule: '脏数据修正交互设计是否安全防错', status: 'satisfied', description: '在右侧工作区高亮拦截账件/工单差异，提供双栏比对或直接网格改写，100% 避免人工导表打字写错。' },
          { id: 'ck4', rule: '指标口径冲突拦截及字典规范性', status: 'satisfied', description: '支持实时扫描指标冲突，并拉取口径元数据血缘字典强行统一。' },
          { id: 'ck5', rule: '定时任务飞书/钉钉分发与安全限制', status: 'supplementary', description: '通过定时分发“绿灯”状态显示运行情况。提示研发注意避免从生产库拉取大范围时序数据，降低慢 SQL 风险。' },
          { id: 'ck6', rule: '零代码取数 API 生成易用度校验', status: 'satisfied', description: '分析师和研发可通过勾选维度一键发布取数 API，界面包含高频 API 时延与高并发波动图表。' }
        ]
      };
    } else if (cardId === 'taskflow') {
      return {
        brief: {
          productType: '轻量级多岗位数据自助服务工作流 (Self-Service Data Workspace)',
          targetUser: `面向想要极速合并 Excel、极低频操作、期望 30 秒能拿到标准报表的小白业务人员。`,
          coreTasks: '1. 拖入需要合并的多份 Excel ➔ 2. 勾选关联主键 ➔ 3. 开启一键清洗开关 ➔ 4. 下载干净的合并表格并直接推送到部门。',
          recommendedLayout: '单页焦点式卡片流。页面最精简，剔除所有无关侧边栏，将全部视野聚焦在表格格式化处理上。',
          recommendedStyle: `遵循【${tone}】基调。采用卡片式圆角与渐进式向导设计，提供充盈的拖拽边界。`,
          coreComponents: [
            'Excel 拖拽自适应作业仓 (Drag & Drop Frame)',
            '常见数据清洗去噪规则开关组件',
            '简洁多表 Merge 键绑定器',
            '干净数据极速下载与渠道分发组件'
          ],
          necessaryStates: [
            '冷启动拖入状态：中央大卡片显示“请拖入微信、支付宝等多渠道 Excel 账单”虚线框',
            '格式解析自适应中：拖入表后，中央闪烁温和的波澜发光，AI 解析并对齐表头列名',
            '脏数据极速核对：对于有明显缺陷的 5 条缺失记录，在抽屉中显示红色标注并支持一键智能填充/跳过',
            '下载与飞书推送成功：展示大大的亮绿对勾，显示“已成功分发 12 个部门负责人”气泡提示'
          ],
          notRecommended: [
            ...preventDirectives,
            '复杂的后台持久化库结构配置',
            '大量的技术性数据库参数（如 Buffer、连接池、SQL 注入拦截）'
          ]
        },
        vibePrompt: `请为我设计一个「${demand}」的极简单页焦点式自助数据清洗与取数工具 UI 原型。

【核心心智】
面向财务、客服及运营小白，极度追求无门槛导数与 Excel 清洗，期望 30 秒出结果。

【页面布局骨架】
采用「聚焦单页渐进式卡片流」布局：
1. **中置【Excel 拖拽作业仓】**: 
   - 支持拖入多张不同渠道的杂乱 Excel 表。
   - 自动读取表头，用户只需轻点一个“绑定”按钮将两表关联（例如：将财务微信账单与业务流水的“交易单号”对齐）。
2. **下方【常用去噪开关带】**:
   - 排列去重复行、去除尾部空格、转换日期格式（统一成 YYYY-MM-DD）、缺失值自动填充为 0 的快捷开关。
3. **右侧【干净数据下载与极速分发抽屉】(Slide-over)**:
   - 清洗合并通过后滑出抽屉，显示清洗前后的记录差异对照。
   - 带有巨大的“一键导出 Excel”按钮，以及“一键推送至飞书/钉钉对应部门”配置。

【视觉调性】
- 风格属于：${toneThemeText}。
- 绝对不要：${preventDirectives.join('、')}。
- 信息密度：中低密度，突出操作第一。

【交付规范】
所有拖拽动作、开关点击、下载反馈须具备良好的微动效及反馈，零废代码。`,
        checklist: [
          { id: 'ck1', rule: '界面主任务是否极致单线程', status: 'satisfied', description: '抛弃所有多级菜单与技术参数，用户只需“拖表-选关联键-一键清洗-下载”即可。' },
          { id: 'ck2', rule: '格式自适应表头解析校验', status: 'satisfied', description: '表头列名不一致时自动模糊对齐，无需人工多次手工 Excel 剪切粘贴。' },
          { id: 'ck3', rule: '脏数据在线修正与极速填充', status: 'satisfied', description: '抽屉中高亮 1% 脏数据缺失列，支持一键用平均值/上一行/0 填充。' },
          { id: 'ck4', rule: '飞书钉钉分发及成功正反馈', status: 'satisfied', description: '分发成功后有清爽的绿光气泡鼓励，强化小白用户的职能获得感。' }
        ]
      };
    } else {
      // dashboard
      return {
        brief: {
          productType: '企业指标元数据字典与自动化数据流调度中台 (Metrics Directory & Data Pipeline)',
          targetUser: `面向数据分析师与研发工程师。专攻指标口径不统一、重复导数内耗与慢 SQL 数据库崩溃问题。`,
          coreTasks: '1. 查看/编辑企业统一指标口径字典 ➔ 2. 勾选维度自助配置取数 API ➔ 3. 设定每日固定报表定时调度任务 ➔ 4. 实时监控数据流水线运行状态与性能负载。',
          recommendedLayout: '高信息密度分析看板布局。上：全局指标口径一致性雷达与冲突阻断；中左：自助 API 生成与取数网格；中右：定时调度 Pipeline 仪表；下：运行日志与并发负载走势。',
          recommendedStyle: `遵循【${tone}】基调。采用钛金暗色或冷灰风格，强调系统性能、运行状况与图表血缘的可读性。`,
          coreComponents: [
            '多维指标口径一致性检测仪 (Metrics Alignment Radar)',
            '定时报表 Cron 自动化分发网格',
            '只读从库取数 API 零研发一键配置器',
            '数据处理 Pipeline 实时日志终端',
            '时序慢 SQL 与并发负载监控图'
          ],
          necessaryStates: [
            '口径定义冲突标红：当检测到两个部门对“活跃买家”口径定义产生冲突（一个是登录，一个是下单）时，看板对应项亮起红色叹号，强制阻断无法同步并显示一键合并修复向导',
            'Pipeline 执行中动态：定时任务运行中时，调度卡片框闪烁绿光波动，并实时输出 shell-like 的日志日志代码',
            '冷启动占位：当无定时任务时，展示清晰的数据血缘占位图谱，引导“勾选表字段生成首个 API 调度”',
            'API 性能预警：时低时高、耗时过长的慢 SQL 取数操作，在 API 性能卡片中以亮橙色折线高亮，提醒研发增加只读缓存'
          ],
          notRecommended: [
            ...preventDirectives,
            '缺乏真实技术底座的无脑炫酷大屏'
          ]
        },
        vibePrompt: `请为我设计一个「${demand}」的数据字典标准化与自动化定时中心 UI 看板高保真原型。

【核心受众】
数据分析师与研发，致力于从根源对齐公司口径、一劳永逸自动化定时导表、确保生产环境数据库绝对安全。

【页面布局骨架】
采用「全景分析仪表与 Pipeline 控制器」组合布局：
1. **顶部【全局指标口径校验板】**:
   - 包含公司所有一级二级核心指标口径一致性状态（100% 对齐、存在口径冲突、血缘异常）。
   - 支持可视化查看某一指标的“SQL 公式与加工表血缘关系”。
2. **中间【自助取数 API 配置器 & 定时调度中枢】**:
   - 左半部分：允许分析师勾选表、维度、过滤条件，不写一行代码一键发布获取数据的 Open API。
   - 右半部分：直观配置定时报表任务（Cron 定时器组合键），并配置分发终点（飞书群 Webhook / 石墨文档 / 邮箱 / 腾讯文档）。
3. **底部【实时 Pipeline 日志控制台】(Terminal-style)**:
   - 带有 JetBrains Mono 字体的等宽命令行终端。
   - 实时流式输出定时报表提取、清洗、归一和推送的后台运行日志，支持“Reload Stats”与“手动重试 Pipeline”。

【视觉设计契合】
- 视觉风格：${toneThemeText}。
- 绝对避免：${preventDirectives.join('、')}。
- 信息密度：中高级科技密度。

【交付要求】
多表字段选择勾选框、定时运行开关、实时运行日志面板完全可用，图表以高精度 SVG 渲染血缘和性能监控折线。`,
        checklist: [
          { id: 'ck1', rule: '口径一致性管理及阻断机制是否合理', status: 'satisfied', description: '指标发生口径冲突时自动标红拦截，一站式保障公司 Single Source of Truth，彻底消灭扯皮。' },
          { id: 'ck2', rule: '定时报表分发器和 API 配置器逻辑是否闭环', status: 'satisfied', description: '内置 Cron 可视化配置和飞书/腾讯文档分发状态指示，无需研发重复写导数脚本。' },
          { id: 'ck3', rule: '生产安全保障与慢 SQL 拦截检测', status: 'satisfied', description: '配置只读从库拉取，并在下方提供负载与时延波动曲线，防止一次性大容量取数拖垮生产服务器。' },
          { id: 'ck4', rule: '等宽日志控制台与错误代码追踪', status: 'satisfied', description: '终端流式日志对排查调度故障极具开发亲和力，支持一键重跑失败脚本。' }
        ]
      };
    }
  }

  // Fallback default output for interview PM trainer
  let toneThemeText = '';
  let preventDirectives: string[] = [];
  let aestheticGuidelines = '';

  switch (tone) {
    case '专业可信':
      toneThemeText = '低饱和度冷灰 SaaS（Slate/Zinc），高对比层级，精细边框，中性排版。';
      preventDirectives = ['高纯度霓虹发光', '大面积渐变色背景', '华而不实的3D立体浮雕图标', '营销倾向的特大情绪化口号'];
      aestheticGuidelines = '使用单色细线 (1px border-slate-200)、清晰的文本底色。';
      break;
    default:
      toneThemeText = '标准 SaaS。';
      preventDirectives = [];
      aestheticGuidelines = '低饱和主调搭配精细边框。';
  }

  return {
    brief: {
      productType: `${demand} (基于 AI PM 智能追问定制形态)`,
      targetUser: `面向${user}，匹配高频硬核的工作习惯`,
      coreTasks: `1. 快速检索/筛选题目 -> 2. 在多控制作答区答题/输入 -> 3. 基于追问决定的「${feedbackFormat}」获取 AI 反馈 -> 4. 复盘并翻看历史积累`,
      recommendedLayout: '专业级：三栏 IDE 式同屏极高效率布局。左：任务树；中：输入与诊断激活区；右：AI 系统流式反馈。',
      recommendedStyle: `整体遵循【${tone}】视觉基调。${toneThemeText}`,
      coreComponents: [
        '题库卡片抽屉 (Category Drawer)',
        '多模态作答编辑器 (Rich Answer Area with word counters)',
        `AI 模块：基于追问指定的「${feedbackFormat}」高级卡片`,
        `大厂匹配对齐指标器 (对应选项：「${enterpriseMatch}」)`,
        '底部快捷调度/重试操作台 (Action System Bar)'
      ],
      necessaryStates: [
        '未开始答题：右侧呈“等待作答”气垫提示，不出现空洞插画',
        '输入进行中：中栏显示自动保存字符计算，状态指示灯为 Active',
        `AI 反馈推进：采用「字元流式打字机动画」流式展现 10 项专业检测进度`,
        '评测完全反馈：评定维度评分高亮，并对应修改建议',
        '调用失败并重试：右下方轻量 Toast 报警'
      ],
      notRecommended: [
        ...preventDirectives,
        '营销页式头图与高饱和促销海报'
      ]
    },
    vibePrompt: `请为我设计并实现一个「${demand}」的专业级 Web UI 界面原型。`,
    checklist: [
      { id: 'ck1', rule: '页面主任务与层级是否一目了然', status: 'satisfied', description: `界面采用工作台布局，用户一秒即可知晓从左选题目、中作答、右看 AI。` }
    ]
  };
}
