import dicomParse from "./dicomParse";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneMath from "cornerstone-math"
import * as cornerstoneWadoImageLoader from "cornerstone-wado-image-loader"
import voxelCal from "./pixel2voxel";
import readTextFile from "./openFile";
import pixelCal from "./voxel2pixel";

cornerstoneWadoImageLoader.external.cornerstone = cornerstone
cornerstoneWadoImageLoader.external.dicomParser = dicomParser
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneTools.init();

let currentImageIndex = 0;
let element=document.getElementById('dicomImage');
let imageIds=[];

function imageIdList(e){
   for(let i = 0;i<119;i++) {
         imageIds[i] = cornerstoneWadoImageLoader.wadouri.fileManager.add(e.target.files[i])
    }
    loadImage(imageIds[0]);
}


function loadImage(imageIds){
    let el = document.getElementById('dicomImage');

    cornerstone.enable(el)
    cornerstone.loadAndCacheImage(imageIds).then(function (image) {
        const viewport = cornerstone.getDefaultViewportForImage(el, image);
        cornerstone.displayImage(el, image, viewport);
    });
}

// updates the image display
function updateTheImage(imageIndex) {
    return cornerstone.loadImage(imageIds[imageIndex]).then(function(image) {
        currentImageIndex = imageIndex;
        const viewport = cornerstone.getDefaultViewportForImage(element,image);
        cornerstone.displayImage(element, image, viewport);
    });
}

function handleFileChange(e) {
    e.stopPropagation();
    e.preventDefault();

    const imageId = cornerstoneWadoImageLoader.wadouri.fileManager.add(e.target.files[0])
    loadData(imageId);
}

/************************************************************************/

let img;

//load one CT Image from local file
function loadData(imageId) {
    let el = document.getElementById('dicomImage');

    cornerstone.enable(el)
   cornerstone.loadImage(imageId).then(function (image) {
        const viewport = cornerstone.getDefaultViewportForImage(el, image);
        cornerstone.displayImage(el, image, viewport);

        dicomParse(image);
        voxelCal(image);
        readTextFile(require('../dicomFile/RTStructure103.txt'));
        pixelCal(image);

       img = image;
    });
    return img;
}
let canvas;
let ctx ;

//draw ROI contouring from textFile
function draw(){
    let px = pixelCal(img);
    let pi = px[0];
    let pj = px[1];

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(pi[0],pj[1]);
    for(let i=1;i<=pi.length*3;i++){
        if(i%3===0) {
            ctx.lineTo(pi[i], pj[i + 1]);
        }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle="#00fefe";
    ctx.globalAlpha=0.5;
    ctx.fill();
}

//open test file
function handle(){
    const imageId = 'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm';
    loadData(imageId);
}

//show file list from selected directory
function showFileList(e){
    let output = document.getElementById("listing");
    let files = e.target.files;

    for (let i=0; i<files.length; i++) {
        let item = document.createElement("li");
        item.innerHTML = files[i].webkitRelativePath;
        output.appendChild(item);
        alert(item)
    };

}

export {handleFileChange, handle,loadData,draw,showFileList,updateTheImage,imageIdList}
