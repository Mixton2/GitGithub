
#target photoshop

// Bring application forward
app.bringToFront();
import { CreateDialog } from "./Dialog/dialog";
// Set active Document variable and decode name for output
var docRef = app.activeDocument;
var docName = decodeURI(activeDocument.name);

(function () {
  var artboards = docRef.layers;

  var visibleArtboards = [];
  for (var i = 0; i < artboards.length; i++) {
    if (artboards[i].visible) {
      visibleArtboards.push(artboards[i].name);
    }
  }
  var f;
  var fileType;
  var win = new Window("dialog", "CMDBANNER.IO EXPORT OPTIONS", [CreateDialog.x, CreateDialog.y, 460, 650]);

  // Add a panel
  win.radioPanel = win.add("panel", [25, 105, 285, 230], "Export Options");

  // Add radio buttons
  win.radioPanel.radOne = win.radioPanel.add("radiobutton", [10, 15, 300, 35], "PNG");
  win.radioPanel.radTwo = win.radioPanel.add("radiobutton", [10, 45, 300, 65], "GIF");
  win.radioPanel.radThree = win.radioPanel.add("radiobutton", [10, 75, 300, 95], "JPG");

  win.folderPanel = win.add("panel", [25, 15, 285, 90], "Save to");
  win.folderPanel.orientation = "row";
  // select folder
  win.folderPanel.btnFolderInput = win.folderPanel.add("button", [10, 15, 100, 35], "folder...");
  win.folderPanel.txtFolderInput = win.folderPanel.add("statictext", [100, 15, 220, 35], "", {
    truncate: "middle"
  });

  // bounds = [left, top, right, bottom]
  win.btnPanel = win.add("panel", [25, 430, 285, 480],);
  win.btnPanel.orientation = "row";
  // Add the components, two buttons
  win.btnPanel.okBtn = win.btnPanel.add("button", [10, 15, 100, 35], "CONTINUE");
  win.btnPanel.cancelBtn = win.btnPanel.add("button", [150, 15, 220, 35], "CANCEL");
  // Register event listeners that define the button behavior
  // Event listener for the radio buttons
  win.radioPanel.radOne.onClick = win.radioPanel.radTwo.onClick = win.radioPanel.radThree.onClick = function () {
    var selected = "";

    if (win.radioPanel.radOne.value) {
      selected = "PNG";
      fileType = ".png";
    }
    else if (win.radioPanel.radTwo.value) {
      selected = "GIF";
      fileType = ".gif";
    }
    else if (win.radioPanel.radThree.value) {
      selected = "JPG";
      fileType = ".jpg";
    }
    //win.radioPanel.radTxtOne.text = selected;
  };


  win.folderPanel.btnFolderInput.onClick = function () {
    f = Folder.selectDialog();
    if (f) {
      win.folderPanel.txtFolderInput.text = f.fullName;
    }
  };

  win.btnPanel.okBtn.onClick = function () {
    win.close(1);
  }

  win.btnPanel.cancelBtn.onClick = function () {
    win.close(0);
  }

  if (win.show() == 1) {
    ProcessNoOfCopy();
  }

  function ProcessNoOfCopy() {
    var f;
    var fileType;
    var NoOfCopy = 0;

    for (var x = 0; x < visibleArtboards.length; x++) {

      //Changing text
      var visibleArtboard = docRef.layerSets.getByName(visibleArtboards[x]);
      var titleGroup = visibleArtboard.layers.getByName("TXT");
      NoOfCopy = titleGroup.layers.length;

      var win = new Window("dialog", "Edit Copy", [150, 150, 460, 70 * titleGroup.layers.length + 310]);

      // Add a panel
      win.statictextPanel = win.add("panel", [25, 25, 285, 60 * (NoOfCopy) + 60], visibleArtboards[x]);

      var titleLayer = [];
      var copyContent = [];
      var skipIndex = 0;

      for (var r = 0; r < (titleGroup.layers.length); r++) {
        if (titleGroup.layers[r].kind === LayerKind.TEXT) {
          titleLayer[r] = titleGroup.layers[r];
        } else {
          skipIndex++;
          if (r < titleGroup.layers.length - 1) {
            if (titleGroup.layers[r + skipIndex].kind === LayerKind.TEXT) {
              titleLayer[r] = titleGroup.layers[r + skipIndex];
            }
          }

        }

      }
      for (var i = 0; i < titleLayer.length; i++) {

        if (i == 0) {
          win.statictextPanel.statictext0 = win.statictextPanel.add("statictext", [10, 15 * ((i + 1)), 300, 35], "Edit copy ");
          win.statictextPanel.edittext0 = win.statictextPanel.add('edittext {properties: {name: "edittext0"}}', [10, 45 * ((i + 1)), 200, 65]);
          win.statictextPanel.edittext0.text = titleLayer[i].textItem.contents;

        }
        if (i == 1) {
          win.statictextPanel.statictext1 = win.statictextPanel.add("statictext", [10, 15 * ((i + 1)), 300, 35], "Edit copy " + ((i + 1)));
          win.statictextPanel.edittext1 = win.statictextPanel.add('edittext {properties: {name: "edittext1"}}', [10, 45 * ((i + 1)), 200, 65]);
          win.statictextPanel.edittext1.text = titleLayer[i].textItem.contents;
        }
        if (i == 2) {

          win.statictextPanel.statictext2 = win.statictextPanel.add("statictext", [10, 15 * ((i + 1)), 300, 35], "Edit copy " + ((i + 1)));
          win.statictextPanel.edittext2 = win.statictextPanel.add('edittext {properties: {name: "edittext2"}}', [10, 45 * ((i + 1)), 200, 65]);
          win.statictextPanel.edittext2.text = titleLayer[i].textItem.contents;
        }
        if (i == 3) {
          win.statictextPanel.statictext3 = win.statictextPanel.add("statictext", [10, 15 * ((i + 1)), 300, 35], "Edit copy " + ((i + 1)));
          win.statictextPanel.edittext3 = win.statictextPanel.add('edittext {properties: {name: "edittext3"}}', [10, 45 * ((i + 1)), 200, 65]);
          win.statictextPanel.edittext3.text = titleLayer[i].textItem.contents;
        }
        if (i == 4) {
          win.statictextPanel.statictext4 = win.statictextPanel.add("statictext", [10, 15 * ((i + 1)), 300, 35], "Edit copy " + ((i + 1)));
          win.statictextPanel.edittext4 = win.statictextPanel.add('edittext {properties: {name: "edittext4"}}', [10, 45 * ((i + 1)), 200, 65]);
          win.statictextPanel.edittext4.text = titleLayer[i].textItem.contents;
        }

        win.statictextPanel.SaveBtn = win.statictextPanel.add("button", [10, 15 * ((titleLayer.length + 16)), 200, 35], "Save ");

        win.statictextPanel.SaveBtn.onClick = function () {


          titleLayer[0].textItem.contents = win.statictextPanel.edittext0.text;
          titleLayer[1].textItem.contents = win.statictextPanel.edittext1.text;
          titleLayer[2].textItem.contents = win.statictextPanel.edittext2.text;
          titleLayer[3].textItem.contents = win.statictextPanel.edittext3.text;
          titleLayer[4].textItem.contents = win.statictextPanel.edittext4.text;

        }

      }


      // bounds = [left, top, right, bottom]
      win.btnPanel = win.add("panel", [25, 70 * (NoOfCopy) + 60, 285, 80 * (NoOfCopy) + 100],);
      win.btnPanel.orientation = "row";
      // Add the components, two buttons
      win.btnPanel.okBtn = win.btnPanel.add("button", [10, 15, 100, 35], "CONTINUE");
      win.btnPanel.cancelBtn = win.btnPanel.add("button", [150, 15, 220, 35], "CANCEL");

      win.btnPanel.okBtn.onClick = function () {
        win.close(1);
      }

      win.btnPanel.cancelBtn.onClick = function () {
        win.close(0);
      }

      if (win.show() == 1) {

        SelectCopy(titleGroup, docName, visibleArtboards[x]);
      }
    }
  }

  function SelectCopy(titleGroup, docName, fname) {
    // Add a panel
    var win = new Window("dialog", "Edit Copy", [150, 150, 560, 50 * titleGroup.layers.length + 310]);
    win.radioPanel = win.add("panel", [25, 25, 380, 330], "Select copy");

    var skipIndex = 0;

    for (var r = 0; r < (titleGroup.layers.length); r++) {
      if (titleGroup.layers[r].kind === LayerKind.TEXT) {
        if (r === 0) {
          win.radioPanel.r0 = win.radioPanel.add("radiobutton", [10, 15 + (r * 30), 300, 35 + (0 * 30)], titleGroup.layers[0]);
        }
        if (r === 1) {
          win.radioPanel.r1 = win.radioPanel.add("radiobutton", [10, 15 + (r * 30), 300, 35 + (1 * 30)], titleGroup.layers[1]);
        }
        if (r === 2) {
          win.radioPanel.r2 = win.radioPanel.add("radiobutton", [10, 15 + (r * 30), 300, 35 + (2 * 30)], titleGroup.layers[2]);
        }
        if (r === 3) {
          win.radioPanel.r3 = win.radioPanel.add("radiobutton", [10, 15 + (r * 30), 300, 35 + (3 * 30)], titleGroup.layers[3]);
        }
        if (r === 4) {
          win.radioPanel.r4 = win.radioPanel.add("radiobutton", [10, 15 + (r * 30), 0, 35 + (4 * 30)], titleGroup.layers[4]);
        }
      }
    }
    // bounds = [left, top, right, bottom]
    win.btnPanel = win.add("panel", [25, 430, 285, 480],);
    win.btnPanel.orientation = "row";
    // Add the components, two buttons
    win.btnPanel.okBtn = win.btnPanel.add("button", [10, 15, 100, 35], "CONTINUE");
    win.btnPanel.cancelBtn = win.btnPanel.add("button", [150, 15, 220, 35], "CANCEL");
    // Register event listeners that define the button behavior
    // Event listener for the radio buttons
    win.radioPanel.r0.onClick = win.radioPanel.r1.onClick = win.radioPanel.r2.onClick = win.radioPanel.r3.onClick = win.radioPanel.r4.onClick = function () {
      if (win.radioPanel.r0.value) {

        titleGroup.layers[0].visible = true;
        titleGroup.layers[1].visible = false;
        titleGroup.layers[2].visible = false;
        titleGroup.layers[3].visible = false;
      }
      else if (win.radioPanel.r1.value) {
        titleGroup.layers[0].visible = false;
        titleGroup.layers[1].visible = true;
        titleGroup.layers[2].visible = false;
        titleGroup.layers[3].visible = false;
      }
      else if (win.radioPanel.r2.value) {
        titleGroup.layers[0].visible = false;
        titleGroup.layers[1].visible = false;
        titleGroup.layers[2].visible = true;
        titleGroup.layers[3].visible = false;

      } else if (win.radioPanel.r3.value) {
        titleGroup.layers[0].visible = false;
        titleGroup.layers[1].visible = false;
        titleGroup.layers[2].visible = false;
        titleGroup.layers[3].visible = true;

      }

    }


    win.btnPanel.okBtn.onClick = function () {
      win.close(1);
    }

    win.btnPanel.cancelBtn.onClick = function () {
      win.close(0);
    }

    if (win.show() == 1) {
      Process(docName, fname);
    }

  }
  function Process(docName, fname) {

    if (fileType != undefined) {
      if (fileType == ".jpg") {
        var file = new File(f.fullName + '/' + fname + fileType);
        var opts = new JPEGSaveOptions();
        opts.quality = 10;
        docRef.saveAs(file, opts, true);
      } else if (fileType == ".png") {
        alert("png file not found");
      } else if (fileType == ".gif") {
        alert("gif file not found");
      }
    }

  }


})();









