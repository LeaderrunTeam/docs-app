---
title: 进仓单对接文档 V2
date: 2025-04-08
author: 赖钻
sequence: 11
description: 进仓单创建、修改、取消接口对接，包含收货回执推送文档。
---

## 更新日志

| 版本  | 修改描述     | 修订人 |  修订时间  |
| :---: | ------------ | ------ | :--------: |
| 1.0.0 | 新增规范文档 | 赖钻   | 2025-04-09 |
| 1.0.1 | 新增发货人名称（shipperName）字段 | 赖钻   | 2025-07-02 |
| 1.0.2 | destinationPort 设置为非必填项 | 赖钻   | 2025-07-21 |
| 1.0.3 | 新增 paymentTerm 字段用来表示入仓费用结算方式  | 赖钻   | 2025-07-21 |
| 1.0.4 | 新增 purchaseOrder 字段用来标识采购订单明细  | 赖钻   | 2025-09-08 |
| 1.0.5 | 新增请求创建booking报文样例  | 赖钻   | 2025-12-02 |
| 1.0.6 | 新增[卫星仓收货回执](#satwhse)  | 赖钻   | 2025-12-10 |
| 1.0.7 | 报关回执附件新增`CU000002：通关无纸化出口放行通知书`  | 赖钻   | 2025-12-23 |
| 1.0.8 | 新增收货体积计算说明  | 赖钻   | 2025-12-24 |

## 创建 Booking

通过接口方式在立航系统中创建交仓订单。


### 请求参数

:::details 点击查看

```json
{
  "soNum": "YAX3227147",
  "goodsName": "Paper box",
  "warehouseCode": "PLB",
  "receiverName": "AUTOLIV SAFETY TECHNOLOGY DE MEXIC",
  "shipperName": "Dongguan Eastern  Rainbow Precision  Metal",
  "contactPerson": "Judy Shun Hua Zhu",
  "contactPersonEmail": "test@xx.com",
  "contactNumber": "+86 755 82000000",
  "consigneeCode": "xxx",
  "payerCode": "xxx",
  "satWhseCode": "CAN",
  "totalPackages": 80,
  "packageUnit": "CTN",
  "totalCartons": null,
  "totalGrossWeight": 968,
  "totalVolume": 8.278,
  "destinationCountry": "ARE",
  "destinationPort": "AEDXB",
  "deliveryStartDate": "2025-12-12T00:00+08:00",
  "deliveryCutoffDate": "2025-12-15T00:00+08:00",
  "mark": "按实收",
  "remark": "Shipment ID: S25SSZ10044952 | Stackability: Yes | Comment(origin): HSWB | 进仓SO前缀: ",
  "paymentTerm": null,
  "dgClassification": ["UN3481"],
  "sensitive": true,
  "attachments": [
    {
      "name": "保函",
      "url": "https://xxx.xxx.com/xxx.pdf"
    }],
  "purchaseOrders": []
}
```

:::


### 请求方法

`POST`：`/v2/inbound/booking`

### 请求参数

| **字段名称**       | **字段描述**   | **数据类型**                              | **详细说明**                                                                                                                      | **必填** |
| ------------------ | -------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | :------: |
| soNum              | 装运订单号     | String(32)                                | Booking Number                                                                                                                    |    Y     |
| goodsName          | 货物简称       | String(100)                               | 装运的货物简要描述                                                                                                                |    N     |
| warehouseCode      | 交仓仓库代码   | String(10)                                | 对应立航仓库代码。[监管仓代码表](./basic-data#warehouseCode)、[保税区仓库代码表](./basic-data#bsWarehouseCode)                    |    Y     |
| receiverName       | 收货人名称     | String(30)                                | 收货人名称                                                                                                                        |    N     |
| shipperName       | 发货人名称     | String(30)                                | 发货人名称                                                                                                                        |    N     |
| contactPerson      | 联系人         | String(30)                                | Booking 对应货代联系人.                                                                                                           |    Y     |
| contactPersonEmail | 联系人电子邮件 | String(120)                               | Booking 对应货代联系人邮箱.                                                                                                       |    Y     |
| contactNumber      | 联系电话       | String(30)                                | Booking 对应货代联系人电话.                                                                                                       |    N     |
| consigneeCode      | 收货方代码     | String(30)                                | 此 CODE 用于识别该 Booking 在立航属于哪个收货方,需双方一同建立对应关系.                                                           |    Y     |
| payerCode          | 分公司         | String(30)                                | 此 CODE 用于识别 BOOKING 属于哪个分公司                                                                                           |    N     |
| satWhseCode        | 卫星仓代码     | String(6)                                 | 用于判断卫星仓业务,以便卫星仓业务的流转运作.以下为立航目前现有的卫星仓已经对应 CODE. [卫星代码表](./basic-data#sateWarehouseCode) |    N     |
| totalPackages      | 总件数         | Int                                       | 总包装数                                                                                                                          |    Y     |
| packageUnit        | 包装单位       | String(30)                                | [包装单位](./basic-data#warehousePackageCode)                                                                                     |    Y     |
| totalCartons       | 总箱数         | Int                                       | 总箱数                                                                                                                            |    N     |
| totalGrossWeight   | 总毛重         | Float(10,4)                               | 总毛重                                                                                                                            |    Y     |
| totalVolume        | 总体积         | Float(4,4)                                | 总体积                                                                                                                            |    Y     |
| destinationCountry | 目的国        | String(3)                                 | [国家代码表](./basic-data/country)                                                                                                               |    Y     |
| destinationPort    | 目的港         | String(10)                                | [卸货港代码表](./basic-data/unlocation)                                                                                                               |    N     |
| deliveryStartDate  | 交仓开日日期   | String                                    | 提供 Booking 预计交仓日期。格式：yyyy-MM-dd'T'HH:mm:ss                                                                            |    N     |
| deliveryCutoffDate | 交仓截止日期   | String                                    | 提供 Booking 交仓截止日期。格式：yyyy-MM-dd'T'HH:mm:ss                                                                            |    N     |
| mark               | 唛头           | String(200)                               | 提供唛头信息                                                                                                                      |    Y     |
| remark             | 备注           | String(200)                               | 提供个别备注                                                                                                                      |    N     |
| paymentTerm             | 结算方式           | String(2)                               | 入仓费用结算方式。不同客户费用不同，需要双方商定该字段含义                                                                                                                      |    N     |
| dgClassification   | 危险品编号     | `Set<String>(0...10)`                     |                                                                                                                                   |    N     |
| sensitive          | 是否敏感货物   | Boolean                                   | 如果为`true`必须上传附件，如保函                                                                                                  |    N     |
| attachments        | 附件列表       | [`List<Attachment>(0...n)`](#attachement) | 如涉及敏感货物，请提供相应附件                                                                                                    |    N     |
| purchaseOrders        | 采购订单       | [`List<PurchaseOrder>(0...n)`](#purchaseOrder) | 需要多多样化的订单明细请联系客服配置                                                                                                    |    N     |

#### 附件列表 {#attachement}

| **字段名称** | **字段描述** | **数据类型** | **详细说明**                   | **必填** |
| ------------ | ------------ | ------------ | ------------------------------ | :------: |
| name         | 文件名称     | String(100)  | 只能上传 excel/doc/pdf/png/jpg |    Y     |
| url          | 附件地址     | String(100)  | 附件网络可以下载的地址         |    Y     |


### 采购订单 {#purchaseOrder }

:::warning 注意
不同客户采购订单配置可能不一致，对接前请与客服确认
:::

| **字段名称** | **字段描述** | **数据类型** | **详细说明**   | **必填** |
| ------------ | ------------ | ------------ | ------------------------------ | :------: |
| po          | 采购订单号     | String(30)  |          |    Y     |
| item          | 项目编号     | String(30)  |          |    N     |
| packageQty          | 包装数量     | Integer  |             |    Y     |
| packageUnit          | 包装单位     | String(30)  |          |    Y     |
| lng          | 长     | Float(10,4)  |          |    Y     |
| wid          | 宽     | Float(10,4)  |          |    Y     |
| hgt          | 高     | Float(10,4)  |          |    Y     |
| volume          | 体积     | Float(10,4)  |          |    Y     |
| pieceWeight          | 单重     | Float(10,4)  |          |    Y     |
| grossWeight          | 毛重     | Float(10,4)  |          |    Y     |


### 返回值

Http 状态码为`200`的时候有以下内容返回

| **字段名称**   | **字段描述**             | **数据类型**         | **详细说明**                        | **必填** |
| -------------- | ------------------------ | -------------------- | ----------------------------------- | :------: |
| soNum          | 装运订单号               | String(32)           |                                     |    Y     |
| bookingFormUrl | BookingForm 网络下载地址 | String(100)          | messageType 为 SUCCESS 的时候不为空 |    O     |
| messageType    | 回执类型                 | [Enum](#MessageType) |                                     |    Y     |

#### MessageType {#MessageType}

| **代码** | **描述**                                           |
| -------- | -------------------------------------------------- |
| SUCCESS  | 创建成功                                           |
| PENDING  | 涉及铭感货物，等待人工审核。审核状态会通过回执推送 |

## 回执

| **字段名称**   | **字段描述** | **数据类型**                                                                       | **详细说明** | **必填** |
| -------------- | ------------ | ---------------------------------------------------------------------------------- | ------------ | :------: |
| soNum          | 装运订单号   | String(32)                                                                         |              |    Y     |
| receiptType    | 回执类型     | <Tip text="Enum">BKG: Booking 回执<Br/>CUST：报关回执<Br/>SAT_WHSE：卫星仓(网点)回执<Br/>WHSE：仓库收货回执</Tip> |              |    Y     |
| status         | 状态         |                                                                                    |              |    Y     |
| statusDateTime | 节点状态时间 | String(20)                                                                         |              |    Y     |
| data           | 回执数据     | [BKG](#bgk)<br/>[CUST](#cust)<br/>[SAT_WHSE](#satwhse)<br/>[WHSE](#whse)                                    |              |    Y     |

#### Booking 回执 {#bgk}

##### 状态

| **代码** | **描述**   |
| -------- | ---------- |
| rejected | 审核不通过 |
| approved | 审核通过   |

##### 回执数据

| **字段名称**   | **字段描述**             | **数据类型** | **详细说明**                  | **必填** |
| -------------- | ------------------------ | ------------ | ----------------------------- | :------: |
| bookingFormUrl | BookingForm 网络下载地址 | String(100)  | 只有状态是`approve`的时候才有 |    Y     |

##### 样例

:::details 点击查看

```json
{
  "soNum": "CNSZX0000581645",
  "receiptType": "BKG",
  "status": "approved",
  "statusDateTime": "2025-04-25 11:30:38",
  "data": {
    "bookingFormUrl": "https://logistics.leaderrun.com/xxxx.xlxs"
  }
}
```

:::

#### 卫星仓收货回执 {#satwhse}

卫星仓[立航在各城市的网点](./basic-data#sateWarehouseCode)收货后会推送相关状态

##### 状态

| **代码**                   | **描述**                     |
| -------------------------- | ---------------------------- |
| unloading_completed        | 卸货完成                     |
| departure                  | 卫星仓货物出库，发往深圳仓库   |

##### 回执数据

| **字段名称**       | **字段描述** | **数据类型**          | **详细说明**                                                                   | **必填** |
| ------------------ | ------------ | --------------------- | ------------------------------------------------------------------------------ | :------: |
| warehouseLotNumber | 仓库作业单号 | String(20)            | 一个作业单号会对应多个 SO Number。SO 分批交仓同一个 SO Number 会有多个作业单号 |    Y     |
| cargos             | 收货明细     | [List(1…n)](#sat-cargo)   | 状态是`unloading_completed`的时候必填                                                    |    O     |

###### 收货明细 {#sat-cargo}

| **字段名称**  | **字段描述** | **数据类型** | **详细说明**                                          | **必填** |
| ------------- | ------------ | ------------ | ----------------------------------------------------- | :------: |
| packagingType | 包装单位     | String(20)   | 仓库实收[包装单位](./basic-data#warehousePackageCode) |    Y     |
| pieces      | 收货数量           | int  |                                               |    Y     |
| lengthCm      | 长           | Float(10,2)  | 货物长度                                              |    Y     |
| widthCm       | 宽           | Float(10,2)  |                                                       |    Y     |
| heightCm      | 高           | Float(10,2)  |                                                       |    Y     |
| volumeCbm     | 体积         | Float(10,2)  |                                                       |    Y     |
| weightKg      | 重量         | Float(10,2)  |                                                       |    Y     |
| remark        | 收货备注     | String(200)  |                                                       |    N     |
| marks         | 唛头         | String(200)  |                                                       |    N     |
| po            | po number    | String(200)  |                                                       |    N     |
| item          | item number  | String(200)  |                                                       |    N     |

##### 样例

:::details 点击查看

```json
{
  "soNum": "ZSNLRHAM22121215",
  "receiptType": "SAT_WHSE",
  "status": "unloading_completed",
  "statusDateTime": "2025-12-04 16:20:39",
  "data": {
    "warehouseLotNumber": "ISW251203791952",
    "cargos": [
      {
        "pieces": 60,
        "remark": "test",
        "lengthCm": 31,
        "widthCm": 30,
        "heightCm": 32,
        "weightKg": 543,
        "volumeCbm": 1.79,
        "packagingType": "CTN",
        "marks": "TEST"
      },
      {
        "pieces": 1,
        "remark": "顶部不平整;",
        "lengthCm": 120,
        "widthCm": 100,
        "heightCm": 142,
        "weightKg": 157,
        "volumeCbm": 1.7,
        "packagingType": "Wooden Pallet",
        "marks": "PO#85010;85713"
      }
    ]
  }
}
```

:::


#### 仓库收货回执 {#whse}

##### 状态

| **代码**                   | **描述**                     |
| -------------------------- | ---------------------------- |
| arrived                    | 司机到仓                     |
| arrives_warehouse_platform | 车辆靠台                     |
| start_unloading            | 开始卸货                     |
| unloading_completed        | 卸货完成                     |
| finalized                  | 作业完成，此时会回传收货数据 |

##### 回执数据

| **字段名称**       | **字段描述** | **数据类型**          | **详细说明**                                                                   | **必填** |
| ------------------ | ------------ | --------------------- | ------------------------------------------------------------------------------ | :------: |
| warehouseLotNumber | 仓库作业单号 | String(20)            | 一个作业单号会对应多个 SO Number。SO 分批交仓同一个 SO Number 会有多个作业单号 |    Y     |
| cargos             | 收货明细     | [List(1…n)](#cargo)   | 状态是`finalized`的时候必填                                                    |    O     |
| attachments        | 收货附件     | [List<1..n>](#recAtt) | 状态是`finalized`的时候必填                                                    |    O     |

###### 收货明细 {#cargo}

:::danger 体积说明

**测量方式不同`长*宽*高*收货数量/100_0000`不一定等于`体积`**

例如按板测量，一个托盘有50箱货物。长宽高为托盘的尺码，体积为整个托盘的体积。

如果是按箱测量，那么长宽高就是一个纸箱的尺码，体积为`长宽高*50/100_0000`

:::

| **字段名称**  | **字段描述** | **数据类型** | **详细说明**                                          | **必填** |
| ------------- | ------------ | ------------ | ----------------------------------------------------- | :------: |
| packagingType | 包装单位     | String(20)   | 仓库实收[包装单位](./basic-data#warehousePackageCode) |    Y     |
| pieces      | 收货数量           | int  |                                               |    Y     |
| lengthCm      | 长           | Float(10,2)  | 货物长度                                              |    Y     |
| widthCm       | 宽           | Float(10,2)  |                                                       |    Y     |
| heightCm      | 高           | Float(10,2)  |                                                       |    Y     |
| volumeCbm     | 体积         | Float(10,2)  |                                                       |    Y     |
| weightKg      | 重量         | Float(10,2)  |                                                       |    Y     |
| remark        | 收货备注     | String(200)  |                                                       |    N     |
| marks         | 唛头         | String(200)  |                                                       |    N     |
| po            | po number    | String(200)  |                                                       |    N     |
| item          | item number  | String(200)  |                                                       |    N     |

###### 收货附件 {#recAtt}

| **字段名称** | **字段描述** | **数据类型**                                                                                                                     | **详细说明** | **必填** |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------ | :------: |
| docType      | 文件类型     | <Tip text="Enum">marks：唛头相片<br/>cargoReceipt：收货相片<br/>shippingOrder：收货核实单<br/>cargoHold：收货异常相片<br/></Tip> |              |    Y     |
| fileUrl      | 文件地址     | String(100)                                                                                                                      | 文件网络地址 |    Y     |
| fileName     | 文件名称     | String(100)                                                                                                                      |              |    Y     |

##### 样例

:::details 点击查看

```json
{
  "soNum": "ZSNLRHAM22121215",
  "receiptType": "WHSE",
  "status": "finalized",
  "statusDateTime": "2025-04-25 11:30:38",
  "data": {
    "warehouseLotNumber": "IQY2504259326",
    "cargos": [
      {
        "pieces": 60,
        "remark": "test",
        "lengthCm": 31,
        "widthCm": 30,
        "heightCm": 32,
        "weightKg": 543,
        "volumeCbm": 1.79,
        "packagingType": "CTN",
        "marks": "TEST"
      },
      {
        "pieces": 1,
        "remark": "顶部不平整;",
        "lengthCm": 120,
        "widthCm": 100,
        "heightCm": 142,
        "weightKg": 157,
        "volumeCbm": 1.7,
        "packagingType": "Wooden Pallet",
        "marks": "PO#85010;85713"
      }
    ],
    "attachments": [
      {
        "docType": "marks",
        "fileUrl": "https://uat.leaderrun.com/api/download/wm/attachment/inbound/2025/4/25/xxxx.jpg",
        "fileName": "ZSNLRHAM22121215_mark_1.jpg"
      },
      {
        "docType": "shippingOrder",
        "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.pdf",
        "fileName": "ZSNLRHAM22121215入仓核实单.pdf"
      }
    ]
  }
}
```

:::

#### 报关回执 {#cust}

##### 状态

| **代码**       | **描述** |
| -------------- | -------- |
| InDelegate     | 委托中   |
| PassAudit      | 审单通过 |
| InDeclaration  | 申报中   |
| EndDeclaration | 申报完毕 |
| Examine        | 查验     |
| Invalid        | 作废     |
| Modify         | 退回修改 |

##### 回执数据

| **字段名称** | **字段描述** | **数据类型**     | **详细说明**                         | **必填** |
| ------------ | ------------ | ---------------- | ------------------------------------ | :------: |
| orderNo      | 订单号       | String(20)       | 立航生成的唯一订单号                 |    Y     |
| customsNo    | 海关报关单号 | String(20)       | 状态为`EndDeclaration/Examine`才有值 |    O     |
| attachments  | 海关放行文件 | [List](#custAtt) | 状态为`EndDeclaration`才有值         |    O     |

###### 海关附件 {#custAtt}

| **字段名称** | **字段描述** | **数据类型**                                                                    | **详细说明** | **必填** |
| ------------ | ------------ | ------------------------------------------------------------------------------- | ------------ | :------: |
| docType      | 文件类型     | <Tip text="Enum">CU000004：保税进口核注清单<br/>CU000001：海关报关单<br/>CU000002：通关无纸化出口放行通知书<br/></Tip> |              |    Y     |
| fileUrl      | 文件地址     | String(100)                                                                     | 文件网络地址 |    Y     |
| fileName     | 文件名称     | String(100)                                                                     |              |    Y     |

##### 样例

:::details 点击查看

```json
{
  "soNum": "ZSNLRHAM22121215",
  "receiptType": "CUST",
  "status": "EndDeclaration",
  "statusDateTime": "2025-04-25 11:30:38",
  "data": {
    "orderNo": "ASNE2504773225",
    "customsNo": "535220250520358315",
    "attachments": [
      {
        "docType": "CU000001",
        "fileUrl": "https://uat.leaderrun.com/api/download/cm/customs/2025/4/15/xxxxx_CU000001.pdf",
        "fileName": "xxxxx_CU000001.pdf"
      },
      {
        "docType": "CU000004",
        "fileUrl": "https://uat.leaderrun.com/api/download/cm/customs/2025/4/15/xxx_CU000004.pd",
        "fileName": "xxx_CU000004.pdf"
      }
    ]
  }
}
```

:::
