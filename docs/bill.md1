# JYD与第三方财务接口说明书

V1.9

## 财务数据接口

### 业务账单推送接口

#### 应用场景

在业务账单生成之后，经金运达财务人员在JYD核对完成，JYD调用此接口, 将业务账单推送给对应客户的第三方系统。

#### 规则

| **项目**             | **内容**                                                                        |
|----------------------|---------------------------------------------------------------------------------|
| 服务标识             | JYD_TPS_F01                                                                     |
| 服务名称             | 业务账单推送接口                                                                |
| 服务版本号           | 1.0                                                                             |
| 服务提供方           | 第三方系统                                                                      |
| 服务类型             | 读出 写入                                                                       |
| 同步/异步方式        | 同步 异步                                                                       |
| 请求方式             | HTTP POST                                                                       |
| 提交网址             | \<由第三方提供\>                                                                |
| 数据格式             | Accept：application/json<br>Content-type：application/json<br>Charset：utf-8    |
| 业务场景说明         |                                                                                 |
| 业务规则和逻辑       | 1. 如果账单号不存在，则直接保存业务账单；<br>2. 如果账单号存在：<br>2.1 仅接收但未审核，则更新业务账单；<br>2.2 已通过，则返回消息："业务账单已经审核成功，不允许修改"；<br>2.3 已驳回，则更新业务账单； |
| 出错和异常处理机制   | 调用失败后重试，重试不超过3次。若重试3次全部不成功，则记录日志进行人工干预。      |
| 响应时间要求         | \<5秒                                                                           |

#### API内容

| **接口提供方**       | 第三方系统    | **接口调用方** | JYD           |
|----------------------|---------------|----------------|---------------|

**传入参数信息：**

| 参数名称 | 用途     |
|----------|----------|
| params   | 请求参数 |

**params字段含义：**

| 字段         | 变量名        | 类型         | 是否必填 | 数据样例           | 备注                                            |
|--------------|---------------|--------------|----------|--------------------|-------------------------------------------------|
| 账单号       | billNo        | String(30)   | 是       | OB20230701001      | 业务账单的唯一标识                               |
| 账单类型     | billCategory  | String(3)    | 是       | A01                | A01: 出库账单<br>A02: 网点出库账单<br>A03: 柜车账单<br>A04: 易提货账单<br>A05: 增值服务账单 |
| 业务单号     | orderNo       | String(30)   | 是       | OUT20230701001     | A01: 出库单号；A02: 网点出库单号；A03: 提单号；A04: 进仓单号；A05: 作业单号 |
| 业务发生时间 | issueTime     | String(20)   | 是       | 2025-08-06 12:12:12 | yyyy-MM-dd HH:MM:SS                              |
| 业务数据     | metadata      | Object       | 是       | {coNo:123, soNo:456} | 详见如下 Metadata                                |
| 总金额       | totalAmount   | Number(9,2)  | 是       | 5000.00            |                                                 |
| 客户代码     | customerCode  | String(30)   | 是       | ABC                |                                                 |
| 客户名称     | customerName  | String(120)  | 是       | 示例公司           |                                                 |
| 备注         | remark        | String(500)  | 否       |                    |                                                 |
| 费用列表     | feeItems      | Array        | 是       |                    | 详见 FeeItem                                    |
| 关联业务单明细列表 | referOrderDetails | Array | 否       |                    | 详见 ReferOrderDetail                           |

**Metadata字段含义(A01出库账单)：**

| 字段   | 变量名          | 类型        | 是否必填 | 数据样例     | 备注     |
|--------|-----------------|-------------|----------|--------------|----------|
| 柜号   | containerNo     | String(30)  | 是       | TGHU1234567  |          |
| 提单号 | blNo            | String(30)  | 是       | BL20230701001 | B/L No.  |
| 目的港 | destinationPort | String(30)  | 是       | NEW YORK     |          |

**Metadata字段含义(A02网点出库账单)：**

| 字段       | 变量名        | 类型        | 是否必填 | 数据样例     | 备注         |
|------------|---------------|-------------|----------|--------------|--------------|
| 柜号       | containerNo   | String(30)  | 否       | TGHU1234567  |              |
| 提单号     | blNo          | String(30)  | 否       | BL20230701001| B/L No.      |
| 网点代码码 | siteWorkCode  | String(30)  | 是       | LH           | 网点代码列表详细附录 |

**Metadata字段含义(A03柜车账单)：**

| 字段       | 变量名          | 类型         | 是否必填 | 数据样例         | 备注                                     |
|------------|-----------------|--------------|----------|------------------|------------------------------------------|
| 订单类型   | orderType       | String(30)   | 是       | 监管仓出口       | 监管仓出口、进口清关、班车运输、珠三角出口 |
| 客配单号   | custOrderNo     | String(30)   | 是       |                  |                                          |
| 提单号     | blNo            | String(30)   | 是       | HKGFC3929400     | B/L No.                                  |
| 柜号       | containerNo     | String(30)   | 是       | TGHU1234567      |                                          |
| 柜型       | containerType   | String(30)   | 是       |                  |                                          |
| 船封号     | sealNumber      | String(30)   | 是       |                  |                                          |
| 车牌号     | truckNo         | String(30)   | 是       |                  |                                          |
| 装货地     | loadLocation    | String(30)   | 是       |                  |                                          |
| 提柜地     | pickLocation    | String(30)   | 是       |                  |                                          |
| 还柜地     | returnLocation  | String(30)   | 是       |                  |                                          |
| 截重时间   | cutoffTime      | String(30)   | 是       |                  | CY                                       |
| 截放行时间 | closeTime       | String(30)   | 是       |                  | CV                                       |
| 订单重量   | orderWeight     | Number(9,3) | 是       |                  |                                          |
| 过磅重量   | weight          | Number(9,3) | 是       |                  |                                          |
| 船公司     | shippingCompany | String(100) | 是       |                  |                                          |

