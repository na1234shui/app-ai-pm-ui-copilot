import React, { useState } from 'react';
import { GraphNode, GraphEdge } from '../types';
import { Network, HelpCircle, ArrowRight, X, Info, Layers, Compass, CheckCircle2, Sliders } from 'lucide-react';

interface RecommendationGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  strategyTitle: string;
  onClose: () => void;
}

export const RecommendationGraph: React.FC<RecommendationGraphProps> = ({
  nodes,
  edges,
  strategyTitle,
  onClose,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Helper colors based on node types
  const getNodeStyles = (type: string, isSelected: boolean) => {
    if (isSelected) {
      switch (type) {
        case 'concept':
          return 'bg-indigo-50 border-2 border-indigo-600 text-indigo-700 shadow-md shadow-indigo-100';
        case 'layout':
          return 'bg-blue-50 border-2 border-blue-600 text-blue-700 shadow-md shadow-blue-100';
        case 'component':
          return 'bg-emerald-50 border-2 border-emerald-600 text-emerald-700 shadow-md shadow-emerald-100';
        case 'state':
          return 'bg-amber-50 border-2 border-amber-600 text-amber-700 shadow-md shadow-amber-100';
        case 'rule':
          return 'bg-rose-50 border-2 border-rose-600 text-rose-700 shadow-md shadow-rose-100';
        case 'output':
          return 'bg-purple-50 border-2 border-purple-600 text-purple-700 shadow-md shadow-purple-100';
        default:
          return 'bg-slate-50 border-2 border-slate-600 text-slate-700';
      }
    } else {
      switch (type) {
        case 'concept':
          return 'border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 text-slate-800 hover:border-indigo-400';
        case 'layout':
          return 'border border-slate-200 bg-slate-50 hover:bg-blue-50/50 text-slate-800 hover:border-blue-400';
        case 'component':
          return 'border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 text-slate-800 hover:border-emerald-400';
        case 'state':
          return 'border border-slate-200 bg-slate-50 hover:bg-amber-50/50 text-slate-800 hover:border-amber-400';
        case 'rule':
          return 'border border-slate-200 bg-slate-50 hover:bg-rose-50/50 text-slate-800 hover:border-rose-400';
        case 'output':
          return 'border border-slate-200 bg-slate-50 hover:bg-purple-50/50 text-slate-800 hover:border-purple-400';
        default:
          return 'border border-slate-200 bg-slate-50 hover:bg-slate-100';
      }
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'concept': return 'bg-indigo-100 text-indigo-700 border border-indigo-200';
      case 'layout': return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'component': return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'state': return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'rule': return 'bg-rose-100 text-rose-700 border border-rose-200';
      case 'output': return 'bg-purple-100 text-purple-700 border border-purple-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getNodeTypeName = (type: string) => {
    switch (type) {
      case 'concept': return '产品定位/受众特征';
      case 'layout': return '骨架布局决策';
      case 'component': return '核心业务组件';
      case 'state': return '用户体验必要状态';
      case 'rule': return '质量监控与防斜原则';
      case 'output': return '大模型最佳适配';
      default: return '设计节点';
    }
  };

  return (
    <div className="bg-slate-50/95 border border-slate-200/90 rounded-xl p-4 md:p-6 shadow-sm overflow-hidden relative">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-600">
            <Network className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm md:text-base">
              UI 推荐推演图谱
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              方案依据：{strategyTitle}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
          title="关闭图谱"
          id="btn-close-graph"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-slate-500 text-xs mb-4">
        💡 <b>底层知识图谱引擎</b> 将您的需求、用户特点和设计调性进行了自动关联，推理出最契合的页面布局与核心组件（点击节点查看推荐依据设计原理）：
      </p>

      {/* SVG Responsive connection node visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Nodes graph panel (9-cols on large, custom flow) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-lg p-5 shadow-inner">
          <div className="relative flex flex-col md:flex-row flex-wrap md:justify-center items-center gap-4 md:gap-y-6">
            
            {/* Horizontal progress representation */}
            {nodes.map((node, i) => {
              const isSelected = selectedNodeId === node.id;
              
              return (
                <React.Fragment key={node.id}>
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-xs w-full sm:w-[170px] cursor-pointer outline-none ${getNodeStyles(node.type, isSelected)}`}
                    id={`graph-node-${node.id}`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase">
                        {getNodeTypeName(node.type)}
                      </span>
                      <span className="font-medium truncate block">
                        {node.label}
                      </span>
                    </div>
                  </button>
                  
                  {/* Arrow indicating path progression (not on last node) */}
                  {i < nodes.length - 1 && (
                    <div className="hidden md:flex items-center text-slate-300">
                      <ArrowRight className="w-4 h-4 animate-bounce-horizontal" />
                    </div>
                  )}
                  {i < nodes.length - 1 && (
                    <div className="flex md:hidden text-slate-300 transform rotate-90 my-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>🐾 推理流径: 受众分类 → 意图定义 → 调性映射 → 布局生成 → 状态安全拦截器</span>
            <span className="hidden sm:inline">基于 284 个 SaaS UI 设计图谱节点计算所得</span>
          </div>
        </div>

        {/* Node description card (4-cols on large) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-lg p-4 shadow-sm h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${getBadgeStyle(selectedNode?.type || 'concept')}`}>
                {getNodeTypeName(selectedNode?.type || '')}
              </span>
            </div>

            <h5 className="font-bold text-slate-800 text-sm mb-2">
              {selectedNode?.label}
            </h5>

            <div className="bg-slate-50 border-l-2 border-indigo-500 rounded p-3 text-slate-600 text-xs leading-relaxed">
              <p>{selectedNode?.explanation || '点击左侧链路中的任意节点，获取详细的设计推演和产品决策指导。'}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-3 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-normal">
              知识图谱不代表繁琐的操作栏，我们将复杂的结构蕴含于算法底层。只提供您需要的完美三步答案。
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
