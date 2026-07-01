/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { UserPreferences, RecommendationCard, StrategyOutput } from './types';
import { generateRecommendations, generateStrategyOutput } from './mockData';
import { PreferenceInput } from './components/PreferenceInput';
import { RecommendationCardComponent } from './components/RecommendationCardComponent';
import { RecommendationGraph } from './components/RecommendationGraph';
import { DeliverablesPanel } from './components/DeliverablesPanel';
import { RoleMatrixPanel } from './components/RoleMatrixPanel';
import { 
  Compass, 
  HelpCircle, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Laptop, 
  BookOpen, 
  History, 
  ArrowRight,
  RefreshCw,
  Terminal,
  Grid3X3,
  Bookmark
} from 'lucide-react';

export default function App() {
  // Master User Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>({
    demandText: '我想做一个公司内部数据自动化工具完整展开（全岗位提效），覆盖数据分析师、运营、产品、财务、客服、研发，核心解决重复导表、手工 Excel 清洗、多表合并、每日固定报表、脏数据人工修正、指标口径不统一、取数耗时长等公司普遍内耗，分 6 大类，附带落地价值、实现方式、业务场景。',
    userSegment: '全部岗位',
    frequency: '高频工作台',
    styleTone: '专业可信',
  });

  // Recommendation cards state based on preferences
  const [cards, setCards] = useState<RecommendationCard[]>([]);
  // Active selected recommendation option (Card ID)
  const [selectedCardId, setSelectedCardId] = useState<string>('workspace');
  
  // Rationale Graph overlay/drawer container state
  const [activeGraphCard, setActiveGraphCard] = useState<RecommendationCard | null>(null);

  // States to represent simulated "AI computing/generation"
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationSteps, setGenerationSteps] = useState<string>('就绪');
  const [hasGeneratedYet, setHasGeneratedYet] = useState<boolean>(true); // default true for premium immediate experience

  // Core generated outputs container
  const [strategyOutput, setStrategyOutput] = useState<StrategyOutput | null>(null);

  // Calculate recommendation options and current active outputs
  useEffect(() => {
    const recommendedCards = generateRecommendations(preferences);
    setCards(recommendedCards);
    
    // Automatically match output
    const output = generateStrategyOutput(selectedCardId, preferences);
    setStrategyOutput(output);
  }, [preferences, selectedCardId]);

  // Handle CTA on left panel
  const handleGenerate = (newPrefs: UserPreferences) => {
    setIsGenerating(true);
    setGenerationSteps('解析输入定位并提取实体...');
    
    // Smooth stepwise transition to mimic high-performance AI reasoning
    setTimeout(() => {
      setGenerationSteps('关联底层 280+ UI 知识图谱节点...');
      setTimeout(() => {
        setGenerationSteps('量化组件边界与防 Demo 化方案...');
        setTimeout(() => {
          setPreferences(newPrefs);
          setIsGenerating(false);
          setHasGeneratedYet(true);
          
          // Re-evaluate best suited card
          if (newPrefs.frequency === '一次性生成' || newPrefs.frequency === '偶尔使用工具') {
            setSelectedCardId('taskflow');
          } else if (newPrefs.frequency === '长期学习训练') {
            setSelectedCardId('dashboard');
          } else {
            setSelectedCardId('workspace');
          }
          
          // Reset graph if opened
          setActiveGraphCard(null);
        }, 300);
      }, 250);
    }, 200);
  };

  // Handle resetting the board back to empty initial guide states
  const handleReset = () => {
    setPreferences({
      demandText: '',
      userSegment: '全部岗位',
      frequency: '偶尔使用工具',
      styleTone: '专业可信',
    });
    setHasGeneratedYet(false);
    setSelectedCardId('taskflow');
    setActiveGraphCard(null);
  };

  // Fast starter template loader
  const handleLoadTemplate = () => {
    setPreferences({
      demandText: '我想做一个公司内部数据自动化工具完整展开（全岗位提效），覆盖数据分析师、运营、产品、财务、客服、研发，核心解决重复导表、手工 Excel 清洗、多表合并、每日固定报表、脏数据人工修正、指标口径不统一、取数耗时长等公司普遍内耗，分 6 大类，附带落地价值、实现方式、业务场景。',
      userSegment: '全部岗位',
      frequency: '高频工作台',
      styleTone: '专业可信',
    });
    setSelectedCardId('workspace');
    setHasGeneratedYet(true);
    setActiveGraphCard(null);
  };

  // Get current active card title
  const getSelectedCardTitle = () => {
    const active = cards.find(c => c.id === selectedCardId);
    return active ? active.title : '专业 AI 训练工作台';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans leading-relaxed selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* SaaS Global Navigation bar */}
      <header className="bg-white border-b border-slate-200/90 py-3.5 px-4 md:px-8 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3.5">
          
          {/* Brand group */}
          <div className="flex items-center gap-3">
            <div className="relative group/logo">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-sm shadow-indigo-150 transition-transform group-hover/logo:scale-105">
                <Layers className="w-5 h-5 absolute inset-2.5 opacity-40 animate-pulse" />
                <Grid3X3 className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" title="运行环境在线" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 tracking-tight text-base md:text-lg">AI PM UI Copilot</h1>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100 uppercase tracking-widest leading-none">
                  SaaS Vibe Workbench
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-medium">
                基于界面风格图谱，将模糊想法转化为研发级 UI Brief 与 Vibe Prompt。
              </p>
            </div>
          </div>

          {/* Quick status counters */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden lg:flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-slate-500 border border-slate-200">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>知识图谱: </span>
              <strong className="text-slate-700 font-mono">284 节点 / 512 关联路径</strong>
            </div>

            <div className="flex items-center gap-1.5 bg-indigo-50/50 px-3 py-1.5 rounded-lg text-indigo-800 border border-indigo-100/60">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>智能匹配器: </span>
              <strong className="text-indigo-900">100% 规则覆盖</strong>
            </div>
          </div>

        </div>
      </header>

      {/* Primary Workspace Space */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* Onboarding Guidance banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg shrink-0 border border-emerald-100 hidden sm:block">
              <Compass className="w-5 h-5 animate-spin-once" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-xs md:text-sm flex items-center gap-1">
                <span>⚡ 交互式 AI PM 工作流：</span>
                <span className="text-slate-400 font-normal">拒绝无意义 AI 彩光，回归极简科学工具。</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                在这里：<b>① 输入模糊想法与特征</b> ➔ <b>② 智能评估并挑选最适配您的界面方案卡片</b> ➔ <b>③ 复制生成的精确大编码 Prompt / UI Brief</b>。
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end border-t border-slate-100 pt-3 md:pt-0 md:border-0 text-xs">
            <span className="text-slate-400 truncate text-[11px]">不小心清空了？</span>
            <button
              onClick={handleLoadTemplate}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-indigo-600 border border-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0"
              id="btn-load-sample"
            >
              填充数据自动化需求
            </button>
          </div>
        </div>

        {/* Dynamic transition loading spinner for state change */}
        {isGenerating && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center space-y-3 shadow-md animate-fade-in">
            <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin" />
            <h4 className="font-bold text-slate-800 text-sm">正在实时推算最契合的 UI 映射准则</h4>
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-ping"></span>
              <p className="text-indigo-800 text-[11px] font-mono leading-none">{generationSteps}</p>
            </div>
            <p className="text-xs text-slate-400">我们将对受众、频率、调性进行 32 维权重拓扑推演，为您生成防 Demo 化交付 Prompt...</p>
          </div>
        )}

        {/* Main Work Surface - Three Columns layout */}
        {!isGenerating && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* COLUMN 1: LEFT INPUT PANEL (4 cols) */}
            <section className="lg:col-span-4" aria-label="Preference configurations">
              <PreferenceInput onGenerate={handleGenerate} isInitialEmpty={!hasGeneratedYet} />
            </section>

            {/* COLUMN 2: MIDDLE STRATEGY RECOMMENDATIONS (4 cols) */}
            <section className="lg:col-span-4 flex flex-col justify-between" aria-label="Strategy decisions">
              <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm h-full flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  {/* Title Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1 px-2.5 bg-indigo-50 border border-indigo-100 rounded-md text-indigo-600 font-bold text-xs">
                        02
                      </div>
                      <h3 className="font-bold text-sm md:text-base text-slate-800 tracking-tight">推荐 UI 解决方案</h3>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {cards.length} 套拟定方案
                    </span>
                  </div>

                  {/* Empty warning / instructions guide if no presets are active */}
                  {!hasGeneratedYet ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center space-y-4" id="empty-state-middle">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto border border-indigo-100">
                        <Bookmark className="w-6 h-6 animate-bounce" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 text-sm">准备度就绪</h4>
                        <p className="text-xs text-slate-500 leading-normal">
                          没有配置好的预设需求。请在左侧文本域中写下您的粗糙构想或直接选择我们的“PM 面试训练”模版。
                        </p>
                      </div>
                      <button
                        onClick={handleLoadTemplate}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow shadow-indigo-100 transition-all inline-block"
                      >
                        一键拉取精美演示数据
                      </button>
                    </div>
                  ) : (
                    /* Recommendation Cards list container */
                    <RecommendationCardComponent
                      cards={cards}
                      selectedCardId={selectedCardId}
                      onSelectCard={(id) => setSelectedCardId(id)}
                      onViewGraph={(card) => setActiveGraphCard(card)}
                    />
                  )}
                </div>

                {/* Micro-Onboarding hints */}
                {hasGeneratedYet && (
                  <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100/60 flex items-start gap-2 text-[10.5px] text-indigo-805">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      💡 <b>玩法诀窍：</b>点击卡片的“查看推荐依据”可打开该方案生成的知识图谱推理链，辅助您的专业论证。
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* COLUMN 3: RIGHT OUTPUT ACTIONS PANEL (4 cols) */}
            <section className="lg:col-span-4" aria-label="Strategy outputs">
              {hasGeneratedYet && strategyOutput ? (
                <DeliverablesPanel
                  outputData={strategyOutput}
                  onReset={handleReset}
                  selectedTitle={getSelectedCardTitle()}
                />
              ) : (
                <div className="bg-white border border-slate-200/90 rounded-xl p-6 text-center space-y-4 h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-14 h-14 bg-slate-50 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <Terminal className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <h4 className="font-bold text-slate-800 text-sm">生成结果暂空</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      当您在左侧确认偏好的受众和定位后，右侧面板将为您自动生成标准的 UI Brief 以及大模型一键导入提示词。
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 bg-slate-200 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-slate-200 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-slate-200 rounded-full"></span>
                  </div>
                </div>
              )}
            </section>

          </div>
        )}

        {/* 6-Role Corporate Data Automation Details Bento Grid */}
        {!isGenerating && (
          <div className="animate-fade-in pt-2">
            <RoleMatrixPanel />
          </div>
        )}

        {/* GRAPH VIEW PANEL: Slides/Renders beautifully below the pillars or as interactive overlay */}
        {!isGenerating && activeGraphCard && (
          <div className="animate-fade-in pt-2" id="rational-knowledge-graph-box">
            <RecommendationGraph
              nodes={activeGraphCard.graphNodes}
              edges={activeGraphCard.graphEdges}
              strategyTitle={activeGraphCard.title}
              onClose={() => setActiveGraphCard(null)}
            />
          </div>
        )}

        {/* PM Tooling Info cards at bottom - provides value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4 flex gap-3 shadow-xs">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-full h-fit border border-indigo-100">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-800">避免 demo 感 3 大雷点</h5>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                1. 杜绝毫无意义的多彩环形渐变发光。<br />
                2. 杜绝一屏只放一句话的大营销标题。<br />
                3. 杜绝不可互动的非功能性占位图。
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 flex gap-3 shadow-xs">
            <div className="p-2 bg-emerald-50 text-emerald-705 rounded-full h-fit border border-emerald-100">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-800">可交付前端标准 (Anti-Slop)</h5>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                组件边界分明、文字带功能导向。在 PROMPT 强制给出“未开始、交互中、AI 流式响应中、超时重试”等高复用状态。
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 flex gap-3 shadow-xs">
            <div className="p-2 bg-purple-50 text-purple-700 rounded-full h-fit border border-purple-100">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-slate-800">多模态流向推导</h5>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                本工具将 UI Brief 与 Vibe Prompt 精妙结合，解决 AI 产品经理“无法精准传达设计表达，前端研发难以落实”的经典痛点。
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Clean footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-1.55">
          <p>© 2026 AI PM UI Copilot. Crafted as a high-performance workspace for elite product managers.</p>
          <p className="text-[11px] text-slate-300">
            Powered by Tailwind v4, React 19, & Gemini UI styling graph logic nodes. No persistent cloud databases required. State persisted locally.
          </p>
        </div>
      </footer>
      
    </div>
  );
}
