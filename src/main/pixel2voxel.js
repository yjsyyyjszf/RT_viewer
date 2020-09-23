import React from "react";
import * as cornerstone from "cornerstone-core";

//caculate voxel from pixel
function voxelCal(image) {
    let imgPos = image.data.string('x00200032');
    imgPos = imgPos.toString();
    let imgPosArr = imgPos.split("\\");

    let Sx = Math.floor((parseFloat(imgPosArr[0]))*10)/10;
    let Sy = Math.floor((parseFloat(imgPosArr[1]))*10)/10;
    let Sz = Math.floor((parseFloat(imgPosArr[2]))*10)/10;

    let imgOri = image.data.string('x00200037');
    imgOri=imgOri.toString();
    let imgOriArr = imgOri.split("\\");

    let Xx = Math.floor((parseFloat(imgOriArr[0]))*10)/10;
    let Xy = Math.floor((parseFloat(imgOriArr[1]))*10)/10;
    let Xz = Math.floor((parseFloat(imgOriArr[2]))*10)/10;
    let Yx = Math.floor((parseFloat(imgOriArr[3]))*10)/10;
    let Yy = Math.floor((parseFloat(imgOriArr[4]))*10)/10;
    let Yz = Math.floor((parseFloat(imgOriArr[5]))*10)/10;

    let pixelSpace = image.data.string('x00280030');
    pixelSpace=pixelSpace.toString();
    let pixelSpaceArr = pixelSpace.split("\\");

    let Di = Math.floor(parseFloat((pixelSpaceArr[0]))*10)/10;
    let Dj = Math.floor(parseFloat((pixelSpaceArr[1]))*10)/10;

    let el = document.getElementById('dicomImage');

    document.getElementById('Sxyz').textContent = 'Sx : ' + Sx + ', Sy : ' + Sy +', Sz : ' + Sz ;
    document.getElementById('Xxyz').textContent = 'Xx : ' + Xx + ', Xy : ' + Xy + ', Xz : ' + Xz;
    document.getElementById('Yxyz').textContent = 'Yx : ' + Yx + ', Yy : ' + Yy + ', Yz : ' + Yz;
    document.getElementById('Dij').textContent = 'Di : ' + Di + ', Dj : ' + Dj;

    el.addEventListener('mousemove', function (event) {
        const pixelCoords = cornerstone.pageToPixel(el, event.pageX, event.pageY);
        document.getElementById('coords').textContent = "pageX=" + event.pageX + ", pageY=" + event.pageY + ", pixelX=" + pixelCoords.x + ", pixelY=" + pixelCoords.y;

        let Px = (Xx * Di * pixelCoords.x) + ( Yx * Dj * pixelCoords.y) + Sx ;
        let Py = (Xy * Di * pixelCoords.x) + ( Yy * Dj * pixelCoords.y) + Sy ;
        let Pz = (Xz * Di * pixelCoords.x) + ( Yz * Dj * pixelCoords.y) + Sz ;

        document.getElementById('voxelCoords').textContent = "Px = " + Px + ", Py = " + Py + ", Pz = "+ Pz ;
    });

    el.addEventListener('dblclick',function(event){
        const pixelCoords = cornerstone.pageToPixel(el, event.pageX, event.pageY);
        document.getElementById('pixelValue').textContent = "pageX=" + event.pageX + ", pageY=" + event.pageY + ", pixelX=" + pixelCoords.x + ", pixelY=" + pixelCoords.y;

        let Px = (Xx * Di * pixelCoords.x) + ( Yx * Dj * pixelCoords.y) + Sx ;
        let Py = (Xy * Di * pixelCoords.x) + ( Yy * Dj * pixelCoords.y) + Sy ;
        let Pz = (Xz * Di * pixelCoords.x) + ( Yz * Dj * pixelCoords.y) + Sz ;

        document.getElementById('voxelValue').textContent = "Px = " + Px + ", Py = " + Py + ", Pz = "+ Pz ;
    });
    return [Sx,Sy,Xx,Yy,Di,Dj]
}

export default voxelCal;
