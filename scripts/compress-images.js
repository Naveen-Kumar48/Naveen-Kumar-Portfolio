const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagePath = path.join(__dirname, '../public/about_tech.webp');
const backupPath = path.join(__dirname, '../public/about_tech_original.webp');

async function compressImage() {
  try {
    if (!fs.existsSync(imagePath)) {
      console.error('Image not found:', imagePath);
      return;
    }

    const statsBefore = fs.statSync(imagePath);
    console.log(`Original size: ${(statsBefore.size / 1024 / 1024).toFixed(2)} MB`);

    // Backup original if not already backed up
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(imagePath, backupPath);
      console.log('Original image backed up to public/about_tech_original.webp');
    }

    // Compress
    await sharp(backupPath)
      .resize({ width: 1000, withoutEnlargement: true }) // resize to width 1000 max
      .webp({ quality: 80, effort: 6 })
      .toFile(imagePath + '.tmp');

    // Swap files
    fs.unlinkSync(imagePath);
    fs.renameSync(imagePath + '.tmp', imagePath);

    const statsAfter = fs.statSync(imagePath);
    console.log(`Compressed size: ${(statsAfter.size / 1024).toFixed(2)} KB`);
    console.log(`Reduction: ${((1 - statsAfter.size / statsBefore.size) * 100).toFixed(2)}%`);
  } catch (error) {
    console.error('Error compressing image:', error);
  }
}

compressImage();
