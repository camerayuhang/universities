class LayerTreeControl extends ol.control.Control{
    constructor(opt_options) {
        const options = opt_options || {};
        const element = options.element;
        super({
            element: element,
            target: element.parentNode
        });
        this._map = options.map;
        this._element = element;
        this._layerGroup = this._map.getLayerGroup();
        this._layerCollection = this._layerGroup.getLayers().item(1).getLayers();
        this.createAllFieldSet();
        this.setup('#layer', this._layerGroup);
        //对图层树的监听及动画
        this.handleLayerTree();
    }
    //根据layergroup创建元素
    createAllFieldSet(){
        let length = this._layerCollection.getLength();
        if (length !== 0 ) {
            if ($(this._element).find("li:nth-child(2)").children("ul").length === 0) {
                $(this._element).find("li:nth-child(2)").append("<ul></ul>")
            }
            let ul = $(this._element).find("li:nth-child(2)").children("ul");

            this._layerCollection.forEach(function (layer,index) {
                if(ul.find("#layer1"+index).length === 0) {
                    this.createSingleFieldSet(ul,index,layer.get("name"));
                    // console.log(ul.find("#layer1"+index).length > 0)
                }
                ul.find("#layer1"+(length-1)).parent("li").nextAll("li").remove();
            }.bind(this))
        }
    }
    createSingleFieldSet(ul,i,name){
        if (name === "HeatMap") {
            ul.append(`
                <li>
                    <span>${name}</span>
                    <fieldset id="layer1${i}">
                        <label class="checkbox" for="visible1${i}">
                            visible <input id="visible1${i}" class="visible" type="checkbox"/>
                        </label>
                        <label>
                            opacity <input class="opacity scroll" type="range" min="0" max="1" step="0.01"/>
                        </label>
                        <label>
                            radius size <input class="radius-size scroll" type="range" min="1" max="50" step="1"/>
                        </label>
                        <label>
                            blur size <input class="blur-size scroll" type="range" min="1" max="50" step="1"/>
                        </label>
                    </fieldset>
                </li>
            `)
        }else {
            ul.append(`
                <li>
                    <span>${name}</span>
                    <fieldset id="layer1${i}">
                        <label class="checkbox" for="visible1${i}">
                            visible <input id="visible1${i}" class="visible" type="checkbox"/>
                        </label>
                        <label>
                            opacity <input class="opacity scroll" type="range" min="0" max="1" step="0.01"/>
                        </label>
                    </fieldset>
                </li>
            `)
        }


    }
    //为input绑定事件，处理地图图层的可见，透明
    bindInputs(layerid,layer) {
        //为input.visible绑定事件，并且初始状态就是图层的初始状态
        const visibilityInput = $(layerid).find('input.visible');
        visibilityInput.on('change',function () {
            layer.setVisible(this.checked)
            console.log('按下了')
        });
        visibilityInput.prop('checked',layer.getVisible());
        //为opacityInput绑定事件，并且初始状态就是图层的初始状态
        const opacityInput = $(layerid).find('input.opacity');
        opacityInput.on('input change',function () {
            layer.setOpacity(parseFloat($(this).val()));
        });
        opacityInput.val(String(layer.getOpacity()));

        if (layer instanceof ol.layer.Heatmap) {

            const radiusInput = $(layerid).find('input.radius-size');
            radiusInput.on('input change',function () {
                layer.setRadius(parseFloat($(this).val()));
            });
            radiusInput.val(String(layer.getRadius()));

            const blurInput = $(layerid).find('input.blur-size');
            blurInput.on('input change',function (){
                layer.setBlur(parseFloat($(this).val()));
            });
            blurInput.val(String(layer.getBlur()));
        }
    }
    setup(id,group) {
        group.getLayers().forEach(function (layer,i) {
            //拼凑fieldset的ID名
            const layerid = id+i;
            this.bindInputs(layerid,layer)
            if (layer instanceof ol.layer.Group){
                //如果图层又是一个group，则再执行一次
                this.setup(layerid,layer)
            }
        }.bind(this))
    }

    handleLayerTree() {
        //事件绑定再ul上，但是span触发，这样可以绑定动态生成的元素
        //因为ul本来就存在，所以可以这样实现动态绑定
        $(this._element)
            .on('click','li>span',function () {
                $(this).siblings('fieldset').slideToggle();
            })
        this._layerCollection.on("change:length",function () {
            this.createAllFieldSet()
            this.setup('#layer', this._layerGroup)

        }.bind(this))
    }
}