---
title: 基础信息
date: 2024-09-01
author: 赖钻
sequence: 2
description: 立航系统基础信息集合
---

## 仓库相关

### 包装单位代码表 {#warehousePackageCode }

| **Code**        | **Name**    |
| --------------- | ----------- |
| CTN             | 纸箱        |
| Pallet          | 托盘        |
| Pkg             | 件          |
| Plastics Pallet | 胶托        |
| Plywood Pallet  | 夹木托      |
| Wooden Pallet   | 木托/实木托 |
| Paper Pallet    | 纸托        |
| Plywood Case    | 夹木箱      |
| Wooden Case     | 木箱/实木箱 |
| Plywood Frame   | 夹木框      |
| Wooden Frame    | 木框/实木框 |
| Bag             | 编织袋      |
| Roll            | 卷          |
| Drum            | 桶装        |
| Nude Parched    | 裸装        |
| Iron pallet     | 铁卡板      |
| Flight Case     | 航空箱      |

### 监管仓库代码表 {#warehouseCode }

| **Code** | **Name**         |
| -------- | ---------------- |
| PLA      | 普洛斯一期监管仓 |
| PLB      | 普洛斯二期监管仓 |
| PLC      | 普洛斯三期监管仓 |
| QY       | 棋洋仓监管仓     |
| HSH      | 恒盛辉监管仓     |
| LHC      | 立航仓监管仓     |

### 保税区仓库代码表 {#bsWarehouseCode }

| **Code** | **Name**   |
| -------- | ---------- |
| ZTLH     | 中通保税仓 |
| TB       | 腾邦保税仓 |
| LHB      | 立航保税仓 |

### 卫星仓库代码表 {#sateWarehouseCode}

<a href="https://logistics.leaderrun.com/api/download/attachment/satellite-warehouse.xlsx" download="satellite-warehouse.xlsx">下载Excel数据</a>


### 运输公司 {#transport}
| **Code** | **Name**   |
| -------- | ---------- |
| LH       | 立航       |


### 车辆尺寸 {#vehSize}

海运、陆运可以选值

| **Code** | **Name**   |
| ------ | ------ |
| 20GP   | 20GP   |
| 40GP   | 40GP   |
| 40HQ   | 40HQ   |
| 45HQ   | 45HQ   |
| 53GP   | 53GP   |
| 20OT   | 20OT   |
| 40OT   | 40OT   |
| 20RF   | 20RF   |
| 45RF   | 45RF   |
| 40HQRF | 40HQRF |
| 20HQ   | 20HQ   |
| 58HQ   | 58HQ   |


只有陆运可选
# 车辆规格编码表

| 编码    | 名称    |
| **Code** | **Name**   |
| 1.5吨  | 1.5吨  |
| 3吨    | 3吨    |
| 5吨    | 5吨    |
| 8吨    | 8吨    |
| 10吨   | 10吨   |
| 12吨   | 12吨   |
| 20吨   | 20吨   |
| 16.5米 | 16.5米 |
| 17.5米 | 17.5米 |





## 报关相关

### 还柜口岸 {#returnPort}

> [!tip] 提示
> MCT/CCT 可以合并成 SCT

| **Code** | **Name**   | **Transport Mode**   |
| -------- | ---------- |
| CNYTN    | 盐田码头   | 海运 |
| MCT      | 妈湾码头   |海运 |
| CCT      | 赤湾码头   |海运 |
| SCT      | 蛇口码头   |海运 |
| CNDCB    | 大铲湾码头 |海运 |
| GOCT     | 南沙港二期码头 |海运 |
| NICT     | 南沙港三期码头 |海运 |
| ZSIT     | 中山港外贸码头 |海运 |
| 5354     | 莲塘口岸   |陆运 |
| 5345     | 深圳湾口岸 |陆运 |
| 5320     | 文锦渡口岸 |陆运 |
| 5301     | 皇岗海关   |陆运 |
| 5303     | 沙头角口岸 |陆运 |
| 5141     | 广州机场   |空运 |
| 5317     | 深关机场   |空运 |
| 2233     | 浦东机场   |空运 |
| 4712     | 武关机场   |空运 |

### 船公司 {#carrier}

