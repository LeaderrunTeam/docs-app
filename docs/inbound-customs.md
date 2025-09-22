---
title: 入仓报关单接口文档
date: 2025-04-21
author: 赖钻
sequence: 100
description: 创建、修改、取消入监管仓报关单接口文档，包含入仓报关单状态回执文档
---

## 更新日志

| 版本  | 修改描述                                                     | 修订人 |  修订时间  |
| :---: | ------------------------------------------------------------ | ------ | :--------: |
| 1.0.0 | 新增规范文                                                   | 赖钻   | 2025-04-18 |
| 1.0.1 | 入仓报关单终审回执新增商品明细资料，包含料号以及自动备案序号 | 赖钻   | 2025-04-22 |
| 1.0.2 | 删除5和-5的状态回执 | 赖钻   | 2025-09-16 |
| 1.0.3 | 新增专用账册标识字段 <br/> [仓转仓](#trans-params)新增经营单位和加工单位数据 <br />新增请求参数和返回结果json样例 | 赖钻   | 2025-09-22 |

## 创建入仓申报订单

### 请求路径

`/v1/inbound/customs`

### 请求方法

`POST`

### 请求参数

::: details 清关入仓请求参数示例

```json
{
  "operationType": "C",
  "orderNo": "",
  "orderType": 1,
  "makerName": "pang",
  "makerTel": "15188888888",
  "makerMail": "xxxxx@leaderrun.com",
  "tradeCurr": "CNY",
  "remark": "",
  "operationBy": "pang",
  "operationTime": "2025-09-22 10:15:18",
  "bookingList": [
    {
      "bookingNo": "WM20592201",
      "warehouseCode": "PLA",
      "quantity": 100,
      "actualQuantity": 100,
      "warehouseQuantity": 100,
      "warehouseGrossWeight": 0
    },
    {
      "bookingNo": "WM20592202",
      "warehouseCode": "PLA",
      "quantity": 100,
      "actualQuantity": 100,
      "warehouseQuantity": 100,
      "warehouseGrossWeight": 0
    }
  ],
  "commodityList": [
    {
      "codeTs": "6204620000",
      "contrItem": 1,
      "destinationCountry": "USA",
      "districtCode": "44199",
      "dutyMode": "1",
      "exgVersion": "123456",
      "unit": "120",
      "secondUnit": "035",
      "firstUnit": "015",
      "goodsModel": "0|0|11|11|X|X|XX|X|X|XX|XXXXXX",
      "goodsName": "测试商品12",
      "goodsNo": 1,
      "originCountry": "CHN",
      "price": 2.3,
      "totalPrice": "230",
      "priceToTotal": false,
      "goodsExgNo": "202509160002",
      "commodityItemList": [
        {
          "bookingNo": "WM20592201",
          "firstQuantity": 100,
          "grossWeight": 1000,
          "netWeight": 900,
          "packingQuantity": 100,
          "quantity": 100,
          "packId": 0,
          "secondQty": 900
        },
        {
          "bookingNo": "WM20592202",
          "firstQuantity": 100,
          "grossWeight": 1000,
          "netWeight": 900,
          "packingQuantity": 100,
          "quantity": 100,
          "packId": 0,
          "secondQty": 900
        }
      ]
    }
  ],
  "vehicleList": [
    {
      "bookingNo": "WM20592201",
      "vehicleNo": "yb20014",
      "vehicleType": 0,
      "vehicleWeight": 3000,
      "containerNo": "xxx000001",
      "containerType": "40H",
      "containerWeight": 1000,
      "vehicleFrameWeight": 500,
      "driverMobile": "13888444478",
      "driverName": "zhang3"
    }
  ],
  "tradeMode": "0110",
  "cutMode": "101",
  "manualNo": null,
  "consignorName": "深圳市xxxx有限公司",
  "consignorCode": "44039xxxxx",
  "consignorScc": "9144030075762xxxxx",
  "consignorCiq": "1234567890",
  "ownerName": "深圳市xxxx有限公司",
  "ownerCode": "4403960ERP",
  "ownerScc": "9144030075762xxxxx",
  "ownerCiq": "442296xxxxx",
  "consigneeName": "xx",
  "licenseNo": "",
  "contractNo": "12345678",
  "markNo": "N/M",
  "wrapType": "29",
  "otherWrapTypes": [],
  "mode": 0,
  "businessType": 4,
  "tradeCountry": "USA",
  "transMode": "3",
  "feeCurr": "USD",
  "feeMark": "",
  "feeRate": "",
  "otherCurr": "",
  "otherMark": "",
  "otherRate": "",
  "insurCurr": "",
  "insurMark": "",
  "insurRate": "",
  "specialRelation": "",
  "priceImpact": "",
  "royalty": "",
  "entrustNo": "20245355013164207",
  "ecNo": "",
  "documentList": [
    {
      "certCode": "B",
      "docuCode": "xxxxxxxxxxxxxxxxxx",
      "fileName": "00001.png",
      "filePath": "http://dev.leaderrun.org/api/download/wm/attachment/inbound/2025/8/30/714344967578757_963d7e1531924ee7bdbdfb4775f2d335.png"
    }
  ],
  "attachmentList": [
    {
      "fileType": "00000001",
      "fileList": [
        {
          "name": "B01.png",
          "path": "http://dev.leaderrun.org/api/download/wm/attachment/inbound/2025/8/29/714044118038277_840a187b73dc42f0884bc8176f62ca52.jpg"
        }
      ]
    },
    {
      "fileType": "00000004",
      "fileList": [
        {
          "name": "B02.png",
          "path": "http://dev.leaderrun.org/api/download/wm/attachment/inbound/2025/8/30/714354063221893_9bafdd609b4b49b5a7deb92344d6c1ad.png"
        }
      ]
    },
    {
      "fileType": "C0000002",
      "fileList": [
        {
          "name": "00002.png",
          "path": "http://dev.leaderrun.org/api/download/wm/attachment/inbound/2025/9/8/717587096429701_64a03710cd394e4db052f0481ec25aab.png"
        }
      ]
    }
  ],
  "outbdWarehouseName": "",
  "outbdWarehouseCode": "",
  "rltPutrecNo": "",
  "warehouseNature": ""
}
```

:::

::: details 仓转仓请求参数示例

```json
{
  "operationType": "C",
  "orderNo": "",
  "orderType": 1,
  "makerName": "pang",
  "makerTel": "15188888888",
  "makerMail": "jxxxxg@leaderrun.com",
  "tradeCurr": "CNY",
  "remark": "",
  "operationBy": "pang",
  "operationTime": "2025-09-22 10:15:18",
  "bookingList": [
    {
      "bookingNo": "WM20592203",
      "warehouseCode": "PLA",
      "quantity": 100,
      "actualQuantity": 100,
      "warehouseQuantity": 100,
      "warehouseGrossWeight": 0
    },
    {
      "bookingNo": "WM20592204",
      "warehouseCode": "PLA",
      "quantity": 100,
      "actualQuantity": 100,
      "warehouseQuantity": 100,
      "warehouseGrossWeight": 0
    }
  ],
  "commodityList": [
    {
      "codeTs": "6204620000",
      "contrItem": 1,
      "destinationCountry": "USA",
      "districtCode": "44199",
      "dutyMode": "1",
      "exgVersion": "123456",
      "unit": "120",
      "secondUnit": "035",
      "firstUnit": "015",
      "goodsModel": "0|0|11|11|X|X|XX|X|X|XX|XXXXXX",
      "goodsName": "测试商品12",
      "goodsNo": 1,
      "originCountry": "CHN",
      "price": 2.3,
      "totalPrice": 230,
      "priceToTotal": false,
      "goodsExgNo": "202509160002",
      "commodityItemList": [
        {
          "bookingNo": "WM20592203",
          "firstQuantity": 100,
          "grossWeight": 1000,
          "netWeight": 900,
          "packingQuantity": 100,
          "quantity": 100,
          "secondQty": 900,
          "packId": "0"
        },
        {
          "bookingNo": "WM20592204",
          "firstQuantity": 100,
          "grossWeight": 1000,
          "netWeight": 900,
          "packingQuantity": 100,
          "quantity": 100,
          "secondQty": 900,
          "packId": "0"
        }
      ]
    }
  ],
  "vehicleList": [
    {
      "bookingNo": "WM20592203",
      "vehicleNo": "yb20014",
      "vehicleType": 0,
      "vehicleWeight": 3000,
      "containerNo": "xxx000001",
      "containerType": "40H",
      "containerWeight": 1000,
      "vehicleFrameWeight": 500,
      "driverMobile": "13888444478",
      "driverName": "zhang3"
    }
  ],
  "businessType": 2,
  "ownerName": "深圳xxxxx限公司",
  "ownerCode": "4403960xxx",
  "consignorCode": "4403960xxx",
  "consignorName": "深圳市xxxx有限公司",
  "mode": 0,
  "outbdWarehouseName": "深圳市xxxxx有限公司",
  "outbdWarehouseCode": "4403960xxx",
  "rltPutrecNo": "L5352P25A006",
  "warehouseNature": 1
}
```

:::

#### 公共参数

::: tip 订单类型(orderType)

分报：表示一个 SO 多个份报关资料。并且每份报关资料只能有一条[进仓单号参数](#booking-params)数据

合报：表示一个 SO 或者多个 SO 一份报关资料。[进仓单号参数](#booking-params)允许有一条及以上的数据

:::

| **字段名称**  | **字段描述**       | **数据类型**                        | **详细说明**                   | **必填** |
| ------------- | ------------------ | ----------------------------------- | ------------------------------ | :------: |
| operationType | 操作类型           | String(1)                           | `C:创建`/`U:修改`/`D:撤回`     |    Y     |
| orderNo       | 订单号             | String(20)                          | 创建的时候为空，修改和撤回必填 |    O     |
| orderType     | 订单类型           | Byte                                | 1:合报，10:分报                |    Y     |
| makerName     | 制单人             | String(50)                          |                                |    Y     |
| makerTel      | 制单人电话         | String(20)                          |                                |    Y     |
| makerMail     | 制单人邮箱         | String(20)                          |                                |    Y     |
| tradeCurr     | 成交币制           | String(3)                           |                                |    Y     |
| remark        | 备注               | String(200)                         |                                |    N     |
| operationBy   | 报关资料提交人     | String(10)                          |                                |    Y     |
| exclusivePutrecNo | 专用账册标识 <Badge text="1.0.3" /> | Boolean(20) |                                |    Y     |
| operationTime | 提交时间           | String                              | `yyyy-MM-dd HH:mm:ss`          |    Y     |
| bookingList   | 进仓单号参数       | [`List(1...n)`](#booking-params)    | 实际送货数据                   |    Y     |
| commodityList | 报关单商品资料参数 | [`List(1...50)`](#commodity-params) |                                |    Y     |
| vehicleList   | 车辆信息           | [`List(1...n)`](#vehicle-params)    |                                |    Y     |

#### 清关入仓业务参数

| **字段名称**    | **字段描述**                   | **数据类型**                         | **详细说明**                                                                                                                              | **必填** |
| --------------- | ------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| tradeMode       | 监管方式代码                   | String(4)                            |                                                                                                                                           |    Y     |
| cutMode         | 征免性质代码                   | String(3)                            | <Tip text="条件必填">监管方式为 0110/0214/0300/0615/0664/0700/4400/4600/0715/1300/3010/0265/3339 的时候必填，其他监管方方式必须为空</Tip> |    O     |
| manualNo        | 手账册备案号                   | String(12)                           | 加工贸易手账册时候必填                                                                                                                    |    O     |
| consignorName   | 境内发货人企业中文名称         | String(100)                          |                                                                                                                                           |    Y     |
| consignorCode   | 境内发货人 10 位海关编码       | String(10)                           |                                                                                                                                           |    Y     |
| consignorScc    | 境内发货人 18 位社会信用代码   | String(18)                           |                                                                                                                                           |    Y     |
| consignorCiq    | 境内发货人 10 位检验检疫编码   | String(10)                           |                                                                                                                                           |    N     |
| ownerName       | 生产销售单位企业中文名称       | String(100)                          |                                                                                                                                           |    Y     |
| ownerCode       | 生产销售单位 10 位海关编码吗   | String(10)                           | 没有 10 位海关编码填写 NO                                                                                                                 |    Y     |
| ownerScc        | 生产销售单位 18 位社会信用代码 | String(18)                           |                                                                                                                                           |    Y     |
| ownerCiq        | 生产销售单位 10 位检验检疫编码 | String(10)                           |                                                                                                                                           |    N     |
| consigneeName   | 境外收货人名称                 | String(100)                          |                                                                                                                                           |    Y     |
| licenseNo       | 许可证号                       | String(20)                           |                                                                                                                                           |    N     |
| contractNo      | 合同号                         | String(32)                           | 加工贸易账册合同号非必填，其他情况必填                                                                                                    |    O     |
| markNo          | 标记唛码                       | String(200)                          |                                                                                                                                           |    Y     |
| remark          | 备注                           | String(200)                          |                                                                                                                                           |    N     |
| wrapType        | 包装种类代码                   | String(2)                            |                                                                                                                                           |    Y     |
| otherWrapTypes  | 其他包装单位代码               | `Set<String>`                        |                                                                                                                                           |    N     |
| mode            | 业务模式                       | Byte                                 | 固定填写：0                                                                                                                               |    Y     |
| businessType    | 业务类型                       | Byte                                 | 取值：4:监管货、2:仓转仓                                                                                                                  |    Y     |
| tradeCountry    | 贸易国代码                     | String(3)                            |                                                                                                                                           |    Y     |
| transMode       | 成交方式                       | String(1)                            |                                                                                                                                           |    Y     |
| feeCurr         | 运费币制代码                   | String(3)                            |                                                                                                                                           |    O     |
| feeMark         | 运费标记                       | String(1)                            |                                                                                                                                           |    O     |
| feeRate         | 运费                           | BigDecimal(10,4)                     |                                                                                                                                           |    O     |
| otherCurr       | 杂费币制代码                   | String(3)                            |                                                                                                                                           |    O     |
| otherMark       | 杂费标记                       | String(1)                            |                                                                                                                                           |    O     |
| otherRate       | 杂费                           | BigDecimal(10,4)                     |                                                                                                                                           |    O     |
| insurCurr       | 保险费币制代码                 | String(3)                            |                                                                                                                                           |    O     |
| insurMark       | 保险费标记                     | String(1)                            |                                                                                                                                           |    O     |
| insurRate       | 保险费                         | BigDecimal(10,4)                     |                                                                                                                                           |    O     |
| specialRelation | 特殊关系确认                   | Byte                                 | 1 是、0 否。注意可以为空，空也是一个选项                                                                                                  |    N     |
| priceImpact     | 价格影响确认                   | Byte                                 | 1 是、0 否。注意可以为空，空也是一个选项                                                                                                  |    N     |
| royalty         | 特许权使用费                   | Byte                                 | 1 是、0 否。注意可以为空，空也是一个选项                                                                                                  |    N     |
| entrustNo       | 代理报关委托协议号             | String(17)                           | 逐单委托必填                                                                                                                              |    N     |
| ecNo            | 电商编号                       | String(32)                           | 监管方式`9710/9810`的时候必填                                                                                                             |    N     |
| documentList    | 随附单证                       | [`List`](#cert-params)               |                                                                                                                                           |    N     |
| attachmentList  | 报关单随附单据                 | [`List`](#custom-attachement-params) |                                                                                                                                           |    N     |

#### 仓转仓业务参数 {#trans-params}

| **字段名称**       | **字段描述**   | **数据类型** | **详细说明**       | **必填** |
| ------------------ | -------------- | ------------ | ------------------ | :------: |
| outbdWarehouseName | 转出方企业名称 | String(70)   |                    |    Y     |
| outbdWarehouseCode | 转出方海关编码 | String(10)   |                    |    Y     |
| rltPutrecNo        | 转出方账册号   | String(12)   |                    |    Y     |
| warehouseNature    | 转出方仓库性质 | Byte         | 1:监管仓、2:保税仓 |    Y     |
| consignorName   | 经营单位中文名称<Badge text="1.0.3" />         | String(100)                          |                                                                                                                                           |    Y     |
| consignorCode   | 经营单位 10 位海关编码   <Badge text="1.0.3" />    | String(10)                           |                                                                                                                                           |    Y     |
| consignorScc    | 经营单位 18 位社会信用代码 <Badge text="1.0.3" />  | String(18)                           |                                                                                                                                           |    Y     |
| ownerName       | 加工单位企业中文名称   <Badge text="1.0.3" />    | String(100)                          |                                                                                                                                           |    Y     |
| ownerCode       | 加工单位 10 位海关编码吗 <Badge text="1.0.3" />  | String(10)                           | 没有 10 位海关编码填写 NO                                                                                                                 |    Y     |
| ownerScc        | 加工单位 18 位社会信用代码 <Badge text="1.0.3" /> | String(18)                           |                                                                                                                                           |    N     |



#### 进仓单参数 {#booking-params}

::: tip 仓库收货数量

只有仓库收货数量（warehouseQuantity）等于实际工厂入仓数量（actualQuantity）的时候立航才会将报关资料进入预申报状态

如果订单类型是**分报**，那么相同 SO 所有的实际工厂入仓数量（actualQuantity）相加等于仓库收货数量（warehouseQuantity）的时候立航才会将报关资料进入预申报状态

**不管任何时候这两个数量不相等，报关资料都不会进入预申报，也就不会进入申报环节**

:::

| **字段名称**         | **字段描述**       | **数据类型**     | **详细说明**                                 | **必填** |
| -------------------- | ------------------ | ---------------- | -------------------------------------------- | :------: |
| bookingNo            | 进仓单号           | String(32)       |                                              |    Y     |
| warehouseCode        | 仓库代码           | String(10)       | [监管仓库代码表](./basic-data#warehouseCode) |    Y     |
| quantity             | 进仓单件数         | Short            | 货代进仓单包装数                             |    Y     |
| actualQuantity       | 实际工厂入仓包装数 | Short            | 工厂交仓包装数                               |    Y     |
| warehouseQuantity    | 仓库收货数量       | Short            |                                              |    N     |
| warehouseGrossWeight | 仓库收货毛重       | BigDecimal(10,4) |                                              |    N     |

#### 商品资料参数 {#commodity-params}

| **字段名称**       | **字段描述**     | **数据类型**                                      | **详细说明**                      | **必填** |
| ------------------ | ---------------- | ------------------------------------------------- | --------------------------------- | :------: |
| codeTs             | 商品编码         | String(10)                                        |                                   |    Y     |
| contrItem          | 手账册备案序号   | Integer                                           | 加工贸易必填。仓转仓不用填写      |    O     |
| destinationCountry | 最终目的国代码   | String(6)                                         |                                   |    Y     |
| districtCode       | 境内货源地代码   | String(6)                                         | 仓转仓不用填写，其他业务必填      |    O     |
| dutyMode           | 征免方式         | String(2)                                         | 仓转仓不用填写，其他业务必填      |    O     |
| exgVersion         | 版本号           | String(20)                                        | 加工贸易账册必填。仓转仓不用填写  |    O     |
| unit               | 成交单位代码     | String(3)                                         |                                   |    Y     |
| secondUnit         | 第二法定单位代码 | String(3)                                         |                                   |    N     |
| firstUnit          | 第一法定单位代码 | String(3)                                         |                                   |    Y     |
| goodsModel         | 申报要素         | String(255)                                       |                                   |    Y     |
| goodsName          | 商品名称         | String(50)                                        |                                   |    Y     |
| goodsNo            | 项号             | Byte                                              |                                   |    Y     |
| originCountry      | 原产国代码       | String(3)                                         |                                   |    Y     |
| price              | 单价             | BigDecimal(10,4)                                  |                                   |    Y     |
| totalPrice         | 总价             | BigDecimal(10,2)                                  |                                   |    Y     |
| priceToTotal       | 是否单价算总价   | Boolean                                           | true:单价算总价，false 总价算单价 |    Y     |
| goodsExgNo         | 商品料号         | String(32)                                        | 需全局唯一                        |    Y     |
| commodityItemList  | 商品二级明细数据 | [`List<CommodityItem>`](#commodity-second-params) |                                   |    Y     |

##### 商品资料二级明细参数 {#commodity-second-params}

| **字段名称**     | **字段描述** | **数据类型**     | **详细说明**                                | **必填** |
| ---------------- | ------------ | ---------------- | ------------------------------------------- | :------: |
| bookingNo        | 进仓单号     | String(32)       | [进仓单参数中的 BookingNo](#booking-params) |    Y     |
| firstQuantity    | 第一法定数量 | BigDecimal(10,4) |                                             |    Y     |
| grossWeight      | 毛重         | BigDecimal(10,4) |                                             |    Y     |
| netWeight        | 净重         | BigDecimal(10,4) |                                             |    Y     |
| packingQuantity  | 报关件数     | Short            |                                             |    Y     |
| quantity         | 成交数量     | BigDecimal(10,4) |                                             |    Y     |
| secondQty        | 第二法定数量 | BigDecimal(10,4) |                                             |    N     |
| spareQty         | 备品件数     | Short            |                                             |    N     |
| spareGrossWeight | 备品毛重     | BigDecimal(10,4) |                                             |    N     |

#### 核放单参数 {#vehicle-params}

::: tip 进仓单号(bookingNo)

**分报**：可以在其中一份报关资料中填写核放单数据即可。立航会通过进仓单号关联所有报关资料共用一份车辆数据

**合报**：两个及以上 SO 合报一份报关资料，填其中一个 SO 即可

:::

| **字段名称**       | **字段描述** | **数据类型** | **详细说明**                                | **必填** |
| ------------------ | ------------ | ------------ | ------------------------------------------- | :------: |
| bookingNo          | 进仓单号     | String(32)   | [进仓单参数中的 BookingNo](#booking-params) |    Y     |
| vehicleNo          | 承运车牌号   | String(8)    |                                             |    Y     |
| vehicleType        | 车型         | Byte         | 1 吨车，0 柜车                              |    Y     |
| vehicleWeight      | 车自重（kg） | Short        |                                             |    Y     |
| containerNo        | 集装箱号     | String(11)   | 柜车必填                                    |    O     |
| containerType      | 柜型         | String(3)    | 柜车必填                                    |    O     |
| containerWeight    | 柜重         | Short        | 柜车必填                                    |    O     |
| vehicleFrameWeight | 车架重       | Short        | 柜车必填                                    |    N     |
| driverMobile       | 司机手机号   | String(11)   |                                             |    N     |
| driverName         | 司机姓名     | String(20)   |                                             |    N     |
| vehicleFrameNo     | 车架号       | String(20)   |                                             |    N     |

#### 随附单证参数 {#cert-params}

| **字段名称** | **字段描述**               | **数据类型** | **详细说明** | **必填** |
| ------------ | -------------------------- | ------------ | ------------ | :------: |
| certCode     | 随附单证编号               | String(32)   |              |    Y     |
| docuCode     | 随附单证代码               | String(1)    |              |    Y     |
| fileName     | 文件名称                   | String(100)  |              |    N     |
| filePath     | 可以通过网络下载的文件地址 | String(200)  |              |    N     |

#### 随附单据参数 {#custom-attachement-params}

| **字段名称** | **字段描述**                | **数据类型**           | **详细说明** | **必填** |
| ------------ | --------------------------- | ---------------------- | ------------ | :------: |
| fileType     | [文件类型](#cert-file-type) | String(10)             |              |    Y     |
| fileList     | 附件路径                    | [`List`](#file-params) |              |    Y     |

##### 文件参数 {#file-params}

| **字段名称** | **字段描述**               | **数据类型** | **详细说明** | **必填** |
| ------------ | -------------------------- | ------------ | ------------ | :------: |
| name         | 文件名称                   | String(100)  |              |    Y     |
| path         | 可以通过网络下载的文件地址 | String(200)  |              |    Y     |

### 返回值

| **字段名称** | **字段描述** | **数据类型** | **详细说明** | **必填** |
| ------------ | ------------ | ------------ | ------------ | :------: |
| orderNo      | 报关订单号   | String(20)   |              |    Y     |

::: details 返回值示例

```json
{
  "orderNo": "ASNE2503412978"
}
```

:::

## 状态回执 {#status-receipt}

::: tip
立航会调用客户服务，实时将申报状态回传

::: details 响应示例

```json
{
  "invtNo": "111",
  "invtQd": "122",
  "status": "55",
  "orderNo": "ASNE2509311998",
  "statusTime": "2025-09-19 10:17:49",
  "commodityList": [
    {
      "recordNo": "1121",
      "goodsExgNo": "ASNE2509311998-1"
    }
  ],
  "attachmentList": [
    {
      "filePath": "http://dev.leaderrun.org/api/download/cm/customs/2025/9/19/p9qGD6mxrgJ_CU000007.pdf",
      "fileType": "CU000007"
    }
  ]
}
```

:::

| **字段名称**   | **字段描述**       | **数据类型**              | **详细说明**            | **必填** |
| -------------- | ------------------ | ------------------------- | ----------------------- | :------: |
| orderNo        | 报关订单号         | String(20)                |                         |    Y     |
| status         | [状态码](#status)  | String(20)                |                         |    Y     |
| statusTime     | 状态时间           | String(20)                | yyyy-MM-dd HH:mm:ss     |    Y     |
| invtNo         | 核注清单统一编号   | String(20)                | 状态码 50 和 55 必填    |    O     |
| invtQd         | 核注清单 QD 号     | String(20)                | 状态码 50 和 55 必填    |    O     |
| seqNo          | 统一编号           | String(20)                | 状态码 80、90、100 必填 |    O     |
| customsNo      | 报关单编号         | String(20)                | 状态码 80、90、100 必填 |    O     |
| manualNo       | 金二手账册统一编号 | String(20)                | 状态码 70 必填          |    O     |
| manualQd       | 金二手账册 QD 号   | String(20)                | 状态码 70 必填          |    O     |
| attachmentList | 放行文件           | [`List`](#release-file)   | 状态码为 55 必填        |    O     |
| commodityList  | 商品明细           | [`List`](#commodity-back) | 状态码为 55 必填        |    O     |

### 放行文件 {#release-file}

| **字段名称** | **字段描述**                   | **数据类型** | **详细说明** | **必填** |
| ------------ | ------------------------------ | ------------ | ------------ | :------: |
| fileType     | [文件类型](#release-file-type) | String(10)   |              |    Y     |
| filePath     | 可下载的文件网络地址           | String(100)  |              |    Y     |

### 商品明细 {#commodity-back}

| **字段名称** | **字段描述** | **数据类型** | **详细说明**                       | **必填** |
| ------------ | ------------ | ------------ | ---------------------------------- | :------: |
| goodsExgNo   | 商品料号     | String(32)   | 和创建入仓报关资料商品明细料号呼应 |    Y     |
| recordNo     | 自动备案序号 | String(20)   |                                    |    Y     |

### 状态码 {#status}

::: warning 提示
仓转仓状态值到 55，大于 55 的状态和-80 的状态没有
:::

| **状态代码** | **状态描述**                                           |
| ------------ | ------------------------------------------------------ |
|~~5~~	|~~委托中，工厂提交报关资料~~ <Badge text="1.0.2" /> |
|~~-5~~|~~报关资料退回。在申报之前报关员可以将报关资料退回给工厂~~ <Badge text="1.0.2" />|
| 20           | 报关资料审核通过                                       |
| -20          | 报关资料审核不通过                                     |
| 40           | 报关单资料报关单开始申报                               |
| 50           | 进口核注清单预审批通过                                 |
| 55           | 进口核注清单终审通过                                   |
| 70           | 金二手账册预审批通过                                   |
| 80           | 报关单审结                                             |
| -80          | 报关单查验                                             |
| 90           | 报关单放行                                             |
| 100          | 报关单结关                                             |

## 基础数据

### 随附单据文件类型 {#cert-file-type}

| **文件类型代码** | **文件类型描述** |
| ---------------- | ---------------- |
| C0000002         | 客供装箱单       |
| 00000001         | 发票             |
| 00000004         | 合同             |
| A                | 产品图片         |
| 50000004         | 其他资料         |

### 放行文件类型 {#release-file-type}

::: warning 提示
仓转仓只有 CU000004 文件，其他没有
:::

| **文件类型代码** | **文件类型描述**                           |
| ---------------- | ------------------------------------------ |
| CU000001         | 海关报关单                                 |
| CU000002         | 报关单放行通知书                           |
| CU000004         | 保税进口核注清单                           |
| CU000005         | 手册出口核注清单，加工贸易手册报关资料才有 |
| CU000007         | 报关委托书                                 |
| CU000008         | 账册出口核注清单，加工贸易账册报关资料才有 |
