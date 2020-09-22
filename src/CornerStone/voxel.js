import React from "react";
import * as cornerstone from "cornerstone-core";

function voxelCal(image) {

    let imgPos = image.data.string('x00200032');
    let imgPosArr = imgPos.split("\\");

    let Sx = parseFloat(imgPosArr[0]);
    let Sy = parseFloat(imgPosArr[1]);
    let Sz = parseFloat(imgPosArr[2]);

    let imgOri = image.data.string('x00200037');
    let imgOriArr = imgOri.split("\\");

    let Xx = parseFloat(imgOriArr[0]);
    let Xy = parseFloat(imgOriArr[1]);
    let Xz = parseFloat(imgOriArr[2]);
    let Yx = parseFloat(imgOriArr[3]);
    let Yy = parseFloat(imgOriArr[4]);
    let Yz = parseFloat(imgOriArr[5]);

    let pixelSpace = image.data.string('x00280030');
    let pixelSpaceArr = pixelSpace.split("\\");

    let Di = parseFloat((pixelSpaceArr[0]));
    let Dj = parseFloat((pixelSpaceArr[1]));

    let el = document.getElementById('dicomImage');

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

    document.getElementById('Sxyz').textContent = 'Sx : ' + Sx + ', Sy : ' + Sy +', Sz : ' + Sz ;
    document.getElementById('Xxyz').textContent = 'Xx : ' + Xx + ', Xy : ' + Xy + ', Xz : ' + Xz;
    document.getElementById('Yxyz').textContent = 'Yx : ' + Yx + ', Yy : ' + Yy + ', Yz : ' + Yz;
    document.getElementById('Dij').textContent = 'Di : ' + Di + ', Dj : ' + Dj;

}

export default voxelCal;