| **Code** | **Name**                               |
| ----- | --------------------------------------- |
| COS    | 中远集装箱运输                         |
| EMS    | EMS长荣新加坡                          |
| NORU   | 北欧亚                                 |
| 11QU   | 兴亚海运株式会社                       |
| IDM    | 艾迪航運股份有限公司深圳辦事處         |
| MCC    | 运输新加坡有限公司                     |
| POS    | 海南泛洋船务代理有限公司深圳分公司     |
| PRJX   | 江西联达国际货运代理有限公司           |
| SKR    | 长锦商船                               |
| SIT    | 海之丰                                 |
| MSC    | MSUS地中海航运(香港)有限公司           |
| XHUB   | 旗力承运德利航运有限公司               |
| XNYS   | 南洋船务有限公司                       |
| ONE    | 海洋网联(盐田)                         |
| CMA    | 法国达飞                               |
| SOC    | SOC                                    |
| KL     | 川崎汽船                               |
| ONE    | ONE(蛇口)                              |
| BAL    | 博亚国际海运                           |
| EWL    | EWL                                    |
| FPL    | FPL                                    |
| ESG    | ESG                                    |
| EMA    | EMA                                    |
| PML    | 太平船务                               |
| CST    | 宝华海运                               |
| GFL    | GFL                                    |
| TSH    | TSH                                    |
| UGL    | UGL                                    |
| LSML   | LSML                                   |
| HGL    | HGL                                    |
| ASD    | ASD                                    |
| NZL    | NZL                                    |
| LT     | 意大利海运                             |
| WHL    | 万海                                   |
| omL    | 加拿大海运                             |
| CPS    | CP-SHIP                                |
| HUB    | 德利船务                               |
| NSC    | 沙特阿拉伯国家航运公司                 |
| TSM    | 塔斯曼东方航运                         |
| XCNC   | 南洋承运CNC柜                          |
| XNRA   | 旗力承运北欧亚船务有限公司(美西)       |
| XTSM   | 南洋                                   |
| SNL    | 海领                                   |
| BEN    | 边航                                   |
| XCOS   | 五洲                                   |
| TTL    | TTL                                    |
| VOL    | VOL                                    |
| UIS    | UIS                                    |
| PCL    | PCL                                    |
| POC    | 铁行渣华                               |
| PAH    | PAH                                    |
| VASI   | VASI                                   |
| LKWL   | LKWL                                   |
| KFS    | KFS                                    |
| MCL    | MCL                                    |
| UAS    | 怡联船务                               |
| FPM    | FPM                                    |
| SWI    | SWI                                    |
| CXL    | CXL                                    |
| BWL    | BWL                                    |
| ANL    | 澳大利亚国家航运有限公司               |
| CCNI   | 智利远洋                               |
| FSCO   | 远东航运                               |
| HJL    | 韩进海运                               |
| HML    | 荣升海运                               |
| CUL    | 洋浦中诚联合航运有限公司               |
| GCS    | 大新华物流（深圳）有限公司             |
| GDHS   | 广东航实集装箱运输有限公司             |
| GSL    | 金星轮船有限公司                       |
| JSASZ  | JSASZ                                  |
| MISC   | 马来西亚国际航运                       |
| PIEX   | 平野国际货运香港有限公司               |
| SCO    | SEA CONSORTRIUM                        |
| WFG    | WANGFOONG                              |
| XomA   | 南洋承运omA柜                          |
| AEW    | 澳航                                   |
| KWL    | 建华海运                               |
| DJS    | 东进商船                               |
| XCSV   | 旗力承运北欧亚船务有限公司             |
| CWCMA  | CWCMA                                  |
| XPIL   | 太平船务                               |
| RCL    | RCL                                    |
| HDS    | 伊朗伊斯兰共和国航运公司               |
| HANS   | 汉洋                                   |
| CTO    | CTO                                    |
| HSH    | HSH                                    |
| MBF    | 凯联                                   |
| HSS    | HSS                                    |
| SPX    | SPX                                    |
| GLO    | GLO                                    |
| HUAS   | HUAS                                   |
| CDL    | CDL                                    |
| SSL    | SSL                                    |
| DTS    | DTS                                    |
| APLN   | 美国总统轮船公司                       |
| omA    | 法国达飞轮船有限公司                   |
| EGL    | 长荣海运股份有限公司                   |
| DOW    | 东宇                                   |
| IAL    | IAL                                    |
| MELL   | 玛丽亚那班轮公司                       |
| MRUB   | 马鲁巴航运有限公司                     |
| POBU   | 史特斯泛洋                             |
| TNDX   | 通达                                   |
| XWZC   | 南洋旗                                 |
| OOL    | 东方海外(大铲/蛇口)                    |
| SLP    | SLP                                    |
| KCN    | KCN                                    |
| PAN    | PAN                                    |
| HSHC   | 华盛船务                               |
| SJJ    | SJJ                                    |
| BBC    | BBC                                    |
| CSD    | 上海溢永国际货物                       |
| SFT    | 广州港中联国际船务                     |
| URS    | URS                                    |
| CSCL   | 中海                                   |
| MOL    | 商船三井                               |
| SAFM   | 南非海运                               |
| CSA    | 中海船务代理有限公司                   |
| KPYT   | KPYT/意通                              |
| MDV    | 达贸国际轮船公司                       |
| STX    | 世腾香港有限公司                       |
| SML    | 森罗商船                               |
| TWL    | 泰赢航运                               |
| OOLN   | 东方海外                               |
| KKK    | 川崎(大铲）                            |
| KLINE  | KLINE                                  |
| XNY    | XNY                                    |
| ASL    | 亚海航运                               |
| QAS    | 泉州安盛                               |
| CSS    | CSS                                    |
| LHL    | LHL                                    |
| EIW    | EIW                                    |
| CKHK   | CKHK                                   |
| HIL    | HIL                                    |
| GFS    | 美丰船务                               |
| ZGL    | ZGL                                    |
| CSL    | CSL                                    |
| PDL    | PDL                                    |
| JHS    | JHS                                    |
| MKL    | 马士基航运                             |
| PIL    | 太平船务（中国）有限公司               |
| AEL    | Winsmart International Shipping Limited |
| ALI    | 亚莉安莎航运公司                       |
| JANL   | 利高船务有限公司                       |
| MCPU   | Mcc Transport Singapore Pte Ltd        |
| MEL    | 马里亚纳                               |
| QLCW   | 旗力海运有限公司                       |
| TMTS   | 上海铁洋多式联运有限公司               |
| XHJL   | 旗力承运韩进海运HJL                    |
| XMSS   | 香港海裕                               |
| XQLC   | 旗力海运                               |
| XTMT   | 南洋                                   |
| XWWL   | 永旺船务有限公司                       |
| XHSD   | 汉堡                                   |
| AWS    | AWS                                    |
| SLS    | 川崎汽船                               |
| XTJX   | 通捷利旗下箱属                         |
| TNO    | TNO                                    |
| DWS    | DWS                                    |
| FSC    | FSC                                    |
| HUA    | 伊朗国航                               |
| HAL    | 兴亚海运                               |
| MAS    | MAS                                    |
| MSUS   | 地中海航运                             |
| BSS    | BSS                                    |
| REL    | REL                                    |
| TRL    | TRL                                    |
| NYK    | 日本邮船                               |
| TSL    | 德翔航运                               |
| DNA    | 炫海海运                               |
| GWS    | 美国西部汽船公司                       |
| KHCC   | CNC/旗力                               |
| KMT    | 高丽海运株式会社                       |
| SECO   | SECO/边行                              |
| SKKL   | 日本新和海运                           |
| SLX    | 海天航运                               |
| XKLT   | 旗力下属箱主                           |
| XKPB   | 旗力                                   |
| XKPH   | 鸿安船务                               |
| XLXQ   | 建华船务                               |
| XMSK   | 南洋承运马士基（中国）航运有限公司     |
| XRCL   | 宏海箱运船务有限公司                   |
| XSTY   | 南洋                                   |
| XSYM   | 南洋                                   |
| YH     | 深圳市源汉船务运输有限公司             |
| ESL    | 阿联酋航运船公司                       |
| HAD    | 伊朗国航                               |
| CKL    | CKL                                    |
| SMT    | 上海峰密特国际船务代理有限公司         |
| ELM    | ELM                                    |
| FWH    | FWH                                    |
| SCL    | 萨非航运（上海）                       |
| HLK    | 港业航运                               |
| HOS    | HOS                                    |
| UFL    | UFL                                    |
| CBS    | 创富                                   |
| WZY    | WZY                                    |
| HSL    | HSL                                    |
| EST    | EST                                    |
| HSD    | 汉堡南美航运公司                       |
| ANAL   | 嘉宏国际                               |
| BTL    | 孟虎航运有限公司                       |
| COL    | 歌伦巴斯                               |
| EVG    | EVG                                    |
| KHAP   | 刚兴                                   |
| LEGO   | 利高船务                               |
| LYK    | 莱克斯                                 |
| MAEU   | MAEU                                   |
| MAT    | 美森轮船有限公司                       |
| NYS    | 南洋船务有限公司                       |
| SEN    | 胜利航运                               |
| XCP    | 南洋                                   |
| XFPM   | 台塑海运股份有限公司                   |
| XJBS   | 南洋                                   |
| XJZ    | 君泽行                                 |
| XKPV   | 华鹰船务有限公司                       |
| XSTX   | 史特斯泛洋珠式会社                     |
| XTSL   | 旗力承运德翔航运TSL                    |
| XUAS   | 南洋                                   |
| NSL    | 新三洋航运公司                         |
| APL    | 美国总统轮船公司                       |
| THY    | THY                                    |
| DYS    | DYS                                    |
| UIF    | UIF                                    |
| LFS    | LFS                                    |
| NYM    | 南洋(国际)船务有限公司                 |
| KML    | 高丽海运（上海）广州                   |
| EMC    | 长荣海运                               |
| GHK    | GHK                                    |
| CYA    | CYA                                    |
| XPL    | XPL                                    |
| ALX    | 阿拉丁航运                             |
| PME    | PME                                    |
| XCYA   | XCYA                                   |
| MIL    | MIL                                    |
| OVP    | OVP                                    |
| SLG    | SLG                                    |
| YPNN   | 洋浦良恩航运                           |
| SHYW   | 上海溢永国际货物                       |
| DTL    | DTL                                    |
| NWS    | NWS                                    |
| HMM    | 韩国现代商船株式会社                   |
| OOCL   | 东方海外货柜航运有限公司               |
| YML    | 阳明海运                               |
| ZIM    | 以星轮船                               |
| CNC    | 正利航业(香港)有限公司深圳办事处       |
| EML    | EML                                    |
| FWS    | 浩达船务                               |
| JAN    | 怡和船务代理                           |
| MAR    | 阿根廷马鲁巴航运有限公司               |
| NSS    | 南星海運                               |
| PWK    | 宝威船务有限公司                       |
| SNCL   | 中外运集装箱运输                       |
| SUD    | SUD                                    |
| SYM    | 烟台海运                               |
| TMM    | 墨西哥航运                             |
| YSC    | 海旭船务有限公司                       |
| HAS    | 上海海华轮船有限公司                   |
| XKPP   | 旗力承运太平船务PIL                    |
| OLA    | OLA                                    |
| UNL    | UNL                                    |
| LCOC   | LCOC                                   |
| UNI    | UNI                                    |
| XEIS   | 深圳恒富                               |
| XCYB   | 创富                                   |
| SWB    | 安途货运                               |
| LIDM   | LIDM                                   |
| TFL    | 致远航运                               |
| SIN    | SIN                                    |
| EIP    | EIP                                    |
| WZH    | WZH                                    |
| HRU    | HRU                                    |
| HSLL   | HSLL                                   |
| FST    | FST                                    |
| BAX    | BAX                                    |
| CSAV   | 南美智利海运                           |
| HLC    | 赫伯罗特                               |
| CWomA  | CWomA                                  |
| HMYT   | HMYT                                   |
| JCAV   | 嘉信实业公司                           |
| OWSL   | 海裕船务                               |
| USL    | 美国轮船                               |
| WLM    | 华林船务                               |
| WMSA   | 深圳宏基國際船舶代理有限公司           |
| XC28   | 南洋承运马士基（中国）航运有限公司     |
| KKKY   | 川崎汽船                               |
| MSK    | 马士基航运                             |
| XKAB   | 南洋承运川崎汽船（中国）有限公司       |
| XKPL   | 力高                                   |
| XKPS   | 旗力承运                               |
| XKPT   | 深圳联通货运有限公司                   |
| XMAL   | 南洋承运马士基（中国）航运有限公司     |
| XSKR   | 南洋承运东南船务                       |
| XWLM   | 南洋                                   |
| CML    | 加拿大海运                             |
| CSE    | 中远船公司                             |
| EGH    | 长荣                                   |
| HFL    | HFL                                    |
| WSC    | WSC                                    |
| XNSL   | 新航速                                 |
| HYX    | HYX                                    |
| ZSA    | ZSA                                    |
| FSL    | FSL                                    |
| XTJW   | XTJW                                   |
| XOSA   | 深圳外代                               |
| SMH    | SMH                                    |
| KIM    | KIM                                    |
| KMTC   | 高丽海运                               |
| XCMA   | 南洋承运CMA                            |
| STF    | STF                                    |
| CTR    | CTR                                    |