<tr>
                                      <td class="cell-with-border">
                                          <div class="brokerinfo-col-1">
                                              <b>[field:broker_name/]&nbsp&nbsp&nbsp[field:broker_name_cn/]</b>
                                          </div>
                                          <div class="brokerinfo-col-1">
                                              <b>监管：</b>
                                              <a href="[field:main_license_href/]">[field:main_license/]</a>
                                          </div>
                                          <div class="brokerinfo-logo">
                                              <img src="[field:broker_logo/]" class="broker-logo"/>
                                          </div>
                                      </td>
                                      <td colspan="2" class="broker-info-col-2">
                                          <div>
                                              <b>所属国家：</b>
                                              [field:headquarter/]
                                          </div>
                                          <div>
                                              <b>成立时间：</b>
                                              [field:date_founded/]
                                          </div>
                                          <div>
                                              <b>经营模式：</b>
                                              [field:operation_mode_cn/]
                                          </div>
                                          <div>
                                              <b>入金方式：</b>
                                              [field:deposit_mode/]
                                          </div>
                                          <div>
                                              <b>出金方式：</b>
                                              [field:withdraw_mode/]
                                          </div>
                                      </td>
                                      <td class="broker-info-col-3">
                                          <div>
                                              <div>
                                                  <b id="col-3-header">平均点差</b>
                                              </div>
                                              <div>
                                                  <b>欧美：</b>
                                                  [field:eurusd/]
                                              </div>
                                              <div>
                                                  <b>黄金：</b>
                                                  [field:gold/]
                                              </div>
                                          </div>
                                      </td>
                                      <td class="broker-info-col-4">
                                          <div id="5dimChart[field:broker_id/]">
                                              <!--
                                              <button type="submit">
                                                  立即开户
                                              </button>
                                              -->
                                              <script>
                                                  var data = [
                                                      [
                                                          {axis: "交易环境", value: "[field:trading_env_score/]"},
                                                          {axis: "出入金", value: "[field:depo_with_score/]"},
                                                          {axis: "服务", value: "[field:service_score/]"},
                                                          {axis: "活动", value: "[field:prom_score/]"},
                                                          {axis: "监管", value: "[field:regu_score/]"}
                                                      ]
                                                  ];
                                                  RadarChart.draw("#5dimChart[field:broker_id/]", data);
                                              </script>
                                          </div>
                                      </td>
                                  </tr>