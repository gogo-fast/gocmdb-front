export default {
    ClientToken: null, //随机生成
    ImageId: null,// 手动查询
    InstanceType: null,// 手动查询
    SecurityGroupId: null,// 手动查询
    VSwitchId: null,//     动态查询
    Description: null,     // 可配置
    InternetMaxBandwidthIn: null,     // 可配置
    InternetMaxBandwidthOut: null,     // 可配置
    HostName: null,     // 可配置
    Password: null,     // 可配置
    ZoneId: null,     // 可配置
    InternetChargeType: null, // PayByBandwidth：按固定带宽计费。	PayByTraffic（默认）
    SystemDisk: null, // 可配置
    DataDisk: [], // 可配置
    IoOptimized: null,   // 可选 none / optimized
    SpotStrategy: null,  // 可选 NoSpot（默认）SpotWithPriceLimit：设置上限价格的抢占式实例。SpotAsPriceGo：系统自动出价，跟随当前市场实际价格。
    Tag: [], // 可配置
    ResourceGroupId: null, // 手动查询配置
    InstanceChargeType: null,  // PrePaid：包年包月。PostPaid（默认）：按量付费。
    PrivateIpAddress: null,// 实例私网IP地址。该IP地址必须为交换机（VSwitchId）网段的空闲地址。
    CreditSpecification: null, // Standard：标准模式 Unlimited：无性能约束模式
    Tenancy: null, // default：在非专有宿主机上创建实例。 host：在专有宿主机上创建实例。若您不指定DedicatedHostId，则由阿里云自动选择专有宿主机部署实例 默认值：default。
}
