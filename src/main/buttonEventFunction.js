import "./MainUI.css"
import "./MainUI.js"
import * as cornerstoneTools from "cornerstone-tools";
import {updateTheImage} from "./loadData";

export {angleOn,lengthOn,eraserOn,drawCircle , drawRectangle,mouseWheelE}

    function angleOn(){
        const AngleTool = cornerstoneTools.AngleTool;
        cornerstoneTools.addTool(AngleTool)
        cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })
    }

    function lengthOn(){
        const LengthTool = cornerstoneTools.LengthTool;
        cornerstoneTools.addTool(LengthTool)
        cornerstoneTools.setToolActive("Length", {mouseButtonMask: 1})
    }

    function eraserOn(){
        const EraserTool = cornerstoneTools.EraserTool;
        cornerstoneTools.addTool(EraserTool);
        cornerstoneTools.setToolActive("Eraser", {mouseButtonMask: 1})
    }

function drawCircle(){
    const EllipticalRoiTool = cornerstoneTools.EllipticalRoiTool;
    cornerstoneTools.addTool(EllipticalRoiTool)
    cornerstoneTools.setToolActive('EllipticalRoi', { mouseButtonMask: 1 })
}


function drawRectangle(){
    const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
    cornerstoneTools.addTool(RectangleRoiTool)
    cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 1 })
}


function mouseWheelE(e) {
    // Firefox e.detail > 0 scroll back, < 0 scroll forward
    // chrome/safari e.wheelDelta < 0 scroll back, > 0 scroll forward

    let currentImageIndex = 0;
    let element = document.getElementById('dicomImage');
    element.addEventListener(e, function (e)
    {
        if (e.wheelDelta < 0 || e.detail > 0) {
            for (let i = 0; i < 119; i++) {
                if (currentImageIndex === i) {
                    if (i < 119)
                        updateTheImage(i + 1);
                    else
                        updateTheImage(118);
                }
            }
        } else {
            for (let i = 0; i < 119; i++) {
                if (currentImageIndex === i) {
                    if (i >= 0)
                        updateTheImage(i - 1);
                    else
                        updateTheImage(0)
                }
            }
        }
        // Prevent page from scrolling
        return false;
    });
}




/*

            for (let i = 0; i < 119; i++) {
                if (e.wheelDelta < 0 || e.detail > 0) {
                    if (currentImageIndex === i) {
                        if (i < 119)
                            updateTheImage(i++);
                        else
                            updateTheImage(118);
                    }
                } else {
                    if (currentImageIndex === i) {
                        if (i >= 0)
                            updateTheImage(i--);
                        else
                            updateTheImage(0)
                    }
                }

            }
            */
