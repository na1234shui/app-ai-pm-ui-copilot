/**
 * Types representing AI PM UI Copilot model configurations, recommendations, and graph structures.
 */

export interface UserPreferences {
  demandText: string;
  userSegment: string;       // "AI 产品经理" | "求职者 / 学生" | "企业员工" | "创作者" | "开发者"
  frequency: string;         // "高频工作台" | "偶尔使用工具" | "一次性生成" | "长期学习训练"
  styleTone: string;         // "专业可信" | "简洁高效" | "温暖易学" | "科技智能" | "活泼轻量"
  dynamicAnswers?: Record<string, string>; // 用户针对动态追问的回答
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'concept' | 'layout' | 'component' | 'state' | 'rule' | 'output';
  explanation: string;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface RecommendationCard {
  id: string;
  tag: string;             // "推荐" | "轻量" | "进阶"
  title: string;
  suitability: string[];
  layoutDescription: string;
  coreComponents: string[];
  keyStates: string[];
  pros: string;
  cons: string;
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
}

export interface UIBrief {
  productType: string;
  targetUser: string;
  coreTasks: string;
  recommendedLayout: string;
  recommendedStyle: string;
  coreComponents: string[];
  necessaryStates: string[];
  notRecommended: string[];
}

export interface ChecklistItem {
  id: string;
  rule: string;
  status: 'satisfied' | 'supplementary' | 'high_risk'; // 已满足, 需补充, 高风险
  description: string;
}

export interface StrategyOutput {
  brief: UIBrief;
  vibePrompt: string;
  checklist: ChecklistItem[];
}
