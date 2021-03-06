<tr>
                                      <td class="cell-with-border">
                                          <div class="brokerinfo-col-1">
                                              <b>[field:broker_name_cn/][field:broker_name/]</b>
                                          </div>
                                          <div class="brokerinfo-logo">
                                              <img src="[field:broker_logo/]" class="broker-logo"/>
                                          </div>
                                      </td>
                                      <td colspan="2" class="broker-info-col-2">
                                          <div id="col-2-anchor">
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
                                              <b>监管机构：</b>
                                              <a href="[field:main_license_href/]">[field:main_license/]</a>
                                          </div>
                                          <div>
                                              <b>平均点差：</b>
                                              欧美[field:eurusd/]
                                          </div>
                                      </td>
                                      <!--
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
                                      -->
                                      <td class="broker-info-col-4" colspan="2">
                                          <div id="Chart[field:broker_id/]">
                                              <!--
                                              <button type="submit">
                                                  立即开户
                                              </button>
                                              -->
                                              <script>
                                                  var data = [
                                                      [
                                                          {axis: "交易环境", value: "[field:trading_env_score/]"},
                                                          {axis: "出入金", value: "[field:depo_with_score/]",yOffset:-5},
                                                          {axis: "服务", value: "[field:service_score/]"},
                                                          {axis: "活动", value: "[field:prom_score/]"},
                                                          {axis: "监管", value: "[field:regu_score/]",yOffset:-5}
                                                      ]
                                                  ];
                                                  RadarChart.draw("#Chart[field:broker_id/]", data);
                                              </script>
                                          </div>
                                      </td>
                                  </tr>