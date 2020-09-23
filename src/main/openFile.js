import pixelCal from "./voxel2pixel";

function openTextFile(){
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
    input.onchange = function (e) {
        processFile(e.target.files[0]);
    };
    input.click();
}

function processFile(file) {
    let struct; //Read contour Data from Text File
    const reader = new FileReader();

    reader.onload = function () {
        struct = reader.result;
        document.getElementById('struct').textContent = 'Struct : ' + struct;
        pixelCal(struct);
    };
    reader.readAsText(file, /* optional */ "euc-kr");
}

let struct;
function readTextFile(file) {
    struct = String();

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);

   rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                struct = allText;

            }
        }

    };
    rawFile.send(null);
    return struct
}

export {openTextFile,readTextFile}
