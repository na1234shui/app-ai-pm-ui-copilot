import React, { useState } from 'react';
import { 
  Database, 
  BarChart3, 
  TrendingUp, 
  Coins, 
  Headphones, 
  Terminal, 
  CheckCircle, 
  HelpCircle, 
  Lightbulb, 
  Flame, 
  Wrench, 
  FileSpreadsheet, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface RoleDetail {
  roleName: string;
  categoryTitle: string;
  frictionsSolved: string[];
  landingValue: string;
  implementationMethods: string[];
  businessScenario: string;
  colorClass: string;
  icon: React.ReactNode;
}

export const RoleMatrixPanel: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const rolesDetails: RoleDetail[] = [
    {
      roleName: '数据分析师',
      categoryTitle: '指标口径规范与自主取数引擎',
      frictionsSolved: ['取数耗时长', '指标口径不统一', '重复导表'],
      landingValue: '减少 80% 的日常零碎取数业务需求，分析师日度效率提升 70%，实现指标口径 100% 对齐，彻底解决部门扯皮内耗。',
      implementationMethods: [
        '统一指标字典元数据：后台建立全局唯一的标准指标定义库，各报表和看板关联读取同一字典。',
        '可视化无代码自主取数器：支持业务人员通过拖拽维度、勾选指标，系统自动组装执行 SQL 查从库。',
        '指标计算血缘追踪：提供清晰的可视化 SQL 计算公式血缘图，随时查看数据的生命周期与聚合方式。'
      ],
      businessScenario: '以前，业务部门天天给数据分析师提临时数据需求，分析师整天处于“写 SQL - 导数据 - 发邮件”的低效率恶性循环。而且，由于各业务对“日活”口径不统一（有的指登录，有的指停留），分析会开成了定义扯皮会。中台建立指标字典并提供拖拽式自助取数后，业务人员自己 1 分钟就能拿到标准的干净数据，口径系统强校验强制统一。',
      colorClass: 'indigo',
      icon: <Database className="w-5 h-5" />
    },
    {
      roleName: '运营人员',
      categoryTitle: '多表合并与活动自动报表中心',
      frictionsSolved: ['重复导表', '手工 Excel 清洗', '多表合并', '每日固定报表'],
      landingValue: '活动复盘报表产出由 2 天缩短至 10 分钟，多维数据准实时自动同步，活动策略决策时效翻倍。',
      implementationMethods: [
        '多源数据 API 定时自动拉取：对接各大广告投放后台、微信后台、客服和支付后台 API 数据源。',
        '多表可视化 Merge 引擎：基于共有唯一主键（如手机号或订单 ID）在云端直接进行表头对齐、Merge 与 Union 操作。',
        '定时报表多端自动分发：生成活动效果标准日报，早 9 点通过飞书、钉钉群或邮件自动分发到对应负责人。'
      ],
      businessScenario: '每次大促活动结束，运营都要下载微信、支付宝、抖音、小红书等 6 个后台的 Excel 账单与消耗明细。接着打开 Excel，在一万多行的数据里眼花缭乱地写 VLOOKUP、手工去重复去尾空格、合并两表。引入本系统后，数据接口准实时自动对齐拉取并自动 Merge，泡杯咖啡的功夫，合并清洗好、精美的飞书图表日报已自动推送到活动群里。',
      colorClass: 'emerald',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      roleName: '产品经理',
      categoryTitle: '行为漏斗与每日核心指标自动化监控',
      frictionsSolved: ['每日固定报表', '指标口径不统一', '手工 Excel 清洗'],
      landingValue: '核心业务指标日度监控时间从 1.5 小时降至 5 分钟，漏斗流失和关键转化率波动报警响应时效提升 90%。',
      implementationMethods: [
        '用户行为流数据自动化聚合与格式化转化：无埋点、全埋点行为日志实时落库清洗。',
        '开箱即用转化模型：预置留存分析、用户生命周期模型与漏斗转换曲线。',
        '版本迭代节点时序关联器：在指标监控折线图上自动锚定发版事件，指标异动超过 5% 自动发出多端预警。'
      ],
      businessScenario: '新版本上线后，产品经理为了验证用户“注册 - 实名 - 绑卡 - 购买”的漏斗转换率，每天在三个平台反复查数计算，手动拼接 Excel 生成漏斗折线图，时效性极差。现在，数据流在后台自动完成聚合与去噪，PM 打开看板即可查看实时转化漏斗和用户留存。当实名到绑卡转化率突跌 8% 时，飞书报警自动推送，5 分钟内即定位了支付系统故障。',
      colorClass: 'sky',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      roleName: '财务人员',
      categoryTitle: '多源对账与手工 Excel 规则清洗引擎',
      frictionsSolved: ['手工 Excel 清洗', '脏数据人工修正', '多表合并'],
      landingValue: '每月核账对账周期缩短 85%，差异账件 100% 自动高亮识别与秒级拦截，杜绝资金核算漏算、算错风险。',
      implementationMethods: [
        '自适应对账单清洗去噪引擎：智能去除特殊字符、首尾空格，格式归一化，自适应解析不同银行和通道账单表头。',
        '双向关联自动对账算法：根据订单号、交易金额和交易时间自动在系统流水和第三方渠道账单之间极速碰撞。',
        '差异账件双栏在线核对工作流：对不齐的异常脏数据单据系统标红拦截，提供双栏对照改写和一秒过账修正功能。'
      ],
      businessScenario: '每月财务要核对十多万条来自微信、支付宝、连连等不同渠道的账单，Excel 一动就卡死。需要手工拼表、去特殊空格，肉眼逐条找出跟内部系统的金额差异。接入对账清洗引擎后，只需把银行流水 Excel 一键拖入系统，10 秒内系统全自动清洗对齐并完成对账，自动把仅有的 3 笔对不上的“差异件”标红高亮拦截，提供差异说明，在线一键修正即可过账。',
      colorClass: 'amber',
      icon: <Coins className="w-5 h-5" />
    },
    {
      roleName: '客服支持',
      categoryTitle: '服务工单质检与脏数据在线修正系统',
      frictionsSolved: ['脏数据人工修正', '手工 Excel 清洗', '指标口径不统一'],
      landingValue: '工单分类归一准确率由 72% 提升至 98%，避免售后人员人工清洗数千行混乱 Excel，质检工作提效 5 倍以上。',
      implementationMethods: [
        '大模型 NLP 非结构化语义纠错清洗：自动识别售后工单、投诉文字中的关键实体，去除干扰词和口癖，自动匹配标类工单。',
        '在线双栏“脏数据核对与二级分类”面板：99% 可信度由系统清洗完成，1% 兜底疑难件推送到界面支持客服单键修改。',
        '客服响应时效一致性指标定义体系。'
      ],
      businessScenario: '客服每天接到几千张非结构化的工单，里面夹杂着用户的拼写错误、情绪化口语或垃圾广告。售后主管在导出 Excel 算考核满意度时，需要用 Excel 手工修正那些写错了的“脏数据”和分类，低效又主观。引入后，大模型自动纠正了非标准化工单表述，进行智能标注与去噪，极少量的兜底疑难件在系统面板里双击就能一秒修改，极大地给绩效质检减负。',
      colorClass: 'purple',
      icon: <Headphones className="w-5 h-5" />
    },
    {
      roleName: '研发工程师',
      categoryTitle: '数仓自动导表与高并发低时延取数接口生成',
      frictionsSolved: ['重复导表', '取数耗时长', '生产库性能内耗'],
      landingValue: '彻底将研发从“写临时导数脚本”的泥潭中解放出来，释放 15% 研发核心人力；保护生产数据库性能稳定，降低服务器崩溃风险。',
      implementationMethods: [
        '限制只读从库的定时导流管道：配置定时将特定业务表导出为腾讯文档、石墨文档，研发零门槛介入。',
        '勾选式自助 API 生成网格：研发在平台勾选可公开的维度、指标与限流，一秒生成标准的对外数据取数 Open API 接口。',
        '高频大查询慢 SQL 自动预警与缓存机制：对不规范的耗时查询进行拦截，保证数据库连接池健康。'
      ],
      businessScenario: '研发经常接到运营和产品的临时数据要求：‘开发大佬帮我拉一个今年一季度的商品退换率明细，一会要用。’研发只能中断正在写的产品核心代码，紧急写脚本查库。直接对生产库做大查询，还容易导致数据库卡死、服务器报错。现在，研发只需在平台对业务开放只读从库的特定字段，业务人员自助配好定时导出，再也无需骚扰研发，研发也成功摆脱“取数工具人”称号。',
      colorClass: 'rose',
      icon: <Terminal className="w-5 h-5" />
    }
  ];

  const filteredRoles = selectedRole === 'all' 
    ? rolesDetails 
    : rolesDetails.filter(r => r.roleName === selectedRole);

  // Get color themes dynamically
  const getColorTheme = (color: string) => {
    switch (color) {
      case 'indigo':
        return {
          bg: 'bg-indigo-50/70 border-indigo-100 hover:border-indigo-300',
          text: 'text-indigo-700',
          badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
          dot: 'bg-indigo-600',
          focusText: 'indigo-800'
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-300',
          text: 'text-emerald-700',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          dot: 'bg-emerald-600',
          focusText: 'emerald-800'
        };
      case 'sky':
        return {
          bg: 'bg-sky-50/70 border-sky-100 hover:border-sky-300',
          text: 'text-sky-700',
          badge: 'bg-sky-50 text-sky-700 border-sky-100',
          dot: 'bg-sky-500',
          focusText: 'sky-800'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50/70 border-amber-100 hover:border-amber-300',
          text: 'text-amber-700',
          badge: 'bg-amber-50 text-amber-700 border-amber-150',
          dot: 'bg-amber-500',
          focusText: 'amber-800'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50/70 border-purple-100 hover:border-purple-300',
          text: 'text-purple-700',
          badge: 'bg-purple-50 text-purple-700 border-purple-100',
          dot: 'bg-purple-600',
          focusText: 'purple-800'
        };
      case 'rose':
        return {
          bg: 'bg-rose-50/70 border-rose-100 hover:border-rose-300',
          text: 'text-rose-700',
          badge: 'bg-rose-50 text-rose-700 border-rose-100',
          dot: 'bg-rose-600',
          focusText: 'rose-800'
        };
      default:
        return {
          bg: 'bg-slate-50/70 border-slate-100 hover:border-slate-300',
          text: 'text-slate-700',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-500',
          focusText: 'slate-800'
        };
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      
      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
            </span>
            <h2 className="font-bold text-base md:text-lg text-slate-900 tracking-tight flex items-center gap-2">
              🏢 6大岗位数据自动化提效矩阵（完整展开）
            </h2>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            覆盖跨部门核心业务线，打破重复导表、手工清洗、多源对账与指标分裂。彻底消除企业级日常内耗，全面打通数据流生命周期。
          </p>
        </div>

        {/* Mini tabs selector for roles */}
        <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-lg border border-slate-150 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSelectedRole('all')}
            className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all select-none cursor-pointer ${
              selectedRole === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-850'
            }`}
          >
            全部岗位
          </button>
          {rolesDetails.map(r => (
            <button
              key={r.roleName}
              type="button"
              onClick={() => setSelectedRole(r.roleName)}
              className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all select-none cursor-pointer ${
                selectedRole === r.roleName
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              {r.roleName}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => {
          const theme = getColorTheme(role.colorClass);
          return (
            <div
              key={role.roleName}
              className={`bg-white rounded-xl border p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all duration-300 border-slate-200/80 group`}
            >
              <div className="space-y-3.5">
                {/* Role Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${theme.badge} border shrink-0 transition-transform group-hover:scale-105`}>
                      {role.icon}
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block tracking-wider uppercase">POSITION ROLE</span>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base leading-none">
                        {role.roleName}
                      </h4>
                    </div>
                  </div>
                  <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                    100% 提效
                  </span>
                </div>

                {/* Category Name */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100/80">
                  <span className="text-[10px] text-slate-400 font-bold block mb-0.5 uppercase tracking-wide">核心工具模块</span>
                  <span className="text-slate-800 font-bold text-xs flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 ${theme.dot} rounded-full`}></span>
                    {role.categoryTitle}
                  </span>
                </div>

                {/* Frictions Solved */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide">核心消除内耗</span>
                  <div className="flex flex-wrap gap-1">
                    {role.frictionsSolved.map((f, i) => (
                      <span key={i} className="text-[10px] bg-red-50 text-red-700 border border-red-100 px-1.5 py-0.5 rounded font-medium">
                        ✕ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Landing Value */}
                <div className="space-y-1 bg-emerald-50/40 p-3 rounded-lg border border-emerald-100/50">
                  <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wide flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>落地量化价值 (Landed Value)</span>
                  </span>
                  <p className="text-[11px] text-slate-650 leading-relaxed font-medium">
                    {role.landingValue}
                  </p>
                </div>

                {/* Implementation Methods */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide flex items-center gap-1">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    <span>系统实现方式 (Implementation)</span>
                  </span>
                  <ul className="space-y-1.5">
                    {role.implementationMethods.map((m, i) => (
                      <li key={i} className="text-[11px] text-slate-600 leading-normal flex items-start gap-1.5">
                        <span className="text-indigo-500 font-bold shrink-0 mt-0.5">{i+1}.</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Business Scenario - Expandable/Card Bottom details */}
              <div className="border-t border-slate-100 pt-3 space-y-1.5 bg-slate-50/40 -mx-5 -mb-5 p-5 rounded-b-xl group-hover:bg-indigo-50/10 transition-colors">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wide flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>业务提效场景 (Real-world Scenario)</span>
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans text-justify">
                  {role.businessScenario}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Summary metrics bar */}
      <div className="bg-slate-50 border border-slate-150/80 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-slate-800">企业级消除内耗统计指标</h5>
            <p className="text-[10px] text-slate-400">引入自动化工具后，全流程各岗位平均提效百分比一览</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:gap-12 text-center">
          <div>
            <span className="text-slate-400 text-[10px] font-bold block uppercase">REPETITIVE EXPORTS</span>
            <strong className="text-indigo-650 text-base md:text-lg font-mono font-bold">-92% 导表</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold block uppercase">CLEANING & MERGING</span>
            <strong className="text-indigo-650 text-base md:text-lg font-mono font-bold">100% 自动对账</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold block uppercase">OVERALL PRODUCTIVITY</span>
            <strong className="text-emerald-700 text-base md:text-lg font-mono font-bold">+150% 效能</strong>
          </div>
        </div>
      </div>

    </div>
  );
};
