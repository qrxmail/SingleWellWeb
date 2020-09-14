// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/index.html',
              redirect: '/user/login',
            },
            {
              path: '/welcome',
              name: '首页',
              icon: 'smile',
              component: './Welcome',
            },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              path: '/DeviceManagement',
              name: '设备管理',
              icon: 'crown',
              routes: [
                {
                  path: 'ProductDevice',
                  name: '生产设备及档案',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PressureVesselDevice',
                  name: '压力容器',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PressurePipeDevice',
                  name: '压力管道',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'ValvePitDevice',
                  name: '阀井阀门',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PressureRegulatingStation',
                  name: '调压箱调压柜',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
            {
              path: '/DeviceLedgers',
              name: '设备台帐',
              icon: 'crown',
              routes: [
                {
                  path: 'ProducDeviceLedgers',
                  name: '生产设备及档案',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PressureVesselDeviceLedgers',
                  name: '压力容器',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PressurePipeDeviceLedgers',
                  name: '压力管道',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'ValvePitDeviceLedgers',
                  name: '阀井阀门',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PressureRegulatingStationLedgers',
                  name: '调压箱调压柜',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
            {
              path: '/OperRecord',
              name: '设备运行记录',
              icon: 'crown',
              routes: [
                {
                  path: 'DistributionStationPipeRecordHeader',
                  name: '储配站运行记录（管道）',
                  icon: 'smile',
                  component: './OperRecord/DistributionStationPipeRecordHeader',
                },
                {
                  path: 'DistributionStationTruckRecordHeader',
                  name: '储配站运行记录（槽车）',
                  icon: 'smile',
                  component: './OperRecord/DistributionStationTruckRecordHeader',
                },
                {
                  path: 'CompressorAtlasRecordHeader',
                  name: '压缩机运行记录（阿塔拉斯）',
                  icon: 'smile',
                  component: './OperRecord/CompressorAtlasRecordHeader',
                },
                {
                  path: 'CompressorEnricRecordHeader',
                  name: '压缩机运行记录（安瑞科）',
                  icon: 'smile',
                  component: './OperRecord/CompressorEnricRecordHeader',
                },
                {
                  path: 'CompressorJerryRecordHeader',
                  name: '压缩机运行记录（杰瑞）',
                  icon: 'smile',
                  component: './OperRecord/CompressorJerryRecordHeader',
                },
                {
                  path: 'ValvePitMaintanceRecordHeader',
                  name: '阀井维护保养记录',
                  icon: 'smile',
                  component: './OperRecord/ValvePitMaintanceRecordHeader',
                },
                {
                  path: 'CityGasPipelineInspectRecordHeader',
                  name: '城区管网日常巡检',
                  icon: 'smile',
                  component: './OperRecord/CityGasPipelineInspectRecordHeader',
                },
                {
                  path: 'GeneratorRecordHeader',
                  name: '发电机运行记录',
                  icon: 'smile',
                  component: './OperRecord/GeneratorRecordHeader/index',
                },
                {
                  path: 'BoilerRecordHeader',
                  name: '锅炉运行记录',
                  icon: 'smile',
                  component: './/OperRecord/BoilerRecordHeader/index',
                },
                {
                  path: 'FirePumpRecordHeader',
                  name: '消防泵运行记录',
                  icon: 'smile',
                  component: './OperRecord/FirePumpRecordHeader/index',
                },
                {
                  path: 'DryerRecordHeader',
                  name: '干燥器运行记录',
                  icon: 'smile',
                  component: './OperRecord/DryerRecordHeader',
                },
              ],
            },
            {
              path: '/UseManage',
              name: '使用管理',
              icon: 'crown',
              routes: [
                {
                  path: 'ReportBug',
                  name: '故障上报',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'ReportLeak',
                  name: '泄漏上报',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'RecordWorkChange',
                  name: '交接班管理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'RecordOper',
                  name: '设备操作记录',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'ReportAbnormal',
                  name: '设备异常上报',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PlanOper',
                  name: '操作计划制定',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PlanMaintence',
                  name: '维修计划制定',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'PlanCheck',
                  name: '校验检修计划制定',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/WorkFlowManager',
              name: '流程管理',
              icon: 'crown',
              routes: [
                {
                  path: 'WorkFlowBuy',
                  name: '采购流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowAccept',
                  name: '验收流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowChangeAsset',
                  name: '资产转固流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowSeal',
                  name: '封存流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowSealUp',
                  name: '启封流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowAllocat',
                  name: '调拨流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowScrap',
                  name: '报废流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowTransfer',
                  name: '移交流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowMainten',
                  name: '维修流程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowAlarm',
                  name: '报警流程',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/TaskCenter',
              name: '任务中心',
              icon: 'crown',
              routes: [
                {
                  path: 'TaskAlarm',
                  name: '报警处理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'TaskOper',
                  name: '操作任务处理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'TaskMaintence',
                  name: '维修任务处理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'TaskCheck',
                  name: '校验检修任务处理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'WorkFlowTask',
                  name: '流程任务处理',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/Stat',
              name: '统计分析',
              icon: 'crown',
              routes: [
                {
                  path: 'StatReliefCheck',
                  name: '安全阀校验统计',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'StatDeviceAvailable',
                  name: '设备完好率报表',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'StatLeak',
                  name: '设备泄漏率报表',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'StatDeviceCost',
                  name: '设备费用统计',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/SpareManger',
              name: '备件库',
              icon: 'crown',
              routes: [
                {
                  path: 'SpareList',
                  name: '备品备件管理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'SpareLedgers',
                  name: '备品备件台帐',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/ToolManger',
              name: '工具库',
              icon: 'crown',
              routes: [
                {
                  path: 'ToolList',
                  name: '工具管理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'ToolLedgers',
                  name: '工具台帐',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/SpecialDeviceManger',
              name: '特种设备',
              icon: 'crown',
              routes: [
                {
                  path: 'SpecialList',
                  name: '特种设备管理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'SpecialLedgers',
                  name: '特种设备台帐',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/AssetsManger',
              name: '固定资产',
              icon: 'crown',
              routes: [
                {
                  path: 'AssetsList',
                  name: '固定资产管理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'AssetsLedgers',
                  name: '固定资产台帐',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/Documents',
              name: '资料管理',
              icon: 'crown',
              routes: [
                {
                  path: 'MaintenanceProcedures',
                  name: '维护保养规程',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'Experience',
                  name: '维护经验',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'LawsAndRegulations',
                  name: '法律法规',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'Notice',
                  name: '通知公告',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'Files',
                  name: '文件',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'ReportMaterials',
                  name: '汇报材料',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'LearningMaterials',
                  name: '学习材料',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'OtherDocuments',
                  name: '其它资料',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'Suppliers',
                  name: '厂家信息',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              path: '/SystemManagement',
              name: '系统管理',
              icon: 'crown',
              routes: [
                {
                  path: 'users',
                  name: '用户管理',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  path: 'roles',
                  name: '角色管理',
                  icon: 'smile',
                  component: './Welcome',
                },
              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
