import React, { useState, useEffect } from 'react';
import { UserPreferences } from '../types';
import { Sparkles, HelpCircle, User, Activity, Palette, Send, Compass, AlertCircle } from 'lucide-react';

interface PreferenceInputProps {
  onGenerate: (prefs: UserPreferences) => void;
  isInitialEmpty: boolean;
  preferences: UserPreferences;
}

export const PreferenceInput: React.FC<PreferenceInputProps> = ({ onGenerate, isInitialEmpty, preferences }) => {
  // Setup default state
  const [demandText, setDemandText] = useState(preferences.demandText);
  const [userSegment, setUserSegment] = useState(preferences.userSegment);
  const [frequency, setFrequency] = useState(preferences.frequency);
  const [styleTone, setStyleTone] = useState(preferences.styleTone);

  // Dynamic system questionnaires state based on input
  const [dynamicQuestions, setDynamicQuestions] = useState<Array<{
    id: string;
    question: string;
    options: string[];
    selected: string;
  }>>([]);

  const userSegments = ['全部岗位', '数据分析师', '运营人员', '产品经理', '财务人员', '客服支持', '研发工程师'];
  const frequencies = ['高频工作台', '偶尔使用工具', '一次性生成', '长期学习训练'];
  const styleTones = ['专业可信', '简洁高效', '温暖易学', '科技智能', '活泼轻量'];

  useEffect(() => {
    setDemandText(preferences.demandText);
    setUserSegment(preferences.userSegment);
    setFrequency(preferences.frequency);
    setStyleTone(preferences.styleTone);
  }, [preferences.demandText, preferences.frequency, preferences.styleTone, preferences.userSegment]);

  // Update dynamic questionnaires on text change to deepen PM prompts
  useEffect(() => {
    const txt = demandText.trim().toLowerCase();
    let qList = [];

    if (txt.includes('面试') || txt.includes('培训') || txt.includes('学习') || txt.includes('训练')) {
      qList = [
        {
          id: 'q_feedback_format',
          question: '🤔 追问 1：AI 生成的核心反馈，建议通过哪种视觉载体呈现？',
          options: ['三维维度评分滑块 + 红线改写对比', '五维雷达图能力定位', '轻量结构化要点诊断清单'],
          selected: '三维维度评分滑块 + 红线改写对比'
        },
        {
          id: 'q_enterprise_match',
          question: '🤔 追问 2：是否需要融入“特定大厂 PM 能力模型”（字节、腾讯等）的匹配权重？',
          options: ['融入大厂标准（匹配度打分卡）', '保持通用 AI 指导标准'],
          selected: '融入大厂标准（匹配度打分卡）'
        }
      ];
    } else if (txt.includes('看板') || txt.includes('分析') || txt.includes('数据') || txt.includes('统计') || txt.includes('自动化') || txt.includes('提效')) {
      qList = [
        {
          id: 'q_feedback_format',
          question: '🤔 追问 1：6大岗位中，您的系统最优先专注攻坚提效的业务模块是？',
          options: [
            '数据分析师-自助拖拽取数与指标口径定义',
            '运营人员-活动报表多源自动 Merge 拼接与分发',
            '财务人员-手工对账 Excel 规则自动清洗归一'
          ],
          selected: '数据分析师-自助拖拽取数与指标口径定义'
        },
        {
          id: 'q_enterprise_match',
          question: '🤔 追问 2：关于脏数据的“人机交互核对修正”，您期望哪种设计？',
          options: [
            '双栏对比改写：左源数据(脏)，右输入修正(带字段校验)',
            '快捷网格修正：直接在网页表格单元格中双击编辑并记录溯源',
            '智能免审推流：99% 置信度脏数据自动用 AI 预处理，人工只需审核 1% 异常件'
          ],
          selected: '双栏对比改写：左源数据(脏)，右输入修正(带字段校验)'
        }
      ];
    } else {
      qList = [
        {
          id: 'q_complexity',
          question: '🤔 追问 1：产品对于 AI 异步交互在页面上的复杂度期许是？',
          options: ['分步流式卡片，强调高互动心流', '三栏同屏、多任务树无刷新 IDE 式环境', '单场景快速提交 MVP 极简形态'],
          selected: '三栏同屏、多任务树无刷新 IDE 式环境'
        },
        {
          id: 'q_ai_stream',
          question: '🤔 追问 2：希望如何传达 AI 接口的处理时间？',
          options: ['字元流式打字机动画（带有智能感呼吸流）', '局部骨架微光 (Skeleton Light) 静音载入'],
          selected: '字元流式打字机动画（带有智能感呼吸流）'
        }
      ];
    }
    setDynamicQuestions(qList);
  }, [demandText]);

  // Smart dynamic understanding generator that reacts in real-time
  const [understanding, setUnderstanding] = useState({
    type: 'AI 学习训练工具',
    intent: '练习回答、获得诊断反馈、保存自省历史',
    direction: '三栏布局工作台 / 暗色智能视窗'
  });

  useEffect(() => {
    // Dynamically infer smart system recommendations based on current selections
    let type = 'AI 训练与交互式诊断';
    let intent = '选择题目、输入练习内容、获取 AI 分析';
    let direction = '三栏式工作台 (Slate/Zinc)';

    const txt = demandText.trim().toLowerCase();
    if (txt.includes('数据自动化') || txt.includes('全岗位提效') || txt.includes('数据自动化工具') || txt.includes('内部数据')) {
      type = '企业级全岗位数据自动化协作中台';
      intent = '多源 Merge、Excel 零代码去噪清洗、在线对账、定时分发';
    } else if (txt.includes('面试') || txt.includes('培训') || txt.includes('学习') || txt.includes('训练')) {
      type = 'AI 学习与面试实战沙盒';
      intent = '即时答卷、AI 润色对照、弱项专项练习';
    } else if (txt.includes('生成') || txt.includes('助理') || txt.includes('画') || txt.includes('图')) {
      type = '智能创作/生成加速器';
      intent = '语义转化、参数滑块控制、草图多版本对比';
    } else if (txt.includes('看板') || txt.includes('分析') || txt.includes('数据') || txt.includes('统计') || txt.includes('清洗')) {
      type = '企业级全岗位数据自动化中台';
      intent = '多源对账清洗、行为漏斗自动化、取数接口自助服务';
    } else if (txt === '') {
      type = '待输入特定产品需求...';
      intent = '未检测到具体业务流，请完善左上方输入';
    }

    if (frequency === '一次性生成' || frequency === '偶尔使用工具') {
      direction = '单页聚焦框架 (聚焦单卡 / 抽屉式反馈)';
    } else if (frequency === '长期学习训练') {
      direction = '成长指标仪表盘 + 侧栏卡片队列';
    } else {
      direction = '高生产力三栏作业台 (Slate/Zinc 灰)';
    }

    setUnderstanding({ type, intent, direction });
  }, [demandText, userSegment, frequency, styleTone]);

  // Update specific selected dynamic question choice
  const handleSelectDynamic = (qId: string, value: string) => {
    setDynamicQuestions(prev => prev.map(q => q.id === qId ? { ...q, selected: value } : q));
  };

  // Execute generation callback
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Package dynamic options
    const dynamics: Record<string, string> = {};
    dynamicQuestions.forEach(q => {
      dynamics[q.id] = q.selected;
    });

    onGenerate({
      demandText: demandText.trim(),
      userSegment,
      frequency,
      styleTone,
      dynamicAnswers: dynamics
    });
  };

  const handlePresetSelect = (preset: string) => {
    setDemandText(preset);
  };

  const presets = [
    '我想做一个公司内部数据自动化工具完整展开（全岗位提效），覆盖数据分析师、运营、产品、财务、客服、研发，核心解决重复导表、手工 Excel 清洗、多表合并、每日固定报表、脏数据人工修正、指标口径不统一、取数耗时长等公司普遍内耗，分 6 大类，附带落地价值、实现方式、业务场景。',
    '做一个 SaaS 金融交易风险预警控制台，需要直观看数据趋势、异动点、以及可操作的用户日志。',
    '帮我做一个轻量级的 AI 写文案助手，只有一个输入框、三个参数滑杆，右边直接点击复制结果。'
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 px-2.5 bg-indigo-50 border border-indigo-100 rounded-md text-indigo-600 font-bold text-xs">
            01
          </div>
          <h3 className="font-bold text-sm md:text-base text-slate-800 tracking-tight">需求输入与引导</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">100% Client Wizard</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Demand text box */}
        <div className="space-y-1.5 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <label htmlFor="demand-input" className="flex items-center gap-1">
              <span>应用需求描述</span>
              <span className="text-red-500 font-bold">*</span>
            </label>
            <span className="text-slate-400 font-normal">支持日常口语表达</span>
          </div>

          <textarea
            id="demand-input"
            rows={3}
            className="w-full text-xs p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-sans leading-relaxed text-slate-750 placeholder-slate-400"
            value={demandText}
            onChange={(e) => setDemandText(e.target.value)}
            placeholder="例如：我想做一个 AI 写作助理，能够选择不同文风、输入大纲，获得三段候选段落..."
          />

          {/* Presets shortcut */}
          <div className="pt-1.5 space-y-1">
            <span className="text-[10px] text-slate-400 block font-medium">✨ 没灵感？试试这些默认模版：</span>
            <div className="flex flex-col gap-1">
              {presets.map((preset, index) => {
                const isSelected = demandText.trim() === preset.trim();
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className={`text-[11px] text-left px-2 sm:px-2.5 py-1.5 rounded border transition-all truncate block cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/50 border-indigo-200 text-indigo-700 font-medium'
                        : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50/70 hover:text-slate-800'
                    }`}
                  >
                    💡 {preset}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question 1: User Segment */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>问题 1：目标受众是谁？</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {userSegments.map((seg) => {
              const isSelected = userSegment === seg;
              return (
                <button
                  type="button"
                  key={seg}
                  onClick={() => setUserSegment(seg)}
                  className={`text-[11px] px-2.5 py-1.5 rounded-md border cursor-pointer font-medium transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {seg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2: Usage Frequency */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span>问题 2：用户使用频率如何？</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {frequencies.map((freq) => {
              const isSelected = frequency === freq;
              return (
                <button
                  type="button"
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`text-[11px] px-2 py-1.5 rounded-md border cursor-pointer font-medium transition-all text-center ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {freq}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Style tone */}
        <div className="space-y-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <span>问题 3：期望界面给人的感觉是？</span>
          </label>
          <div className="grid grid-cols-3 gap-1">
            {styleTones.map((toneOpt) => {
              const isSelected = styleTone === toneOpt;
              return (
                <button
                  type="button"
                  key={toneOpt}
                  onClick={() => setStyleTone(toneOpt)}
                  className={`text-[11px] p-1.5 rounded-md border cursor-pointer font-medium transition-all text-center ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {toneOpt}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Dynamic In-depth Questions Section */}
        {dynamicQuestions.length > 0 && (
          <div className="bg-indigo-50/30 border border-indigo-100 rounded-lg p-3 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span className="text-[11px] font-bold text-indigo-950 tracking-wide uppercase">AI 智能追问探索</span>
              <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-semibold">提升 Prompt 颗粒度</span>
            </div>
            
            <p className="text-[10px] text-slate-400 leading-snug">
              已根据上方需求自动识别核心分歧点。请 PM 自助明确下述产品细节：
            </p>

            <div className="space-y-3 pt-1">
              {dynamicQuestions.map((q) => (
                <div key={q.id} className="space-y-1.5 text-left">
                  <div className="text-[11px] font-semibold text-slate-700 leading-relaxed">
                    {q.question}
                  </div>
                  <div className="flex flex-col gap-1 pl-1">
                    {q.options.map((opt) => {
                      const isSelected = q.selected === opt;
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => handleSelectDynamic(q.id, opt)}
                          className={`text-[10px] text-left px-2 py-1.5 rounded border cursor-pointer font-medium transition-all ${
                            isSelected
                              ? 'bg-white border-indigo-400 text-indigo-650 shadow-sm font-semibold'
                              : 'bg-slate-50/50 border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                          }`}
                        >
                          {isSelected ? '🎯' : '○'} {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          type="submit"
          id="btn-generate-plans"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-lg border border-transparent shadow shadow-indigo-100 cursor-pointer active:scale-[0.98] transition-all"
        >
          <Sparkles className="w-4 h-4 animate-spin-once" />
          <span>生成专业 UI 方案</span>
        </button>
      </form>

      {/* System Recapped Understanding section */}
      <div className="bg-slate-50/80 border border-slate-150 rounded-lg p-3.5 space-y-2.5">
        <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span>系统已理解需求摘要</span>
        </div>
        
        <div className="text-[11px] space-y-1.5 leading-relaxed text-slate-600">
          <div className="flex items-start gap-1">
            <span className="font-semibold text-slate-500 w-16 shrink-0">产品定位:</span>
            <span className="text-slate-850 font-medium">{understanding.type}</span>
          </div>
          <div className="flex items-start gap-1">
            <span className="font-semibold text-slate-500 w-16 shrink-0">核心心智:</span>
            <span className="text-slate-850">{understanding.intent}</span>
          </div>
          <div className="flex items-start gap-1">
            <span className="font-semibold text-slate-500 w-16 shrink-0">设计流向:</span>
            <span className="bg-emerald-50 text-emerald-800 px-1 rounded border border-emerald-100 font-mono text-[9px] tracking-tight">
              {understanding.direction}
            </span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-slate-200/60 flex items-center gap-1 text-[10px] text-slate-400">
          <AlertCircle className="w-3 h-3 text-slate-400" />
          <span>大模型已根据上述关联参数随时待命输出。</span>
        </div>
      </div>
    </div>
  );
};
