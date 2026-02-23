import { useEffect, useState, useRef } from 'react';

/**
 * AnimatedCounter - 數字急迫感計數器
 * 支援整數與小數動畫，進入頁面立刻啟動
 *
 * @param {number} end - 目標數值（支援小數，如 99.7）
 * @param {string} suffix - 後綴文字 (例如 '%', 'M+')
 * @param {string} prefix - 前綴文字 (例如 '$')
 * @param {number} decimals - 小數位數（自動偵測，或手動指定）
 * @param {number} duration - 動畫持續時間 (ms)
 * @param {number} delay - 延遲啟動時間 (ms)
 */
const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  decimals,
  duration = 1800,
  delay = 0,
}) => {
  // 自動偵測小數位數
  const decimalPlaces = decimals !== undefined
    ? decimals
    : (String(end).includes('.') ? String(end).split('.')[1].length : 0);

  const [displayValue, setDisplayValue] = useState('0');
  const animRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);

        // 急迫感緩動：先慢後快再減速
        const eased = rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

        // 微小隨機抖動（僅整數部分抖動，小數部分自然跟著跑）
        let jitter = 0;
        if (rawProgress > 0.05 && rawProgress < 0.9) {
          jitter = (Math.random() - 0.5) * end * 0.02;
        }

        let currentValue = eased * end + jitter;
        currentValue = Math.max(0, Math.min(currentValue, end));

        // 格式化：整數部分加千分位，保留小數
        const formatted = formatNumber(currentValue, decimalPlaces);
        setDisplayValue(formatted);

        if (rawProgress < 1) {
          animRef.current = requestAnimationFrame(tick);
        } else {
          // 最終精確值
          setDisplayValue(formatNumber(end, decimalPlaces));
        }
      };

      animRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [end, duration, delay, decimalPlaces]);

  return <span>{prefix}{displayValue}{suffix}</span>;
};

// 格式化數字：整數部分加千分位，小數部分保留指定位數
function formatNumber(value, decimalPlaces) {
  if (decimalPlaces === 0) {
    return Math.floor(value).toLocaleString();
  }
  const fixed = value.toFixed(decimalPlaces);
  const [intPart, decPart] = fixed.split('.');
  return Number(intPart).toLocaleString() + '.' + decPart;
}

export default AnimatedCounter;
