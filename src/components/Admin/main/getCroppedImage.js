
const getCroppedImage = (image, crop, fileName) => {
  const {width, height} = image
  const cropWidth = crop.width/100 * width;
  const cropHeight = crop.height /100 * height;
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / width;
  const scaleY = image.naturalHeight / height;
  canvas.width = cropWidth
  canvas.height = cropHeight
  const ctx = canvas.getContext("2d");

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = cropWidth * pixelRatio;
  canvas.height = cropHeight * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    cropWidth * scaleX,
    cropHeight * scaleY,
    0,
    0,
    cropWidth,
    cropHeight
  );

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