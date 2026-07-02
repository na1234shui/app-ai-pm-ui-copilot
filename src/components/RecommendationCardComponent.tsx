import React from 'react';
import { RecommendationCard } from '../types';
import { Check, Network, AlertCircle, Sparkles, LayoutGrid, CheckSquare, Layers } from 'lucide-react';

interface RecommendationCardComponentProps {
  cards: RecommendationCard[];
  selectedCardId: string;
  onSelectCard: (id: string) => void;
  onViewGraph: (card: RecommendationCard) => void;
}

const getCompactCardTitle = (card: RecommendationCard) => {
  const normalized = card.title.replace(/\s+/g, '').trim();
  if (normalized && normalized.length <= 20) {
    return normalized;
  }

  if (card.id === 'workspace' || normalized.includes('工作台') || normalized.includes('三栏')) {
    return '专业工作台方案';
  }
  if (card.id === 'taskflow' || normalized.includes('任务流') || normalized.includes('单页') || normalized.includes('轻量')) {
    return '单页任务流方案';
  }
  if (card.id === 'dashboard' || normalized.includes('看板') || normalized.includes('运营') || normalized.includes('长期')) {
    return '长期运营看板方案';
  }
  if (normalized.includes('数据') || normalized.includes('自动化')) {
    return '数据自动化方案';
  }
  if (normalized.includes('问答') || normalized.includes('助手')) {
    return '智能问答方案';
  }

  return normalized.slice(0, 18) || 'UI方案';
};

export const RecommendationCardComponent: React.FC<RecommendationCardComponentProps> = ({
  cards,
  selectedCardId,
  onSelectCard,
  onViewGraph,
}) => {
  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const isSelected = selectedCardId === card.id;
        const compactTitle = getCompactCardTitle(card);

        // Visual properties based on card tags
        const getTagColor = (tag: string) => {
          if (tag.includes('强烈')) return 'bg-rose-50 text-rose-700 border-rose-200';
          if (tag.includes('进阶')) return 'bg-purple-50 text-purple-700 border-purple-200';
          return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        };

        return (
          <div
            key={card.id}
            id={`strategy-card-${card.id}`}
            onClick={() => onSelectCard(card.id)}
            className={`group bg-white rounded-xl border p-5 transition-all duration-300 relative cursor-pointer ${
              isSelected
                ? 'border-indigo-600 shadow-md shadow-indigo-50/60 ring-1 ring-indigo-600/50'
                : 'border-slate-200 hover:border-slate-350 hover:shadow-sm'
            }`}
          >
            {/* Tag badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTagColor(card.tag)}`}>
                {card.tag}
              </span>
              {isSelected && (
                <div className="p-1 bg-indigo-600 rounded-full text-white" title="已选中此方案">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </div>

            {/* Title */}
            <div className="flex items-center gap-2 mb-2 w-[80%]">
              <LayoutGrid className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
              <h4 className="font-bold text-slate-800 text-sm md:text-base tracking-tight" title={card.title}>
                {compactTitle}
              </h4>
            </div>

            {/* Layout summary */}
            <p className="text-slate-500 text-xs mb-3.5 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-700">推荐布局：</span>
              {card.layoutDescription}
            </p>

            {/* Suitability guidelines */}
            <div className="space-y-1 mb-4">
              <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wide">适用场景匹配</span>
              <ul className="space-y-1">
                {card.suitability.map((suitItem, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                    <CheckSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{suitItem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core component listing */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4 border-t border-slate-100 pt-3">
              <div className="col-span-2">
                <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wide">核心推荐组件 (SaaS 级)</span>
              </div>
              {card.coreComponents.slice(0, 4).map((comp, idx) => (
                <div key={idx} className="text-[11px] text-slate-650 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0"></span>
                  <span className="truncate" title={comp}>{comp}</span>
                </div>
              ))}
            </div>

            {/* Pros and Cons brief */}
            <div className="border-t border-slate-100 pt-3 text-[11px] space-y-1">
              <div className="text-slate-605">
                <span className="font-semibold text-emerald-700">➕ 方案长处：</span>
                <span className="text-slate-600">{card.pros}</span>
              </div>
              <div className="text-slate-605">
                <span className="font-semibold text-amber-700">⚠️ 注意风险：</span>
                <span className="text-slate-600">{card.cons}</span>
              </div>
            </div>

            {/* Action panel inside the card */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // prevent card selection trigger
                  onViewGraph(card);
                }}
                className="flex items-center gap-1 px-3 py-1.5 border border-indigo-100 hover:border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 rounded-lg text-indigo-700 text-xs font-semibold select-none cursor-pointer transition-colors"
                id={`btn-view-graph-${card.id}`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>查看推荐依据</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCard(card.id);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg select-none cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                    : 'bg-white border border-slate-200 text-slate-650 hover:bg-slate-50'
                }`}
                id={`btn-select-strategy-${card.id}`}
              >
                {isSelected ? '已选择本方案' : '选中此方案'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
