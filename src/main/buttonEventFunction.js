import "./MainUI.css"
import "./MainUI.js"
import * as cornerstoneTools from "cornerstone-tools";

export {angleOn,lengthOn,eraserOn,drawCircle , drawRectangle}

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


