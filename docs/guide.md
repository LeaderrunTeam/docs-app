---
title: 对接指南
date: 2024-09-01
author: 赖钻
sequence: 1
description: 接口交互通用说明文档。包含接口请求规范，接口请求加签流程等。对接前请先阅读该文档内容
---

## 接口规则说明

所有的`API`请求必须使用`HTTPS`，请求时不应忽略服务器证书验证的错误，避免被恶意劫持。

### 数据格式

使用 [JSON](https://www.json.org/)作为消息体的数据交换格式。请求须设置 HTTP 头部（图片上传 API 除外）

```txt
Content-Type: application/json
Accept: application/json
```

> [!tip]提示
> API 应答中的数据有可能包含客户传入的数据，即可能是未经检查的用户输入内容。为了避免 XSS（Cross-site scripting）攻击，请调用方在使用应答数据前根据场景做适当的转义或者过滤。

### 参数兼容性

- 请求是否成功，与请求参数的顺序无关
- 请求是否成功，与请求 JSON 中的键值对出现的顺序无关
- 处理应答时，不应假设应答 JSON 中的键值对出现的顺序
- 当请求或应答中的 JSON 键值对的值为空（null）时，可以省略
- 文档中所有标记为 Y 表示必填、N 非必填、O 条件必填

### 字符集

仅支持 UTF-8 字符编码的一个子集：使用一至三个字节编码的字符。也就是说，不支持 Unicode 辅助平面中的四至六字节编码的字符

### 日期格式

所有的日期对象，使用 [ISO 8601](https://datatracker.ietf.org/doc/html/rfc3339)所定义的格式。

示例:

```txt
yyyy-MM-DDTHH:mm:ss.SSSZ
yyyy-MM-DDTHH:mm:ssZ
yyyy-MM-DDTHH:mm:ss.SSS+08:00
yyyy-MM-DDTHH:mm:ss+08:00
```

### 请求的唯一标识

立航给每个接收到的请求分配了一个唯一标识。请求的唯一标识包含在应答的 HTTP 头`X-Request-Id`中。当需要立航帮助时，请提供请求的唯一标识，以便我们更快的定位到具体的请求。

### 错误信息

立航系统使用 HTTP 状态码来表示请求处理的结果。

- 处理成功的请求，如果有应答的消息体将返回 200，若没有应答的消息体将返回 204；
- 已经被成功接受待处理的请求，将返回 202；
- 请求处理失败时，如缺少必要的入参、订单操作不规范等，将会返回 4xx 范围内的错误码；
- 请求处理时发生了立航系统侧的服务系统错误，将返回 500/501/503 的状态码。这种情况比较少见。

### 错误码和错误提示

当请求处理失败时，除了 HTTP 状态码表示错误之外，API 将在消息体返回错误相应说明具体的错误原因。

- status：详细错误码；
- message：错误描述，使用易理解的文字表示错误的原因；
- requestId：请求的唯一标识
- errors：请求参数不符合接口要求或者业务操作不规范(HTTP 状态码是`400`或者`status`详细错误码是`4000`)的时候会返回
- errors.danger: 是否比较严重的错误，如果为`true`的时候立航系统将拒绝处理这个请求。`errors.errors[x].type`其中一项值等于`DANGER`的时候该值都会为`true`
- errors.errors: 错误明细数据帧
- errors.errors.field: 指示错误参数的位置或者变量名称
- errors.errors.message: 具体错误原因
- errors.errors.type: 错误类型，取值：`WARNING || DANGER`。`WARNING`表示请求有警告内容，用户可以选择忽略警告继续提交立航系统会处理这个请求，`DANGER`表示这次请求有致命的错误，必须修复错误后才能重新请求，立航系统会拒绝一切`DANGER`的错误请求。**注意：接口对接暂不返回`WARNING`值**，如果开通请联系立航客服。
- errors.warningId: 忽略`WARNING`警告请求继续操作时请求 ID。如果需要忽略警告内容让立航系统继续处理请求则需要设置`X-Validation-Warning-Id`在请求头中，值为`errors.warningId`

Example:

```json
{
  "status": 4000,
  "message": "无效请求",
  "requestId": "8c606389-58b4-4d43-9a86-5a58592b46b2",
  "errors": {
    "success": false,
    "danger": false,
    "errors": [
      {
        "field": "commodityList[1].grossWeight",
        "message": "商品明细第 2 行，毛重不能为空",
        "type": "DANGER"
      }
    ],
    "warningId": "0546d52065c049f99ed1c5b37cd5700c"
  }
}
```

### User Agent

HTTP 协议要求发起请求的客户端在每一次请求中都使用 HTTP 头`User-Agent`来标识自己。建议调用方选用以下两种方式的一种：

1. 使用 HTTP 客户端默认的`User-Agent`。
2. 遵循 HTTP 协议，使用自身系统和应用的名称和版本等信息，组成自己独有的`User-Agent`。

立航系统很可能会拒绝处理无或者错误`User-Agent`的请求。

### HTTP 状态码

常见的 HTTP 状态码见下表。

| 状态码                    | 错误类型                                                          | 一般的解决方案                                                                                                                                     |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200 - OK                  | 处理成功<br/>Successfully processed                               | /                                                                                                                                                  |
| 204 - No Content          | 处理成功，无返回 Body<br/>Successfully processed, no return body  | /                                                                                                                                                  |
| 400 - Bad Request         | 协议或者参数非法<br/>Protocol or parameter is invalid             | 请根据接口返回的详细信息检查您的程序<br/>Check your program based on the detailed information in the interface return                              |
| 401 - Unauthorized        | 签名验证失败<br/>Signature verification failed                    | 请检查签名参数和方法是否都符合签名算法要求<br/>Check whether the signature parameters and methods comply with the signature algorithm requirements |
| 403 - Forbidden           | 权限异常<br/>Permission issue                                     | 请开通客户号相关权限。请联系产品或商务申请<br/>Enable the related permissions for the customer number. Contact product or business to apply        |
| 404 - Not Found           | 请求的资源不存在<br/>The requested resource does not exist        | 请对接客户检查需要查询的 ID 或者请求 URL 是否正确<br/>Please check if the ID to be queried or the request URL is correct                           |
| 406 - Not Acceptable      | 不接受的请求<br/>Unacceptable request                             | 请检查请求时间戳内的随机串是否重复<br/>Please check if the random string within the request timestamp is duplicated                                |
| 429 - Too Many Requests   | 请求超过频率限制<br/>Exceeded frequency limit                     | 请求未受理，请降低频率后重试<br/>The request was not accepted; please retry after reducing the frequency                                           |
| 500 - Server Error        | 系统错误<br/>System error                                         | 按具体接口的错误指引进行重试<br/>Retry according to the specific error guidance of the interface                                                   |
| 502 - Bad Gateway         | 服务下线，暂时不可用<br/>Service offline, temporarily unavailable | 请求无法处理，请稍后重试<br/>The request could not be processed; please try again later                                                            |
| 503 - Service Unavailable | 服务不可用，过载保护<br/>Service unavailable, overload protection | 请求无法处理，请稍后重试<br/>The request could not be processed; please try again later                                                            |

### 签名

立航系统通过验证签名来保证请求的真实性和数据的完整性。

#### 请求签名

对接客户需要使用自身的私钥对 API URL、消息体等关键数据的组合进行 SHA-256 with RSA 签名。请求的签名信息通过 HTTP 头`Authorization` 传递，具体说明请见 [签名生成指南](#签名生成指南)。没有携带签名或者签名验证不通过的请求，都不会被执行，并返回`401 Unauthorized`

#### 回调签名 {#callback}

立航系统根据客户要求来推送回执数据。如果没有特殊要求，立航系统**不会对回执内容进行任何加密处理**。

#### 签名生成指南

立航系统要求客户对请求进行签名，立航系统会在收到请求后进行签名的验证。如果签名验证不通过，立航系统将会拒绝处理请求，并返回`401 Unauthorized`。

- 准备
  立航会给每个对接客户提供一个`客户代码`和一个`秘钥`，**客户代码分发下去之后不能更改**，秘钥可以修改并要求每个对接阶段的秘钥必须保持唯一

- 构造签名(construct a signature string)

  我们希望客户的技术开发人员按照当前文档约定的规则构造签名串。立航系统会使用同样的方式构造签名串。如果客户构造签名串的方式错误，将导致签名验证不通过。下面先说明签名串的具体格式。

  签名串一共有五行，每一行为一个参数。结尾以`\n`（换行符，ASCII 编码值为 0x0A）结束，包括最后一行。如果参数本身以`\n`结束，也需要附加一个`\n`。

  ```txt
  HTTP请求方法\n
  URL\n
  请求时间戳\n
  请求随机串\n
  请求报文主体\n
  ```

  ```txt
  HTTP request method\n
  URL\n
  timestamp\n
  random string\n
  request body\n
  ```

  我们以查询一个`Booking`数据为例

  1. 获取 HTTP 请求的方法（GET，POST）等

     ```txt
     GET
     ```

  2. 获取请求的绝对 URL，并去除域名部分得到参与签名的 URL。如果请求中有查询参数，URL 末尾应附加有'?'和对应的查询字符串。

     ```txt
     # 实际的Booking查询接口已接口文档为主，这里只是案例
     /v2/inbound/booking
     ```

  3. 获取发起请求时的系统当前时间戳，即格林威治时间 1970 年 01 月 01 日 00 时 00 分 00 秒(北京时间 1970 年 01 月 01 日 08 时 00 分 00 秒)起至现在的总秒数，作为请求时间戳。立航系统会拒绝处理很久之前发起的请求，请客户保持自身系统的时间准确

     ```txt
     1696087048
     ```

  4. 生成一个请求随机串，不能超过 32 位字符。

     ```txt
     B2D10AED95615BE20E8F53C87EC5F7C3
     ```

  5. 获取请求中的请求报文主体（request body）

     - 请求方法为 GET 时，报文主体为空。

     - 当请求方法为 POST 或 PUT 时，请使用真实发送的 JSON 报文。

     - 图片或者文件上传 API，请使用 meta 对应的 JSON 报文。

  6. 按照前述规则，构造的请求签名串为

     ```txt
     GET\n
     /api/om/v1/booking/query\n
     1696087048\n
     B2D10AED95615BE20E8F53C87EC5F7C3\n
     \n
     ```

  7. 绝大多数编程语言提供的签名函数支持对签名数据进行签名。强烈建议客户调用该类函数，使用客户私钥对待签名串进行 SHA256 with RSA 签名，并对签名结果进行 Base64 编码得到签名值。

     Java 示例代码

     ```java
     import java.io.ByteArrayOutputStream;
     import java.io.IOException;
     import java.io.InputStream;
     import java.nio.charset.StandardCharsets;
     import java.security.*;
     import java.security.interfaces.RSAPrivateKey;
     import java.security.interfaces.RSAPublicKey;
     import java.security.spec.InvalidKeySpecException;
     import java.security.spec.PKCS8EncodedKeySpec;
     import java.security.spec.X509EncodedKeySpec;
     import java.util.Base64;
     import org.springframework.util.StringUtils;

     public class SignUtil {

         public record SignKey(RSAPublicKey publicKey, RSAPrivateKey privateKey) {}

         /**
          * 生成没有加密的密钥对
          * @return 公钥和私钥
          */
         public static SignKey createKey() throws Exception {
             KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");
             keyPairGen.initialize(2048);
             KeyPair keyPair = keyPairGen.generateKeyPair();
             RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
             RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
             return new SignKey(publicKey, privateKey);
         }

         /**
          * 签名
          * @param algorithm 签名类型
          * @param privateKey  私钥
          * @param body 明文
          */
         public static String sign(String algorithm, PrivateKey privateKey, String body)
                 throws NoSuchAlgorithmException, SignatureException, InvalidKeyException {
             MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
             messageDigest.update(body.getBytes(StandardCharsets.UTF_8));
             byte[] digest = messageDigest.digest();

             Signature Sign = Signature.getInstance(algorithm);
             Sign.initSign(privateKey);
             Sign.update(digest);
             return Base64.getEncoder().encodeToString(Sign.sign());
         }

         /**
          * 验签
          * @param algorithm 签名类型
          * @param publicKey 公钥
          * @param body 明文
          * @param signed 签名
          */
         public static boolean verifySign(String algorithm, PublicKey publicKey, String body, String signed)
                 throws NoSuchAlgorithmException, InvalidKeyException, SignatureException {
             MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
             messageDigest.update(body.getBytes(StandardCharsets.UTF_8));
             byte[] digest = messageDigest.digest();
             Signature verifySign = Signature.getInstance(algorithm);
             verifySign.initVerify(publicKey);
             verifySign.update(digest);
             return verifySign.verify(Base64.getDecoder().decode(signed.getBytes(StandardCharsets.UTF_8)));
         }

         public static PrivateKey loadPrivateKey(InputStream inputStream)
                 throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
             ByteArrayOutputStream array = new ByteArrayOutputStream();
             byte[] buffer = new byte[1024];
             int length;
             while ((length = inputStream.read(buffer)) != -1) {
                 array.write(buffer, 0, length);
             }
             return loadPrivateKey(array.toString(StandardCharsets.UTF_8));
         }

         public static PrivateKey loadPrivateKey(String privateKey)
                 throws NoSuchAlgorithmException, InvalidKeySpecException {
             String newPk = StringUtils.replace(privateKey, "-----BEGIN PRIVATE KEY-----", "");
             newPk = StringUtils.replace(newPk, "-----END PRIVATE KEY-----", "");
             newPk = StringUtils.replace(newPk, "\\s+", "");

             KeyFactory kf = KeyFactory.getInstance("RSA");
             return kf.generatePrivate(new PKCS8EncodedKeySpec(Base64.getDecoder().decode(newPk)));
         }

         public static PublicKey loadPublicKey(String publicKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
             String newPk = StringUtils.replace(publicKey, "-----BEGIN PUBLIC KEY-----", "");
             newPk = StringUtils.replace(newPk, "-----END PUBLIC KEY-----", "");
             newPk = StringUtils.replace(newPk, "\\s+", "");

             KeyFactory kf = KeyFactory.getInstance("RSA");
             return kf.generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(newPk)));
         }

             public static void main(String[] args) throws Exception {
                 SignUtil.SignKey key = SignUtil.createKey();
                 RSAPrivateKey rsaPrivateKey = key.privateKey();
                 RSAPublicKey rsaPublicKey = key.publicKey();

              //   ================= or =======================


             PublicKey rsaPublicKey = SignUtil.loadPublicKey(
              "you public key");

             PrivateKey rsaPrivateKey = SignUtil.loadPrivateKey(
                     "you private key");

             String body = "signature test";
             String sign = SignUtil.sign("SHA256withRSA", rsaPrivateKey, body);

             Assert.isTrue(SignUtil.verifySign("SHA256withRSA", rsaPublicKey, body, sign), "signature not match");
         }
     }
     ```

     Spring 框架测试样例

     ```java
     @Autowired
     private RestTemplate restTemplate;

         String buildMessage(String method, String url, long timestamp, String nonceStr, String body) {
             return method + "\n" + url + "\n" + timestamp + "\n" + nonceStr + "\n" + body + "\n";
         }

         String getToken(String method, String url, String body, String schema, String privateKey) {
             String nonceStr = RandomStringUtils.randomAlphanumeric(16);
             long timestamp = System.currentTimeMillis() / 1000;
             String message = buildMessage(method, url, timestamp, nonceStr, body);
             String sign = SignUtil.sign(schema, SignUtil.loadPrivateKey(privateKey), message);
             return "customer_code=\"" + your_customer_code + "\","
                     + "nonce_str=\"" + nonceStr + "\","
                     + "timestamp=\"" + timestamp + "\","
                     + "signature=\"" + sign + "\"";
         }

     @Test
     public void testSign() {
          	TestBody testBody = new TestBody();
             testBody.setPassword("111111");
             testBody.setUsername("张三");
             HttpHeaders headers = new HttpHeaders();
             headers.setContentType(MediaType.APPLICATION_JSON);
             headers.setAccept(List.of(MediaType.APPLICATION_JSON));

             String body = new ObjectMapper().writeValueAsString(testBody);
             String method = "POST";
             String url = "/xxx/xxx/xx/xxx";
             String schema = "SHA256withRSA";
             headers.add("Authorization", schema + " " + getToken(method, url, body, schema, "you private key"));
             HttpEntity<TestBody> testBodyHttpEntity = new HttpEntity<>(testBody, headers);

           	 ResponseEntity<Void> response =  restTemplate.postForEntity(
                     "http://127.0.0.1:8080" + url, testBodyHttpEntity, Void.class);
         	assertTrue(response.getStatusCode().is2xxSuccessful(), "request success")
     }
     ```

  8. 设置 HTTP 头(Setting HTTP Headers)

     立航系统要求请求通过 HTTP `Authorization`头来传递签名。`Authorization`由认证类型和签名信息两个部分组成。

     ```bash
     Authorization: 认证类型 签名信息
     ```

     具体组成为：

     - 认证类型，目前为 SHA256withRSA
     - 签名信息
       - 客户代码 customer_code，由立航提供
       - 请求随机串 nonce_str
       - 时间戳 timestamp
       - 签名值 signature

     `Authorization`头的示例如下：（注意，示例因为排版可能存在换行，实际数据应在一行）

     ```txt
     Authorization: SHA256withRSA customer_code="LH",nonce_str="B2D10AED95615BE20E8F53C87EC5F7C3",signature="xxxx",timestamp="1696087048"
     ```

## 回执通知

对于需要推送回执的场景，立航系统将业务数据通知给客户系统。通知是以`POST`方法访问客户系统的通知`URL`，通知的数据以`JSON`格式通过请求主体（`BODY`）传输

> 对后台通知交互时，如果立航系统收到应答不是成功([Successful 2xx](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3)))或超时，立航系统认为通知失败，立航系统会通过一定的策略定期重新发起通知，尽可能提高通知的成功率，但立航系统不保证通知最终能成功

> 同样的通知可能会多次发送给客户系统。客户系统必须能够正确处理重复的通知。 推荐的做法是，当客户统收到通知进行处理时，先检查对应业务数据的状态，并判断该通知是否已经处理。如果未处理，则再进行处理；如果已处理，则直接返回结果成功。在对业务数据进行状态检查和处理之前，要采用数据锁进行并发控制，以避免函数重入造成的数据混乱。

### 通知规则

立航系统最多会发起七次通知，当业务信息达到需要通知的条件立航系统会第一时间通知客户系统。如果立航系统收到成功([Successful 2xx](https://datatracker.ietf.org/doc/html/rfc7231#section-6.3))的响应将不再重试。剩下六次通知频率为：30s、1m、5m、10m、30m、1h

### 安全

参考[回调签名](#callback)
