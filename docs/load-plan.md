---
title: 出库 Loadplan
date: 2025-12-19
author: 赖钻
sequence: 20
description: 出库loadplan相关文档，包含创建loadplan、装货回执、报关回执、运输回执等
tag: [{ type: 'tip', text: 'New' }]
---

## 更新日志

| 版本  | 修改描述     | 修订人 |  修订时间  |
| :---: | ------------ | ------ | :--------: |
| 1.0.0 | 新增规范文档 | 赖钻   | 2025-12-19 |


## 创建 Loadplan

通过EDI的方式创建loadplan。


### 请求参数

:::details 点击查看

```json

```

:::


### 请求方法

`POST`：`/v1/outbound/loadplan`

### 请求参数


#### 公共参数

| **字段名称**       | **字段描述**   | **数据类型**                              | **详细说明**                          | **必填** |
| ------------------ | -------------- | ---------------------------- | --------------------------------- | :------: |
| outbdNo              | 出库单号     | String(20)                                | 创建成功后立航返回的单号，用于取消出库订单或修改loadplan数据。创建订单不必填写  |    O     |
| action              |   操作类型   | String(1)                                | `C:创建`/`D:撤回`   |    O     |
| mode              | 出库模式     | String(10)                                | `清关：clearance`  |    Y     |
| consigneeCode      | 收货方代码     | String(30)                                |          |    Y     |
| payerCode          | 付款方代码         | String(30)                                |   结算公司代码，不填写默认`consigneeCode`绑定的付款方代码    |    N     |
| expectedDate       | 预计出库日期         | Date                                |   `yyyy-MM-dd`   |    Y    |
| returnPort         | 还柜口岸         | String(6)                                |   `mode=clearance` 必填。[可选项](./basic-data#returnPort)   |    O   |
| contactPerson         | 联系人         | String(100)                                |   可以填联系人名称或者联系人邮箱电话   |    N  |
| jobNo         | Job No         | String(32)                                |   客户自己的单号   |    N   |
| loadingRemark         | 装柜备注        | String(255)                                |      |    N   |
| vehicleSize         | 车辆尺寸        | String(4)                                |   [可选项](./basic-data#vehSize)   |    Y   |
| items         | 出库明细        | [List(1...n)](#items)                                |    |    Y   |
| attachments   | 附件列表       |  [List(0...n)](#attachement)   |    N     |

#### 清关出库参数

普通仓、仓转仓、退仓模式出仓不需要填写以下内容

| **字段名称**       | **字段描述**   | **数据类型**                              | **详细说明**                          | **必填** |
| ------------------ | -------------- | ---------------------------- | --------------------------------- | :------: |
| transportCompany         |    运输公司代码     | String(10)                 | 为空表示客户自己派运输车辆。[可选项](./basic-data#transport)    |    N   |
| transportWeigh         |    运输是否过磅     |        Boolean          |  `true: 需要称重过磅、false: 不需要过磅`    |    Y  |
| destinationCountry | 目的国        | String(3)         | [国家代码表](./basic-data/country)   |    Y     |

以下内容[还柜口岸是海运](./basic-data#returnPort)必填。其他不用填写

| **字段名称**       | **字段描述**   | **数据类型**                              | **详细说明**                          | **必填** |
| ------------------ | -------------- | ---------------------------- | --------------------------------- | :------: |
| receiverName | 收货人名称        | String(50)         |    |    Y     |
| receiverContactMode | 收货人联系方法        | String(2)         |  <Tip text="Enum">FX: 传真<Br/>EM：邮件<Br/>TE：电话</Tip> |    Y    |
| receiverContactNumber | 收货人联系号码        | String(30)         |    |    Y     |
| receiverAddress | 收货人联系地址       | String(70)         |    |   Y     |
| bookingNo              | 订舱单号     | String(32)                                |   |    Y     |
| carrier              | 船公司代码     | String(10)                                | [船公司代码表](./basic-data#carrier)  |    Y     |
| vessel              | 船名     | String(50)                                |   |    Y     |
| voyage              | 航次     | String(30)                                |   |    Y     |
| si              |   截补料时间   | Date                               | `yyyy-MM-dd HH:mm:ss`  |    Y     |
| cy             |   截关（截重柜）时间   | Date                               | `yyyy-MM-dd HH:mm:ss`  |    Y     |
| cv             |   截放行条时间   | Date                               | `yyyy-MM-dd HH:mm:ss`  |    Y     |


#### 附件列表 {#attachement}

| **字段名称** | **字段描述** | **数据类型** | **详细说明**                   | **必填** |
| ------------ | ------------ | ------------ | ------------------------------ | :------: |
| name         | 文件名称     | String(100)  | 只能上传 excel/doc/pdf/png/jpg |    Y     |
| url          | 附件地址     | String(100)  | 附件网络可以下载的地址         |    Y     |
| docType          | 附件类型     | String(10)  |   <Tip text="Enum">CLP: Container load plan<Br/>SO：船公司SO<Br/>OTH：其他</Tip>      |    Y     |


### 出库明细 {#items }

::: tip
支持没有交仓的进仓单号预先配柜
:::

| **字段名称** | **字段描述** | **数据类型** | **详细说明**   | **必填** |
| ------------ | ------------ | ------------ | ------------------------------ | :------: |
| soNum          | 装运订单号     | String(32)  |          |    Y     |
| loadingRemark          | 装柜备注     | String(255)  |          |    N     |


### 返回值

Http 状态码为`200`的时候有以下内容返回

| **字段名称**   | **字段描述**             | **数据类型**         | **详细说明**                        | **必填** |
| -------------- | ------------------------ | -------------------- | ----------------------------------- | :------: |
| outbdNo          | 出库单号               | String(20)           |                                     |    Y     |


## 回执

| **字段名称**   | **字段描述** | **数据类型**                                                                       | **详细说明** | **必填** |
| -------------- | ------------ | ---------------------------------------------------------------------------------- | ------------ | :------: |
| outbdNo          | 出库单号   | String(20)                                                                         |              |    Y     |
| receiptType    | 回执类型     | <Tip text="Enum">CUST：报关回执<Br/>WHSE：仓库收货回执</Tip> |              |    Y     |
| status         | 状态         |             String(20)                                                                       |              |    Y     |
| statusDateTime | 节点状态时间 | String(20)                                                                         |              |    Y     |
| data           | 回执数据     | [CUST](#cust)<br/>[WHSE](#whse)                                    |              |    Y     |


#### 仓库装货回执 {#whse}

##### 状态

:::tip 提示
`published`之前的都可以通过EDI来撤回loadplan数据。之后的状态如果修改需要通知立航客服处理
:::

| **代码**                   | **描述**                     |
| -------------------------- | ---------------------------- |
| approved                    | loadplan审核通过                    |
| rejected                    | loadplan审核不通过                    |
| published                    | 下发作业指令                    |
| conatiner_arrived                    | 空柜到仓                    |
| load_ready | 准备装柜                     |
| load_start            | 开始装货                     |
| loaded        | 装货完成                     |
| container_seal                  | 锁封 |

##### 回执数据

:::tip 提示
状态`approved/rejected`不会有回执数据
:::

| **字段名称**       | **字段描述** | **数据类型**          | **详细说明**                                                                   | **必填** |
| ------------------ | ------------ | --------------------- | ------------------------------------------------------------------------------ | :------: |
| warehouseLotNumber | 仓库作业单号 | String(20)            | 一个出库订单会对于多个出库作业单号 |    Y     |
| warehouseCode | 作业仓库代码 | String(6)            | [仓库代码表](./basic-data#warehouseCode) |    Y     |
| cargos             | 收货明细     | [List(1…n)](#cargo)   | 状态是`loaded`的时候必填                                                    |    O     |
| attachments        | 收货附件     | [List<1..n>](#recAtt) | 状态是`container_seal`的时候必填                                                    |    O     |

###### 装货明细 {#cargo}

| **字段名称**  | **字段描述** | **数据类型** | **详细说明**                                          | **必填** |
| ------------- | ------------ | ------------ | ----------------------------------------------------- | :------: |
| soNum | 装运订单号     | String(20)   |  |    Y     |
| packagingType | 包装单位     | String(20)   | [包装单位](./basic-data#warehousePackageCode) |    Y     |
| lengthCm      | 长           | Float(10,2)  |                                               |    Y     |
| widthCm       | 宽           | Float(10,2)  |                                                       |    Y     |
| heightCm      | 高           | Float(10,2)  |                                                       |    Y     |
| volumeCbm     | 体积         | Float(10,2)  |                                                       |    Y     |
| weightKg      | 重量         | Float(10,2)  |                                                       |    Y     |
| pieces      | 装货数量         | int  |                                                       |    Y     |
| marks         | 唛头         | String(200)  |                                                       |    N     |
| po            | po number    | String(200)  |                                                       |    N     |
| item          | item number  | String(200)  |                                                       |    N     |

###### 装货附件 {#recAtt}

| **字段名称** | **字段描述** | **数据类型**                                                                                                                     | **详细说明** | **必填** |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------ | :------: |
| docType      | 文件类型     | <Tip text="Enum">verify：核验相片。<br/>load：装货相片。<br/>seal：锁封相片</Tip> |              |    Y     |
| fileUrl      | 文件地址     | String(100)                                                                                                                      | 文件网络地址 |    Y     |
| fileName     | 文件名称     | String(100)                                                                                                                      |              |    Y     |

##### 样例

:::details 点击查看

```json
{
  "outbdNo": "OE2511170869",
  "receiptType": "WHSE",
  "status": "loaded",
  "statusDateTime": "2025-12-19 11:30:38",
  "data": [
    {
      "warehouseLotNumber": "PLAOE2511170869",
      "warehouseCode": "PLA",
      "cargos": [
        {
          "soNum": "Z25007xxx",
          "pieces": 60,
          "lengthCm": 31,
          "widthCm": 30,
          "heightCm": 32,
          "weightKg": 543,
          "volumeCbm": 1.79,
          "packagingType": "CTN",
          "marks": "TEST"
        },
        {
          "soNum": "SEDC155xxxx",
          "pieces": 1,
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
          "docType": "verify",
          "fileUrl": "https://uat.leaderrun.com/api/download/wm/attachment/inbound/2025/4/25/xxxx.jpg",
          "fileName": "xxxx.jpg"
        },
        {
          "docType": "load",
          "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.jpg",
          "fileName": "xxxxx.pdf"
        },
        {
          "docType": "load",
          "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.jpg",
          "fileName": "xxxxx.pdf"
        },
        {
          "docType": "seal",
          "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.jpg",
          "fileName": "xxxxx.pdf"
        },
        {
          "docType": "seal",
          "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.jpg",
          "fileName": "xxxxx.pdf"
        }
      ]
    },
    {
      "warehouseLotNumber": "QYOE2511170869",
      "warehouseCode": "QY",
      "cargos": [
        {
          "soNum": "ZSNLRHAM2212xxxx",
          "pieces": 60,
          "lengthCm": 31,
          "widthCm": 30,
          "heightCm": 32,
          "weightKg": 543,
          "volumeCbm": 1.79,
          "packagingType": "CTN",
          "marks": "TEST"
        },
        {
          "soNum": "1071159xxxx",
          "pieces": 1,
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
          "docType": "verify",
          "fileUrl": "https://uat.leaderrun.com/api/download/wm/attachment/inbound/2025/4/25/xxxx.jpg",
          "fileName": "xxxx.jpg"
        },
        {
          "docType": "load",
          "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.jpg",
          "fileName": "xxxxx.pdf"
        },
        {
          "docType": "load",
          "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.jpg",
          "fileName": "xxxxx.pdf"
        },
        {
          "docType": "seal",
          "fileUrl": "https://uat.leaderrun.com/api/download/om/shipping-order/2025/4/25/xxxx.jpg",
          "fileName": "xxxxx.pdf"
        }
      ]
    }
  ]
}
```

:::

#### 报关回执 {#cust}

##### 状态

::: warning 提示
报关放行和码头放行没有现有顺序
:::

| **代码**       | **描述** |
| -------------- | -------- |
| customs_release     | 报关放行   |
| port_release      | 码头放行 |

##### 回执数据

| **字段名称** | **字段描述** | **数据类型**     | **详细说明**                         | **必填** |
| ------------ | ------------ | ---------------- | ------------------------------------ | :------: |
| orderNo      | 报关订单号       | String(20)       | 立航生成的唯一订单号                 |    Y     |
| customsNo    | 海关报关单号 | String(20)       |  |    Y     |
| attachments  | 海关放行文件 | [List](#custAtt) | 状态为`customs_release`才有值         |    O     |

###### 海关附件 {#custAtt}

| **字段名称** | **字段描述** | **数据类型**                                                                    | **详细说明** | **必填** |
| ------------ | ------------ | ------------------------------------------------------------------------------- | ------------ | :------: |
| docType      | 文件类型     | <Tip text="Enum">CU000001：海关报关单<br/></Tip> |              |    Y     |
| fileUrl      | 文件地址     | String(100)                                                                     | 文件网络地址 |    Y     |
| fileName     | 文件名称     | String(100)                                                                     |              |    Y     |

##### 样例

:::details 点击查看

```json
{
  "outbdNo": "OE2511170869",
  "receiptType": "CUST",
  "status": "customs_release",
  "statusDateTime": "2025-12-19 11:30:38",
  "data": [
    {
      "orderNo": "OE2511170869-1",
      "customsNo": "5352202505214770000",
      "attachments": [
        {
          "docType": "CU000001",
          "fileUrl": "https://uat.leaderrun.com/api/download/cm/customs/2025/4/15/xxxxx_CU000001.pdf",
          "fileName": "xxxxx_CU000001.pdf"
        }
      ]
    },
    {
      "orderNo": "OE2511170869-2",
      "customsNo": "535220250521470000",
      "attachments": [
        {
          "docType": "CU000001",
          "fileUrl": "https://uat.leaderrun.com/api/download/cm/customs/2025/4/15/xxxxx_CU000001.pdf",
          "fileName": "xxxxx_CU000001.pdf"
        }
      ]
    }
  ]
}
```

:::
