class SwitchLayerControl extends ol.control.Control{
    constructor(opt_options) {
        const options = opt_options || {};
        const element = options.element;
        super({
            element: element,
            target: element.parentNode
        });
        this._map = options.map;
        this._mapselect = $(element).find("#map-tile");
        this._mappingselect = $(element).find("#mapping");
        this._heatmap = null;
        this._source = options.source;
        this.bindselects()

        this._map.getLayers().insertAt(0,this.getTdtLayer(this._mapselect.val()));
    }
    bindselects() {
        this._mapselect.on("change",this.handleSwitch.bind(this));
        this._mappingselect.on("change",this.handleMapping.bind(this));
    }

    handleSwitch(){
        let mapselected = this._mapselect.val();
        this._map.getLayers().setAt(0,this.getTdtLayer(mapselected))
        console.log(this._map.getLayers());
    }
    handleMapping() {
        let selected = this._mappingselect.val();
        if (selected === 'heatmap') {
            if (this._heatmap === null) {
                this._heatmap = new ol.layer.Heatmap({
                    name: "HeatMap",
                    source: this._source,
                    blur: 18,
                    radius: 6,
                    opacity: .75,
                })
            }
            this._map.getLayers().item(1).getLayers().push(this._heatmap);
            console.log(this._map.getLayers());
        }else {
            this._map.getLayers().item(1).getLayers().pop();
        }

    }

    getTdtLayer(lyr) {
        let token = "208b5256e3d10046ff51e4eaabbb9bb8";
        let url;
        if (lyr === 'ArcGIS') {
            url = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}";
        }else if (lyr === 'autonavi'){
            url = 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'//高德地图
        }
        else {
            url = "http://t{1-7}.tianditu.com/DataServer?T=" + lyr + "&x={x}&y={y}&l={z}&tk=" + token;//天地图得有key才行
        }

        let layer = new ol.layer.Tile({
            source: new ol.source.XYZ({//这种数据源有url属性，加载网络上的资源
                url: url
            })
        });
        return layer;
    }

}