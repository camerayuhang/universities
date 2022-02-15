class BaseToolControl extends ol.control.Control {
    constructor(opt_options) {
        const options = opt_options || {};
        const element = options.element;
        super({
            element:element,
            target:element.parentNode
        });
        this._element = element;
        this._zoomin = $(element).find("#zoom-in");
        this._zoomout = $(element).find("#zoom-out");
        this._zoomfull = $(element).find("#zoom-full");

        this._zoomin.on("click", this.handleZoomIn.bind(this))
        this._zoomout.on("click", this.handleZoomOut.bind(this))
        this._zoomfull.on("click",this.handleZoomFull.bind(this))
    }
    handleZoomIn(){
        let currentZoom = this.getMap().getView().getZoom();
        this.getMap().getView().setZoom(currentZoom + 1);
    }
    handleZoomOut(){
        let currentZoom = this.getMap().getView().getZoom();
        this.getMap().getView().setZoom(currentZoom - 1);
    }
    handleZoomFull(){
        let view = this.getMap().getView();
        view.setZoom(4);
        view.setCenter(ol.proj.transform([110, 39], "EPSG:4326", "EPSG:3857"));

    }

}