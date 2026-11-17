import React, { useState, useEffect, useRef } from 'react';
import { Mic, Sparkles, Volume2, Brain, Info, X, Cpu, AlertCircle, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// Precision-calibrated normalized landmarks for public/images/aira-companion.jpg (896x1200)
const AIRA_LANDMARKS = {
  src: '/images/aira-companion.jpg',
  leftBrow: { x: 0.432, y: 0.212, rx: 0.042, ry: 0.017 },
  rightBrow: { x: 0.568, y: 0.211, rx: 0.042, ry: 0.017 },
  leftEye: {
    x: 0.438,
    y: 0.241,
    rx: 0.029,
    ry: 0.0115,
    lidTopRgb: [178, 136, 111],
    lidCreaseRgb: [142, 101, 81]
  },
  rightEye: {
    x: 0.562,
    y: 0.24,
    rx: 0.029,
    ry: 0.0115,
    lidTopRgb: [161, 117, 92],
    lidCreaseRgb: [115, 80, 61]
  },
  leftCheek: { x: 0.398, y: 0.304, rx: 0.045, ry: 0.032 },
  rightCheek: { x: 0.602, y: 0.303, rx: 0.045, ry: 0.032 },
  mouth: {
    x: 0.5,
    y: 0.335,
    halfWidth: 0.056,
    chinEndY: 0.405,
    lipRgb: [185, 120, 116],
    upperRimRgb: [166, 98, 94],
    lowerRimRgb: [194, 127, 122],
    leftCorner: { x: 0.447, y: 0.334 },
    rightCorner: { x: 0.553, y: 0.334 }
  },
  leftHand: { x: 0.323, y: 0.843, rx: 0.095, ry: 0.075 },
  rightHand: { x: 0.673, y: 0.816, rx: 0.095, ry: 0.075 }
};

function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}

/**
 * AIRA — Semi-Realistic 3D Female Digital Human Companion Stage.
 * Uses retina-sharp, artifact-free Canvas 2D compositing with:
 * - Natural torso breathing, head tilt/nods & attentive leaning
 * - Continuous random + natural double-blinking
 * - Dynamic corneal eye gaze tracking
 * - Speech-synchronized multi-viseme lip-sync & jaw motion
 * - Subtle conversational hand gesture cadence while speaking
 * - Flexible providerComponent hook for external cloud 3D video streaming
 */
let cachedAiraPortrait = null;
function getOrCreateAiraPortrait() {
  if (typeof window === 'undefined') return null;
  if (!cachedAiraPortrait) {
    cachedAiraPortrait = new Image();
    cachedAiraPortrait.crossOrigin = 'anonymous';
    cachedAiraPortrait.src = AIRA_LANDMARKS.src;
  }
  return cachedAiraPortrait;
}
if (typeof window !== 'undefined') {
  getOrCreateAiraPortrait();
}

