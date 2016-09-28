//wally

///////////////////////////// DEALER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
(function(window, $, BUICK) {
    BUICK.dealer = BUICK.dealer || {};
    var bdObject = BUICK.dealer;
    bdObject.onDataReady = function(){};//empty function

    var jsonName = "dealer";//default
    var dataPath = "";
    var dealerData = null;
    var totalDealer = 0;
    var cityBuff = {}, districtBuff={}, dealerBuff={};
    init();

    function init(){
        //loadDealerData();
    }

    
    //load dealer data
    function loadDealerData(jsonName){
        $.getJSON('dealer.json').done(function(data) {
                //console.log(data.length);
                dealerData = _filterData(data);
                totalDealer = dealerData.length;
                bdObject.onDataReady(dealerData);
                getProvince();
            }).fail(function(){

            });
    }

    function _filterData(value){
        var retArr = [];
        var hasId = value[0].id!=null;
        for(var i=0,len=value.length;i<len;i++){
            var obj = value[i];
            if(!hasId){
                obj.id = i;
            }
            if(obj.isopen==1 || (obj.url!=null && obj.url!="")){//isopen只在维修站里有这个参数, 在经销商数据里没有, 经销商数据只能通过url是不是为空字串来判断是否开店.
                retArr.push(obj);
            }
        }
        return retArr;
    }

    function getDealer(value){
        //默认是根据districtId得到经销商
        if(!dealerData)  return;
        if(dealerBuff[value])  return dealerBuff[value];

        var retObj = [];
        for(var i=0;i<totalDealer;i++){
            var obj = dealerData[i];
            var districtId = obj.districtId;
            if(String(value).substr(2)=="0000"){
                districtId = obj.provinceId;
            }else if(String(value).substr(4)=="00"){
                districtId = obj.cityId;
            }
            
            if(districtId!=value) continue;
            
            retObj.push(obj);
            
        }
        retObj.sort(arraySortById);
        dealerBuff[value] = retObj;
        return retObj;
    }

    function getProvince(){
        if(!dealerData)  return;
        var retObj = [];
        var objMap = {};
        for(var i=0;i<totalDealer;i++){
            var obj = dealerData[i];
            var prov = obj.provinceName;
            if(objMap[prov]==null){
                objMap[prov] = 1;
                retObj.push({name:prov, id:obj.provinceId});
            }
        }
        retObj.sort(arraySortById);
        return retObj;
    }
    //直辖市的名称与getProvince一样
    function getCity(value){
        if(!dealerData)  return;
        if(cityBuff[value])  return cityBuff[value];

        var retObj = [];
        var objMap = {};
        for(var i=0;i<totalDealer;i++){
            var obj = dealerData[i];
            var provId = obj.provinceId;
            if(provId!=value) continue;

            var city = obj.cityName;
            if(objMap[city]==null){
                objMap[city] = 1;
                retObj.push({name:city, id:obj.cityId});
            }
        }
        retObj.sort(arraySortById);
        cityBuff[value] = retObj;
        return retObj;
    }
    //得到经销商的城市所在区, 如长宁区, 黄浦区
    function getDistrict(value){
        if(!dealerData)  return;
        if(districtBuff[value])  return districtBuff[value];

        var retObj = [];
        var objMap = {};
        for(var i=0;i<totalDealer;i++){
            var obj = dealerData[i];
            var cityId = obj.cityId;
            if(cityId!=value) continue;
            if(!obj.districtId) continue;
            var district = obj.districtName ? obj.districtName : ""+obj.districtId;
            if(objMap[district]==null){
                objMap[district] = 1;
                retObj.push({name:district, id:obj.districtId});
            }
        }
        retObj.sort(arraySortById);
        districtBuff[value] = retObj;
        return retObj;
    }

    //暂时用不上
    function getProvinceByCity(city){
        if(city==null)  return;
        for(var i=0;i<totalDealer;i++){
            var obj = dealerData[i];
            if(obj.cityName.indexOf(city)!=-1 || city.indexOf(obj.cityName)!=-1){

                return {name:obj.provinceName, id:obj.provinceId};
            }
        }
        return null;
    }

    function getDealerByDealerId(value){
        if(value==null)  return;
        for(var i=0;i<totalDealer;i++){
            var obj = dealerData[i];
            if(obj.id==value){

                return obj;
            }
        }

        return null;
    }

    function arraySortById(v1, v2){
        if (v1.id < v2.id)  
            return -1;
        if (v1.id > v2.id)          
            return 1;
    }

    function jsonToOption(value){
        var retStr = "";
        for(var i=0,len=value.length;i<len;i++){
            var obj  = value[i];
            retStr += '<option value="'+obj.id+'">'+obj.name+'</option>\n';
        }
        return retStr;
    }

    function dealerJsonToOption(value){
        var retStr = "";
        for(var i=0,len=value.length;i<len;i++){
            var obj  = value[i];
            retStr += "<option value='"+obj.id+"'>"+obj.dealerName+"</option>\n";
        }
        return retStr;
    }

    bdObject.loadDealerData = loadDealerData;
    //bdObject.getProvinceByCity = getProvinceByCity;
    bdObject.getDealerByDealerId = getDealerByDealerId;
    bdObject.getProvince = getProvince;
    bdObject.getCity     = getCity;
    bdObject.getDistrict = getDistrict;
    bdObject.getDealer   = getDealer;
    bdObject.jsonToOption = jsonToOption;
    bdObject.dealerJsonToOption = dealerJsonToOption;
    window.BUICK = BUICK;
})(window, jQuery, window.BUICK || {});
