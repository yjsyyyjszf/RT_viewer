import dicomParse from "./dicomParse";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneMath from "cornerstone-math"
import * as cornerstoneWadoImageLoader from "cornerstone-wado-image-loader"
import voxelCal from "./pixel2voxel";
import {readTextFile} from "./openFile";
import pixelCal from "./voxel2pixel";

cornerstoneWadoImageLoader.external.cornerstone = cornerstone
cornerstoneWadoImageLoader.external.dicomParser = dicomParser
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneTools.init();

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
        readTextFile(require('../dicomFile/RTStructure103.txt'));
        pixelCal(image);
    });


}

function handle(){
    const imageId = 'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm';
    loadImage(imageId);
}

export {handleFileChange, handle,loadImage}