export const CompanionAvatar = ({
  state = 'idle', // 'idle' | 'listening' | 'processing' | 'thinking' | 'speaking' | 'happy' | 'empathetic' | 'error'
  emotion = 'warm', // 'warm' | 'curious' | 'encouraging' | 'clarifying' | 'thoughtful' | 'serious' | 'happy' | 'excited' | 'empathetic' | 'confused'
  viseme = { openness: 0, width: 0, roundness: 0, shape: 'closed', gestureBeat: 0 },
  micLevel = 0,
  isMuted = false,
  voiceInfo = null,
  onSpeakReply = null,
  providerComponent = null
}) => {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const portraitImgRef = useRef(null);
  const [imageReady, setImageReady] = useState(() => {
    const cached = getOrCreateAiraPortrait();
    return Boolean(cached && cached.complete && cached.naturalWidth > 0);
  });
  const [showTechInfo, setShowTechInfo] = useState(false);
  const { isDark } = useTheme();

  const livePropsRef = useRef({ state, emotion, viseme, micLevel, isMuted, isDark });
  livePropsRef.current = { state, emotion, viseme, micLevel, isMuted, isDark };

  const pointerRef = useRef({ targetX: 0, targetY: 0, smoothX: 0, smoothY: 0 });

  const animRef = useRef({
    smoothOpen: 0,
    smoothWidth: 0,
    smoothBeat: 0,
    smoothMic: 0,
    smoothScale: 1,
    smoothTilt: 0,
    smoothShiftX: 0,
    smoothShiftY: 0,
    leftHandShiftY: 0,
    rightHandShiftY: 0,
    blinkProgress: 0,
    isBlinking: false,
    pendingDoubleBlink: false,
    nextBlinkAt: Date.now() + 2000,
    blinkStartedAt: 0,
    gazeTargetX: 0,
    gazeTargetY: 0,
    gazeX: 0,
    gazeY: 0,
    nextGazeShiftAt: Date.now() + 2300,
    leftBrowY: 0,
    rightBrowY: 0,
    smileLift: 0.4,
    cheekWarmth: 0.35,
    eyeBrightness: 1.0
  });

  // Preload high-res 3D human render of AIRA with retry & persistent caching
  useEffect(() => {
    let active = true;
    const img = getOrCreateAiraPortrait();
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      portraitImgRef.current = img;
      setImageReady(true);
      return;
    }

    const handleLoad = () => {
      if (!active) return;
      portraitImgRef.current = img;
      setImageReady(true);
    };

    const handleError = () => {
      console.warn('[AIRA] Retrying avatar portrait loading...');
      setTimeout(() => {
        if (!active) return;
        const retry = new Image();
        retry.crossOrigin = 'anonymous';
        retry.src = `${AIRA_LANDMARKS.src}?retry=${Date.now()}`;
        retry.onload = () => {
          if (!active) return;
          cachedAiraPortrait = retry;
          portraitImgRef.current = retry;
          setImageReady(true);
        };
      }, 350);
    };

    img.addEventListener('load', handleLoad, { once: true });
    img.addEventListener('error', handleError, { once: true });

    return () => {
      active = false;
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, []);

  // Main 60fps Studio Animation Loop
  useEffect(() => {
    if (providerComponent) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = null;

    const handlePointerMove = (e) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerRef.current.targetX = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      pointerRef.current.targetY = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    };

    const handlePointerLeave = () => {
      pointerRef.current.targetX = 0;
      pointerRef.current.targetY = 0;
    };

    const stageEl = stageRef.current;
    stageEl?.addEventListener('pointermove', handlePointerMove, { passive: true });
    stageEl?.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    const renderFrame = (timeMs) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssWidth = canvas.clientWidth || 680;
      const cssHeight = canvas.clientHeight || 520;

      if (canvas.width !== Math.round(cssWidth * dpr) || canvas.height !== Math.round(cssHeight * dpr)) {
        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);
      }

      const a = animRef.current;
      const p = pointerRef.current;
      const { state: st, emotion: emo, viseme: vis, micLevel: mic, isDark: dark } = livePropsRef.current;
      const now = Date.now();
      const t = timeMs / 1000;

      // 1. Pointer awareness
      p.smoothX += (p.targetX - p.smoothX) * 0.08;
      p.smoothY += (p.targetY - p.smoothY) * 0.08;

      // 2. Natural blinking with occasional double-blink
      if (!a.isBlinking && now >= a.nextBlinkAt) {
        a.isBlinking = true;
        a.blinkStartedAt = now;
        if (!a.pendingDoubleBlink && Math.random() < 0.14) {
          a.pendingDoubleBlink = true;
        }
      }
      if (a.isBlinking) {
        const elapsed = now - a.blinkStartedAt;
        const duration = 155;
        if (elapsed >= duration) {
          a.isBlinking = false;
          a.blinkProgress = 0;
          if (a.pendingDoubleBlink) {
            a.pendingDoubleBlink = false;
            a.nextBlinkAt = now + 115;
          } else {
            a.nextBlinkAt = now + 2400 + Math.random() * 2900;
          }
        } else {
          a.blinkProgress = Math.sin((elapsed / duration) * Math.PI);
        }
      }

      // 3. Natural eye gaze & state gaze target
      if (now >= a.nextGazeShiftAt) {
        a.nextGazeShiftAt = now + 1900 + Math.random() * 2400;
        if (st === 'thinking') {
          a.gazeTargetX = 0.5;
          a.gazeTargetY = -0.42;
        } else if (st === 'processing') {
          a.gazeTargetX = 0.22;
          a.gazeTargetY = -0.18;
        } else {
          a.gazeTargetX = (Math.random() - 0.5) * 0.28;
          a.gazeTargetY = (Math.random() - 0.5) * 0.16;
        }
      }
      const targetGazeX =
        st === 'thinking'
          ? 0.5
          : st === 'processing'
          ? 0.22
          : st === 'listening'
          ? p.smoothX * 0.45
          : a.gazeTargetX + p.smoothX * 0.65;
      const targetGazeY =
        st === 'thinking'
          ? -0.42
          : st === 'processing'
          ? -0.18
          : st === 'listening'
          ? p.smoothY * 0.35 - 0.05
          : a.gazeTargetY + p.smoothY * 0.45;
      a.gazeX += (targetGazeX - a.gazeX) * 0.12;
      a.gazeY += (targetGazeY - a.gazeY) * 0.12;

      // 4. Interpolate speech visemes & mic energy
      const targetOpen = st === 'speaking' ? clamp(vis?.openness ?? 0, 0, 1) : 0;
      const targetWidth = st === 'speaking' ? clamp(vis?.width ?? 0, -0.35, 0.45) : 0;
      const targetBeat = st === 'speaking' ? clamp(vis?.gestureBeat ?? 0, 0, 1) : 0;
      const targetMic = st === 'listening' ? clamp(mic || 0, 0, 1) : 0;

      a.smoothOpen += (targetOpen - a.smoothOpen) * 0.42;
      a.smoothWidth += (targetWidth - a.smoothWidth) * 0.32;
      a.smoothBeat += (targetBeat - a.smoothBeat) * 0.18;
      a.smoothMic += (targetMic - a.smoothMic) * 0.22;

      // 4b. Calibrated facial micro-expression targets (eyebrows, smile, warmth & eye brightness)
      let targetLeftBrowY = -0.6;
      let targetRightBrowY = -0.6;
      let targetSmileLift = 0.5;
      let targetCheekWarmth = 0.38;
      let targetEyeBrightness = 1.0;

      // Determine active expression mode from state & emotion
      const isHappy = st === 'happy' || emo === 'happy';
      const isExcited = st === 'excited' || emo === 'excited';
      const isEmpathetic = st === 'empathetic' || emo === 'empathetic';
      const isConfused = st === 'confused' || emo === 'confused';
      const isEncouraging = st === 'encouraging' || emo === 'encouraging';
      const isThinking = st === 'thinking' || st === 'processing' || emo === 'thoughtful';
      const isListening = st === 'listening' || emo === 'curious';
      const isSerious = st === 'error' || emo === 'serious';

      if (isExcited) {
        // Excited: Brighter eyes, higher eyebrow lift, enthusiastic open smile
        targetLeftBrowY = -1.6;
        targetRightBrowY = -1.55;
        targetSmileLift = 0.92;
        targetCheekWarmth = 0.72;
        targetEyeBrightness = 1.35;
      } else if (isHappy) {
        // Happy: Warm natural smile, soft cheek warmth, slightly lifted outer brows
        targetLeftBrowY = -1.2;
        targetRightBrowY = -1.2;
        targetSmileLift = 0.82;
        targetCheekWarmth = 0.65;
        targetEyeBrightness = 1.25;
      } else if (isEncouraging) {
        // Encouraging: Reassuring friendly smile, open eyes, gentle lift
        targetLeftBrowY = -1.3;
        targetRightBrowY = -1.3;
        targetSmileLift = 0.85;
        targetCheekWarmth = 0.62;
        targetEyeBrightness = 1.2;
      } else if (isEmpathetic) {
        // Empathetic: Gentle tilted brow, understanding warm smile, soft compassionate posture
        targetLeftBrowY = -1.4;
        targetRightBrowY = -0.65;
        targetSmileLift = 0.52;
        targetCheekWarmth = 0.5;
        targetEyeBrightness = 1.08;
      } else if (isConfused) {
        // Confused: Expressive subtle asymmetric eyebrow lift (one up, one down)
        targetLeftBrowY = -1.85;
        targetRightBrowY = 0.95;
        targetSmileLift = 0.18;
        targetCheekWarmth = 0.22;
        targetEyeBrightness = 1.1;
      } else if (isThinking) {
        // Thinking: Slightly thoughtful expression, furrowed inner brow, upward gaze
        targetLeftBrowY = -0.75;
        targetRightBrowY = 0.8;
        targetSmileLift = 0.12;
        targetCheekWarmth = 0.18;
        targetEyeBrightness = 0.95;
      } else if (isListening) {
        // Listening: Attentive eyes, attentive brow elevation, relaxed open expression
        targetLeftBrowY = -1.4 - a.smoothMic * 0.5;
        targetRightBrowY = -1.1 - a.smoothMic * 0.4;
        targetSmileLift = 0.44;
        targetCheekWarmth = 0.42;
        targetEyeBrightness = 1.18;
      } else if (isSerious) {
        // Serious / Error: Focused, attentive, calm
        targetLeftBrowY = 0.85;
        targetRightBrowY = 0.85;
        targetSmileLift = -0.12;
        targetCheekWarmth = 0.1;
        targetEyeBrightness = 0.9;
      } else {
        // Idle / Warm: Relaxed, friendly resting expression
        targetLeftBrowY = -0.75;
        targetRightBrowY = -0.75;
        targetSmileLift = 0.58;
        targetCheekWarmth = 0.42;
        targetEyeBrightness = 1.05;
      }

      if (st === 'speaking') {
        const beatLift = a.smoothBeat * 0.85;
        targetLeftBrowY -= beatLift;
        targetRightBrowY -= beatLift * 0.75;
      }

      a.leftBrowY += (targetLeftBrowY - a.leftBrowY) * 0.12;
      a.rightBrowY += (targetRightBrowY - a.rightBrowY) * 0.12;
      a.smileLift += (targetSmileLift - a.smileLift) * 0.1;
      a.cheekWarmth += (targetCheekWarmth - a.cheekWarmth) * 0.1;
      a.eyeBrightness += (targetEyeBrightness - a.eyeBrightness) * 0.1;

      // 5. Head, breathing & subtle conversational hand targets
      let targetScale = 1.0 + Math.sin(t * 1.4) * 0.0045;
      let targetTilt = Math.sin(t * 0.85) * 0.011 + p.smoothX * 0.009;
      let targetShiftY = Math.sin(t * 1.45) * 1.5 + p.smoothY * 1.1;
      let targetShiftX = Math.cos(t * 0.7) * 0.9 + p.smoothX * 1.6;
      let targetLhY = Math.sin(t * 1.45) * 1.2;
      let targetRhY = Math.cos(t * 1.45) * 1.2;

      if (isListening) {
        targetScale = 1.022 + a.smoothMic * 0.01;
        targetTilt = -0.024 + Math.sin(t * 2.0) * 0.008;
        targetShiftY = -1.2 + Math.sin(t * 2.1) * 1.4;
        targetRhY = -2.2 - a.smoothMic * 1.8;
      } else if (st === 'processing') {
        targetScale = 1.016 + Math.sin(t * 1.9) * 0.004;
        targetTilt = 0.012 + Math.sin(t * 1.5) * 0.005;
        targetShiftY = -0.8 + Math.sin(t * 2.4) * 1.2;
        targetShiftX = 1.2;
        targetRhY = -2.6 + Math.sin(t * 2.0) * 1.2;
      } else if (isThinking) {
        targetScale = 1.012 + Math.sin(t * 1.2) * 0.003;
        targetTilt = 0.025 + Math.sin(t * 1.1) * 0.006;
        targetShiftY = -2.2 + Math.sin(t * 1.2) * 1.0;
        targetShiftX = 2.0;
        targetRhY = -4.2 + Math.sin(t * 1.4) * 1.4;
      } else if (isConfused) {
        targetScale = 1.012;
        targetTilt = 0.034;
        targetShiftY = -0.6;
        targetShiftX = 1.4;
      } else if (isEmpathetic) {
        targetScale = 1.015;
        targetTilt = -0.018;
        targetShiftY = 0.4;
      } else if (isHappy || isExcited) {
        targetScale = 1.022 + Math.sin(t * 2.8) * 0.005;
        targetTilt = -0.012 + Math.sin(t * 2.4) * 0.008;
        targetShiftY = -1.4 + Math.sin(t * 3.0) * 1.2;
      } else if (st === 'error') {
        targetScale = 1.004;
        targetTilt = -0.014;
        targetShiftY = 0.8;
        targetShiftX = 0;
      } else if (st === 'speaking') {
        const beatEnergy = 0.5 + a.smoothBeat * 0.75;
        targetScale = 1.016 + a.smoothOpen * 0.01;
        targetTilt = Math.sin(t * 2.6) * 0.016 + (a.smoothBeat - 0.35) * 0.014;
        targetShiftY = -a.smoothOpen * 1.5 + Math.sin(t * 2.8) * 1.2 + (a.smoothBeat > 0.52 ? 1.2 : 0);
        targetShiftX = Math.sin(t * 1.7) * 1.6;
        targetRhY = (-3.6 + Math.sin(t * 3.1) * 2.6) * beatEnergy;
        targetLhY = (-2.6 + Math.cos(t * 2.5) * 2.2) * beatEnergy;
      }

      a.smoothScale += (targetScale - a.smoothScale) * 0.095;
      a.smoothTilt += (targetTilt - a.smoothTilt) * 0.095;
      a.smoothShiftY += (targetShiftY - a.smoothShiftY) * 0.11;
      a.smoothShiftX += (targetShiftX - a.smoothShiftX) * 0.1;
      a.leftHandShiftY += (targetLhY - a.leftHandShiftY) * 0.12;
      a.rightHandShiftY += (targetRhY - a.rightHandShiftY) * 0.12;

      // Paint Theme-Aware Studio Room & Backdrop
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const roomGrad = ctx.createLinearGradient(0, 0, cssWidth, cssHeight);
      if (dark) {
        roomGrad.addColorStop(0, '#0F1512');
        roomGrad.addColorStop(0.5, '#141D18');
        roomGrad.addColorStop(1, '#18241D');
      } else {
        roomGrad.addColorStop(0, '#F6F3E9');
        roomGrad.addColorStop(0.5, '#FAF9F5');
        roomGrad.addColorStop(1, '#E8EFEA');
      }
      ctx.fillStyle = roomGrad;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      let img = portraitImgRef.current;
      if (!img || !img.complete || img.naturalWidth === 0) {
        const cached = getOrCreateAiraPortrait();
        if (cached && cached.complete && cached.naturalWidth > 0) {
          portraitImgRef.current = cached;
          img = cached;
        }
      }

      if (img && img.complete && img.naturalWidth > 0) {
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;
        const imgAspect = imgW / imgH;

        const baseDrawH = cssHeight * 1.035;
        const baseDrawW = baseDrawH * imgAspect;
        const baseDrawX = (cssWidth - baseDrawW) / 2;
        const baseDrawY = -cssHeight * 0.012;

        // 1. Wide blurred architectural studio extension filling full stage width
        if (baseDrawW < cssWidth + 8) {
          ctx.save();
          const bgScale = Math.max(cssWidth / imgW, cssHeight / imgH) * 1.08;
          const bgW = imgW * bgScale;
          const bgH = imgH * bgScale;
          ctx.filter = dark ? 'blur(32px) brightness(0.36) saturate(0.85)' : 'blur(32px) brightness(1.04)';
          ctx.globalAlpha = dark ? 0.65 : 0.84;
          ctx.drawImage(img, (cssWidth - bgW) / 2, (cssHeight - bgH) * 0.25, bgW, bgH);
          ctx.restore();

          const scrim = ctx.createRadialGradient(
            cssWidth * 0.5,
            cssHeight * 0.35,
            baseDrawW * 0.32,
            cssWidth * 0.5,
            cssHeight * 0.5,
            cssWidth * 0.68
          );
          if (dark) {
            scrim.addColorStop(0, 'rgba(15, 21, 18, 0.12)');
            scrim.addColorStop(1, 'rgba(15, 21, 18, 0.86)');
          } else {
            scrim.addColorStop(0, 'rgba(250, 249, 245, 0.04)');
            scrim.addColorStop(1, 'rgba(244, 240, 230, 0.7)');
          }
          ctx.fillStyle = scrim;
          ctx.fillRect(0, 0, cssWidth, cssHeight);
        }

        // 2. Reactive State Lighting Halo Behind AIRA
        const haloColor = dark
          ? st === 'listening'
            ? `rgba(95, 176, 138, ${0.18 + a.smoothMic * 0.18})`
            : st === 'processing'
            ? `rgba(116, 198, 157, ${0.18 + 0.08 * Math.sin(t * 5)})`
            : st === 'thinking'
            ? `rgba(226, 180, 98, ${0.16 + 0.06 * Math.sin(t * 4)})`
            : st === 'error'
            ? 'rgba(217, 94, 94, 0.18)'
            : st === 'speaking'
            ? `rgba(121, 190, 154, ${0.16 + a.smoothOpen * 0.16})`
            : 'rgba(95, 176, 138, 0.14)'
          : st === 'listening'
          ? `rgba(22, 138, 82, ${0.14 + a.smoothMic * 0.16})`
          : st === 'processing'
          ? `rgba(45, 138, 92, ${0.16 + 0.06 * Math.sin(t * 5)})`
          : st === 'thinking'
          ? `rgba(217, 155, 67, ${0.14 + 0.06 * Math.sin(t * 4)})`
          : st === 'error'
          ? 'rgba(202, 74, 74, 0.14)'
          : st === 'speaking'
          ? `rgba(29, 77, 56, ${0.14 + a.smoothOpen * 0.14})`
          : 'rgba(255, 252, 242, 0.22)';

        const haloGrad = ctx.createRadialGradient(
          cssWidth * 0.5,
          cssHeight * 0.36,
          baseDrawW * 0.06,
          cssWidth * 0.5,
          cssHeight * 0.36,
          baseDrawW * 0.82
        );
        haloGrad.addColorStop(0, haloColor);
        haloGrad.addColorStop(1, dark ? 'rgba(15, 21, 18, 0)' : 'rgba(250, 249, 245, 0)');
        ctx.fillStyle = haloGrad;
        ctx.fillRect(0, 0, cssWidth, cssHeight);

        // 3. Draw Crisp Retina Portrait with Smooth Scale, Sway & Pivot Transform
        const drawW = baseDrawW * a.smoothScale;
        const drawH = baseDrawH * a.smoothScale;
        const pivotX = cssWidth / 2 + a.smoothShiftX;
        const pivotY = baseDrawY + drawH * 0.55 + a.smoothShiftY;
        const drawX = -drawW / 2;
        const drawY = -drawH * 0.55;

        ctx.save();
        ctx.beginPath();
        ctx.rect(baseDrawX, 0, baseDrawW, cssHeight);
        ctx.clip();

        ctx.translate(pivotX, pivotY);
        ctx.rotate(a.smoothTilt);

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // 4. Subtle Conversational Hand Gesture Motion (feathered oval overlay synced to cadence)
        const handConfigs = [
          { hand: AIRA_LANDMARKS.leftHand, dy: a.leftHandShiftY },
          { hand: AIRA_LANDMARKS.rightHand, dy: a.rightHandShiftY }
        ];
        for (const { hand, dy } of handConfigs) {
          if (Math.abs(dy) > 0.35) {
            const hx = drawX + drawW * hand.x;
            const hy = drawY + drawH * hand.y;
            const hrx = drawW * hand.rx;
            const hry = drawH * hand.ry;
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(hx, hy + dy * 0.5, hrx, hry, 0, 0, Math.PI * 2);
            ctx.clip();
            ctx.globalAlpha = 0.82;
            ctx.drawImage(
              img,
              imgW * (hand.x - hand.rx),
              imgH * (hand.y - hand.ry),
              imgW * (hand.rx * 2),
              imgH * (hand.ry * 2),
              hx - hrx,
              hy - hry + dy,
              hrx * 2,
              hry * 2
            );
            ctx.restore();
          }
        }

        // 4b. Eyebrow Micro-Expressions & Subtle Cheek Warmth
        const browPairs = [
          { brow: AIRA_LANDMARKS.leftBrow, dy: a.leftBrowY },
          { brow: AIRA_LANDMARKS.rightBrow, dy: a.rightBrowY }
        ];
        for (const { brow, dy } of browPairs) {
          if (Math.abs(dy) > 0.25) {
            const bx = drawX + drawW * brow.x;
            const by = drawY + drawH * brow.y;
            const brx = drawW * brow.rx;
            const bry = drawH * brow.ry;
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(bx, by + dy * 0.5, brx, bry * 1.15, 0, 0, Math.PI * 2);
            ctx.clip();
            ctx.globalAlpha = 0.78;
            ctx.drawImage(
              img,
              imgW * (brow.x - brow.rx),
              imgH * (brow.y - brow.ry),
              imgW * (brow.rx * 2),
              imgH * (brow.ry * 2),
              bx - brx,
              by - bry + clamp(dy, -2.0, 1.5),
              brx * 2,
              bry * 2
            );
            ctx.restore();
          }
        }

        if (a.cheekWarmth > 0.14) {
          for (const cheek of [AIRA_LANDMARKS.leftCheek, AIRA_LANDMARKS.rightCheek]) {
            const cx = drawX + drawW * cheek.x;
            const cy = drawY + drawH * cheek.y;
            const cr = drawW * cheek.rx;
            const blushGrad = ctx.createRadialGradient(cx, cy, 1, cx, cy, cr);
            blushGrad.addColorStop(0, `rgba(218, 126, 114, ${Math.min(0.11, a.cheekWarmth * 0.1)})`);
            blushGrad.addColorStop(1, 'rgba(218, 126, 114, 0)');
            ctx.save();
            ctx.fillStyle = blushGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, cr, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        // 5. Accurate Multi-Viseme Lip-Sync, Emotion Smile Corners & Jaw Articulation
        const mouthOpen = a.smoothOpen;
        const mx = drawX + drawW * AIRA_LANDMARKS.mouth.x;
        const my = drawY + drawH * AIRA_LANDMARKS.mouth.y;
        const shape = vis?.shape || 'open';

        // Subtle mouth corner expression curve when listening, thinking, or speaking warmly
        if (Math.abs(a.smileLift) > 0.08) {
          const cornerShiftY = -a.smileLift * 1.45;
          const [ur, ug, ub] = AIRA_LANDMARKS.mouth.upperRimRgb;
          for (const corner of [AIRA_LANDMARKS.mouth.leftCorner, AIRA_LANDMARKS.mouth.rightCorner]) {
            const lcx = drawX + drawW * corner.x;
            const lcy = drawY + drawH * corner.y;
            const isLeft = corner === AIRA_LANDMARKS.mouth.leftCorner;
            const dir = isLeft ? -1 : 1;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(lcx - dir * 3.5, lcy + 0.3);
            ctx.quadraticCurveTo(lcx, lcy + cornerShiftY * 0.65, lcx + dir * 2.5, lcy + cornerShiftY);
            ctx.strokeStyle = `rgba(${ur - 28}, ${ug - 24}, ${ub - 20}, ${Math.min(0.32, Math.abs(a.smileLift) * 0.3)})`;
            ctx.lineWidth = 1.25;
            ctx.lineCap = 'round';
            ctx.stroke();
            ctx.restore();
          }
        }

        if (st === 'speaking' && mouthOpen > 0.04) {
          // Subtle, realistic human lip-sync with anatomical proportions
          const maxAperture = 1.9; // px - sub-millimeter natural opening
          const shapeScale = shape === 'round' ? 1.55 : shape === 'dental' ? 0.95 : shape === 'closed' ? 0.25 : 1.35;
          const aperture = clamp(mouthOpen * shapeScale, 0, maxAperture);

          const shapeWidth = shape === 'round' ? 0.65 : shape === 'wide' ? 1.08 : shape === 'dental' ? 0.92 : 0.85;
          const cavityRx =
            drawW * AIRA_LANDMARKS.mouth.halfWidth * shapeWidth * clamp(1 + a.smoothWidth * 0.25, 0.78, 1.25);
          const cavityRy = Math.max(0.65, aperture * 0.72);
          const cavityY = my + aperture * 0.35;

          // 1. Soft natural oral cavity shadow
          ctx.save();
          const cavityGrad = ctx.createRadialGradient(mx, cavityY, 0.4, mx, cavityY, cavityRx);
          cavityGrad.addColorStop(0, `rgba(38, 12, 14, ${Math.min(0.85, 0.38 + mouthOpen * 0.45)})`);
          cavityGrad.addColorStop(0.7, `rgba(88, 32, 34, ${Math.min(0.65, 0.22 + mouthOpen * 0.35)})`);
          cavityGrad.addColorStop(1, 'rgba(150, 70, 68, 0.0)');

          ctx.beginPath();
          ctx.ellipse(mx, cavityY, cavityRx * 0.78, cavityRy, 0, 0, Math.PI * 2);
          ctx.fillStyle = cavityGrad;
          ctx.fill();

          // 2. Subtle upper teeth hint (warm translucent ivory, never opaque white)
          if ((shape === 'wide' || shape === 'dental' || (shape === 'open' && aperture > 0.9)) && aperture > 0.7) {
            const teethGrad = ctx.createLinearGradient(mx, my - 0.2, mx, my + cavityRy * 0.8);
            teethGrad.addColorStop(0, `rgba(246, 242, 236, ${Math.min(0.48, mouthOpen * 0.45)})`);
            teethGrad.addColorStop(1, 'rgba(215, 195, 185, 0.05)');
            ctx.beginPath();
            ctx.ellipse(
              mx,
              my + 0.35,
              cavityRx * (shape === 'dental' ? 0.72 : 0.58),
              Math.min(1.15, aperture * 0.35),
              0,
              0,
              Math.PI
            );
            ctx.fillStyle = teethGrad;
            ctx.fill();
          }

          // 3. Soft upper lip contour line
          const [ur, ug, ub] = AIRA_LANDMARKS.mouth.upperRimRgb;
          ctx.beginPath();
          ctx.moveTo(mx - cavityRx * 0.86, my + 0.25);
          ctx.quadraticCurveTo(mx, my - aperture * 0.25, mx + cavityRx * 0.86, my + 0.25);
          ctx.strokeStyle = `rgba(${ur}, ${ug}, ${ub}, ${Math.min(0.52, 0.2 + mouthOpen * 0.28)})`;
          ctx.lineWidth = 1.15;
          ctx.lineCap = 'round';
          ctx.stroke();

          // 4. Subtle lower lip vermilion flex (preserves chin line and prevents chin tearing)
          const [lr, lg, lb] = AIRA_LANDMARKS.mouth.lowerRimRgb;
          const lipDrop = aperture * 0.65;
          const lipSrcY = imgH * (AIRA_LANDMARKS.mouth.y + 0.006);
          const lipSrcH = imgH * 0.024;
          const lipSrcX = imgW * (AIRA_LANDMARKS.mouth.x - 0.065);
          const lipSrcW = imgW * 0.13;

          const lipDstX = drawX + drawW * (AIRA_LANDMARKS.mouth.x - 0.065);
          const lipDstY = my + lipDrop;
          const lipDstW = drawW * 0.13;
          const lipDstH = drawH * 0.024;

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(mx, my + lipDrop + 1.2, cavityRx * 0.85, Math.max(1.4, lipDrop + 1.1), 0, 0, Math.PI);
          ctx.clip();
          ctx.globalAlpha = 0.88;
          ctx.drawImage(img, lipSrcX, lipSrcY, lipSrcW, lipSrcH, lipDstX, lipDstY, lipDstW, lipDstH);
          ctx.restore();

          // Soft lower lip contour highlight
          ctx.beginPath();
          ctx.moveTo(mx - cavityRx * 0.82, my + lipDrop + 0.5);
          ctx.quadraticCurveTo(mx, my + lipDrop + 1.35, mx + cavityRx * 0.82, my + lipDrop + 0.5);
          ctx.strokeStyle = `rgba(${lr}, ${lg}, ${lb}, ${Math.min(0.42, 0.14 + mouthOpen * 0.25)})`;
          ctx.lineWidth = 1.15;
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.restore();
        } else if (st === 'speaking' && shape === 'closed' && mouthOpen > 0.02) {
          // Subtle bilabial contact crease on /m/, /b/, /p/ transitions
          const [ur, ug, ub] = AIRA_LANDMARKS.mouth.upperRimRgb;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(mx - drawW * 0.028, my + 0.35);
          ctx.quadraticCurveTo(mx, my + 0.7, mx + drawW * 0.028, my + 0.35);
          ctx.strokeStyle = `rgba(${ur - 15}, ${ug - 15}, ${ub - 15}, 0.28)`;
          ctx.lineWidth = 1.1;
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.restore();
        }

        // 6. Dynamic Eye Corneal Catchlights & Calibrated Eyelid Blink
        for (const eye of [AIRA_LANDMARKS.leftEye, AIRA_LANDMARKS.rightEye]) {
          const ex = drawX + drawW * eye.x;
          const ey = drawY + drawH * eye.y;
          const erx = drawW * eye.rx;
          const ery = drawH * eye.ry;

          if (a.blinkProgress < 0.65) {
            ctx.save();
            ctx.beginPath();
            const eyeBright = clamp(a.eyeBrightness || 1.0, 0.85, 1.4);
            ctx.arc(
              ex - erx * 0.14 + a.gazeX * 1.4,
              ey - ery * 0.18 + a.gazeY * 0.8,
              Math.max(1.2, erx * (eyeBright > 1.2 ? 0.11 : 0.095)),
              0,
              Math.PI * 2
            );
            ctx.fillStyle = `rgba(255, 250, 242, ${(1 - a.blinkProgress) * 0.42 * eyeBright})`;
            ctx.fill();
            ctx.restore();
          }

          if (a.blinkProgress > 0.05) {
            const b = a.blinkProgress;
            const [tr, tg, tb] = eye.lidTopRgb;
            const [cr, cg, cb] = eye.lidCreaseRgb;
            ctx.save();

            const lidGrad = ctx.createLinearGradient(ex, ey - ery * 1.1, ex, ey + ery * 1.1);
            lidGrad.addColorStop(0, `rgba(${tr}, ${tg}, ${tb}, ${Math.min(0.96, b * 0.96)})`);
            lidGrad.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, ${Math.min(0.96, b * 0.96)})`);

            ctx.beginPath();
            ctx.ellipse(ex, ey, erx * 1.04, Math.max(1.2, ery * 1.18 * b), 0, 0, Math.PI * 2);
            ctx.fillStyle = lidGrad;
            ctx.fill();

            if (b > 0.42) {
              ctx.beginPath();
              ctx.moveTo(ex - erx * 0.86, ey);
              ctx.quadraticCurveTo(ex, ey + Math.max(1.6, ery * 0.6 * b), ex + erx * 0.86, ey);
              ctx.strokeStyle = `rgba(42, 26, 20, ${b * 0.84})`;
              ctx.lineWidth = 1.65;
              ctx.lineCap = 'round';
              ctx.stroke();
            }
            ctx.restore();
          }
        }

        ctx.restore();

        // 7. Seamless Left/Right Studio Vignette Blending
        if (baseDrawW < cssWidth - 2) {
          const featherW = Math.max(24, baseDrawW * 0.16);
          const leftFeather = ctx.createLinearGradient(baseDrawX, 0, baseDrawX + featherW, 0);
          leftFeather.addColorStop(0, dark ? 'rgba(17, 24, 20, 0.98)' : 'rgba(244, 241, 232, 0.96)');
          leftFeather.addColorStop(1, dark ? 'rgba(17, 24, 20, 0)' : 'rgba(244, 241, 232, 0)');
          ctx.fillStyle = leftFeather;
          ctx.fillRect(baseDrawX - 2, 0, featherW + 2, cssHeight);

          const rightEdge = baseDrawX + baseDrawW;
          const rightFeather = ctx.createLinearGradient(rightEdge - featherW, 0, rightEdge, 0);
          rightFeather.addColorStop(0, dark ? 'rgba(20, 29, 24, 0)' : 'rgba(244, 241, 232, 0)');
          rightFeather.addColorStop(1, dark ? 'rgba(20, 29, 24, 0.98)' : 'rgba(235, 240, 235, 0.96)');
          ctx.fillStyle = rightFeather;
          ctx.fillRect(rightEdge - featherW, 0, featherW + 2, cssHeight);
        }
      }

      // 8. Soft Bottom Mist & Acoustic Voice Waveform Ribbon
      const bottomMist = ctx.createLinearGradient(0, cssHeight * 0.78, 0, cssHeight);
      bottomMist.addColorStop(0, dark ? 'rgba(15, 21, 18, 0)' : 'rgba(250, 249, 245, 0)');
      bottomMist.addColorStop(1, dark ? 'rgba(15, 21, 18, 0.95)' : 'rgba(245, 242, 233, 0.9)');
      ctx.fillStyle = bottomMist;
      ctx.fillRect(0, cssHeight * 0.78, cssWidth, cssHeight * 0.22);

      if (st === 'speaking' || st === 'listening') {
        const energy = st === 'speaking' ? 0.22 + a.smoothOpen * 0.78 : 0.22 + a.smoothMic * 0.78;
        const ribbonY = cssHeight - 16;
        const barCount = 44;
        const spacing = 7;
        const startX = cssWidth / 2 - ((barCount - 1) * spacing) / 2;

        for (let i = 0; i < barCount; i++) {
          const norm = Math.abs(i - (barCount - 1) / 2) / ((barCount - 1) / 2);
          const env = 1 - norm * norm * 0.78;
          const wave =
            0.38 +
            0.62 *
              Math.abs(
                Math.sin(i * 0.42 + t * (st === 'speaking' ? 9.5 : 6.2)) *
                  Math.cos(i * 0.21 - t * 4.1)
              );
          const barH = 3 + wave * energy * env * 14;
          ctx.beginPath();
          ctx.moveTo(startX + i * spacing, ribbonY - barH / 2);
          ctx.lineTo(startX + i * spacing, ribbonY + barH / 2);
          if (dark) {
            ctx.strokeStyle =
              st === 'listening'
                ? `rgba(121, 190, 154, ${0.5 + env * 0.45})`
                : i % 3 === 0
                ? `rgba(226, 180, 98, ${0.48 + env * 0.45})`
                : `rgba(143, 207, 174, ${0.46 + env * 0.48})`;
          } else {
            ctx.strokeStyle =
              st === 'listening'
                ? `rgba(22, 128, 72, ${0.42 + env * 0.45})`
                : i % 3 === 0
                ? `rgba(182, 145, 76, ${0.42 + env * 0.45})`
                : `rgba(29, 77, 56, ${0.42 + env * 0.5})`;
          }
          ctx.lineWidth = 2.4;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      }

      ctx.restore();
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      stageEl?.removeEventListener('pointermove', handlePointerMove);
      stageEl?.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [providerComponent]);

  const stateBadgeConfig = {
    idle: {
      label: 'AIRA • Ready',
      dot: 'bg-forest-600',
      icon: Sparkles
    },
    listening: {
      label: 'Listening to you...',
      dot: 'bg-emerald-500 animate-ping',
      icon: Mic
    },
    processing: {
      label: 'Processing speech...',
      dot: 'bg-amber-500 animate-ping',
      icon: Loader2
    },
    thinking: {
      label: 'AIRA is thinking...',
      dot: 'bg-amber-500 animate-pulse',
      icon: Brain
    },
    speaking: {
      label: isMuted ? 'AIRA replied (Muted)' : 'AIRA is speaking',
      dot: 'bg-forest-700 animate-pulse',
      icon: Volume2
    },
    happy: {
      label: 'AIRA is delighted',
      dot: 'bg-emerald-600 animate-pulse',
      icon: Sparkles
    },
    empathetic: {
      label: 'AIRA is listening empathetically',
      dot: 'bg-teal-600 animate-pulse',
      icon: Sparkles
    },
    confused: {
      label: 'Clarifying details...',
      dot: 'bg-amber-600 animate-pulse',
      icon: Brain
    },
    encouraging: {
      label: 'Encouraging Mentor',
      dot: 'bg-forest-600 animate-pulse',
      icon: Sparkles
    },
    error: {
      label: 'Voice / connection issue',
      dot: 'bg-red-500',
      icon: AlertCircle
    }
  }[state] || {
    label: 'AIRA • Ready',
    dot: 'bg-forest-600',
    icon: Sparkles
  };

  const emotionLabel = {
    warm: 'Warm & Friendly',
    curious: 'Attentive & Curious',
    encouraging: 'Encouraging Mentor',
    clarifying: 'Clear & Supportive',
    thoughtful: 'Thoughtful Listener',
    serious: 'Calm & Focused',
    happy: 'Delighted & Warm',
    excited: 'Enthusiastic & Inspired',
    empathetic: 'Empathetic & Caring',
    confused: 'Curious & Inquiring'
  }[emotion] || 'Personal AI Mentor';

  const StateIcon = stateBadgeConfig.icon;

  return (
    <div
      ref={stageRef}
      className="relative rounded-[32px] bg-ivory-50 border border-ivory-200 shadow-elevated overflow-hidden select-none"
    >
      {/* Top Studio HUD displaying AIRA Identity & Live State */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2.5 px-5 pt-4 pb-2 sm:px-6">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/92 backdrop-blur-md border border-ivory-200 shadow-subtle">
          <span className="text-xs font-extrabold tracking-wide text-charcoal-900">AIRA</span>
          <span className="h-3 w-px bg-ivory-300" />
          <span className="relative flex h-2 w-2">
            <span className={`inline-flex rounded-full h-2 w-2 ${stateBadgeConfig.dot}`} />
          </span>
          <StateIcon className="w-3.5 h-3.5 text-forest-800" />
          <span className="text-xs font-semibold text-charcoal-700">{stateBadgeConfig.label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-card/85 backdrop-blur-sm border border-ivory-200 text-[11px] font-medium text-charcoal-600">
            {emotionLabel}
          </span>

          {onSpeakReply && state === 'idle' && !isMuted && (
            <button
              type="button"
              onClick={onSpeakReply}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent hover:bg-accent-hover text-on-accent text-[11px] font-semibold shadow-subtle transition-all"
              title="Hear AIRA speak aloud with her female voice and lip-sync"
            >
              <Volume2 className="w-3 h-3" />
              <span>Hear AIRA</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowTechInfo((prev) => !prev)}
            className="w-7 h-7 rounded-full bg-card/88 hover:bg-card border border-ivory-200 text-charcoal-600 flex items-center justify-center transition-colors"
            title="AIRA Voice & Avatar Details"
            aria-label="Toggle AIRA voice and avatar architecture info"
          >
            {showTechInfo ? <X className="w-3.5 h-3.5" /> : <Info className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Honest Female Voice & Avatar Integration Drawer */}
      {showTechInfo && (
        <div className="relative z-30 mx-5 mb-2 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-ivory-200 shadow-card text-xs text-charcoal-700 space-y-2 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-charcoal-900">
            <Cpu className="w-4 h-4 text-forest-800" />
            <span>AIRA Female Voice &amp; Digital Human Engine</span>
          </div>
          <p className="leading-relaxed text-[11px] text-charcoal-600">
            <strong>Locked Female Voice:</strong>{' '}
            {voiceInfo?.available
              ? `${voiceInfo.name} (${voiceInfo.lang})`
              : 'Waiting for browser female voice (all male OS voices strictly filtered out).'}
          </p>
          <p className="leading-relaxed text-[11px] text-charcoal-600">
            Using browser Web Speech Synthesis &amp; Recognition (<code className="px-1 py-0.5 rounded bg-ivory-50">en-IN</code>{' '}
            English, <code className="px-1 py-0.5 rounded bg-ivory-50">te-IN</code> Telugu, and Tanglish) paired with
            word-timed syllable visemes and facial micro-expressions. If your browser lacks a native female{' '}
            <code className="px-1 py-0.5 rounded bg-ivory-50">te-IN</code> voice, AIRA switches seamlessly to phonetic
            female speech fallback. For studio neural voices or photorealistic streaming lip-sync, connect Edge/Azure
            Neural (<code className="px-1 py-0.5 rounded bg-ivory-50">Neerja</code> /{' '}
            <code className="px-1 py-0.5 rounded bg-ivory-50">Shruti</code>), ElevenLabs, or D-ID / HeyGen.
          </p>
        </div>
      )}

      {/* Main Semi-Realistic 3D Female Character Stage */}
      <div className="relative w-full h-[460px] sm:h-[530px] flex items-end justify-center -mt-3">
        {providerComponent ? (
          <div className="w-full h-full flex items-center justify-center">{providerComponent}</div>
        ) : (
          <>
            {/* Guaranteed fallback image rendered underneath canvas so avatar never flashes or disappears */}
            <img
              src={AIRA_LANDMARKS.src}
              alt="AIRA Avatar"
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover object-top pointer-events-none transition-opacity duration-300 ${
                imageReady ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-default relative z-10"
              role="img"
              aria-label="AIRA, your personal female AI career mentor"
            />
          </>
        )}

        {/* Elegant AIRA Identity Tag Positioned Cleanly in Lower Corner */}
        <div className="absolute bottom-4 left-5 z-20 pointer-events-none">
          <div className="px-4 py-2 rounded-2xl bg-card/90 backdrop-blur-md border border-ivory-200 shadow-card">
            <p className="text-sm font-extrabold tracking-wide text-charcoal-900 leading-tight">AIRA</p>
            <p className="text-[11px] text-charcoal-500 font-medium leading-tight mt-0.5">
              Personal AI Career Mentor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
