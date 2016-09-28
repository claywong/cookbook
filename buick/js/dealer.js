(function(window, $, BUICK) {

    BUICK.dealer.loadDealerData();
    var isSwitchType,
        lastSelProvince,
        lastSelCity,
        lastSelDistrict;
    ////////////页面上的事件绑定\\\\\\\\\\\\\\\
    BUICK.dealer.onDataReady = function(data) {
        //if (window.remote_ip_info) {
            initProvinceSelect();
        //} else {
        //    setTimeout(BUICK.dealer.onDataReady, 200);
        //}
    };

    function initProvinceSelect() {
        var bdObject = BUICK.dealer;
        var provinceJson = bdObject.getProvince();
        $("#sProvince").html(bdObject.jsonToOption(provinceJson));
        $("#sCity").html("");
        //监听事件
        $("#sProvince").on("change", function() {
            var curSelCityId = buildCitySelect($(this).val());
            //var curSelDistrictId = buildDistrictSelect(curSelCityId);
            //buildDealerSelect(curSelDistrictId);
        });
        $("#sCity").on("change", function() {
            var curSelDistrictId = buildDistrictSelect($(this).val());
            //buildDealerSelect(curSelDistrictId);
        });
        $("#sDistrict").on("change", function() {
            buildDealerSelect($(this).val());
        });

        var retId;
        var isBuild = false;
        if (lastSelProvince != null) {//原用户选择的省份是
            $("#sProvince").val(lastSelProvince);
        } else {
            //根据IP选择城市
            if (window.remote_ip_info && remote_ip_info.province != "") {
                for (var i = 0,
                    len = provinceJson.length; i < len; i++) {
                    var obj = provinceJson[i];
                    if (obj.name.indexOf(remote_ip_info.province) != -1) {
                        $("#sProvince").val(obj.id);
                        retId = obj.id;
                        buildCitySelect(obj.id);
                        isBuild = true;
                    }
                }
            }
        }

        if (!isBuild)
            buildCitySelect($("#sProvince").val());
        return retId;
    }

    function buildCitySelect(provId) {
        lastSelProvince = provId;
        var bdObject = BUICK.dealer;
        var cityJson = bdObject.getCity(provId);
        $("#sCity").html(bdObject.jsonToOption(cityJson));
        $("#sDistrict").html("");
        var retId;
        var isBuild = false;
        if (cityJson.length == 1) {//只有一个城市, 默认选择
            retId = cityJson[0].id;
            buildDistrictSelect(retId);
            isBuild = true;
        } else if (cityJson.length > 1) {
            if (isSwitchType && lastSelCity != null) {//当从经销商切换到维修站, 或维修站切换到经销商时, 保留原来选择的城市
                isSwitchType = false;
                $("#sCity").val(lastSelCity);
            } else {
                //根据IP选择城市
                if (window.remote_ip_info && remote_ip_info.city != "") {
                    for (var i = 0,
                        len = cityJson.length; i < len; i++) {
                        var obj = cityJson[i];
                        if (obj.name.indexOf(remote_ip_info.city) != -1) {
                            $("#sCity").val(obj.id);
                            retId = obj.id;
                            buildDistrictSelect(obj.id);
                            isBuild = true;
                        }
                    }
                }
            }
        }
        if (!isBuild) {
            buildDistrictSelect($("#sCity").val());
        }

        return retId;
    }

    function buildDistrictSelect(cityId) {
        lastSelCity = cityId;
        var bdObject = BUICK.dealer;
        var districtJson = bdObject.getDistrict(cityId);
        $("#sDistrict").html('<option value="' + cityId + '">全部</option>' + bdObject.jsonToOption(districtJson));

        var retId;
        var isBuild = false;
        if (districtJson.length == 1) {//只有一个城区, 默认选择
            retId = districtJson[0].id;
            buildDistrictSelect(retId);
            isBuild = true;
        } else if (districtJson.length > 1) {
            //根据IP选择城市, 先不要根据IP来选择区
            /*if(window.remote_ip_info && remote_ip_info.district!=""){//
             for(var i=0,len=districtJson.length;i<len;i++){
             var obj  = districtJson[i];
             if(obj.name.indexOf(remote_ip_info.district)!=-1){
             $("#sDistrict").val(obj.id);
             retId = obj.id;
             buildDealerSelect(obj.id);
             isBuild = true;
             }
             }
             }*/
        }
        if (!isBuild) {
            buildDealerSelect(cityId);
        }
        return retId;
    }

    function buildDealerSelect(value) {
        lastSelDistrict = value;
        var bdObject = BUICK.dealer;
        var dealerJson = bdObject.getDealer(value);
        originDealerArr = dealerJson;
        buildDealerlistDiv(dealerJson);
    }

    function buildDealerlistDiv(arr) {

        var listDiv = '';
        for (var i = 0,
            len = arr.length; i < len; i++) {
            listDiv += _genDealerListDiv(arr[i]);
        }
        $("#dealer").html(listDiv);

    }

    function _genDealerListDiv(value) {
        return '<option data-dealerCode="'+value.dealerCode+'">'+value.dealerName+'</option>'

    }

    ///////////////////////////右列过滤数据\\\\\\\\\\\\\\\\\\\\\\\\
    var
    originDealerArr;
    $("#dealer_name_search").bind('input propertychange', function() {
        var val = $(this).val();
        var dealerJson;
        if (val == "") {
            dealerJson = originDealerArr;
        } else {
            dealerJson = searchDealer(val);

        }
        buildDealerlistDiv(dealerJson);
        highlightSearchResult(val);
    });

    function searchDealer(value) {
        var retArr = [];
        for (var i = 0,
            len = originDealerArr.length; i < len; i++) {
            var obj = originDealerArr[i];
            if (obj.dealerName.indexOf(value) != -1 || obj.address.indexOf(value) != -1 || obj.tel.indexOf(value) != -1) {
                retArr.push(obj);
            }
        }
        return retArr;
    }

    function highlightSearchResult(value) {
        if (value != "") {
            $(".dealer_name .dealer_name_box .dealer_name_list").each(function(index, element) {
                var re = new RegExp(value, "g");
                var ele = $('.lsTitle:contains("' + value + '")', this);
                ele.html(ele.text().replace(re, "<strong>" + value + "</strong>"));

                ele = $('.lsAddress:contains("' + value + '")', this);
                ele.html(ele.text().replace(re, "<strong>" + value + "</strong>"));

                var ele = $('.lsPhone:contains("' + value + '")', this);
                ele.html(ele.text().replace(re, "<strong>" + value + "</strong>"));
            });
        }
    }

    

})(window, jQuery, window.BUICK || {});