**Metadata字段含义(A04易提货账单)：**

| 字段       | 变量名          | 类型          | 是否必填 | 数据样例              | 备注                           |
|------------|-----------------|---------------|----------|-----------------------|--------------------------------|
| 货代代码   | orderCustCode   | String(30)    | 是       |                       | 易提货下单客户代码             |
| 货代名称   | orderCustName   | String(200)   | 是       |                       | 易提货下单客户名称             |
| 货代业务员 | cargoAgent      | String(30)    | 是       | wing                  | 通常是订单联系人               |
| 客户单号   | custOrderNo     | String(30)    | 是       | SZCLI/CTZ-NR59769     |                                |
| 运单号     | wayBillNo       | String(30)    | 是       | 20250731000065        |                                |
| 订单类型   | orderType       | String(30)    | 是       | 拼车                  |                                |
| 订单车型   | vehicleModel    | String(30)    | 是       |                       |                                |
| 司机车牌   | truckNo         | String(30)    | 是       |                       |                                |
| 件数       | pcs             | Number(9)     | 是       |                       |                                |
| 重量       | goodsWeight     | Number(9,3)   | 是       |                       |                                |
| 体积       | goodsVolume     | Number(9,3)   | 是       |                       |                                |
| 发货方地址 | sendAddress     | String(1000)  | 是       | xx省xx市xx镇x         |                                |
| 收货方地址 | receiveAddress  | String(300)   | 是       | 深圳xx仓              |                                |

**Metadata字段含义(A05增值服务账单)：**

待定

**FeeItem字段含义：**

| 字段         | 变量名      | 类型         | 是否必填 | 数据样例                              | 备注                                              |
|--------------|-------------|--------------|----------|---------------------------------------|---------------------------------------------------|
| 费用ID       | chargeId    | String(60)   | 是       | gdf58468-fe3b-47b6-91bd-f4d3e946bf01 | 每项费用的全局唯一UUID                             |
| 作业单号     | jobNo       | String(32)   | 是       | OUT20230701001                        | A01/A02: feeType=整柜费用对应出库单号，入库费用对应入库单号；A03：提单号；A04：进仓单号 |
| 费用类型     | feeType     | String(30)   | 是       | 整柜费用                              | A01/A02：整柜费用、入库费用；A03：柜车费用；A04：易提货费用 |
| 费用代码     | feeCode     | String(30)   | 是       | F001                                  |                                                   |
| 费用名称     | feeName     | String(60)   | 是       | 装卸费                                |                                                   |
| 金额         | amount      | Number(9,2)  | 是       | 5000.00                               | 正值：JYD应收；负值：JYD应付                        |
| 备注         | remark      | String(240)  | 否       |                                       |                                                   |
| 费用审核状态 | itemStatus  | String(10)   | 是       | APPROVED                              | APPROVED: 已通过；仅保留驳回后已同意的费用项，为空表示还需审核 |

**ReferOrderDetail字段含义(A01出库账单)：**

| 字段       | 变量名                   | 类型        | 是否必填 | 数据样例       | 备注                               |
|------------|--------------------------|-------------|----------|----------------|------------------------------------|
| 入库单号   | inboundNo                | String(30)  | 是       | IN20230628001 |                                    |
| 进仓单号   | bookingNo                | String(30)  | 是       | S20230801089  |                                    |
| 报关方式   | customsDeclarationMethod | String(30)  | 是       | 报关退税       | 报关退税；报关不退税；转仓报关       |
| 易提货标志 | ythFlag                  | String(10)  | 否       | M              | M: 拼车；O: 专车；N: 非易提货        |
| 网点代码   | siteWorkCode             | String(10)  | 否       | JX             | 网点代码，详见附录                   |
| 备注       | remark                   | String(500) | 否       |                |                                    |

**返回参数**

| 字段       | 变量名    | 类型       | 是否必填 | 数据样例        | 备注                           |
|------------|-----------|------------|----------|-----------------|--------------------------------|
|            |           |            |          |                 | 详见1.2.5统一返回说明            |
| 业务账单号 | billNo    | String(30) | 否       | OB20230701001   | 请求成功时有值                  |

#### 返回结果代码说明

详见1.2.6 返回状态码

#### 报文格式

