<tr>
                                      <td class="cell-with-border">
                                          <div class="brokerinfo-col-1">
                                              <b>[field:broker_name/]&nbsp&nbsp&nbsp[field:broker_name_cn/]</b>
                                          </div>
                                          <div class="brokerinfo-col-1">
                                              <b>��ܣ�</b>
                                              <a href="[field:main_license_href/]">[field:main_license/]</a>
                                          </div>
                                          <div class="brokerinfo-logo">
                                              <img src="[field:broker_logo/]" class="broker-logo"/>
                                          </div>
                                      </td>
                                      <td colspan="2" class="broker-info-col-2">
                                          <div>
                                              <b>�������ң�</b>
                                              [field:headquarter/]
                                          </div>
                                          <div>
                                              <b>����ʱ�䣺</b>
                                              [field:date_founded/]
                                          </div>
                                          <div>
                                              <b>��Ӫģʽ��</b>
                                              [field:operation_mode_cn/]
                                          </div>
                                          <div>
                                              <b>���ʽ��</b>
                                              [field:deposit_mode/]
                                          </div>
                                          <div>
                                              <b>����ʽ��</b>
                                              [field:withdraw_mode/]
                                          </div>
                                      </td>
                                      <td class="broker-info-col-3">
                                          <div>
                                              <div>
                                                  <b id="col-3-header">ƽ�����</b>
                                              </div>
                                              <div>
                                                  <b>ŷ����</b>
                                                  [field:eurusd/]
                                              </div>
                                              <div>
                                                  <b>�ƽ�</b>
                                                  [field:gold/]
                                              </div>
                                          </div>
                                      </td>
                                      <td class="broker-info-col-4">
                                          <div id="testChart">
                                              <!--
                                              <button type="submit">
                                                  ��������
                                              </button>
                                              -->
                                              <script>
                                                  var data = [
                                                      [
                                                          {axis: "���׻���", value: "[field:trading_env_score/]"},
                                                          {axis: "�����", value: "[field:depo_with_score/]"},
                                                          {axis: "����", value: "[field:service_score/]"},
                                                          {axis: "�", value: "[field:prom_score/]"},
                                                          {axis: "���", value: "[field:regu_score/]"}
                                                      ]
                                                  ];
                                                  RadarChart.draw("#testChart", data);
                                              </script>
                                          </div>
                                      </td>
                                  </tr>