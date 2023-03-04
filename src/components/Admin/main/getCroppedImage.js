
const getCroppedImage = (image, crop, fileName, scale=1, rotate=0) => {
  const {width, height} = image
  // const cropWidth = crop.width/100 * width;
  // const cropHeight = crop.height /100 * height;
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / width;
  const scaleY = image.naturalHeight / height;
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext("2d");

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  // canvas.width = cropWidth * pixelRatio;
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  // canvas.height = cropHeight * pixelRatio;
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  // ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.scale(pixelRatio,pixelRatio)
  ctx.imageSmoothingQuality = "high";
  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * Math.PI/180
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()
  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)

  // ctx.drawImage(
  //   image,
  //   crop.x * scaleX,
  //   crop.y * scaleY,
  //   cropWidth * scaleX,
  //   cropHeight * scaleY,
  //   0,
  //   0,
  //   cropWidth,
  //   cropHeight
  // );
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
  // As Base64 string
  // const base64Image = canvas.toDataURL("image/jpeg");
  // return base64Image;

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
}
  

export default getCroppedImage