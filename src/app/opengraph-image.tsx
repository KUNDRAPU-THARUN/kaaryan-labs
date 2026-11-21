import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Kaaryan Labs — Research-driven software products and custom solutions';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const [markData, geistRegular, geistBold] = await Promise.all([
  readFile(join(process.cwd(), 'public/brand/kaaryan-mark.png')),
  readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf')),
  readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf')),
]);
const markSource = `data:image/png;base64,${markData.toString('base64')}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      padding: 14,
      background: '#123b2d',
      fontFamily: 'Geist',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        border: '1px solid #dce5ea',
        background: 'linear-gradient(120deg, #ffffff 0%, #f7fafc 70%, #edf4f8 100%)',
      }}>
        <div style={{
          position: 'absolute',
          right: -110,
          top: -210,
          width: 500,
          height: 500,
          border: '1px solid #e1eaf0',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute',
          right: -55,
          top: -155,
          width: 390,
          height: 390,
          border: '1px solid #e8eef2',
          borderRadius: '50%',
        }} />
        <div style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '38px 54px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 680, height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={markSource} style={{ width: 45, height: 45 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: 1.1, color: '#111827' }}>KAARYAN LABS</div>
                <div style={{ fontSize: 7, fontWeight: 500, letterSpacing: 2.2, color: '#7b8794', marginTop: 3 }}>FROM PROBLEM TO POSSIBILITY</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 72 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#63748a', marginBottom: 16 }}>RESEARCH-DRIVEN SOFTWARE COMPANY</div>
              <div style={{ fontSize: 51, fontWeight: 800, lineHeight: 0.98, letterSpacing: -1.6, color: '#10151d' }}>FROM PROBLEM</div>
              <div style={{ display: 'flex', fontSize: 51, fontWeight: 800, lineHeight: 1.02, letterSpacing: -1.6, color: '#10151d' }}>
                <span>TO&nbsp;</span><span style={{ color: '#3187f5' }}>POSSIBILITY</span>
              </div>
              <div style={{ fontSize: 17, color: '#536273', marginTop: 16 }}>Digital products &amp; custom software solutions</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', fontSize: 9, color: '#667588' }}>
              <span>Research first. Purposeful software.</span>
              <span>kaaryanlabs.in</span>
            </div>
          </div>
          <div style={{
            width: 228,
            height: 228,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            border: '1px solid #e2e8ee',
            borderRadius: 26,
            boxShadow: '0 18px 38px rgba(35, 53, 78, 0.12)',
          }}>
            <img src={markSource} style={{ width: 158, height: 158 }} />
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geistRegular, style: 'normal', weight: 400 },
        { name: 'Geist', data: geistBold, style: 'normal', weight: 700 },
      ],
    },
  );
}