**请求报文（A01 出库账单）：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da455e15b6ede2149fe2e63c",
  "msgSender": "JYD-01",
  "companyCode": "JYD",
  "apiCode": "JYD-TPS-F01",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "billNo": "OB20230701001",
    "billCategory": "A01",
    "orderNo": "OUT20230701001",
    "issueTime": "2023-07-01 01:02:03",
    "metadata": {
      "containerNo": "TGHU1234567",
      "blNo": "BL20230701001",
      "destinationPort": "NEW YORK"
    },
    "totalAmount": 12500,
    "customerCode": "ABC",
    "customerName": "示例客户有限公司",
    "remark": "紧急出库，请优先处理",
    "feeItems": [
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "OUT2023070002",
        "feeType": "整柜费用",
        "feeCode": "F001",
        "feeName": "运输费",
        "amount": 2000,
        "remark": "",
        "itemStatus": "APPROVED"
      },
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "IN2023070002",
        "feeType": "入库费用",
        "feeCode": "F002",
        "feeName": "港保港建费",
        "amount": 5000,
        "remark": "",
        "itemStatus": ""
      }
    ],
    "referOrderDetails": [
      {
        "inboundNo": "IN20230628001",
        "bookingNo": "WR20230628001",
        "customsDeclarationMethod": "报关退税",
        "ythFlag": "M",
        "siteWorkCode": "JX",
        "remark": "易碎品，小心搬运"
      }
    ]
  },
  "digest": "1JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**请求报文（A02 网点出库账单）：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da455e15b6ede2149fe2e63c",
  "msgSender": "JYD-01",
  "companyCode": "JYD",
  "apiCode": "JYD-TPS-F01",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "billNo": "OB20230701001",
    "billCategory": "A02",
    "orderNo": "OUT20230701001",
    "issueTime": "2023-07-01 01:02:03",
    "metadata": {
      "containerNo": "TGHU1234567",
      "blNo": "BL20230701001",
      "siteWorkCode": "LH"
    },
    "totalAmount": 12500,
    "customerCode": "ABC",
    "customerName": "示例客户有限公司",
    "remark": "网点出库",
    "feeItems": [
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "OUT2023070002",
        "feeType": "整柜费用",
        "feeCode": "F001",
        "feeName": "运输费",
        "amount": 2000,
        "remark": "",
        "itemStatus": ""
      },
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "IN2023070002",
        "feeType": "入库费用",
        "feeCode": "F002",
        "feeName": "港保港建费",
        "amount": 5000,
        "remark": "",
        "itemStatus": ""
      }
    ],
    "referOrderDetails": [
      {
        "inboundNo": "IN20230628001",
        "bookingNo": "WR20230628001",
        "customsDeclarationMethod": "报关退税",
        "ythFlag": "M",
        "siteWorkCode": "LH",
        "remark": "易碎品，小心搬运"
      }
    ]
  },
  "digest": "1JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**请求报文（A03 柜车账单）：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da455e15b6ede2149fe2e63c",
  "msgSender": "JYD-01",
  "companyCode": "JYD",
  "apiCode": "JYD-TPS-F01",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "billNo": "OB20230701001",
    "billCategory": "A03",
    "orderNo": "OUT20230701001",
    "issueTime": "2023-07-01 01:02:03",
    "metadata": {
      "orderType": "监管仓出口",
      "custOrderNo": "CJAL202506-0740",
      "blNo": "SNLFSKVLN1C703",
      "containerNo": "UETU5763157",
      "containerType": "40HQ",
      "sealNumber": "XETA564",
      "truckNo": "粤BKT996",
      "loadLocation": "长江仓",
      "pickLocation": "盐田码头",
      "returnLocation": "盐田码头",
      "cutoffTime": "2023-09-23 12:30:00",
      "closeTime": "2023-09-25 12:30:00",
      "orderWeight": 3450,
      "weight": 3450,
      "shippingCompany": "Maersk"
    },
    "totalAmount": 12500,
    "customerCode": "ABC",
    "customerName": "示例客户有限公司",
    "remark": "柜车运输",
    "feeItems": [
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "OUT2023070002",
        "feeType": "柜车费用",
        "feeCode": "F031",
        "feeName": "运输费",
        "amount": 2000,
        "remark": "",
        "itemStatus": ""
      },
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "IN2023070002",
        "feeType": "柜车费用",
        "feeCode": "F032",
        "feeName": "约柜费",
        "amount": 5000,
        "remark": "",
        "itemStatus": "APPROVED"
      }
    ],
    "referOrderDetails": []
  },
  "digest": "1JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**请求报文（A04 易提货账单）：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da455e15b6ede2149fe2e63c",
  "msgSender": "JYD-01",
  "companyCode": "JYD",
  "apiCode": "JYD-TPS-F01",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "billNo": "OB20230701001",
    "billCategory": "A04",
    "orderNo": "OUT20230701001",
    "issueTime": "2023-07-01 01:02:03",
    "metadata": {
      "orderCustCode": "xxx",
      "orderCustName": "xxx分公司",
      "cargoAgent": "wing",
      "custOrderNo": "SZCLI/CTZ-NR59769",
      "wayBillNo": "20250731000097",
      "orderType": "专车",
      "vehicleModel": "4米2",
      "truckNo": "粤BAY9026",
      "pcs": 235,
      "goodsWeight": 235.123,
      "goodsVolume": 235.123,
      "sendAddress": "广东省xx市xx区11栋xx室",
      "receiveAddress": "深圳长江监管仓"
    },
    "totalAmount": 12500,
    "customerCode": "ABC",
    "customerName": "示例客户有限公司",
    "remark": "紧急出库，请优先处理",
    "feeItems": [
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "OUT2023070002",
        "feeType": "易提货费用",
        "feeCode": "F041",
        "feeName": "运费",
        "amount": 200,
        "remark": "",
        "itemStatus": ""
      },
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "jobNo": "IN2023070002",
        "feeType": "易提货费用",
        "feeCode": "F042",
        "feeName": "入闸费",
        "amount": 500,
        "remark": "",
        "itemStatus": ""
      }
    ],
    "referOrderDetails": []
  },
  "digest": "1JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**成功报文：**

```json
{
  "code": 200,
  "message": "保存成功",
  "data": {
    "billNo": "OB20230701001"
  }
}
```

**失败报文：**

```json
{
  "code": 601,
  "message": "业务账单【OB20230701001】已经已通过， 不允许修改",
  "data": null
}
```

---

### 业务账单撤回接口

#### 应用场景

