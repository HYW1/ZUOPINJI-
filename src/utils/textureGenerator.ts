import * as THREE from 'three';
import { DeskWoodStyle } from '../types';

/**
 * Procedural Canvas Texture Generator for realistic Materials
 */

// 1. Procedural Wood Grain Texture
export function createWoodTexture(style: DeskWoodStyle = 'natural_oak'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  let baseColor = '#C29B72';
  let grainColor = '#8D6843';
  let ringColor = '#6A4A2D';

  if (style === 'dark_walnut') {
    baseColor = '#4A3326';
    grainColor = '#2F1E15';
    ringColor = '#1F120C';
  } else if (style === 'light_birch') {
    baseColor = '#E3CEB1';
    grainColor = '#C1A784';
    ringColor = '#A18765';
  } else if (style === 'muji_hinoki') {
    baseColor = '#D8C2A0';
    grainColor = '#B89B73';
    ringColor = '#977A55';
  }

  // Base fill
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 1024, 1024);

  // Draw wood rings and fibers
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.15;

  for (let i = 0; i < 600; i++) {
    const y = Math.random() * 1024;
    ctx.strokeStyle = Math.random() > 0.5 ? grainColor : ringColor;
    ctx.beginPath();
    ctx.moveTo(0, y);
    
    let currentY = y;
    for (let x = 0; x < 1024; x += 20) {
      currentY += (Math.random() - 0.5) * 3;
      ctx.lineTo(x, currentY);
    }
    ctx.stroke();
  }

  // Draw organic wood grain waves / rings
  ctx.globalAlpha = 0.08;
  const numRings = 12;
  const centerX = 512 + (Math.random() - 0.5) * 400;
  const centerY = -1000;

  for (let r = 200; r < 2400; r += 20 + Math.random() * 30) {
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 2 + Math.random() * 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Add subtle noise texture
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  return texture;
}

// 2. Procedural Paper Texture with Dynamic Typewriter Text
export function createPaperCanvasTexture(
  text: string,
  width = 1024,
  height = 1024,
  showCursor = false
): { texture: THREE.CanvasTexture; canvas: HTMLCanvasElement } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Warm cream paper background
  ctx.fillStyle = '#FAF7EE';
  ctx.fillRect(0, 0, width, height);

  // Soft paper fiber noise
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Subtle paper watermark border
  ctx.strokeStyle = 'rgba(180, 170, 150, 0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Typewriter Text Rendering
  ctx.fillStyle = '#222224'; // Vintage typewriter ribbon ink black/dark charcoal
  ctx.font = '36px "Courier New", Courier, monospace';
  ctx.textBaseline = 'top';

  const startX = 80;
  const startY = 120;
  const lineHeight = 54;
  const maxLineWidth = width - 160;

  const lines = text.split('\n');
  let currentY = startY;

  lines.forEach((line) => {
    // Word wrapping
    const words = line.split(' ');
    let currentLineText = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLineText + (currentLineText ? ' ' : '') + words[i];
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxLineWidth && i > 0) {
        // Draw current line with subtle organic typewriter ink offset
        drawTypewriterLine(ctx, currentLineText, startX, currentY);
        currentY += lineHeight;
        currentLineText = words[i];
      } else {
        currentLineText = testLine;
      }
    }

    if (currentLineText) {
      drawTypewriterLine(ctx, currentLineText, startX, currentY);
      currentY += lineHeight;
    }
  });

  // Optional blinking cursor indicator
  if (showCursor) {
    ctx.fillStyle = '#D9534F'; // Soft red ribbon mark
    ctx.fillRect(startX + (lines[lines.length - 1]?.length || 0) * 22, currentY - lineHeight + 8, 14, 32);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return { texture, canvas };
}

// Helper to draw realistic typewriter text with ink texture and slight micro-offsets
function drawTypewriterLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
) {
  let charX = x;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    // Organic mechanical imperfections
    const offsetY = (Math.sin(i * 3.7) * 0.8) + (Math.random() - 0.5) * 0.6;
    const alpha = 0.85 + Math.random() * 0.15; // Varying ribbon ink intensity

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillText(char, charX, y + offsetY);
    ctx.restore();

    charX += 22; // Fixed pitch character width
  }
}

