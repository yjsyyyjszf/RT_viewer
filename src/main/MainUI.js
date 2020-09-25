import React,{Component} from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstoneMath from "cornerstone-math"
import * as cornerstoneWadoImageLoader from "cornerstone-wado-image-loader"
import Hammer from "hammerjs";
import dicomParser from "dicom-parser"
import "./MainUI.css"
import { angleOn, lengthOn, eraserOn, drawCircle , drawRectangle} from "./buttonEventFunction.js"
import {handleFileChange, handle, draw, imageIdList,updateTheImage} from './loadData.js'

cornerstoneWadoImageLoader.external.cornerstone = cornerstone
cornerstoneWadoImageLoader.external.dicomParser = dicomParser
cornerstoneTools.external.cornerstone = cornerstone
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath
cornerstoneTools.init();

class MainUIElements extends React.Component {

    componentDidMount() {

        const element = this.element;


            element.addEventListener('mousedown', function (e) {
            let lastX = e.pageX;
            let lastY = e.pageY;
            const mouseButton = e.which;

            function mouseMoveHandler(e) {
                const deltaX = e.pageX - lastX;
                const deltaY = e.pageY - lastY;
                lastX = e.pageX;
                lastY = e.pageY;

                if (mouseButton === 1) {
                    let viewport = cornerstone.getViewport(element);
                    viewport.voi.windowWidth += (deltaX / viewport.scale);
                    viewport.voi.windowCenter += (deltaY / viewport.scale);
                    cornerstone.setViewport(element, viewport);

                    document.getElementById('bottomleft').textContent = "WW/WC:" + Math.round(viewport.voi.windowWidth)
                        + "/" + Math.round(viewport.voi.windowCenter);

                } else if (mouseButton === 2) {
                    let viewport = cornerstone.getViewport(element);
                    viewport.translation.x += (deltaX / viewport.scale);
                    viewport.translation.y += (deltaY / viewport.scale);
                    cornerstone.setViewport(element, viewport);

                } else if (mouseButton === 3) {
                    let viewport = cornerstone.getViewport(element);
                    viewport.scale += (deltaY / 100);
                    cornerstone.setViewport(element, viewport);
                    document.getElementById('bottomright').textContent = "Zoom:" + viewport.scale + "x";
                }
            }

            function mouseUpHandler() {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

    }

    reductionOn(){
        this.element.style.width='256px';
        this.element.style.height='256px';
        cornerstone.resize(this.element);
    }
    expansionOn(){
        this.element.style.width='512px';
        this.element.style.height='512px';
        cornerstone.resize(this.element);

    }
     invertOn(){
        const viewport = cornerstone.getViewport(this.element);
        viewport.invert=!viewport.invert;
        cornerstone.setViewport(this.element,viewport);
    }
     interpolationOn(){
        const viewport = cornerstone.getViewport(this.element);
        viewport.pixelReplication = !viewport.pixelReplication;
        cornerstone.setViewport(this.element, viewport);
    }
      hflipOn(){
        const viewport = cornerstone.getViewport(this.element);
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(this.element, viewport);
    }
     vflipOn(){
        const viewport = cornerstone.getViewport(this.element);
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(this.element, viewport);
    }
     rotateOn() {
        const viewport = cornerstone.getViewport(this.element);
        viewport.rotation += 90;
        cornerstone.setViewport(this.element, viewport);
    }



    //렌더링
    render() {
        return (
            <div id ="outsideWrapper" className={"outsideWrapper"}>
                <input type="file" onChange={(e) => {
                    handleFileChange(e)
                }} />&nbsp;&nbsp;

                <input type="file" id="filepicker" name="fileList" webkitdirectory={""} directory={""} multiple
                       onChange={(e)=>{
                           imageIdList(e);
                       }}/>
                <ul id="listing"></ul>

                <button onClick={()=>{handle()}}>TEST</button>
                    <div>
                        <button onClick={() => {angleOn()}}>Angle</button>&nbsp;&nbsp;
                        <button onClick={() => {lengthOn()}}>Length</button>&nbsp;&nbsp;
                        <button onClick={() => {drawCircle()}}>Circle</button>&nbsp;&nbsp;
                        <button onClick={() => {drawRectangle()}}>Rectangle</button>&nbsp;&nbsp;
                        <button onClick={() => {eraserOn()}}>Erase</button>&nbsp;&nbsp;
                        <button onClick={() => {this.reductionOn()}}>256x256</button>&nbsp;&nbsp;
                        <button onClick={() => {this.expansionOn()}}>512x512</button>&nbsp;&nbsp;
                    </div>
                    <div>
                        <button onClick={() => {this.invertOn()}}>Toggle Invert</button>&nbsp;&nbsp;
                        <button onClick={() => {this.interpolationOn()}}>Toggle Interpolation</button>&nbsp;&nbsp;
                        <button onClick={() => {this.hflipOn()}}>Horizontal Flip</button>&nbsp;&nbsp;
                        <button onClick={() => {this.vflipOn()}}>Vertical Flip</button>&nbsp;&nbsp;
                        <button onClick={() => {this.rotateOn()}}>Rotate 90</button>&nbsp;&nbsp;
                    </div>

                    <div>

                    <button onClick={()=>{draw()}}>draw</button>

                    </div>

                <div>
                    <ul>
                        <li>Left click drag - window/level</li>
                        <li>Middle Mouse button drag - pan</li>
                        <li>Right click drag - zoom</li>
                        <li>Mouse wheel - scroll images</li>
                        <li>Double Click - save pixel/voxel</li>
                    </ul>
                </div>


                <div id="dicomImageWrapper" className="wrapper"
                     onContextMenu="return false" onWheel={(e)=>{
                }} >
                        <div id="dicomImage" className="viewportElement"
                             ref={input => {
                                 this.element = input;}}>
                            <canvas id ="myCanvas" className={"canvas"} width={512} height={512} />
                        </div>
                    <div id="topleft" className="overlay" className="topleft">
                        Patient Name:
                        Patient Sex:
                    </div>
                    <div id="topright" className="overlay" className="topright">

                        Modality :
                    </div>
                    <div id="bottomleft" className="overlay" className="bottomleft">
                        WW/WC:
                    </div>
                    <div id="bottomright" className="overlay" className="bottomright">
                        Zoom:
                    </div>
                </div>


                <div><span id="coords"></span></div>
                <div><span id="voxelCoords">voxel</span></div>

                <div><span id="pixelValue"></span></div>
                <div><span id="voxelValue"></span></div>

                <div><span id="patient">Patient ID : </span></div>
                <div><span id="modality">Modality : </span></div>
                <br></br>
                <div id ="info">
                    <div><span id="studyUID">Study UID :</span></div>
                    <div><span id="seriesUID">Series UID :</span></div>
                    <div><span id="instanceUID">Instance UID : </span></div>
                    <div><span id="frameUID">Frame of Reference UID : </span></div>
                </div>
                <br></br>
                <div id="voxel">
                    <div><span id="imageOrientation">Image Orientation :</span></div>
                    <div><span id="pixelSpacing">Pixel Spacing :</span></div>
                    <div><span id="imagePosition">Image Position : </span></div>
                </div>
                <br></br>
                <div id="voxelCal">
                    <div><span id="Sxyz"></span></div>
                    <div><span id="Xxyz"></span></div>
                    <div><span id="Yxyz"></span></div>
                    <div><span id="Dij"></span></div>

                </div>
                <br></br>
                <div id = "pixelCal">
                    <div><span id = "struct">Struct :</span></div>
                    <br></br>
                    <div><span id = "str">str :</span></div>
                    <br></br>
                    <div><span id = "vPx">vPx : </span></div>
                    <br></br>
                    <div><span id = "vPy">vPy : </span></div>
                </div>
                <br></br>
                <div><span id="contour">contour data :</span></div>

                <div id="point">
                    <div id="pi">Pi : </div>
                    <br></br>
                    <div id="pj">Pj : </div>
                </div>

                <br></br> <br></br> <br></br> <br></br>

            </div>
        );
    }
}

export default MainUIElements


