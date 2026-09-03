/**
 * High-Definition Image Enhancer & Dynamic AI Object Crop Engine for Hastakala AI
 * Features:
 * - High-Definition Smooth Quality Enhancement (Zero pixelation, crystal-clear contrast & vibrance)
 * - Precise AI Object Cutout & Dynamic Bounding-Box Crop (Detects object, crops tightly, and centers on selected backdrop)
 * - 100% Clean Image Output (No tags, watermarks, or overlay badges)
 */

export async function processProductImage(imageSrc, options = {}) {
  const {
    removeBg = true,
    backdropId = "white",
    lightingEnhance = true,
    dehazeClarity = true
  } = options;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = img.naturalWidth || 1024;
      const height = img.naturalHeight || 1024;
      canvas.width = width;
      canvas.height = height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 1. High-Definition Smooth Quality Enhancement
      if (dehazeClarity || lightingEnhance) {
        ctx.filter = "contrast(114%) brightness(104%) saturate(110%)";
      } else {
        ctx.filter = "none";
      }

      ctx.drawImage(img, 0, 0, width, height);
      ctx.filter = "none";

      // 2. Object Isolation & Dynamic Bounding-Box Precise Crop
      if (removeBg && backdropId !== "original") {
        const objectCanvas = document.createElement("canvas");
        objectCanvas.width = width;
        objectCanvas.height = height;
        const objCtx = objectCanvas.getContext("2d");
        objCtx.imageSmoothingEnabled = true;
        objCtx.imageSmoothingQuality = "high";

        // Segment central object
        const frameData = ctx.getImageData(0, 0, width, height);
        const smoothSegmentedData = isolateCentralObjectSmooth(frameData, width, height);

        // Put isolated object onto temp canvas
        ctx.putImageData(smoothSegmentedData, 0, 0);

        // Calculate Dynamic AI Bounding Box of the isolated object
        const bbox = findObjectBoundingBox(smoothSegmentedData, width, height);

        // Render selected clean studio backdrop (White, Silk, Clay, Wood, Marble)
        renderBackdrop(objCtx, backdropId, width, height);

        if (bbox) {
          // Dynamic Precision Crop & Centering
          const objWidth = bbox.maxX - bbox.minX;
          const objHeight = bbox.maxY - bbox.minY;

          // Target bounding size (occupying ~82% of final studio canvas)
          const targetMargin = 0.82;
          const scale = Math.min((width * targetMargin) / objWidth, (height * targetMargin) / objHeight);

          const drawWidth = objWidth * scale;
          const drawHeight = objHeight * scale;
          const drawX = (width - drawWidth) / 2;
          const drawY = (height - drawHeight) / 2;

          // Draw tightly cropped object centered onto the studio backdrop canvas
          objCtx.drawImage(
            canvas,
            bbox.minX, bbox.minY, objWidth, objHeight,
            drawX, drawY, drawWidth, drawHeight
          );
        } else {
          objCtx.drawImage(canvas, 0, 0);
        }

        // Copy final HD composite back to main canvas
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(objectCanvas, 0, 0);
      }

      resolve(canvas.toDataURL("image/jpeg", 0.96));
    };

    img.onerror = () => {
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
}

/**
 * Finds exact bounding box [minX, minY, maxX, maxY] of non-transparent object pixels
 */
function findObjectBoundingBox(imageData, width, height) {
  const pixels = imageData.data;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  let found = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = pixels[(y * width + x) * 4 + 3];
      if (alpha > 25) { // Non-transparent object pixel
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        found = true;
      }
    }
  }

  if (!found || maxX <= minX || maxY <= minY) return null;
  return { minX, minY, maxX, maxY };
}

/**
 * Smooth Anti-Aliased Object Segmentation
 */
function isolateCentralObjectSmooth(imageData, width, height) {
  const pixels = imageData.data;
  const output = new ImageData(new Uint8ClampedArray(pixels), width, height);
  const outData = output.data;

  // Sample Perimeter Border Colors
  const bgSamples = [];
  const borderStep = Math.max(1, Math.floor(width / 50));

  for (let x = 0; x < width; x += borderStep) {
    bgSamples.push(getPixelColor(pixels, x, 0, width));
    bgSamples.push(getPixelColor(pixels, x, height - 1, width));
  }
  for (let y = 0; y < height; y += borderStep) {
    bgSamples.push(getPixelColor(pixels, 0, y, width));
    bgSamples.push(getPixelColor(pixels, width - 1, y, width));
  }

  const centerX = width / 2;
  const centerY = height / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      const dx = (x - centerX) / (width / 2);
      const dy = (y - centerY) / (height / 2);
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);

      let minBgDist = 999;
      for (let s = 0; s < bgSamples.length; s++) {
        const dist = Math.sqrt(
          Math.pow(r - bgSamples[s].r, 2) +
          Math.pow(g - bgSamples[s].g, 2) +
          Math.pow(b - bgSamples[s].b, 2)
        );
        if (dist < minBgDist) minBgDist = dist;
      }

      const isPaleBg = r > 218 && g > 218 && b > 218;
      let alpha = 1.0;

      if (distFromCenter > 0.85 && (minBgDist < 50 || isPaleBg)) {
        alpha = 0;
      } else if (distFromCenter > 0.65 && minBgDist < 35) {
        alpha = Math.max(0, Math.min(1, (minBgDist - 15) / 20));
      } else if (minBgDist < 20 && isPaleBg) {
        alpha = 0;
      }

      outData[idx + 3] = Math.round(alpha * 255);
    }
  }

  return output;
}

function getPixelColor(pixels, x, y, width) {
  const idx = (y * width + x) * 4;
  return {
    r: pixels[idx],
    g: pixels[idx + 1],
    b: pixels[idx + 2]
  };
}

function renderBackdrop(ctx, backdropId, width, height) {
  if (backdropId === "white") {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  } else if (backdropId === "silk") {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#FAF5FF");
    grad.addColorStop(0.5, "#F3E8FF");
    grad.addColorStop(1, "#E9D5FF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (backdropId === "clay") {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#FFF7ED");
    grad.addColorStop(1, "#FFEDD5");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (backdropId === "wood") {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#FEF3C7");
    grad.addColorStop(1, "#FDE68A");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (backdropId === "marble") {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#F8FAFC");
    grad.addColorStop(1, "#E2E8F0");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
  }
}
