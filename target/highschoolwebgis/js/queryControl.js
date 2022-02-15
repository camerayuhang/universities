function callback() {
    $("#submitBtn").trigger("click");
}
class QueryControl extends ol.control.Control{
    constructor(opt_options) {
        const options = opt_options || {};
        const element = options.element;
        super({
            element:element,
            target:options.target
        });
        this._element = element;
        this._source = options.source;
        this._submitBtn = $(element).find("#submitBtn");
        this._querybox = $(element).parent();
        this._submitSelect = $(element).find(".list-bd .qb-option");
        this._submitCheck = $(element).find("#characteristics input:checkbox");
        this._submitRadio = $(element).find("#characteristics input:radio");
        //按钮按下，或回车提交表单
        this._submitBtn.on("click", this.handleSubmit.bind(this));
        //select模拟单选功能
        this._submitSelect.on("click", this.handleSelect)
        //复选框选择后提交表单
        this._submitCheck.on("click", this.handleCheck)
        //单选框选择后提交表单
        this._submitRadio.on("click", this.handleRadio)
        //失去焦点的人性化处理
        this.handleQueryBox()
    }

    showUniversities(resultjson) {
        this._source.clear();
        let features = [];
        for (let i = 0; i < resultjson.length; i++) {
            let coord = ol.proj.fromLonLat([resultjson[i].lon, resultjson[i].lat])
            let feature = new ol.Feature({
                geometry: new ol.geom.Point(coord),
                attr: resultjson[i]
            })
            feature.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: '#3A82F7'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#C7C7CB',
                        width: 2
                    })
                }),
                text: new ol.style.Text({
                    text: "",
                    fill: new ol.style.Fill({
                        color: '#000'
                    }),
                    textAlign: "left",
                    offsetX: "6",
                    stroke: new ol.style.Stroke({
                        color: '#fff',
                        width: 1
                    })
                })
            }))
            features.push(feature);
        }
        this._source.addFeatures(features);
    }
    showResultSize(size) {
        let result = $(this._element).find('.result');
        result.text(size);
    }
    handleQueryBox() {
        let timer = null;
        this._querybox.on("mouseenter",function () {
            $(this).find("li:not(:first-child)").stop().slideDown();
            $(this).find(".name").trigger("focus");
        })
        this._querybox.on("click",function () {
            $(this).find(".name").trigger("focus");
        })
        this._querybox.find(".name").on("blur",function () {
            if (timer !== null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                if (!$(this).is(":focus")) {
                    $(this).parents("li").siblings().stop().slideUp();
                }
            }.bind(this),5000)
        })

    }
    handleSubmit(){
        let form = $(this._element);
        $.ajax({
            url: form.attr("action"),
            data: form.serialize(),
            type: "GET",
            success: function (results, textStatus) {
                console.log('表单已发送数据'+decodeURIComponent(form.serialize()));
                let resultjson = JSON.parse(results);
                this.showResultSize(resultjson.length);
                this.showUniversities(resultjson);
            }.bind(this),
            error: function () {
                console.log('表单已发送数据'+decodeURIComponent(form.serialize()));
                alert("fail to connect to server");
            }
        })
        return false
    }
    handleSelect(){
        console.log();
        if (!$(this).hasClass("current")) {
            let thisVal = $(this).attr("data-id");
            //attr 是操作 html 文档节点属性，prop 是操作 js 对象属性，效果一样，但是attr可以在浏览器检查中动态观察到
            //由于select被我隐藏，所以用attr好
            $(this).addClass("current").siblings().removeClass("current");
            $(this).parent().siblings("select").children("option").removeAttr("selected");
            $(this).parent().siblings("select").children('option:contains(' + thisVal + ')').attr("selected", "selected")
            callback()
        }

    }

    handleCheck(){
        if ($(this).prop("checked")) {
            $(this).parent().addClass("current");
        } else {
            $(this).parent().removeClass("current");
        }
        callback();
    }
    handleRadio(){
        //data可以在元素内存存数据
        if ($(this).data('waschecked') === true) {
            $(this).prop('checked', false);
            $(this).data('waschecked', false).parent().removeClass("current");
        } else {
            $(this).prop('checked', true);
            $("#characteristics input:radio").data("waschecked", false).parent().removeClass("current");
            $(this).data('waschecked', true).parent().addClass("current");
        }
        callback()
    }

}