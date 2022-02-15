$(function () {
    let universitiessource = new ol.source.Vector({
        features: []
    })

    let universitieslayer = new ol.layer.Vector({
        source: universitiessource,
        name: "Universities"
    })

    function initMap() {
        let view = new ol.View({
            zoom: 4,
            center: ol.proj.transform([110, 39], "EPSG:4326", "EPSG:3857")
        });

        let map = new ol.Map({
            controls: ol.control.defaults({
                attribution: false,
                zoom: false
            }).extend([
                new ol.control.MousePosition({
                    projection: "EPSG:4326",
                    coordinateFormat: function (coord) {
                        return ol.coordinate.toStringHDMS(coord);
                    }
                })
            ]),
            target: "map",
            layers: [
                new ol.layer.Group({
                    layers: [
                        getChinaBoundary(),
                        universitieslayer
                    ]
                })
            ],
            view: view
        });
        return map;
    }

    function getChinaBoundary() {
        var vectorSource = new ol.source.Vector({
            //从json读取要素的第三种方法，最佳，这里有url属性，自动转换投影
            url: "../data/Chinaboundaryline.geojson",//这个url方式的要素，在解析过程中会自动的将要素的投影转换成视图的投影
            format: new ol.format.GeoJSON()//对geojson读取和写数据的一个要素格式类
        });

        var vector = new ol.layer.Vector({
            name: "ChinaBoundary",
            source: vectorSource,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: "#4e98f444"
                }),
                stroke: new ol.style.Stroke({
                    width: 3,
                    color: [71, 137, 227, 1]
                })
            })
        });
        return vector;
    }

    function initInteraction(map) {

        map.getView().on("change:resolution", function () {
            if (map.getView().getZoom() > 8) {
                universitiessource.forEachFeature(function (feature) {
                    let name = feature.get("attr").name;
                    if (feature.getStyle().getText().getText() !== name)
                        feature.getStyle().getText().setText(name);
                })
            } else {
                universitiessource.forEachFeature(function (feature) {
                    if (feature.getStyle().getText().getText() !== '') {
                        feature.getStyle().getText().setText("");
                    }

                })
            }
        })
        $("#popup-content input").on("change", function () {
            console.log("修改后长度" + $(this).val().length)
        })
    }
    
    function initControls(map) {
        map.addControl(new QueryControl({
            source: universitiessource,
            element: $("#form-query")[0],
            target: $("#query-control")[0]
        }));
        map.addControl(new BaseToolControl({
            element: $("#base-tool-control").children()[0]
        }));
        map.addControl(new SwitchLayerControl({
            element: $("#switch-layer-control").find("ul")[0],
            map: map,
            source: universitiessource
        }));
        map.addControl(new LayerTreeControl({
            element: $("#layertree-control").children('ul')[0],
            map: map
        }))
    }
    function initOverlays(map) {
        map.addOverlay(new PopupOverlay({
            map: map,
            layer: universitieslayer,
            element: $('#popup-overlay')[0],
            autoPan: {//true已经被弃用，现在直接写对象
                animation: {
                    duration: 250
                },
                margin: 30
            }
        }));
    }

    function main() {
        map = initMap();
        initControls(map);
        initOverlays(map);
        initInteraction(map);
    }

    main();
})