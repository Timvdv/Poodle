/**
 * Created by oteken on 5/31/2017.
 */

module.exports = function ImageWriter(){
    var fs = require('fs');
    var relativePath = "../server/assets/";

    this.storeRawImageAsPNG = function(name, rawImage){
        var base64Data = toBase64Data(rawImage);
        writePNGImage(name, base64Data);
    }

    function toBase64Data(rawImage){
        return rawImage.replace(/^data:image\/png;base64,/, "");
    }

    function writePNGImage(name, image){
        fs.writeFile(relativePath + name + ".png", image, 'base64', function(err) {
            console.log(err);
        });
    }
}