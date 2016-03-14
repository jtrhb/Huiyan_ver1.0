/**
 * Created by jtrhb on 2016/2/18.
 */
<script type="text/javascript">
    new TradingView.MiniWidget({
        "container_id": "chartOverview",
        "tabs": [
            "Forex",
            "Commodities",
            "Equities"
        ],
        "symbols": {
            "Equities": [
                [
                    "S&P500",
                    "SPX500"
                ],
                [
                    "NQ100",
                    "NAS100"
                ],
                [
                    "Dow30",
                    "DOWI"
                ],
                [
                    "Nikkei225",
                    "JPN225"
                ],
                [
                    "Apple",
                    "AAPL "
                ],
                [
                    "Google",
                    "GOOG"
                ]
            ],
            "Commodities": [
                [
                    "Emini",
                    "ES1!"
                ],
                [
                    "Euro",
                    "E61!"
                ],
                [
                    "Gold",
                    "GC1!"
                ],
                [
                    "Oil",
                    "CL1!"
                ],
                [
                    "Gas",
                    "NG1!"
                ],
                [
                    "Corn",
                    "ZC1!"
                ]
            ],
            "Forex": [
                "FX:EURUSD",
                "FX:GBPUSD",
                "FX:USDJPY",
                "FX:USDCHF",
                "FX:AUDUSD",
                "FX:USDCAD"
            ]
        },
        "gridLineColor": "#E9E9EA",
        "fontColor": "#83888D",
        "underLineColor": "#dbeffb",
        "trendLineColor": "#4bafe9",
        "activeTickerBackgroundColor": "#EDF0F3",
        "large_chart_url": "https://www.tradingview.com/chart/",
        "noGraph": false,
        "width": "300px",
        "height": "400px",
        "locale": "zh"
    });
</script>