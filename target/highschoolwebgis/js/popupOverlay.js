class PopupOverlay extends ol.Overlay{
    constructor(opt_options) {
        const options = opt_options || {};
        const element = options.element;
        super({
            element:element,
            autoPan:options.autoPan
        });
        this._map = options.map;
        this._layer = options.layer;
        this._select = null;
        this._container = $(element);
        this._content = $(element).find('#popup-content');
        this._closer = $(element).find('#popup-closer');
        this._editBtn = $(element).find('#edit');
        this._saveBtn = $(element).find('#save');
        this._olddata = {};
        this._editeddata = {};
        this._newdata = {};

        this.initSelectAction()
        this.initPopupAction()

    }

    initSelectAction() {
        this._select = new ol.interaction.Select({
            condition: ol.events.condition.click,
            layers: [this._layer],
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7.5,
                    fill: new ol.style.Fill({
                        color: '#f00'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#C7C7CB',
                        width: 3
                    })
                }),
                text: new ol.style.Text({
                    text: "",
                    fill: new ol.style.Fill({
                        color: '#947F6A'
                    }),
                    textAlign: "left",
                    offsetX: "6",
                    stroke: new ol.style.Stroke({
                        color: '#d7d7d7',
                        width: 1
                    })
                })
            })
        });
        this._select.on('select', function (evt) {
            let feature = evt.selected[0];
            if (feature !== undefined) {
                let coordinate = feature.get("geometry").flatCoordinates;
                let info = feature.get('attr');
                this._olddata = info;
                this.showInfo(coordinate, info)
                this.iseditable(false);
            }
        }.bind(this))
        this._map.on("pointermove", function (evt) {
            if (this._map.hasFeatureAtPixel(evt.pixel, {layerFilter: this.layerFilterFunction})) {
                $(this._map.getTargetElement()).css("cursor", "pointer")
            } else {
                $(this._map.getTargetElement()).css("cursor", "default")
            }
        }.bind(this))
        this._map.addInteraction(this._select);

    }

    showInfo(coordinate, info) {
        for (let k in info) {
            let str = info[k].toString();
            let width = 0;
            if (typeof info[k] === 'boolean'){
                this._content.find("select[data-id=" + k +"]")
                    .children("option[value=" + str +"]")
                    .attr("selected","selected")
                    .siblings().removeAttr("selected");
            }else {
                for (let i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
                        width += 0.55 * 13;
                    } else {
                        width += 13;
                    }
                }
                this._content.find("input[data-id=" + k + "]").val(info[k]).css("width", width + 'px');
            }
        }
        this.setPosition(coordinate);
    }

    iseditable(flag) {
        if (flag === true) {
            this._editBtn.prop("disabled",true)
                .css({'background-color':'#76839b',"cursor":"default"})
            this._content.find("input").css("outline-style",'auto').prop('readonly',false);
            this._content.find("select").prop("disabled",false);
            this._saveBtn.prop("disabled",false)
                .css({'background-color':'#03899c',"cursor":"pointer"});
        }else {
            this._editBtn.prop("disabled",false)
                .css({'background-color':'#03899c',"cursor":"pointer"})
            this._content.find("input").css("outline-style",'none').prop('readonly',true);
            this._content.find("select").prop("disabled",true);
            this._saveBtn.prop("disabled",true)
                .css({'background-color':'#76839b',"cursor":"default"})
        }
    }

    initPopupAction() {
        this._editBtn.on("click" ,function () {
            this.iseditable(true);
        }.bind(this))
        this._saveBtn.on("click",function () {
            this.iseditable(false);
            this.ajaxSubmitPopForm();
            return false;
        }.bind(this))
        this._closer.on("click", function () {
            this.setPosition(undefined);
            this._closer.trigger('blur');
            this._select.getFeatures().clear();
            return false;
        }.bind(this))
    }

    ajaxSubmitPopForm(){
        let form = this._container.find("form");
        this._editeddata = this.serializeArrayToObject(form.serializeArray());
        this._newdata = this.submitData(this._olddata,this._editeddata);
        if ( Object.keys(this._newdata).length > 0) {
            this._newdata['id'] = this._olddata['id'];
            console.log(this._newdata);
            $.ajax({
                url: form.attr("action"),
                data: this._newdata,
                type: "GET",
                success: function (results, textStatus) {
                    console.log('数据提交了')
                }.bind(this),
                error: function () {
                }
            })
        }
    }

    serializeArrayToObject(serializeArray) {

        let obj = {};
        $.each(serializeArray, function(index, field) {
            obj[field.name] = field.value; //通过变量，将属性值，属性一起放到对象中
        })
        return obj;

    }

    submitData(olddata, data) {
        let newd = {};
        $.each(olddata, (item, i) => {
            if (data[item] !== undefined && data[item]!== i.toString()) {// 对比数据,不一样的保存到 newData 中
                newd[item] = data[item]
            }
        })
        return newd;
    }

    layerFilterFunction(layer) {
        if (layer.get('name') === 'Universities') {
            return true;
        }
    }
}