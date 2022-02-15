$(function () {
    let cities = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏',
        '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川',
        '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'];
    let departments = ['教育部', '其他部委', '地方', '军校'];
    let types = ['综合', '工科', '农业', '林业', '医药', '师范', '语言', '财经', '政法', '体育', '艺术', '民族'];
    let levels = ['本科', '高职(专科)'];
    let characteristics = ['一流大学建设高校', '一流学科建设高校', '研究生院', '民办高校', '独立学院', '中外合作办学', '内地与港澳台地区合作办学'];
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
})