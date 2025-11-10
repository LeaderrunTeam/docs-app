---
title: 出仓报关单接口文档
date: 2025-04-18
author: 赖钻
sequence: 200
description: 创建、修改、取消监管仓出仓报关单接口文档，包含出仓报关单状态回执文档
---

## 更新日志

| 版本  | 修改描述   | 修订人 |  修订时间  |
| :---: | ---------- | ------ | :--------: |
| 1.0.0 | 新增规范文 | 赖钻   | 2025-04-23 |
| 1.0.1 | 删除[出仓报关单明细](#commoditys)的商品名称和自动备案序号字段 <br /> 新增[核放单参数](#vehicle-params) | 赖钻   | 2025-09-23 |
| 1.0.2 | 删除运输方式字段 | 赖钻   | 2025-09-28 |
| 1.0.3 | 出仓申报放行新增申报报关单数据以及申报的完整商品明细数据 | 赖钻   | 2025-10-13 |
| 1.0.4 | 返回值申报数据新增成交币值 | 赖钻   | 2025-10-15 |
| 1.0.5 | 新增商品明细混装功能 <br />更新`jobNo`和`outbdNo`参数说明 | 赖钻   | 2025-11-06 |
| 1.0.6 | 表头新增总毛重和总净重用于校验商品明细总毛重和净重 <br /> 更新报关明细混装标识标识逻辑，相同`packId`表示一组混装 | 赖钻   | 2025-11-10 |


## 创建出仓申报订单

### 请求路径

`/v1/outbound/customs`

### 请求方法

`POST`

### 请求参数

::: details 请求参数示例

```json

```

:::

#### 公共参数

:::warning

若需要修改，请先撤回后再创建

:::

| **字段名称**       | **字段描述** | **数据类型**                 | **详细说明**                                           | **必填** |
| ------------------ | ------------ | ---------------------------- | ------------------------------------------------------ | :------: |
| operationType      | 操作类型     | String(1)                    | `C:创建`/`D:撤回`                             |    Y     |
| outbdNo           | 出库单号     | String(20)                  |      立航创建成功后返回的单号，撤回的时候必填。创建的时候不填写    <Badge text="1.0.5" />                                               |   O    |
| warehouseCode      | 作业仓库代码 | `Set<String>(1...n)`         | 多仓拼柜的时候填写多个仓库                             |    Y     |
| expectDate         | 预计出库日期 | String(10)                   | `yyyy-MM-dd`                                           |    Y     |
| jobNo              | 工作单号     | String(32)                   |          和立航系统交互的唯一单号 <Badge text="1.0.5" />    |    N     |
| totalGrossWeight | 报关单总毛重       | BigDecimal(10, 4)            |    <Badge text="1.0.6" />                                            |    Y     |
| totalNetWeight | 报关单总净重       | BigDecimal(10, 4)            |      <Badge text="1.0.6" />                                          |    Y     |
| trailer            | 是否柜车     | Boolean                      | 柜车填 true，吨车填 false                              |    Y     |
| containerStatus    | 柜状态       | Byte                         | 固定填写：10                                           |    Y     |
| containerNo        | 柜号         | String(12)                   | 柜车必填                                               |    O     |
| containerWeight    | 柜重         | BigDecimal(10,4)             | 柜车必填                                               |    O     |
| containerType      | 柜型         | String(4)                    | 柜车必填                                               |    O     |
| vehicleFrameWeight | 车架重       | BigDecimal(10, 4)            | 柜车必填                                               |    O     |
| vehicleWeight      | 车自重       | BigDecimal(10, 4)            |                                                        |    Y     |
| businessType       | 业务类型     | Byte                         | 仓转仓出仓填：3、清关出仓填：1                         |    Y     |
| ~~transportCode~~   | ~~运输方式~~     <Badge text="1.0.2" />  | ~~String(1)~~                 | ~~仓转仓填：9，海运填：4，陆运填：2，空运填：5~~          |    Y     |
| destinationCountry | 目的国代码   | String(3)                    | 仓转仓可以固定填写：CHN                                |    Y     |
| plate              | 车牌         | String(8)                    |                                                        |    Y     |
| driver             | 司机姓名     | String(6)                    |                                                        |    N     |
| tel                | 司机联系方式 | String(11)                   |                                                        |    N     |
| csRemark           | 备注         | String(200)                  |                                                        |    N     |
| items              | 出库货物明细 | [`List(1...n)`](#items)      | 和报关资料明细二选一，该字段优先级高于报关资料明细字段 |    N     |
| commodityList      | 报关资料明细 | [`List(1...n)`](#commoditys) | 和出库明细二选一                                       |    N     |
| vehicleList   | 车辆信息           | [`List(1...n)`](#vehicle-params)    |                                |    Y     |

#### 清关出仓业务参数

| **字段名称** | **字段描述**                        | **数据类型**      | **详细说明**        | **必填** |
| ------------ | ----------------------------------- | ----------------- | ------------------- | :------: |
| iePort       | 出境关别                            | String(4)         |                     |    Y     |
| returnPort   | [还柜口岸](./basic-data#returnPort) | String(4)         |                     |    Y     |
| bookingNo    | 订舱单号                            | String(32)        | 海运必填            |    O     |
| vesselName   | 船名                                | String(50)        | 海运必填            |    O     |
| voyage       | 航次                                | String(30)        | 海运必填            |    O     |
| carrier      | 船公司代码                          | String(10)        | 海运必填            |    O     |
| closingTime  | 截关时间                            | String(20)        | yyyy-MM-dd HH:mm:ss |    N     |
| cutTime      | 截重时间                            | String(20)        | yyyy-MM-dd HH:mm:ss |    N     |
| sealNo       | 封条号                              | String(20)        | 海运必填            |    O     |
| consignee    | 收货人提单信息                      | [`Object`](#bill) |                     |    Y     |
| notify       | 通知人提单信息                      | [`Object`](#bill) |                     |    O     |

#### 仓转仓业务参数

| **字段名称** | **字段描述**       | **数据类型** | **详细说明** | **必填** |
| ------------ | ------------------ | ------------ | ------------ | :------: |
| turnPutrecNo | 仓转仓转入方账册号 | String(12)   |              |    Y     |
| rltInvtNo    | 关联入仓清单编号   | String(20)   |              |    Y     |

##### 出库货物明细 <badge type="tip" text="推荐" /> {#items}

> [!warning] 提示
> **和出库报关明细二选一**
>
> 立航会将`bookingNo`关联的入仓所有报关资料商品明细数据带出生成出仓报关资料商品明细。由立航确保海关库存不会有剩余

| **字段名称**  | **字段描述**                           | **数据类型**     | **详细说明**                                                             | **必填** |
| ------------- | -------------------------------------- | ---------------- | ------------------------------------------------------------------------ | :------: |
| bookingNo     | 进仓单号                               | String(32)       | 和[创建入仓申报订单](./inbound-customs#booking-params)的进仓单号保持一致 |    Y     |
| grossWeight   | 出库毛重                               | BigDecimal(10,4) |                                                                          |    Y     |
| volume        | 出库体积                               | BigDecimal(10,4) |                                                                          |    Y     |
| quantity      | 出库包装数                             | Integer          |                                                                          |    Y     |
| warehouseCode | [仓库代码](./basic-data#warehouseCode) | String           |                                                                          |    Y     |
| packageType   | 包装单位名称                           | String           |                                                                          |    Y     |

##### 出仓报关单明细 {#commoditys}

> [!warning] 提示
> **和出库货物明细二选一**
>
> **需要客户自行管控库存剩余。** 如果净重、毛重、报关件数、法一数量、法二数量、成交数量扣除本次出仓数量后剩余库存小于 1 ，立航不会允许这次订单的创建。立航会在错误内容中详细说明扣减后剩余的库存，客户可以根据错误内容修改出仓报关明细数量

| **字段名称**       | **字段描述**     | **数据类型**      | **详细说明**                                                        | **必填** |
| ------------------ | ---------------- | ----------------- | ------------------------------------------------------------------- | :------: |
| id         | 唯一序号             | Long       |     需要保证在这份订单中唯一  <Badge text="1.0.5" />  |    Y     |
| packId         | 混装标识             | Long       |  一组混装明细填相同的标识   <Badge text="1.0.6" />  |    Y     |
| goodsExgNo         | 料号             | String(32)        | [入仓申报回执](./inbound-customs.md#commodity-back)中的料号         |    Y     |
| goodsExgNo         | 料号             | String(32)        | [入仓申报回执](./inbound-customs.md#commodity-back)中的料号         |    Y     |
| goodsModel         | 入仓申报要素     | String(255)       |                                                                     |    Y     |
| ~~goodsName~~          | ~~商品名称~~         | ~~String(100)~~    <Badge text="1.0.1" />    |                                                                     |    Y     |
| ~~recordNo~~           | ~~自动备案序号~~     | ~~String(12)~~   <Badge text="1.0.1" />    | ~~[入仓申报回执](./inbound-customs.md#commodity-back)中的自动备案序号~~|    Y     |
| codeTs             | 商品编码         | String(10)        |                                                                     |    Y     |
| price              | 单价             | BigDecimal(10, 4) |                                                                     |    Y     |
| grossWeight        | 总毛重           | BigDecimal(10, 4) |                                                                     |    Y     |
| netWeight          | 总净重           | BigDecimal(10, 4) |                                                                     |    Y     |
| packingQuantity    | 总报关件数       | Integer           |                                                                     |    Y     |
| totalPrice         | 总价             | BigDecimal(10, 2) |                                                                     |    Y     |
| unit               | 成交单位代码     | String(3)         |                                                                     |    Y     |
| firstUnit          | 第一法定单位代码 | String(3)         |                                                                     |    Y     |
| secondUnit         | 第二法定单位代码 | String(3)         |                                                                     |    N     |
| totalFirstQuantity | 第一法定数量     | BigDecimal(14, 4) |                                                                     |    Y     |
| totalQuantity      | 成交数量         | BigDecimal(14, 4) |                                                                     |    Y     |
| totalSecondQty     | 第二法定数量     | BigDecimal(14, 4) |                                                                     |    N     |
| spareQuantity      | 备品件数         | Short             |                                                                     |    N     |
| spareGrossWeight   | 备品毛重         | BigDecimal(14, 4) |                                                                     |    N     |

#### 核放单参数 {#vehicle-params}

::: tip 

一车多单：立航会将相同车牌（未申报）的订单合并为一个核放单

:::

| **字段名称**       | **字段描述** | **数据类型** | **详细说明**                                | **必填** |
| ------------------ | ------------ | ------------ | ------------------------------------------- | :------: |
| vehicleNo          | 承运车牌号   | String(8)    |                                             |    Y     |
| vehicleType        | 车型         | Byte         | 1 吨车，0 柜车                              |    Y     |
| vehicleWeight      | 车自重（kg） | Short        |                                             |    Y     |
| containerNo        | 集装箱号     | String(11)   | 柜车必填                                    |    O     |
| containerType      | 柜型         | String(4)    | 柜车必填                                    |    O     |
| containerWeight    | 柜重         | Short        | 柜车必填                                    |    O     |
| vehicleFrameWeight | 车架重       | Short        | 柜车必填                                    |    N     |
| driverMobile       | 司机手机号   | String(11)   |                                             |    N     |
| driverName         | 司机姓名     | String(20)   |                                             |    N     |
| vehicleFrameNo     | 车架号       | String(20)   |   柜车必填，吨车默认：1                                          |    N     |

#### 提单信息 {#bill}

::: warning 提示
收货人为 TOORDER 的时候地址必须是 TOORDER 并且联系电话为空。

收货人为 TOORDER 通知人必填

通知人不能是 TOORDER
:::

| **字段名称** | **字段描述** | **数据类型**                                      | **详细说明**                      | **必填** |
| ------------ | ------------ | ------------------------------------------------- | --------------------------------- | :------: |
| name         | 联系人名称   | String(70)                                        |                                   |    Y     |
| address      | 地址         | String(70)                                        |                                   |    Y     |
| tel          | 联系电话     | String(50)                                        | name 值为 TO ORDER 的时候不用填写 |    O     |
| contactType  | 联系方式类型 | <Tip text="Enum">TE:电话，FX:传真， EM:邮件</Tip> | name 值为 TO ORDER 的时候不用填写 |    O     |

### 返回值

| **字段名称** | **字段描述** | **数据类型** | **详细说明** | **必填** |
| ------------ | ------------ | ------------ | ------------ | :------: |
| outbdNo      | 出库订单号   | String(20)   |              |    Y     |

::: details 返回值示例

```json
{
  "outbdNo": "OE2510117105"
}
```

:::


## 申报回执

::: tip
以出库订单的维度推送状态

::: details 响应示例

```json
{}
```

:::

| **字段名称** | **字段描述**      | **数据类型**              | **详细说明**                                                                                | **必填** |
| ------------ | ----------------- | ------------------------- | ------------------------------------------------------------------------------------------- | :------: |
| outbdNo      | 出库订单号        | String(20)                |                                                                                             |    Y     |
| status       | [状态码](#status) | String(20)                |                                                                                             |    Y     |
| customsList  | 报关数据          | [List](#customs-callback) | <Tip>状态 99 和 -80 的时候必填<br/><br/> 状态为查验的时候只有查验的那一票报关单数据。</Tip> |    O     |

### 状态码 {#status}

| **状态代码** | **状态描述**                                                               |
| ------------ | -------------------------------------------------------------------------- |
| 10           | 申报中，这个状态下不允许改撤资料                                           |
| 99           | 申报完成 <Tip>如果有联单，所有报关资料放行，码头放行才有这个状态回传</Tip> |
| -80          | 报关单查验，仓转仓没有这个状态                                             |

### 报关数据 {#customs-callback}

| **字段名称**   | **字段描述**     | **数据类型**            | **详细说明**                        | **必填** |
| -------------- | ---------------- | ----------------------- | ----------------------------------- | :------: |
| orderNo        | 报关订单号       | String(20)              |                                     |    Y     |
| invtNo         | 核注清单统一编号 | String(20)              | 状态码 99 必填                      |    O     |
| invtQd         | 核注清单 QD 号   | String(20)              | 状态码 99 必填                      |    O     |
| seqNo          | 统一编号         | String(20)              | 状态码 99、-80 必填。仓转仓没有该值 |    O     |
| customsNo      | 报关单编号       | String(20)              | 状态码 99、-80 必填。仓转仓没有该值 |    O     |
| declare  | 申报数据      <Badge text="1.0.3" />     | [`Object`](#declare-data) | 状态码为 99 必填        |    O     |
| attachmentList | 放行文件         | [`List`](#release-file) | 状态码为 99 必填                    |    O     |
| commodityList  | 商品明细     <Badge text="1.0.3"/>      | [`List`](#commodity-back) | 状态码为 99 必填        |    O     |

### 申报数据 {#declare-data}

| **字段名称** | **字段描述**                   | **数据类型** | **详细说明** | **必填** |
| ------------ | ------------------------------ | ------------ | ------------ | :------: |
| consigneeName     | 境外收货人名称 | String(100)   |              |    Y     |
| markNo     | 标记唛码           | String(200)  |              |    Y     |
| remark     | 备注           | String(255)  |              |    N    |
| cutMode     | 征免性质代码           | String(3)  |              |    N    |
| licenseNo     | 许可证号           | String(20)  |              |    N    |
| manualNo     | 备案号           | String(12)  |              |    N    |
| wrapType     | 包装种类代码           | String(2)  |              |    Y    |
| tradeCountry     | 贸易国代码           | String(3)  |              |    Y    |
| transMode     | 成交方式           | String(1)  |              |    Y    |
| feeCurr     | 运费币制代码           | String(3)  |              |    N    |
| contractNo     | 合同号           | String(32)  |              |    N   |
| tradeMode     | 监管方式代码           | String(4)  |              |    Y    |
| feeMark     | 运费标记           | String(1)  |              |    N    |
| feeRate     | 运费           | BigDecimal(14,4)  |              |    N    |
| otherCurr     | 杂费币制代码           | String(3)  |              |    N    |
| otherMark     | 杂费标记           | String(1)  |              |    N    |
| otherRate     | 杂费           | BigDecimal(14,4)  |              |    N    |
| insurCurr     | 保险费币制代码           | String(3)  |              |    N    |
| insurMark     | 保险费标记           | String(1)  |              |    N    |
| insurRate     | 保险费           | BigDecimal(14,4)  |              |    N    |
| specialRelation     | 特殊关系确认           | Byte(1)  |              |    N    |
| priceImpact     | 价格影响确认           | Byte(1)  |              |    N   |
| customMaster     | 申报地海关           | String(4)  |              |    N   |
| iePort     | 出境关别           | String(4)  |              |    Y    |
| cusTrafMode     | 运输方式           | String(1)  |              |    Y    |
| cusTradeCountry     | 运抵国/启运国           | String(3)  |              |    Y    |
| distinatePort     | 指运港/经停港           | String(6)  |              |    Y    |
| entryType     | 报关单类型           | String(1)  |              |    Y    |
| ciqEntyPortCode     | 进口入境口岸           | String(6)  |              |    N    |
| despPortCode     | 进口是启运港/出口是离境口岸           | String(6)  |              |    Y    |
| ieDate     | 进口是进口日期/出口是出口日期           | String(8)  |              |    N    |
| ieFlag     | 进出口标识           | String(1)  |              |    Y    |
| trafName     | 运输工具名称           | String(50)  |              |    N   |
| voyageNo     | 航次号           | String(32)  |              |    N    |
| billNo     | 提运单号           | String(32)  |              |    Y    |
| goodsPlace     | 货物存放地点           | String(100)  |              |    N    |
| cnsnTradeScc     | 境内发货人18位社会信用代码           | String(18)  |              |    Y    |
| cnsnTradeCode     | 境内发货人10位海关代码           | String(10)  |              |    Y    |
| consignorCname     | 境内发货人企业名称(中文)           | String(70)  |              |    Y    |
| consignorCode     | 境内发货人10位检验检疫编码        | String(10)  |              |    N   |
| ownerScc     |      生产销售单位18位社会信用代码     | String(18)  |              |    Y    |
| ownerCode     |     生产销售单位10位海关代码      | String(10)  |              |    Y    |
| ownerName     |     生产销售单位企业名称      | String(70)  |              |    Y    |
| ownerCiqCode     |     生产销售单位10位检验检疫编码      | String(10)  |              |    N    |
| dclEtpsno     |     申报单位10位海关编码      | String(10)  |              |    Y    |
| dclEtpsSccd     |     申报单位社会信用代码      | String(18)  |              |    Y    |
| dclEtpsNm     |     申报单位名称      | String(70)  |              |    Y    |
| dclEtpsCiq     |     申报单位检验检疫      | String(10)  |              |    N    |
| bonNo     |     保税/监管场地	      | String(20)  |              |    Y    |
| selfDclPmt     |     自报自缴表示      | Byte  |              |    N    |
| otherWrapType     |     其他包装单位代码，多个使用英文逗号隔开      | String(50)  |              |    N    |
| tradeCurr     |     成交币值    <Badge text="1.0.4" />   | String(3)  |              |    Y    |

### 商品明细 {#commodity-back}

| **字段名称** | **字段描述** | **数据类型** | **详细说明**                       | **必填** |
| ------------ | ------------ | ------------ | ---------------------------------- | :------: |
| goodsExgNo   | 商品料号     | String(32)   | 和创建入仓报关资料商品明细料号呼应 |    Y     |
| recordNo     | 自动备案序号 | String(20)   |                                    |    Y     |
| ciq     | 检疫检疫名称和代码，前3位表示代码后面表示中文名称，使用英文逗号隔开 | String(255)   |                                    |    N    |
| codeTs     | 商品编码 | String(10)   |                                    |    Y     |
| contrItem     | 手账册备案序号 | String(20)   |                                    |   N     |
| destinationCountry     | 最终目的国代码 | String(6)   |                                    |    Y     |
| districtCode     | 境内货源地代码 | String(6)   |                                    |    Y     |
| dutyMode     | 征免方式 | String(2)   |                                    |    Y     |
| exgVersion     | 版本号 | String(20)   |                                    |   N     |
| goodsModel     | 申报要素 | String(255)   |                                    |    Y     |
| goodsName     | 商品名称 | String(50)   |                                    |    Y     |
| goodsNo     | 项号 | Byte   |                                    |    Y     |
| originCountry     | 原产国代码 | String(3)   |                                    |    Y     |
| price     | 单价 | BigDecimal(10,4)   |                                    |    Y     |
| totalPrice     | 总价 | BigDecimal(10,4)   |                                    |    Y     |
| unit     | 成交单位代码 | String(4)   |                                    |    Y     |
| firstUnit     | 第一法定单位代码 | String(4)   |                                    |    Y     |
| secondUnit     | 第二法定单位代码 | String(4)   |                                    |    N    |
| totalFirstQuantity     | 第一法定数量 | BigDecimal(14,4)   |                                    |    Y     |
| totalQuantity     | 成交数量 | BigDecimal(14,4)   |                                    |    Y     |
| totalSecondQty     | 第二法定数量 | BigDecimal(14,4)   |                                    |    N     |
| purpose     | 用途 | String(2)   |                                    |    N     |
| goodsAttr     | 货物属性，多个使用英文逗号隔开 | String(20)   |                                    |    N     |
| produceDate     | 生产日期 | String(100)   |                                    |    N     |
| sourceFlag     | 来源标识 | String(1)   |                                    |    N     |
| origPlaceCode     | 原产地代码 | String(6))   |                                    |    N     |
| ciqDestCode     | 目的地 | String(6)   |                                    |    N     |
| totalSpareQuantity     | 备品件数 | Short   |                                    |    N     |
| totalSpareGrossWeight     | 备品毛重 | BigDecimal(10,4)   |                                    |    N     |
| totalGrossWeight     | 总毛重 | BigDecimal(10,4)  |                                    |    N     |
| totalNetWeight     | 总净重 | BigDecimal(10,4)   |                                    |    Y    |
| totalPackingQuantity     | 总报关件数 | Short   |                                    |    N     |

### 放行文件 {#release-file}

| **字段名称** | **字段描述**                   | **数据类型** | **详细说明** | **必填** |
| ------------ | ------------------------------ | ------------ | ------------ | :------: |
| fileType     | [文件类型](#release-file-type) | String(10)   |              |    Y     |
| filePath     | 可下载的文件网络地址           | String(100)  |              |    Y     |

#### 放行文件类型 {#release-file-type}

::: warning 提示
仓转仓只有 CU000006 文件，其他没有
:::

| **文件类型代码** | **文件类型描述** |
| ---------------- | ---------------- |
| CU000001         | 海关报关单       |
| CU000006         | 保税出口核注清单 |
