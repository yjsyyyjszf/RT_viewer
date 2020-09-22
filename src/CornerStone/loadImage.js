import dicomParse from "./dicomParse";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneMath from "cornerstone-math"
import * as cornerstoneWadoImageLoader from "cornerstone-wado-image-loader"
import voxelCal from "./voxel";

cornerstoneWadoImageLoader.external.cornerstone = cornerstone
cornerstoneWadoImageLoader.external.dicomParser = dicomParser
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneTools.init();

const voxel = require('./voxel.js');

function handleFileChange(e) {
    e.stopPropagation();
    e.preventDefault();

    const imageId = cornerstoneWadoImageLoader.wadouri.fileManager.add(e.target.files[0])
    loadImage(imageId);
}

//cornerstone으로 image load
function loadImage(imageId) {
    let el = document.getElementById('dicomImage');

    cornerstone.enable(el)
    cornerstone.loadImage(imageId).then(function (image) {
        const viewport = cornerstone.getDefaultViewportForImage(el, image);
        cornerstone.displayImage(el, image, viewport);

        dicomParse(image);
        voxelCal(image);
    });



}

export default handleFileChange;