JYD业务人员需要撤回账单时，JYD系统调用本接口：如果第三方业务人员已经审核通过或已经开始审核，撤回失败，需要JYD业务人员线下找第三方业务人员处理；如果第三方业务人员未审核，撤回成功。

#### 规则

| **项目**             | **内容**                                                                        |
|----------------------|---------------------------------------------------------------------------------|
| 服务标识             | JYD_TPS_F02                                                                     |
| 服务名称             | 业务账单撤回接口                                                                |
| 服务版本号           | 1.0                                                                             |
| 服务提供方           | CSS                                                                             |
| 服务类型             | 读出 写入                                                                       |
| 同步/异步方式        | 同步 异步                                                                       |
| 请求方式             | HTTP POST                                                                       |
| 提交网址             | 由第三方对接时提供                                                              |
| 数据格式             | Accept：application/json<br>Content-type：application/json<br>Charset：utf-8    |
| 业务规则和逻辑       | 1. 如果业务账单不存在：返回消息："业务账单不存在，请核对数据是否有误"；<br>2. 如果业务账单存在：<br>2.1 未审核或已驳回：返回消息："撤回成功"；<br>2.2 已通过或审核中，返回消息："业务账单无法撤回，请线下联系处理"； |
| 出错和异常处理机制   | 调用失败后重试，重试不超过3次。若重试3次全部不成功，则记录日志进行人工干预      |
| 响应时间要求         | \<5秒                                                                           |

#### API内容

| **接口提供方**       | JYD           | **接口调用方** | 第三方系统    |
|----------------------|---------------|----------------|---------------|

**传入参数信息：**

| 参数名称 | 用途     |
|----------|----------|
| params   | 请求参数 |

**params字段含义：**

| 字段       | 变量名    | 类型       | 是否必填 | 数据样例        | 备注              |
|------------|-----------|------------|----------|-----------------|-------------------|
| 业务账单号 | billNo    | String(30) | 是       | OB20230701001   | 业务账单的唯一标识 |

**返回参数**

| 字段       | 变量名    | 类型       | 是否必填 | 数据样例        | 备注                           |
|------------|-----------|------------|----------|-----------------|--------------------------------|
|            |           |            |          |                 | 详见1.2.5统一返回说明            |
| 业务账单号 | billNo    | String(30) | 否       | OB20230701001   | 请求成功时有值                  |

#### 返回结果代码说明

详见1.2.6 返回状态码

#### 报文格式

