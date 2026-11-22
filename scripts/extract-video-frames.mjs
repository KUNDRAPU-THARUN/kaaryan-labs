import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const videoPath = 'C:/Users/kthar/.gemini/antigravity/brain/9b132d6d-4e63-43f9-9a57-78a3b0dca652/.user_uploaded/media_1795344735230_b2416dbd.mp4';
const outDir = 'C:/Users/kthar/.gemini/antigravity/brain/9b132d6d-4e63-43f9-9a57-78a3b0dca652/scratch/video_frames';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  
  // Create a minimal HTML page that loads the video via file:// or data uri
  // Since Chrome blocks file:// URLs from http, we can read the file as base64 or serve via small http server or data URI
  const videoBuffer = fs.readFileSync(videoPath);
  const base64Video = videoBuffer.toString('base64');
  const dataUrl = `data:video/mp4;base64,${base64Video}`;

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <video id="v" src="${dataUrl}" playsinline muted></video>
        <canvas id="c"></canvas>
      </body>
    </html>
  `);

  const duration = await page.evaluate(async () => {
    const v = document.getElementById('v');
    return new Promise((resolve) => {
      v.onloadedmetadata = () => resolve(v.duration);
      v.load();
    });
  });

  console.log(`Video duration: ${duration}s`);
  const times = [0.0, 0.5, 1.0, 2.0, 3.5, 5.0, 7.0, 9.0, 11.0, 13.0, 15.0, 17.0];

  for (let i = 0; i < times.length; i++) {
    const targetTime = times[i];
    await page.evaluate(async (time) => {
      const v = document.getElementById('v');
      const c = document.getElementById('c');
      const ctx = c.getContext('2d');
      return new Promise((resolve) => {
        v.currentTime = time;
        v.onseeked = () => {
          c.width = v.videoWidth;
          c.height = v.videoHeight;
          ctx.drawImage(v, 0, 0);
          resolve(true);
        };
      });
    }, targetTime);

    const dataUrlFrame = await page.evaluate(() => {
      const c = document.getElementById('c');
      return c.toDataURL('image/jpeg', 0.85);
    });

    const base64Data = dataUrlFrame.replace(/^data:image\/jpeg;base64,/, '');
    const outPath = path.join(outDir, `frame_${String(i).padStart(2, '0')}_${targetTime}s.jpg`);
    fs.writeFileSync(outPath, Buffer.from(base64Data, 'base64'));
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
  console.log('Extraction complete!');
}

run().catch(console.error);
