import React, { useState, useEffect } from 'react';
import { StrategyOutput, UIBrief, ChecklistItem } from '../types';
import { 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  FileText, 
  Code, 
  CheckSquare, 
  Sparkles, 
  Ban, 
  TriangleAlert, 
  AlertCircle,
  Edit2,
  Save,
  Trash2,
  Plus
} from 'lucide-react';

interface DeliverablesPanelProps {
  outputData: StrategyOutput;
  onReset: () => void;
  selectedTitle: string;
}

export const DeliverablesPanel: React.FC<DeliverablesPanelProps> = ({
  outputData,
  onReset,
  selectedTitle,
}) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'prompt' | 'checklist'>('brief');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Editable local states initialized from props
  const [editableBrief, setEditableBrief] = useState<UIBrief>(outputData.brief);
  const [editablePrompt, setEditablePrompt] = useState<string>(outputData.vibePrompt);
  const [editableChecklist, setEditableChecklist] = useState<ChecklistItem[]>(outputData.checklist);

  // State to track editing toggles for each section of the Brief and Prompt/Checklist
  const [editingSections, setEditingSections] = useState<Record<string, boolean>>({
    audience: false,
    tasks: false,
    style: false,
    components: false,
    states: false,
    avoid: false,
    prompt: false,
    checklist: false,
  });

  // Sync state with incoming new outputData props when they change
  useEffect(() => {
    setEditableBrief(outputData.brief);
    setEditablePrompt(outputData.vibePrompt);
    setEditableChecklist(outputData.checklist);
  }, [outputData]);

  const toggleEditSection = (section: string) => {
    setEditingSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editablePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportBrief = () => {
    setExporting(true);
    const textContent = `
=============================================
           AI PM UI COPILOT - UI BRIEF (EDITED)
=============================================
方案名称: ${selectedTitle}
产品类型: ${editableBrief.productType}
目标受众: ${editableBrief.targetUser}
核心任务: ${editableBrief.coreTasks}
推荐布局: ${editableBrief.recommendedLayout}
推荐色彩风格: ${editableBrief.recommendedStyle}

核心组件:
${editableBrief.coreComponents.map((c, i) => `  ${i + 1}. ${c}`).join('\n')}

必要状态:
${editableBrief.necessaryStates.map((s, i) => `  - ${s}`).join('\n')}

绝对避免的设计倾向:
${editableBrief.notRecommended.map((n, i) => `  - ${n}`).join('\n')}

生成的 Vibe Coding Prompt:
${editablePrompt}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UI-Brief-${selectedTitle.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setExporting(false);
    }, 1200);
  };

  const handleRegenerate = () => {
    setResetting(true);
    setTimeout(() => {
      setResetting(false);
      onReset();
    }, 800);
  };

  const getStatusBadge = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'satisfied':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-2 py-0.5 text-[10px] font-bold shrink-0">
            <Check className="w-3 h-3" />
            <span>已满足</span>
          </span>
        );
      case 'supplementary':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-150 rounded px-2 py-0.5 text-[10px] font-bold shrink-0">
            <TriangleAlert className="w-3 h-3" />
            <span>需补充</span>
          </span>
        );
      case 'high_risk':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-100 rounded px-2 py-0.5 text-[10px] font-bold shrink-0">
            <AlertCircle className="w-3 h-3 animate-pulse" />
            <span>高风险</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between h-full min-h-[500px]">
      <div className="space-y-4">
        {/* Deliverables Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 px-2.5 bg-indigo-50 border border-indigo-100 rounded-md text-indigo-600 font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-sm md:text-base text-slate-800 tracking-tight">方案生成结果区</h3>
          </div>
          <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded font-mono font-medium">
            AI READY
          </span>
        </div>

        {/* Tab switcher buttons */}
        <div className="flex border-b border-slate-150 p-1 bg-slate-50 rounded-lg">
          <button
            type="button"
            id="tab-btn-brief"
            onClick={() => setActiveTab('brief')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all select-none cursor-pointer ${
              activeTab === 'brief'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. UI Brief</span>
          </button>

          <button
            type="button"
            id="tab-btn-prompt"
            onClick={() => setActiveTab('prompt')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all select-none cursor-pointer ${
              activeTab === 'prompt'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-3.5 h-3.5 animate-pulse" />
            <span>2. Vibe Prompt</span>
          </button>

          <button
            type="button"
            id="tab-btn-checklist"
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-all select-none cursor-pointer ${
              activeTab === 'checklist'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>3. 质量检查表</span>
          </button>
        </div>

        {/* Tab Content 1: UI Brief */}
        {activeTab === 'brief' && (
          <div className="space-y-4 animate-fade-in text-xs">
            <div className="flex justify-between items-center border-b border-slate-100/50 pb-1.5">
              <p className="text-[11px] text-slate-500 leading-normal">
                面向产品、UX与研发的核心标准（点击右侧编辑即可直接进行修改）：
              </p>
              <span className="text-[10px] text-indigo-600 bg-indigo-50/70 border border-indigo-150 font-bold px-1.5 py-0.5 rounded">支持直接编辑</span>
            </div>

            <div className="space-y-3">
              {/* Block 1: Positioning & Audience */}
              {!editingSections.audience ? (
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 space-y-1 relative group hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">产品定位 & 受众</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('audience')}
                      className="text-slate-450 hover:text-indigo-600 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>编辑</span>
                    </button>
                  </div>
                  <p className="text-slate-800 font-medium">应用类型：{editableBrief.productType}</p>
                  <p className="text-slate-600 leading-relaxed">{editableBrief.targetUser}</p>
                </div>
              ) : (
                <div className="bg-slate-50/50 p-3 rounded-lg border-2 border-indigo-500 space-y-2.5 relative shadow-inner animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wide">产品定位 & 受众 (编辑中)</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('audience')}
                      className="text-emerald-700 hover:text-emerald-800 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                    >
                      <Save className="w-3 h-3" />
                      <span>保存</span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9.5px] text-slate-400 font-bold uppercase block">应用类型</label>
                    <input
                      type="text"
                      value={editableBrief.productType}
                      onChange={(e) => setEditableBrief({ ...editableBrief, productType: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9.5px] text-slate-400 font-bold uppercase block">目标受众</label>
                    <textarea
                      value={editableBrief.targetUser}
                      onChange={(e) => setEditableBrief({ ...editableBrief, targetUser: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[55px] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Block 2: Core Tasks */}
              {!editingSections.tasks ? (
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100 space-y-1 relative group hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">页面核心主任务</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('tasks')}
                      className="text-slate-450 hover:text-indigo-600 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>编辑</span>
                    </button>
                  </div>
                  <p className="text-slate-655 leading-relaxed font-sans">{editableBrief.coreTasks}</p>
                </div>
              ) : (
                <div className="bg-slate-50/50 p-3 rounded-lg border-2 border-indigo-500 space-y-2 relative shadow-inner animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wide">页面核心主任务 (编辑中)</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('tasks')}
                      className="text-emerald-700 hover:text-emerald-800 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                    >
                      <Save className="w-3 h-3" />
                      <span>保存</span>
                    </button>
                  </div>
                  <textarea
                    value={editableBrief.coreTasks}
                    onChange={(e) => setEditableBrief({ ...editableBrief, coreTasks: e.target.value })}
                    className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[90px] leading-relaxed font-sans"
                  />
                </div>
              )}

              {/* Block 3: Layout & Style */}
              {!editingSections.style ? (
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-150 space-y-1 relative group hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">骨架和视觉风格推荐</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('style')}
                      className="text-slate-450 hover:text-indigo-600 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>编辑</span>
                    </button>
                  </div>
                  <p className="text-slate-850 font-bold mb-0.5">{editableBrief.recommendedLayout}</p>
                  <div className="text-slate-600 leading-relaxed bg-white p-2.5 rounded border border-slate-150/80">
                    {editableBrief.recommendedStyle}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50/50 p-3 rounded-lg border-2 border-indigo-500 space-y-2.5 relative shadow-inner animate-fade-in">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wide">骨架和风格推荐 (编辑中)</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('style')}
                      className="text-emerald-700 hover:text-emerald-800 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                    >
                      <Save className="w-3 h-3" />
                      <span>保存</span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9.5px] text-slate-400 font-bold block">骨架布局架构</label>
                    <input
                      type="text"
                      value={editableBrief.recommendedLayout}
                      onChange={(e) => setEditableBrief({ ...editableBrief, recommendedLayout: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9.5px] text-slate-400 font-bold block">色彩风格体系</label>
                    <textarea
                      value={editableBrief.recommendedStyle}
                      onChange={(e) => setEditableBrief({ ...editableBrief, recommendedStyle: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[60px] leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Block 4: Core Components */}
              {!editingSections.components ? (
                <div className="space-y-1.5 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-[10.5px] text-indigo-600 font-bold uppercase tracking-wide block">推荐内置核心功能组件</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('components')}
                      className="text-slate-450 hover:text-indigo-600 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>编辑列表</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {editableBrief.coreComponents.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-2.5 bg-slate-50/40 border border-slate-150 rounded hover:border-slate-250 transition-colors">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                        <span className="text-slate-700 text-[11px] truncate" title={item}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 p-3.5 bg-slate-50/60 rounded-lg border-2 border-indigo-500 animate-fade-in shadow-inner">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10.5px] text-indigo-700 font-bold uppercase tracking-wide block">核心功能组件管理</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('components')}
                      className="text-emerald-700 hover:text-emerald-800 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                    >
                      <Save className="w-3 h-3" />
                      <span>保存</span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {editableBrief.coreComponents.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const newComp = [...editableBrief.coreComponents];
                            newComp[idx] = e.target.value;
                            setEditableBrief({ ...editableBrief, coreComponents: newComp });
                          }}
                          className="flex-1 text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newComp = editableBrief.coreComponents.filter((_, i) => i !== idx);
                            setEditableBrief({ ...editableBrief, coreComponents: newComp });
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded cursor-pointer transition-colors border border-transparent hover:border-red-100"
                          title="删除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setEditableBrief({
                          ...editableBrief,
                          coreComponents: [...editableBrief.coreComponents, '新内置组件名称']
                        });
                      }}
                      className="w-full py-1.5 border border-dashed border-indigo-300 rounded-lg text-indigo-650 hover:bg-indigo-50/50 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer mt-2 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>添加新组件</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Block 5: Necessary States */}
              {!editingSections.states ? (
                <div className="space-y-1.5 relative group">
                  <div className="flex justify-between items-center">
                    <span className="text-[10.5px] text-indigo-600 font-bold uppercase tracking-wide block">必须覆盖的系统状态</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('states')}
                      className="text-slate-455 hover:text-indigo-600 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>编辑列表</span>
                    </button>
                  </div>
                  <ul className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-lg border border-slate-100">
                    {editableBrief.necessaryStates.map((state, idx) => (
                      <li key={idx} className="text-slate-650 leading-relaxed text-[11px] flex items-start gap-1.5">
                        <span className="text-slate-400 font-semibold shrink-0 mt-0.5">•</span>
                        <span>{state}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2.5 p-3.5 bg-slate-50/60 rounded-lg border-2 border-indigo-500 animate-fade-in shadow-inner">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10.5px] text-indigo-700 font-bold uppercase tracking-wide block">系统覆盖状态管理</span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('states')}
                      className="text-emerald-700 hover:text-emerald-800 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"
                    >
                      <Save className="w-3 h-3" />
                      <span>保存</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {editableBrief.necessaryStates.map((state, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <textarea
                          value={state}
                          onChange={(e) => {
                            const newStates = [...editableBrief.necessaryStates];
                            newStates[idx] = e.target.value;
                            setEditableBrief({ ...editableBrief, necessaryStates: newStates });
                          }}
                          className="flex-1 text-xs bg-white border border-slate-200 rounded px-2.5 py-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[45px] leading-relaxed font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newStates = editableBrief.necessaryStates.filter((_, i) => i !== idx);
                            setEditableBrief({ ...editableBrief, necessaryStates: newStates });
                          }}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded cursor-pointer transition-colors border border-transparent hover:border-red-100 self-center"
                          title="删除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setEditableBrief({
                          ...editableBrief,
                          necessaryStates: [...editableBrief.necessaryStates, '新增系统关键状态描述与业务流细节']
                        });
                      }}
                      className="w-full py-1.5 border border-dashed border-indigo-300 rounded-lg text-indigo-650 hover:bg-indigo-50/50 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer mt-2 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>添加必要状态</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Block 6: Avoidance Grid */}
              {!editingSections.avoid ? (
                <div className="space-y-1.5 bg-rose-50/40 border border-rose-100 p-3.5 rounded-lg relative group hover:border-rose-250 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[10.5px] text-rose-700 font-bold uppercase tracking-wide flex items-center gap-1">
                      <Ban className="w-3.5 h-3.5" />
                      <span>严厉避免的设计雷区 (防 Demo 感)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('avoid')}
                      className="text-rose-400 hover:text-rose-700 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>编辑</span>
                    </button>
                  </div>
                  <ul className="space-y-1 pl-1">
                    {editableBrief.notRecommended.map((avoid, idx) => (
                      <li key={idx} className="text-slate-600 text-[11px] flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-rose-400 rounded-full shrink-0"></span>
                        <span>{avoid}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2.5 p-3.5 bg-rose-50/40 rounded-lg border-2 border-rose-400 animate-fade-in shadow-inner">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10.5px] text-rose-700 font-bold uppercase tracking-wide flex items-center gap-1">
                      <Ban className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                      <span>严厉避免的设计雷区 (编辑中)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleEditSection('avoid')}
                      className="text-rose-750 hover:text-rose-850 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors bg-rose-50 px-2 py-0.5 rounded border border-rose-200"
                    >
                      <Save className="w-3 h-3" />
                      <span>保存</span>
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {editableBrief.notRecommended.map((avoid, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={avoid}
                          onChange={(e) => {
                            const newNot = [...editableBrief.notRecommended];
                            newNot[idx] = e.target.value;
                            setEditableBrief({ ...editableBrief, notRecommended: newNot });
                          }}
                          className="flex-1 text-xs bg-white border border-rose-200 rounded px-2.5 py-1.5 focus:border-rose-450 focus:ring-1 focus:ring-rose-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newNot = editableBrief.notRecommended.filter((_, i) => i !== idx);
                            setEditableBrief({ ...editableBrief, notRecommended: newNot });
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-100/60 rounded cursor-pointer transition-colors border border-transparent hover:border-rose-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setEditableBrief({
                          ...editableBrief,
                          notRecommended: [...editableBrief.notRecommended, '新规避项']
                        });
                      }}
                      className="w-full py-1.5 border border-dashed border-rose-300 rounded-lg text-rose-700 hover:bg-rose-50 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer mt-2 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>添加雷区项目</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Content 2: Vibe Prompt */}
        {activeTab === 'prompt' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-[70%]">
                🚀 直接复制此结构化 Prompt 到大模型工具。<b>您可以在下方文本框中直接二次编辑和修改它：</b>
              </p>
              <div className="flex items-center gap-1.5">
                {!editingSections.prompt ? (
                  <button
                    type="button"
                    onClick={() => toggleEditSection('prompt')}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md select-none cursor-pointer transition-colors shrink-0"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>自定义修改</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleEditSection('prompt')}
                    className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-md select-none cursor-pointer transition-colors shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>保存锁定</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-md select-none cursor-pointer transition-colors shrink-0"
                  id="btn-copy-prompt-alt"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '已复制!' : '复制'}</span>
                </button>
              </div>
            </div>

            <div className="relative">
              {editingSections.prompt ? (
                <textarea
                  value={editablePrompt}
                  onChange={(e) => setEditablePrompt(e.target.value)}
                  className="w-full text-[11px] font-mono leading-relaxed bg-slate-900 text-slate-200 p-4 rounded-xl min-h-[350px] focus:outline-none focus:ring-1 focus:ring-indigo-500 border-2 border-indigo-500 shadow-inner font-normal leading-relaxed text-justify"
                />
              ) : (
                <pre className="text-[11px] font-mono leading-relaxed bg-slate-900 text-slate-200 p-4 rounded-xl whitespace-pre-wrap border border-slate-850 shadow-inner select-all">
                  {editablePrompt}
                </pre>
              )}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] text-slate-400 font-semibold select-none">
                <span>VIBE PROMPT v2.1 {editingSections.prompt ? '(编辑中)' : ''}</span>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100/70 p-3 rounded-lg flex items-start gap-2.5 text-[11px] text-indigo-800">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <b>专家提示：</b>此 Prompt 支持随您对 UI Brief 的个性化修改而进行任意形式的增删，复制并在 AI 工具中运行，能够将真实 SaaS 界面的实现度提升 2.5 倍以上。
              </p>
            </div>
          </div>
        )}

        {/* Tab Content 3: Quality Checklist */}
        {activeTab === 'checklist' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-50 pb-1">
              <p className="text-[11px] text-slate-500 leading-normal">
                AI PM 判断界面是否真实、可开发、防 Demo 化的「设计指引底板」：
              </p>
              <button
                type="button"
                onClick={() => toggleEditSection('checklist')}
                className="text-[10px] text-slate-500 hover:text-indigo-600 font-bold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer transition-colors"
              >
                {editingSections.checklist ? '锁定修改' : '编辑检查表'}
              </button>
            </div>

            <div className="space-y-2">
              {editableChecklist.map((item, idx) => (
                <div key={item.id} className={`p-3 bg-white border ${editingSections.checklist ? 'border-indigo-400 ring-1 ring-indigo-400 bg-slate-50/20' : 'border-slate-150'} rounded-lg shadow-sm space-y-1.5 hover:shadow-md hover:border-slate-300 transition-all`}>
                  <div className="flex items-start justify-between gap-4">
                    {editingSections.checklist ? (
                      <input
                        type="text"
                        value={item.rule}
                        onChange={(e) => {
                          const newCheck = [...editableChecklist];
                          newCheck[idx].rule = e.target.value;
                          setEditableChecklist(newCheck);
                        }}
                        className="font-bold text-slate-800 text-[11.5px] leading-snug bg-white border border-slate-200 px-2 py-0.5 rounded flex-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    ) : (
                      <span className="font-bold text-slate-800 text-[11.5px] leading-snug">
                        {item.rule}
                      </span>
                    )}

                    <div className="flex items-center gap-1 shrink-0">
                      {editingSections.checklist ? (
                        <select
                          value={item.status}
                          onChange={(e) => {
                            const newCheck = [...editableChecklist];
                            newCheck[idx].status = e.target.value as ChecklistItem['status'];
                            setEditableChecklist(newCheck);
                          }}
                          className="text-[10.5px] bg-white border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          <option value="satisfied">已满足</option>
                          <option value="supplementary">需补充</option>
                          <option value="high_risk">高风险</option>
                        </select>
                      ) : (
                        getStatusBadge(item.status)
                      )}
                    </div>
                  </div>

                  {editingSections.checklist ? (
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const newCheck = [...editableChecklist];
                        newCheck[idx].description = e.target.value;
                        setEditableChecklist(newCheck);
                      }}
                      className="text-slate-500 text-[11px] leading-relaxed w-full bg-white border border-slate-200 p-1.5 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[40px]"
                    />
                  ) : (
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}

              {editingSections.checklist && (
                <button
                  type="button"
                  onClick={() => {
                    const newItem: ChecklistItem = {
                      id: `new_ck_${Date.now()}`,
                      rule: '新增定制级 UI 审查规则项',
                      status: 'supplementary',
                      description: '请填入此规则项在实际开发评估中的具体描述与检测建议。'
                    };
                    setEditableChecklist([...editableChecklist, newItem]);
                  }}
                  className="w-full py-1.5 border border-dashed border-indigo-300 rounded-lg text-indigo-650 hover:bg-indigo-50/50 text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer mt-2 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>添加审查项目</span>
                </button>
              )}
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 text-[10.5px] text-slate-500 leading-normal">
              💡 <b>如何使用：</b>生成完界面后，在代码预览或 Iframe 中核对每一项。若标为「需补充」或「高风险」，可在对话中追问 AI ：“请根据质量检查清单，着重补齐第 X 项关于状态/布局妥协的设计。”
            </div>
          </div>
        )}
      </div>

      {/* Actions and Utilities Footer */}
      <div className="pt-3 border-t border-slate-150 flex flex-wrap gap-2 justify-between items-center bg-white">
        <button
          type="button"
          onClick={handleRegenerate}
          className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:border-slate-350 bg-slate-50 hover:bg-slate-100 text-slate-650 text-xs font-semibold rounded-lg select-none cursor-pointer transition-colors"
          id="btn-regenerate-strategy"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
          <span>{resetting ? '正在重新关联...' : '重新生成'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportBrief}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-800 text-xs font-semibold rounded-lg select-none cursor-pointer transition-colors"
            id="btn-export-brief"
          >
            <Download className={`w-3.5 h-3.5 ${exporting ? 'animate-bounce' : ''}`} />
            <span>{exporting ? '生成中...' : '导出 UI Brief'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg select-none cursor-pointer shadow shadow-indigo-150 transition-colors"
            id="btn-copy-prompt-primary"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已复制 Prompt!' : '复制 Prompt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
