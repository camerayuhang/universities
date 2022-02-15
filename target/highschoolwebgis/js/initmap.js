$(function () {
    var view = new ol.View({
        zoom: 4,
        center: ol.proj.transform([110, 39], "EPSG:4326", "EPSG:3857")
    });
    var universitiessource = new ol.source.Vector({
        features: []

    })
    var universitieslayer = new ol.layer.Vector({
        source: universitiessource,
    })

    var map = new ol.Map({
        controls: ol.control.defaults({
            attribution: false
        }).extend([

        ]),
        target: "map",
        layers: [
            getTdtLayer("vec_w"),
            // getTdtLayer("cva_w"),
            universitieslayer
        ],
        view: view
    });
    let cities = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏',
        '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川',
        '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'];
    let departments = ['教育部', '其他部委', '地方', '军校'];
    let types = ['综合', '工科', '农业', '林业', '医药', '师范', '语言', '财经', '政法', '体育', '艺术', '民族'];
    let levels = ['本科', '高职(专科)'];
    let characteristics = ['一流大学建设高校', '一流学科建设高校', '研究生院', '民办高校', '独立学院', '中外合作办学', '内地与港澳台地区合作办学'];
    //底图
    function getTdtLayer(lyr) {
        let token = "208b5256e3d10046ff51e4eaabbb9bb8";
        let url = "http://t{1-7}.tianditu.com/DataServer?T=" + lyr + "&x={x}&y={y}&l={z}&tk=" + token;//天地图得有key才行
        let layer = new ol.layer.Tile({
            source: new ol.source.XYZ({//这种数据源有url属性，加载网络上的资源
                url: url
            })
        });
        return layer;
    }
    //城市
    $.each(cities, function (i, v) {
        $("#cities").append($('<span class="qb-option"><span/>').text(v).attr("data-id",cities[i]));
        $("#cities-select").append($('<option></option>').text(v).prop("value",cities[i]));
    })
    //部门
    $.each(departments, function (i, v) {
        $("#departments").append($('<span class="qb-option"><span/>').text(v).attr("data-id",departments[i]));
        $("#departments-select").append($('<option></option>').text(v).prop("value",departments[i]));
    })
    //类型
    $.each(types, function (i, v) {
        $("#types").append($('<span class="qb-option"><span/>').text(v).attr("data-id",types[i]));
        $("#types-select").append($('<option></option>').text(v).prop("value",types[i]));
    })
    //学历等级
    $.each(levels, function (i, v) {
        $("#levels").append($('<span class="qb-option"><span/>').text(v).attr("data-id",levels[i]));
        $("#levels-select").append($('<option></option>').text(v).prop("value",levels[i]));
    })
    //院校特性
    $.each(characteristics, function (i, v) {
        if (i < 3) {
            $("#characteristics").append($('<label><label/>').text(v).prepend($('<input type="checkbox" name="public">').val(characteristics[i])));
        } else {
            $("#characteristics").append($('<label><label/>').text(v).prepend($('<input type="radio" name="private">').val(characteristics[i])));
        }
    })
    //页码打开时就提交表单
    // $("#submitBtn").trigger("click");
    //单选框选择后提交表单
    $("#characteristics input:radio").on("click", function () {
        //data可以在元素内存存数据
        if ($(this).data('waschecked') === true) {
            $(this).prop('checked', false);
            $(this).data('waschecked', false).parent().removeClass("current");
        } else {
            $(this).prop('checked', true);
            $("#characteristics input:radio").data("waschecked",false).parent().removeClass("current");
            $(this).data('waschecked', true).parent().addClass("current");
        }
        $("#submitBtn").trigger("click");

    })
    //select模拟单选功能
    $(".query-box .list-bd .qb-option").on("click", function () {
        if (!$(this).hasClass("current")) {
            thisVal = $(this).attr("data-id");
            //attr 是操作 html 文档节点属性，prop 是操作 js 对象属性，效果一样，但是attr可以在浏览器检查中动态观察到
            //由于select被我隐藏，所以用attr好
            $(this).addClass("current").siblings().removeClass("current");
            $(this).parent().siblings("select").children("option").removeAttr("selected");
            $(this).parent().siblings("select").children('option:contains('+thisVal+')').attr("selected","selected")
            $("#submitBtn").trigger("click");

        }
    })
    //复选框选择后提交表单
    $("#characteristics input:checkbox").on("click",function () {
        if ($(this).prop("checked")){
            $(this).parent().addClass("current");
        }else {
            $(this).parent().removeClass("current");
        }
        $("#submitBtn").trigger("click");
    })



})