**请求报文：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da443654542149fe2e63c",
  "msgSender": "JYD-01",
  "companyCode": "JYD",
  "apiCode": "JYD-TPS-F02",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "billNo": "OB20230701001"
  },
  "digest": "2JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**成功报文：**

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "billNo": "OB20230701001"
  }
}
```

**失败报文：**

```json
{
  "code": 601,
  "message": "业务账单无法撤回，请线下联系处理",
  "data": null
}
```

---

### 业务账单接收账单审核接口

#### 应用场景

金运达客户相关人员在其第三方对接系统中，对业务账单进行审核时，调用此接口，将审核结果和审核意见反馈给金运达JYD系统。如果反馈是已驳回，金运达财务人员需要根据审核意见进行修订业务账单，再次推送给金运达客户，直到反馈是已通过。

#### 规则

| **项目**             | **内容**                                                                        |
|----------------------|---------------------------------------------------------------------------------|
| 服务标识             | JYD_TPS_F03                                                                     |
| 服务名称             | 业务账单接收账单审核接口                                                        |
| 服务版本号           | 1.0                                                                             |
| 服务提供方           | CSS                                                                             |
| 服务类型             | 读出 写入                                                                       |
| 同步/异步方式        | 同步 异步                                                                       |
| 请求方式             | HTTP POST                                                                       |
| 提交网址             | https://接口基本地址orderBill/audit                                             |
| 数据格式             | Accept：application/json<br>Content-type：application/json<br>Charset：utf-8    |
| 业务规则和逻辑       | 1. 如果业务账单号不存在，则返回消息："业务账单不存在，请核对数据是否有误"；<br>2. 如果业务账单号存在：<br>2.1 未审核：返回消息"已通过"；<br>2.2 已通过：返回消息"业务账单已通过，无需再次审核"；<br>2.3 已驳回：<br>2.3.1 已驳回：返回消息"已驳回"；<br>2.3.2 已通过：返回消息"已通过"； |
| 出错和异常处理机制   | 调用失败后重试，重试不超过3次。若重试3次全部不成功，则记录日志进行人工干预      |
| 响应时间要求         | \<10秒                                                                          |

#### API内容

| **接口提供方**       | JYD           | **接口调用方** | 第三方系统    |
|----------------------|---------------|----------------|---------------|

**传入参数信息：**

| 参数名称 | 用途     |
|----------|----------|
| params   | 请求参数 |

**params字段含义：**

| 字段           | 变量名        | 类型          | 是否必填 | 数据样例        | 备注                                              |
|----------------|---------------|---------------|----------|-----------------|---------------------------------------------------|
| 业务账单号     | billNo        | String(30)    | 是       | OB20230701001   | 业务账单的唯一标识                                |
| 审核状态       | auditStatus   | String(10)    | 是       | APPROVED        | APPROVED: 已通过；REJECTED: 已驳回；注意：所有费用都是APPROVED时整个账单才能是APPROVED |
| 审核意见       | auditOpinion  | String(1000)  | 是       | 审核通过        |                                                   |
| 审核人联系邮箱 | auditContact  | String(200)   | 是       | xxx@abc.com     | 审核人联系方式邮箱或电话                          |
| 审核联系人     | auditUserName | String(30)    | 否       |                 | 审核人名称或尊称                                  |
| 费用审核列表   | feeAuditItems | Array         | 是       |                 | 详见 FeeAuditItem                                 |

**FeeAuditItem字段含义：**

| 字段         | 变量名      | 类型         | 是否必填 | 数据样例                              | 备注                 |
|--------------|-------------|--------------|----------|---------------------------------------|----------------------|
| 费用ID       | chargeId    | String(60)   | 是       | gdf58468-fe3b-47b6-91bd-f4d3e946bf01 | 每项费用的全局唯一UUID |
| 费用审核状态 | itemStatus  | String(10)   | 是       | APPROVED                              | APPROVED: 已通过；REJECTED: 已驳回 |
| 费用审核意见 | itemOpinion | String(200)  | 是       | 审核通过                              |                      |

**返回参数**

| 字段       | 变量名    | 类型       | 是否必填 | 数据样例        | 备注                           |
|------------|-----------|------------|----------|-----------------|--------------------------------|
|            |           |            |          |                 | 详见1.2.5统一返回说明            |
| 业务账单号 | billNo    | String(30) | 否       | OB20230701001   | 请求成功时有值                  |

#### 返回结果代码说明

详见1.2.6 返回状态码

#### 报文格式

**请求报文：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da443654542149fe2e63c",
  "msgSender": "ABC-01",
  "companyCode": "ABC",
  "apiCode": "JYD-TPS-F03",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "billNo": "OB20230701001",
    "auditStatus": "APPROVED",
    "auditOpinion": "审核通过",
    "auditContact": "xxxx@abc.com",
    "auditUserName": "张三",
    "feeAuditItems": [
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "itemStatus": "APPROVED",
        "itemOpinion": "审核通过"
      },
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf11",
        "itemStatus": "APPROVED",
        "itemOpinion": "审核通过"
      }
    ]
  },
  "digest": "2JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**成功报文：**

```json
{
  "code": 200,
  "message": "已通过",
  "data": {
    "billNo": "MB202307001"
  }
}
```

**失败报文：**

```json
{
  "code": 601,
  "message": "业务账单【MB202307001】已经审核成功，不允许反复审核",
  "data": null
}
```

---

### 月结账单推送接口

#### 应用场景

在月结账单生成之后，经金运达财务人员在JYD核对完成，JYD调用此接口, 将月结账单推送给对应客户的第三方系统。注意：金运达客户需要提供接收账单的服务接口。

#### 规则

| **项目**             | **内容**                                                                        |
|----------------------|---------------------------------------------------------------------------------|
| 服务标识             | JYD_TPS_F04                                                                     |
| 服务名称             | 月结账单推送接口                                                                |
| 服务版本号           | 1.0                                                                             |
| 服务提供方           | CSS                                                                             |
| 服务类型             | 读出 写入                                                                       |
| 同步/异步方式        | 同步 异步                                                                       |
| 请求方式             | HTTP POST                                                                       |
| 提交网址             | \<由第三方提供\>                                                                |
| 数据格式             | Accept：application/json<br>Content-type：application/json<br>Charset：utf-8    |
| 业务规则和逻辑       | 1. 如果账单号不存在，则直接保存月结账单；<br>2. 如果账单号存在：<br>2.1 仅接收但未审核，则更新月结账单；<br>2.2 已通过，则返回消息："月结账单已经已通过，不允许修改"；<br>2.3 已驳回，则更新月结账单； |
| 出错和异常处理机制   | 调用失败后重试，重试不超过3次。若重试3次全部不成功，则记录日志进行人工干预      |
| 响应时间要求         | \<5秒                                                                           |

#### API内容

| **接口提供方**       | 第三方系统    | **接口调用方** | JYD           |
|----------------------|---------------|----------------|---------------|

**传入参数信息：**

| 参数名称 | 用途     |
|----------|----------|
| params   | 请求参数 |

**params字段含义：**

| 字段           | 变量名              | 类型         | 是否必填 | 数据样例        | 备注                          |
|----------------|---------------------|--------------|----------|-----------------|-------------------------------|
| 月结账单号     | monthlyBillNo       | String(30)   | 是       | S20230801089    | 月结账单唯一标识              |
| 月结账单类型   | monthlyBillCategory | String(3)    | 是       | B01             | B01：仓库月账单；B02：网点月账单(暂无)；B03：柜车月账单；B04：易提货月账单 |
| 结算月份       | settleMonth         | String(6)    | 是       | 202503          | 年月，固位6位字符             |
| 总金额         | totalAmount         | Number(9,2)  | 是       | 5000.00         |                               |
| 客户代码       | customerCode        | String(30)   | 是       | ABC             |                               |
| 客户名称       | customerName        | String(120)  | 是       | 示例有限公司    |                               |
| 备注           | remark              | String(500)  | 否       |                 |                               |
| 账单明细       | billDetails         | Array        | 是       |                 | 详见 BillDetail               |

**BillDetail字段含义：**

| 字段       | 变量名        | 类型          | 是否必填 | 数据样例        | 备注                                        |
|------------|---------------|---------------|----------|-----------------|---------------------------------------------|
| 网点代码   | siteWorkCode  | String(120)   | 选填     | LH              | B01：必填；B03：不必填；B04：不必填         |
| 业务账单号 | billNo        | String(30)    | 是       | OB20230615001   |                                             |
| 金额       | amount        | Number(9,2)   | 是       | 5000.00         |                                             |

**返回参数**

| 字段       | 变量名        | 类型       | 是否必填 | 数据样例        | 备注                           |
|------------|---------------|------------|----------|-----------------|--------------------------------|
|            |               |            |          |                 | 详见1.2.5统一返回说明            |
| 月结账单号 | monthlyBillNo | String(30) | 否       | MB202307001     | 请求成功时有值                  |

#### 返回结果代码说明

详见1.2.6 返回状态码

#### 报文格式

**请求报文：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da455e15b6ede2149fe2e63c",
  "msgSender": "JYD-01",
  "companyCode": "JYD",
  "apiCode": "JYD-TPS-F04",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "monthlyBillNo": "MB202307001",
    "monthlyBillCategory": "B01",
    "settleMonth": "202306",
    "totalAmount": 125000,
    "customerCode": "ABC",
    "customerName": "示例客户有限公司",
    "remark": "2023年6月月结账单",
    "billDetails": [
      {
        "siteWorkCode": "LH",
        "billNo": "OB20230615001",
        "amount": 35000
      },
      {
        "siteWorkCode": "YH",
        "billNo": "OB20230615001",
        "amount": 75000
      }
    ]
  },
  "digest": "3JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**成功报文：**

```json
{
  "code": 200,
  "message": "保存成功",
  "data": {
    "monthlyBillNo": "MB202307001"
  }
}
```

**失败报文：**

```json
{
  "code": 601,
  "message": "月结账单【MB202307001】已经已通过， 不允许修改",
  "data": null
}
```

---

### 月结账单撤回接口

#### 应用场景

JYD财务人员需要撤回账单时，JYD系统调用本接口：如果第三方财务人员已经审核通过或已经开始审核，撤回失败，需要JYD财务人员线下找第三方财务人员处理；如果第三方财务人员未审核，撤回成功。

#### 规则

| **项目**             | **内容**                                                                        |
|----------------------|---------------------------------------------------------------------------------|
| 服务标识             | JYD_TPS_F05                                                                     |
| 服务名称             | 月结账单撤回接口                                                                |
| 服务版本号           | 1.0                                                                             |
| 服务提供方           | CSS                                                                             |
| 服务类型             | 读出 写入                                                                       |
| 同步/异步方式        | 同步 异步                                                                       |
| 请求方式             | HTTP POST                                                                       |
| 提交网址             | 由第三方对接时提供                                                              |
| 数据格式             | Accept：application/json<br>Content-type：application/json<br>Charset：utf-8    |
| 业务规则和逻辑       | 1. 如果月结账单不存在：返回消息："月结账单不存在，请核对数据是否有误"；<br>2. 如果月结账单存在：<br>2.1 未审核或已驳回：返回消息："撤回成功"；<br>2.2 已通过或审核中，返回消息："月结账单无法撤回，请线下联系处理"； |
| 出错和异常处理机制   | 调用失败后重试，重试不超过3次。若重试3次全部不成功，则记录日志进行人工干预      |
| 响应时间要求         | \<10秒                                                                          |

#### API内容

| **接口提供方**       | JYD           | **接口调用方** | 第三方系统    |
|----------------------|---------------|----------------|---------------|

**传入参数信息：**

| 参数名称 | 用途     |
|----------|----------|
| params   | 请求参数 |

**params字段含义：**

| 字段       | 变量名        | 类型       | 是否必填 | 数据样例        | 备注              |
|------------|---------------|------------|----------|-----------------|-------------------|
| 月结账单号 | monthlyBillNo | String(30) | 是       | MB202307001     | 月结账单唯一标识  |

**返回参数**

| 字段       | 变量名        | 类型       | 是否必填 | 数据样例        | 备注                           |
|------------|---------------|------------|----------|-----------------|--------------------------------|
|            |               |            |          |                 | 详见1.2.5统一返回说明            |
| 月结账单号 | monthlyBillNo | String(30) | 否       | MB202307001     | 请求成功时有值                  |

#### 返回结果代码说明

详见1.2.6 返回状态码

#### 报文格式

**请求报文：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da443654542149fe2e63c",
  "msgSender": "JYD-01",
  "companyCode": "JYD",
  "apiCode": "JYD-TPS-F05",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "monthlyBillNo": "MB202307001"
  },
  "digest": "2JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**成功报文：**

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "monthlyBillNo": "MB202307001"
  }
}
```

