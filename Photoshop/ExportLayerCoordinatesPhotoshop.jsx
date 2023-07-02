// Export Layer Coordinates - Adobe Photoshop Script
// Description: Export x and y coordinates to comma seperated .txt file
// Requirements: Adobe Photoshop CS5 (have not tested on CS4)
// Version: 1.0-beta1.1, 8/31/2011
// Author: Chris DeLuca
// Company: Playmatics
// ===============================================================================
// Installation:
// 1. Place script in
//        Mac: '~/Applications/Adobe Photoshop CS#/Presets/Scripts/'
//        Win: 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\'
// 2. Restart Photoshop
// 3. Choose File > Scripts > Export Layer Coordinates Photoshop
// ===============================================================================

// Enables double-click launching from the Mac Finder or Windows Explorer
#target photoshop

// Bring application forward
app.bringToFront();

// Set active Document variable and decode name for output
var docRef = app.activeDocument;
var docName = decodeURI(activeDocument.name);

(function() {
  var artboards = docRef.layers;

var visibleArtboards = [];
for (var i=0; i< artboards.length; i++)
{
    if(artboards[i].visible)
    {
      visibleArtboards.push(artboards[i].name);
    }
}
  var  f;
  var fileType;
  var win = new Window("dialog", "CMDBANNER.IO EXPORT OPTIONS", [150, 150, 460, 650]);
   
  var NoOfCopy = 0;

  // Add a panel
	win.radioPanel = win.add("panel", [25, 105, 285, 230], "Export Options");
	win.statictextPanel = win.add("panel", [25, 250, 285, 395], "Edit Text Group");
 

	// Add checkboxes.contents
	win.statictextPanel.statictextOne = win.statictextPanel.add("statictext", [10, 15, 300, 35], "Edit copy");

  win.statictextPanel.edittext = win.statictextPanel.add('edittext {properties: {name: "edittext"}}', [10, 45, 200, 65] ); 
  win.statictextPanel.edittext.text = NoOfCopy; 


	// Add radio buttons
	win.radioPanel.radOne = win.radioPanel.add("radiobutton", [10, 15, 300, 35], "PNG");
	win.radioPanel.radTwo = win.radioPanel.add("radiobutton", [10, 45, 300, 65], "GIF");
	win.radioPanel.radThree = win.radioPanel.add("radiobutton", [10, 75, 300, 95], "JPG");

  win.folderPanel = win.add("panel", [25, 15, 285, 90], "Save to");
  win.folderPanel.orientation = "row";
    // select folder
    win.folderPanel.btnFolderInput = win.folderPanel.add("button",[10, 15, 100, 35], "folder...");
    win.folderPanel.txtFolderInput = win.folderPanel.add("statictext",[100, 15, 220, 35], "", {
      truncate: "middle"
    });

	// bounds = [left, top, right, bottom]
  win.btnPanel = win.add("panel", [25, 430, 285, 480], );
	win.btnPanel.orientation = "row";
	// Add the components, two buttons
	win.btnPanel.okBtn = win.btnPanel.add("button", [10, 15, 100, 35], "CONTINUE");
	win.btnPanel.cancelBtn = win.btnPanel.add("button", [150, 15, 220, 35], "CANCEL");
	// Register event listeners that define the button behavior
  	// Event listener for the radio buttons
	win.radioPanel.radOne.onClick = win.radioPanel.radTwo.onClick = win.radioPanel.radThree.onClick = function () {
		var selected = "";

		if(win.radioPanel.radOne.value) {
			selected = "PNG";
			fileType = ".png";
		}
		else if(win.radioPanel.radTwo.value) {
			selected = "GIF";
			fileType = ".gif";
		}
		else if(win.radioPanel.radThree.value) {
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

	if(win.show() == 1) {
    ProcessNoOfCopy(win.statictextPanel.edittext.text);
  }

  function ProcessNoOfCopy(NoOfCopy) { 
    var  f;
    var fileType;
    for ( var x = 0; x < visibleArtboards.length; x++ ) {

      var win = new Window("dialog", "Edit Copy", [150, 150, 460, 70*NoOfCopy+310]);
      
      //Changing text
      var visibleArtboard = docRef.layerSets.getByName(visibleArtboards[x]);
      var titleGroup = visibleArtboard.layers.getByName("TXT");

      // Add a panel
      win.statictextPanel = win.add("panel", [25, 25, 285, 60*(NoOfCopy)+60], "Edit copy");

      var titleLayer = [];
      var copyContent = [];
      
      for(var i=0; i<NoOfCopy;i++) {

        titleLayer[i] = titleGroup.layers[i];
        copyContent[i] = titleLayer[i].textItem.contents;


        if (i == 0) {
          win.statictextPanel.statictext0 = win.statictextPanel.add("statictext", [10, 15*(i+1), 300, 35], "Edit copy "+(i+1));
          win.statictextPanel.edittext0 = win.statictextPanel.add('edittext {properties: {name: "edittext0"}}', [10, 45*(1+i), 200, 65] ); 
          win.statictextPanel.edittext0.text = copyContent[i]; 
          titleLayer[i].textItem.contents = win.statictextPanel.edittext0.text;
        }
        if (i == 1) {
          win.statictextPanel.statictext1 = win.statictextPanel.add("statictext", [10, 15*(i+1), 300, 35], "Edit copy "+(i+1));
          win.statictextPanel.edittext1 = win.statictextPanel.add('edittext {properties: {name: "edittext1"}}', [10, 45*(1+i), 200, 65] ); 
          win.statictextPanel.edittext1.text = copyContent[i]; 
          titleLayer[i].textItem.contents = win.statictextPanel.edittext1.text;
        }
        if (i == 2) {
          win.statictextPanel.statictext2 = win.statictextPanel.add("statictext", [10, 15*(i+1), 300, 35], "Edit copy "+(i+1));
          win.statictextPanel.edittext2 = win.statictextPanel.add('edittext {properties: {name: "edittext2"}}', [10, 45*(1+i), 200, 65] ); 
          win.statictextPanel.edittext2.text = copyContent[i]; 
          titleLayer[i].textItem.contents = win.statictextPanel.edittext2.text;
        }
        if (i == 3) {
          win.statictextPanel.statictext3 = win.statictextPanel.add("statictext", [10, 15*(i+1), 300, 35], "Edit copy "+(i+1));
          win.statictextPanel.edittext3 = win.statictextPanel.add('edittext {properties: {name: "edittext3"}}', [10, 45*(1+i), 200, 65] ); 
          win.statictextPanel.edittext3.text = copyContent[i]; 
          titleLayer[i].textItem.contents = win.statictextPanel.edittext3.text;
        }
        if (i == 4) {
          win.statictextPanel.statictext4 = win.statictextPanel.add("statictext", [10, 15*(i+1), 300, 35], "Edit copy "+(i+1));
          win.statictextPanel.edittext4 = win.statictextPanel.add('edittext {properties: {name: "edittext4"}}', [10, 45*(1+i), 200, 65] ); 
          win.statictextPanel.edittext4.text = copyContent[i]; 
          titleLayer[i].textItem.contents = win.statictextPanel.edittext4.text;
        }
        if (i == 5) {
          win.statictextPanel.statictext5 = win.statictextPanel.add("statictext", [10, 15*(i+1), 300, 35], "Edit copy "+(i+1));
          win.statictextPanel.edittext5 = win.statictextPanel.add('edittext {properties: {name: "edittext5"}}', [10, 45*(1+i), 200, 65] ); 
          win.statictextPanel.edittext5.text = copyContent[i]; 
          titleLayer[i].textItem.contents = win.statictextPanel.edittext5.text;
        }
        if (i == 6) {
          win.statictextPanel.statictext6 = win.statictextPanel.add("statictext", [10, 15*(i+1), 300, 35], "Edit copy "+(i+1));
          win.statictextPanel.edittext6 = win.statictextPanel.add('edittext {properties: {name: "edittext6"}}', [10, 45*(1+i), 200, 65] ); 
          win.statictextPanel.edittext6.text = copyContent[i]; 
          titleLayer[i].textItem.contents = win.statictextPanel.edittext6.text;
        }
      }
    
      // bounds = [left, top, right, bottom]
      win.btnPanel = win.add("panel", [25, 70*NoOfCopy+60, 285, 80*NoOfCopy+100], );
      win.btnPanel.orientation = "row";
      // Add the components, two buttons
      win.btnPanel.okBtn = win.btnPanel.add("button", [10, 15, 100, 35], "CONTINUE");
      win.btnPanel.cancelBtn = win.btnPanel.add("button", [150, 15, 220, 35], "CANCEL");
      // Register event listeners that define the button behavior
        // Event listener for the radio buttons
    
      win.btnPanel.okBtn.onClick = function () {
        win.close(1);
      }
    
      win.btnPanel.cancelBtn.onClick = function () {
        win.close(0);
      }
    
      if(win.show() == 1) {
        Process(docName,visibleArtboards[x]);
      }
    }
  }

  function Process(docName,fname) {
    
    
    exportOutput(docName,fname)
      
  }

  // Output
  function exportOutput(docName,fname) {
    if(fileType != undefined){
      if(fileType == ".jpg"){
      
         // var docExportOptions = new ExportOptionsSaveForWeb;
        //  var destFile = new File(f.fullName  + fname + ".jpg");
         // app.activeDocument.saveAs (destFile, docExportOptions, true, Extension.LOWERCASE);
        

        var file = new File(f.fullName + '/' + docName + fileType);
        var opts = new JPEGSaveOptions();
        opts.quality = 10;
        docRef.saveAs(file, opts,true);
      }else if( fileType == ".png" ){
        alert("png file not found");
      }else if( fileType == ".gif"){
        alert("gif file not found");
      }
  }
}

})();









