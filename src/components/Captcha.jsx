import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { generateCaptcha } from '../utils/captchaGenerator';

export const Captcha = forwardRef(({ 
  length = 6, 
  width = 200, 
  height = 60, 
  onChange, 
  refreshOnClick = true,
  textColor = '#374151',
  backgroundColor = '#f3f4f6'
}, ref) => {
  const canvasRef = useRef(null);
  const [captchaText, setCaptchaText] = useState('');

  const drawCaptcha = useCallback(() => {
    const text = generateCaptcha(length);
    setCaptchaText(text);
    if (onChange) {
      onChange(text);
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add noise (lines)
    for(let i = 0; i < 7; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Add noise (dots)
    for(let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`;
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, 1, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Text options
    const fontSize = height * 0.6;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textBaseline = 'middle';
    
    const totalWidth = ctx.measureText(text).width;
    // Calculate total spacing available ensuring text fits within width with some padding
    // minimal left/right padding = 10px
    const totalSpacing = (width - totalWidth - 20) / (text.length - 1); 

    // Draw text with random rotation and position
    // Start at left padding
    let x = 10;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      ctx.save();
      // Random position distortion
      const y = height / 2 + (Math.random() * 10 - 5);
      const xJitter = (Math.random() * 6 - 3); // -3 to +3
      
      // Move to char position with jitter
      ctx.translate(x + xJitter, y); 
      
      // Random rotation
      const angle = (Math.random() * 30 - 15) * Math.PI / 180;
      ctx.rotate(angle);
      
      ctx.fillStyle = textColor;
      ctx.fillText(char, 0, 0);
      ctx.restore();
      
      x += ctx.measureText(char).width + totalSpacing;
    }

  }, [length, width, height, onChange, textColor, backgroundColor]);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      drawCaptcha();
    }
  }));

  useEffect(() => {
    drawCaptcha();
  }, []); // Initial draw

  const handleClick = () => {
    if (refreshOnClick) {
      drawCaptcha();
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onClick={handleClick}
      style={{
        cursor: refreshOnClick ? 'pointer' : 'default',
        borderRadius: '4px',
        border: '1px solid #d1d5db'
      }}
    />
  );
});

Captcha.displayName = 'Captcha';