**失败报文：**

```json
{
  "code": 601,
  "message": "月结账单【MB202307001】已经已通过，不允许撤回",
  "data": null
}
```

---

### 月结账单接收审核接口

#### 应用场景

第三方相关人员在其第三方对接系统中，对月结账单进行审核时，调用此接口，将审核结果和审核意见反馈给JYD系统。如果反馈是已驳回，JYD财务人员需要根据审核意见进行修订月结账单，再次推送给第三方，直到反馈是已通过。

#### 规则

| **项目**             | **内容**                                                                        |
|----------------------|---------------------------------------------------------------------------------|
| 服务标识             | JYD_TPS_F06                                                                     |
| 服务名称             | 月结账单接收审核接口                                                            |
| 服务版本号           | 1.0                                                                             |
| 服务提供方           | CSS                                                                             |
| 服务类型             | 读出 写入                                                                       |
| 同步/异步方式        | 同步 异步                                                                       |
| 请求方式             | HTTP POST                                                                       |
| 提交网址             | https://接口基本地址/monthlyBill/audit                                          |
| 数据格式             | Accept：application/json<br>Content-type：application/json<br>Charset：utf-8    |
| 业务规则和逻辑       | 1. 如果账单号不存在，则返回消息："月结账单不存在，请核对数据是否有误"；<br>2. 如果账单号存在：<br>2.1 未审核：返回消息"已通过"；<br>2.2 已通过：返回消息"月结账单已通过，无需再次审核"；<br>2.3 已驳回：<br>2.3.1 已驳回：返回消息"已驳回"；<br>2.3.2 已通过：返回消息"已通过"； |
| 出错和异常处理机制   | 调用失败后重试，重试不超过3次。若重试3次全部不成功，则记录日志进行人工干预      |
| 响应时间要求         | \<5秒                                                                           |