// 3. Wall Picture Frame Art Generator
export function createWallArtTexture(style: 'fuji' | 'kanji' | 'botanical' | 'minimalist'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Warm Washi paper background
  ctx.fillStyle = '#F5F2E9';
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft frame border / matting
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(80, 80, 864, 864);
  ctx.strokeStyle = '#D1C7B7';
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 80, 864, 864);

  if (style === 'fuji') {
    // Mt Fuji Japanese landscape
    ctx.save();
    ctx.translate(512, 512);

    // Red Sun
    ctx.fillStyle = '#D9534F';
    ctx.beginPath();
    ctx.arc(0, -100, 120, 0, Math.PI * 2);
    ctx.fill();

    // Fuji Silhouette
    ctx.fillStyle = '#2B3A42';
    ctx.beginPath();
    ctx.moveTo(-280, 260);
    ctx.lineTo(-60, -40);
    ctx.lineTo(60, -40);
    ctx.lineTo(280, 260);
    ctx.closePath();
    ctx.fill();

    // Snow cap
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(-60, -40);
    ctx.lineTo(0, -40);
    ctx.lineTo(60, -40);
    ctx.lineTo(120, 50);
    ctx.lineTo(40, 30);
    ctx.lineTo(0, 50);
    ctx.lineTo(-40, 20);
    ctx.lineTo(-120, 50);
    ctx.closePath();
    ctx.fill();

    // Golden sun horizon line
    ctx.strokeStyle = '#E2B150';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-320, 260);
    ctx.lineTo(320, 260);
    ctx.stroke();

    ctx.restore();
  } else if (style === 'kanji') {
    // Calligraphy "静 寂" (Serenity)
    ctx.fillStyle = '#222224';
    ctx.font = 'bold 220px "Hiragino Mincho ProN", "Yu Mincho", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('静寂', 512, 480);

    // Red seal stamp (Hanko)
    ctx.fillStyle = '#C0392B';
    ctx.fillRect(660, 620, 70, 70);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px serif';
    ctx.fillText('和', 695, 655);

    ctx.fillStyle = '#7F8C8D';
    ctx.font = '28px serif';
    ctx.fillText('SERENITY IN STILLNESS', 512, 740);
  } else if (style === 'botanical') {
    // Minimalist Ginkgo Leaves Line Art
    ctx.save();
    ctx.translate(512, 512);

    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-100, 250);
    ctx.quadraticCurveTo(0, 0, 150, -200);
    ctx.stroke();

    // Ginkgo Fan Leaves
    const leafColors = ['#D4AC0D', '#C0392B', '#27AE60', '#E67E22'];
    [
      { x: 50, y: -80, scale: 1, color: leafColors[0] },
      { x: 120, y: -160, scale: 0.8, color: leafColors[1] },
      { x: -20, y: 30, scale: 1.1, color: leafColors[2] },
      { x: -70, y: 140, scale: 0.9, color: leafColors[3] },
    ].forEach((leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.fillStyle = leaf.color;
      ctx.beginPath();
      ctx.arc(0, 0, 60 * leaf.scale, Math.PI * 0.8, Math.PI * 2.2);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });

    ctx.restore();
  } else {
    // Minimalist Japandi Geometry
    ctx.fillStyle = '#D35400';
    ctx.beginPath();
    ctx.arc(420, 420, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#2C3E50';
    ctx.fillRect(480, 360, 220, 320);

    ctx.fillStyle = '#F39C12';
    ctx.beginPath();
    ctx.arc(380, 640, 120, Math.PI, 0);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// 4. Corkboard Bulletin Texture
export function createCorkboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#B8860B';
  ctx.fillRect(0, 0, 512, 512);

  // Cork speckles
  for (let i = 0; i < 8000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.5 ? '#8B5A2B' : '#D2B48C';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.needsUpdate = true;
  return texture;
}
