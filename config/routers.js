
export const routerConfig =
[
  {
      "key": "/Charts",
      "path": "Charts",
      "name": "总览",
      "icon": "smile",
      "component": "./Charts",
      "authority": [
          "admin",
          "user",
          "调度中心",
          "管理区"
      ]
  },
  {
      "key": "/OilStationView",
      "path": "OilStationView",
      "name": "站点浏览",
      "icon": "smile",
      "component": "./OilStationView",
      "authority": [
          "admin",
          "user",
          "调度中心",
          "管理区"
      ],
      "hideInMenu": true
  },
  {
      "key": "/WorkTicketView",
      "path": "WorkTicketView",
      "name": "工单详情",
      "icon": "smile",
      "component": "./WorkTicketView",
      "authority": [
          "admin",
          "user",
          "调度中心",
          "管理区"
      ],
      "hideInMenu": true
  },
  {
      "key": "/OilStation",
      "path": "OilStation",
      "name": "站点管理",
      "icon": "smile",
      "component": "./OilStation",
      "authority": [
          "admin",
          "user",
          "调度中心"
      ]
  },
  {
      "key": "/WorkTicket",
      "path": "WorkTicket",
      "name": "工单管理",
      "icon": "smile",
      "authority": [
          "admin",
          "user",
          "调度中心",
          "卸油员",
          "管理区"
      ],
      "routes": [
          {
              "key": "/WorkTicketList",
              "path": "WorkTicketList",
              "name": "全部工单",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin",
                  "user",
                  "调度中心",
                  "卸油员",
                  "管理区"
              ]
          },
        //   {
        //       "key": "/WorkTicketGrant",
        //       "path": "WorkTicketGrant",
        //       "name": "待授权",
        //       "icon": "smile",
        //       "component": "./WorkTicket",
        //       "authority": [
        //           "admin"
        //       ]
        //   },
        //   {
        //       "key": "/WorkTicketReceive",
        //       "path": "WorkTicketReceive",
        //       "name": "待接单",
        //       "icon": "smile",
        //       "component": "./WorkTicket",
        //       "authority": [
        //           "admin"
        //       ]
        //   },
          {
              "key": "/WorkTicketLoad",
              "path": "WorkTicketLoad",
              "name": "待拉油",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin",
                  "user",
                  "调度中心"
              ]
          },
          {
              "key": "/WorkTicketUnLoad",
              "path": "WorkTicketUnLoad",
              "name": "待卸油",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin",
                  "user",
                  "卸油员"
              ]
          },
          {
              "key": "/WorkTicketReview",
              "path": "WorkTicketReview",
              "name": "待审批",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin",
                  "user",
                  "管理区"
              ]
          },
          {
            "key": "/NotificationLog",
            "path": "NotificationLog",
            "name": "工单自动处理",
            "icon": "smile",
            "component": "./NotificationLog",
            "authority": [
                "admin",
                "user",
                "管理区"
            ]
        }
      ]
  },
//   {
//       "key": "/Driver",
//       "path": "Driver",
//       "name": "司机管理",
//       "icon": "smile",
//       "component": "./Driver",
//       "authority": [
//           "admin"
//       ]
//   },
//   {
//       "key": "/Truck",
//       "path": "Truck",
//       "name": "车辆管理",
//       "icon": "smile",
//       "component": "./Truck",
//       "authority": [
//           "admin"
//       ]
//   },
  {
      "key": "/Reports",
      "path": "Reports",
      "name": "报表",
      "icon": "smile",
      "component": "./Reports",
      "authority": [
          "admin",
          "user",
          "调度中心",
          "卸油员",
          "管理区"
      ]
  },
  {
      "key": "/SystemManagement",
      "path": "/SystemManagement",
      "name": "系统管理",
      "icon": "crown",
      "routes": [
          {
              "key": "/SystemManagement/users",
              "path": "users",
              "name": "用户管理",
              "icon": "smile",
              "component": "./user",
              "authority": [
                  "admin"
              ]
          },
          {
              "key": "/SystemManagement/roles",
              "path": "roles",
              "name": "角色管理",
              "icon": "smile",
              "component": "./role",
              "authority": [
                  "admin"
              ]
          }
      ],
      "authority": [
          "admin"
      ]
  },
  {
      "key": "/",
      "path": "/",
      "redirect": "/Charts"
  },
  {
      "key": "/index.html",
      "path": "/index.html",
      "redirect": "/user/login"
  }
];