#### API内容

| **接口提供方**       | JYD           | **接口调用方** | 第三方系统    |
|----------------------|---------------|----------------|---------------|

**传入参数信息：**

| 参数名称 | 用途     |
|----------|----------|
| params   | 请求参数 |

**params字段含义：**

| 字段           | 变量名        | 类型          | 是否必填 | 数据样例        | 备注                      |
|----------------|---------------|---------------|----------|-----------------|---------------------------|
| 月结账单号     | monthlyBillNo | String(30)    | 是       | MB202307001     | 月结账单的唯一标识        |
| 审核状态       | auditStatus   | String(10)    | 是       | APPROVED        | APPROVED: 已通过；REJECTED: 已驳回 |
| 审核意见       | auditOpinion  | String(1000)  | 是       | 核对无误，同意结算 |                           |
| 审核人联系邮箱 | auditContact  | String(200)   | 是       | xxx@abc.com     | 审核人联系方式邮箱或电话  |
| 审核联系人     | auditUserName | String(30)    | 否       |                 | 审核人名称或尊称          |

**返回参数**

| 字段       | 变量名        | 类型       | 是否必填 | 数据样例        | 备注                           |
|------------|---------------|------------|----------|-----------------|--------------------------------|
|            |               |            |          |                 | 详见1.2.5统一返回说明            |
| 月结账单号 | monthlyBillNo | String(30) | 否       | MB202307001     | 请求成功时有值                  |

#### 返回结果代码说明

详见1.2.6 返回状态码

#### 报文格式

**请求报文：**

:::details 点击查看
```json
{
  "appKey": "250b09a6da443654542149fe2e63c",
  "msgSender": "ABC-01",
  "companyCode": "ABC",
  "apiCode": "JYD-TPS-F06",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "monthlyBillNo": "MB202307001",
    "auditStatus": "APPROVED",
    "auditOpinion": "核对无误，同意结算",
    "auditContact": "xxxx@abc.com",
    "auditUserName": "张三"
  },
  "digest": "4JlYzk3M2UxYTcxYTIyOTAyN2ZiMDVjY2Y="
}
```
:::

**成功报文：**

```json
{
  "code": 200,
  "message": "已通过",
  "data": {
    "monthlyBillNo": "MB202307001"
  }
}
```

**失败报文：**

```json
{
  "code": 601,
  "message": "月结账单【MB202307001】已经审核成功，不允许反复审核",
  "data": null
}
```

---

## 附录

### 加签和验签算法

#### 加签前后报文件目标效果

**示例，以上文业务账单接收审核接口为例：**

加签前请求报文，需要对如下数据中亮显部分作为加签参数：

```json
{
  "appKey": "250b09a6da443654542149fe2e63c",
  "msgSender": "ABC-01",
  "companyCode": "ABC",
  "apiCode": "JYD-TPS-F04",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "billNo": "MB202307001",
    "auditStatus": "APPROVED",
    "auditor": "张三",
    "auditOpinion": "核对无误",
    "auditDate": "2023-07-02 17:25:12",
    "items": [
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "itemStatus": "APPROVED",
        "itemOpinion": "审核通过"
      }
    ]
  },
  "digest": ""
}
```

加签后请求报文：

```json
{
  "appKey": "250b09a6da443654542149fe2e63c",
  "msgSender": "ABC-01",
  "companyCode": "ABC",
  "apiCode": "JYD-TPS-F04",
  "nonceStr": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
  "timestamp": "1648536702112",
  "params": {
    "monthlyBillNo": "MB202307001",
    "auditStatus": "APPROVED",
    "auditor": "张三",
    "auditOpinion": "核对无误，同意结算",
    "auditDate": "2023-07-02 17:25:12",
    "items": [
      {
        "chargeId": "abf58468-fe3b-47b6-91bd-f4d3e946bf00",
        "itemStatus": "APPROVED",
        "itemOpinion": "审核通过"
      }
    ]
  },
  "digest": "NGY5MDY3MGQ1ZDljMmQxYmY2ZGE2NzBiY2M4ZjA0NWI="
}
```

#### 加签验签算法实现

**1. 核心算法实现**

