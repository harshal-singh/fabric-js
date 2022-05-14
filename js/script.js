"use strict";

(function () {
  const canvas = new fabric.Canvas("canvas");
  const addImage = document.getElementById("add-image-button");
  const fileInput = document.getElementById("image-file-input");

  addImage.onclick = () => {
    fileInput.click();
  };

  fileInput.onchange = (e) => {
    // remove old objects
    canvas.clear();
    // create image url for selected file
    const imageURL = URL.createObjectURL(fileInput.files[0]);
    fabric.Image.fromURL(imageURL, function (image) {
      if (image.width > image.height * (16 / 9)) {
        image.scaleToWidth(canvas.width);
      } else {
        image.scaleToHeight(canvas.height);
      }

      // center the image
      canvas.centerObject(image);

      image.set({
        selectable: false,
        hoverCursor: "crosshair",
      });

      // resetting viewport
      canvas.viewportTransform = [1, 0, 0, 1, 1, 1];
      // resetting zoom to 1
      canvas.setZoom(1);
      canvas.add(image);
    });
  };

  canvas.on("mouse:wheel", function (opt) {
    // getting scroll of wheel in Y direction, can be +ve or -ve;
    const delta = opt.e.deltaY;
    // get current zoom size compare to actual size of image
    let zoom = canvas.getZoom();
    // calculate zoom level depending on zoom and wheel scroll
    zoom *= 0.999 ** delta;
    // max zoom in level
    if (zoom > 20) zoom = 20;
    // max zoom out level
    if (zoom < 1) {
      zoom = 1;
      canvas.viewportTransform = [1, 0, 0, 1, 1, 1];
    }

    // set zoom with respect to cursor position & value to set zoom
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
})();