```java
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class SimpleJSONDigestUtil {

    private static final String ALGORITHM = "HmacSHA256";

    /**
     * 生成签名
     * @param params 业务参数
     * @param apiKey API密钥（同时作为密钥）
     * @param timestamp 时间戳
     * @return 签名值
     */
    public static String generateDigest(Map<String, Object> params, String apiKey, String timestamp) {
        try {
            // 1. 构建待签名字符串
            String contentToSign = buildContentToSign(params, apiKey, timestamp);
            // 2. 使用HMAC-SHA256生成签名（使用apiKey作为密钥）
            Mac mac = Mac.getInstance(ALGORITHM);
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                    apiKey.getBytes(StandardCharsets.UTF_8), ALGORITHM);
            mac.init(secretKeySpec);
            byte[] signatureBytes = mac.doFinal(contentToSign.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(signatureBytes);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("生成签名失败", e);
        }
    }

    /**
     * 构建待签名字符串
     */
    private static String buildContentToSign(Map<String, Object> params, String apiKey, String timestamp) {
        // 对params进行标准化处理
        String normalizedParams = normalizeParams(params);
        // 拼接签名字符串：params + apiKey + timestamp
        return normalizedParams + "&" + apiKey + "&" + timestamp;
    }

    /**
     * 参数标准化：按字段名排序并拼接
     */
    private static String normalizeParams(Map<String, Object> params) {
        if (params == null || params.isEmpty()) {
            return "";
        }
        List<String> normalizedParts = new ArrayList<>();
        // 按字段名ASCII顺序排序
        List<String> keys = new ArrayList<>(params.keySet());
        Collections.sort(keys);
        for (String key : keys) {
            Object value = params.get(key);
            String valueStr = convertValueToString(value);
            normalizedParts.add(key + "=" + valueStr);
        }
        return String.join("&", normalizedParts);
    }

    /**
     * 值类型转换
     */
    private static String convertValueToString(Object value) {
        if (value == null) {
            return "";
        }
        if (value instanceof Map) {
            // Map类型递归处理
            return normalizeParams((Map<String, Object>) value);
        } else if (value instanceof List) {
            // List类型转换为JSON数组格式
            return listToJsonString((List<?>) value);
        } else if (value instanceof String) {
            // 字符串类型直接返回
            return (String) value;
        } else {
            // 其他类型转换为字符串
            return String.valueOf(value);
        }
    }

    /**
     * List转换为JSON字符串（保持一致性）
     */
    private static String listToJsonString(List<?> list) {
        if (list == null || list.isEmpty()) {
            return "[]";
        }
        List<String> elements = new ArrayList<>();
        for (Object element : list) {
            if (element instanceof Map) {
                elements.add("{" + normalizeParams((Map<String, Object>) element) + "}");
            } else {
                elements.add("\"" + String.valueOf(element) + "\"");
            }
        }
        return "[" + String.join(",", elements) + "]";
    }

    /**
     * 字节数组转十六进制字符串
     */
    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    /**
     * 验证签名
     * @param params 业务参数
     * @param apiKey API密钥
     * @param timestamp 时间戳
     * @param digest 收到的签名
     * @return 验证是否通过
     */
    public static boolean verifyDigest(Map<String, Object> params, String apiKey,
                                       String timestamp, String digest) {
        if (digest == null || digest.trim().isEmpty()) {
            return false;
        }
        try {
            String expectedDigest = generateDigest(params, apiKey, timestamp);
            return secureCompare(digest, expectedDigest);
        } catch (Exception e) {
            System.err.println("验证签名过程中发生错误: " + e.getMessage());
            return false;
        }
    }

    /**
     * 安全比较字符串（防止时序攻击）
     */
    private static boolean secureCompare(String a, String b) {
        if (a == null || b == null) {
            return false;
        }
        byte[] aBytes = a.getBytes(StandardCharsets.UTF_8);
        byte[] bBytes = b.getBytes(StandardCharsets.UTF_8);
        if (aBytes.length != bBytes.length) {
            return false;
        }
        int result = 0;
        for (int i = 0; i < aBytes.length; i++) {
            result |= aBytes[i] ^ bBytes[i];
        }
        return result == 0;
    }
}
```

**2. 使用方法范例**

```java
public class DirectUsageExample {
    public static void main(String[] args) {
        String apiKey = "abc1236787";
        // 构建参数
        Map<String, Object> params = new HashMap<>();
        params.put("monthlyBillNo", "MB202307001");
        params.put("auditStatus", "APPROVED");
        String timestamp = String.valueOf(System.currentTimeMillis());
        // 客户端加签
        String digest = SimpleJSONDigestUtil.generateDigest(params, apiKey, timestamp);
        System.out.println("生成的digest: " + digest);
        // 服务端验签
        boolean isValid = SimpleJSONDigestUtil.verifyDigest(params, apiKey, timestamp, digest);
        System.out.println("验证结果: " + isValid);
    }
}
```

### 数据字典

#### 金运达网点代码列表

| #  | 网点代码 | 网点名称     | 备注          |
|----|----------|--------------|---------------|
| 1  | LH       | 广州鸦岗     |               |
| 2  | SD       | 顺德         |               |
| 3  | SQ       | 中山石岐     |               |
| 4  | XL       | 中山小榄     |               |
| 5  | JM       | 江门         |               |
| 6  | ZH       | 珠海         |               |
| 7  | ST       | 汕头         |               |
| 8  | NZ       | 佛山南庄     |               |
| 9  | YJ       | 阳江         |               |
| 10 | XM       | 厦门         |               |
| 11 | DG       | 东莞         |               |
| 12 | FZ       | 福州         |               |
| 13 | JX       | 黄埔云埔     |               |
| 14 | MC       | MCC          |               |
| 15 | SZ       | 深圳         | 特指深圳公司  |

#### 业务账单类型字典

| #  | 类型代码 | 类型名称     | 备注 |
|----|----------|--------------|------|
| 1  | A01      | 出库账单     |      |
| 2  | A02      | 网点出库账单 |      |
| 3  | A03      | 柜车账单     |      |
| 4  | A04      | 易提货账单   |      |
| 5  | A05      | 增值服务账单 |      |

#### 月结账单类型字典

| #  | 类型代码 | 类型名称         | 备注          |
|----|----------|------------------|---------------|
| 1  | B01      | 仓库月账单       |               |
| 2  | B02      | 网点出库月账单   | (暂无场景)     |
| 3  | B03      | 柜车月账单       |               |
| 4  | B04      | 易提货月账单     |               |
| 5  | B05      | 增值服务月账单   |               |
