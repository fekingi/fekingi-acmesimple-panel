import React, { useState } from 'react';
import { PanelProps, Field } from '@grafana/data';
import { SimpleOptions } from '../types';
import { EMOJI_THEMES, EmojiLevel } from '../constants';
import { getTrend, getTrendEmoji, getChangePercent, getHistoricalSummary, getStatistics } from '../utils';
import { css, keyframes } from '@emotion/css';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [showDetails, setShowDetails] = useState(false);

  const bounce = keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  `;

  const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `;

  const getNumericFields = (): Field[] => {
    const fields: Field[] = [];
    data.series.forEach(series => {
      series.fields.forEach(field => {
        if (field.type === 'number' && field.values.length > 0) {
          fields.push(field);
        }
      });
    });
    return fields;
  };

  const getValue = (field: Field): number | null => {
    if (field.values.length === 0) return null;
    return field.values.get(field.values.length - 1);
  };

  const getEmojiLevel = (val: number | null): EmojiLevel => {
    if (val === null) return 'critical';

    if (val >= options.excellentThreshold) return 'excellent';
    if (val >= options.goodThreshold) return 'good';
    if (val >= options.okThreshold) return 'ok';
    if (val >= options.warningThreshold) return 'warning';
    return 'critical';
  };

  const getEmoji = (val: number | null): string => {
    const level = getEmojiLevel(val);
    
    if (options.useCustomEmojis) {
      const emojiMap = {
        excellent: options.excellentEmoji,
        good: options.goodEmoji,
        ok: options.okEmoji,
        warning: options.warningEmoji,
        critical: options.criticalEmoji,
      };
      return emojiMap[level];
    }
    
    return EMOJI_THEMES[options.theme][level];
  };

  const containerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: ${options.backgroundColor};
    padding: 20px;
    position: relative;
  `;

  const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    width: 100%;
    height: 100%;
    overflow: auto;
  `;

  const listStyle = css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: 100%;
    overflow: auto;
  `;

  const metricCardStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
  `;

  const metricRowStyle = css`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.2);
  `;

  const emojiStyle = (isCritical: boolean) => css`
    font-size: ${options.emojiSize}px;
    margin-bottom: 10px;
    ${options.enableAnimation ? `animation: ${bounce} 0.5s ease-in-out;` : ''}
    ${isCritical && options.pulseOnCritical ? `animation: ${pulse} 1s infinite;` : ''}
  `;

  const valueStyle = css`
    font-size: ${options.fontSize}px;
    color: ${options.textColor};
    font-weight: bold;
  `;

  const labelStyle = css`
    font-size: ${options.fontSize * 0.6}px;
    color: ${options.textColor};
    opacity: 0.7;
    margin-top: 5px;
  `;

  const trendStyle = css`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: ${options.fontSize * 0.7}px;
    color: ${options.textColor};
    margin-top: 8px;
  `;

  const historyStyle = css`
    display: flex;
    width: 100%;
    height: 10px;
    margin-top: 10px;
    border-radius: 5px;
    overflow: hidden;
  `;

  const statsStyle = css`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
    font-size: ${options.fontSize * 0.6}px;
    color: ${options.textColor};
    opacity: 0.8;
  `;

  const comparisonStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
    font-size: ${options.fontSize * 0.7}px;
    color: ${options.textColor};
  `;

  const alertStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 0, 0, 0.2);
    animation: ${pulse} 1s infinite;
    pointer-events: none;
    border-radius: 8px;
  `;

  const alertMessageStyle = css`
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background: rgba(255, 0, 0, 0.9);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: ${options.fontSize * 0.8}px;
  `;

  const detailsStyle = css`
    margin-top: 15px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    font-size: ${options.fontSize * 0.6}px;
    color: ${options.textColor};
  `;

  const renderMetric = (field: Field, isClickable: boolean = false) => {
    const value = getValue(field);
    const emoji = getEmoji(value);
    const level = getEmojiLevel(value);
    const isCritical = level === 'critical';
    
    const trend = options.showTrend ? getTrend(field) : 'stable';
    const changePercent = options.showTrend ? getChangePercent(field) : 0;
    const trendEmoji = getTrendEmoji(trend, options.higherIsBetter);
    
    const stats = options.showStatistics ? getStatistics(field) : null;
    
    const history = options.showHistory ? getHistoricalSummary(field, {
      excellent: options.excellentThreshold,
      good: options.goodThreshold,
      ok: options.okThreshold,
      warning: options.warningThreshold,
    }) : null;

    const handleClick = () => {
      if (options.enableDrilldown && isClickable) {
        setShowDetails(!showDetails);
      }
    };

    return (
      <div onClick={handleClick} style={{ cursor: isClickable ? 'pointer' : 'default', position: 'relative' }}>
        {isCritical && options.showAlertOnCritical && <div className={alertStyle} />}
        {isCritical && options.showAlertOnCritical && (
          <div className={alertMessageStyle}>{options.alertMessage}</div>
        )}
        
        <div className={emojiStyle(isCritical)}>{emoji}</div>
        
        {options.showValue && value !== null && (
          <div className={valueStyle}>{value.toFixed(options.decimals)}</div>
        )}
        
        {options.showLabel && (
          <div className={labelStyle}>{options.label || field.name}</div>
        )}
        
        {options.showTrend && (
          <div className={trendStyle}>
            {trendEmoji}
            <span>{Math.abs(changePercent).toFixed(1)}%</span>
          </div>
        )}
        
        {options.showComparison && value !== null && (
          <div className={comparisonStyle}>
            {options.comparisonMode === 'target' ? (
              <>
                <div>Target: {options.targetValue}</div>
                <div style={{ color: value >= options.targetValue ? '#00ff00' : '#ff0000' }}>
                  {value >= options.targetValue ? '✅' : '❌'}
                  {' '}
                  {((value / options.targetValue) * 100).toFixed(0)}%
                </div>
              </>
            ) : (
              field.values.length >= 2 && (
                <div>
                  Previous: {field.values.get(field.values.length - 2).toFixed(options.decimals)}
                  {' '}
                  ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%)
                </div>
              )
            )}
          </div>
        )}
        
        {options.showHistory && history && (
          <div className={historyStyle}>
            {history.excellent > 0 && (
              <div style={{ width: `${(history.excellent / history.total) * 100}%`, background: '#00ff00' }} title={`Excellent: ${history.excellent}`} />
            )}
            {history.good > 0 && (
              <div style={{ width: `${(history.good / history.total) * 100}%`, background: '#90ee90' }} title={`Good: ${history.good}`} />
            )}
            {history.ok > 0 && (
              <div style={{ width: `${(history.ok / history.total) * 100}%`, background: '#ffff00' }} title={`OK: ${history.ok}`} />
            )}
            {history.warning > 0 && (
              <div style={{ width: `${(history.warning / history.total) * 100}%`, background: '#ffa500' }} title={`Warning: ${history.warning}`} />
            )}
            {history.critical > 0 && (
              <div style={{ width: `${(history.critical / history.total) * 100}%`, background: '#ff0000' }} title={`Critical: ${history.critical}`} />
            )}
          </div>
        )}
        
        {showDetails && stats && (
          <div className={detailsStyle}>
            <div>Min: {stats.min.toFixed(options.decimals)}</div>
            <div>Max: {stats.max.toFixed(options.decimals)}</div>
            <div>Avg: {stats.avg.toFixed(options.decimals)}</div>
            <div>Count: {stats.count}</div>
            <div>Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        )}
        
        {options.showStatistics && stats && !showDetails && (
          <div className={statsStyle}>
            <div>Min: {stats.min.toFixed(options.decimals)} | Max: {stats.max.toFixed(options.decimals)}</div>
            <div>Avg: {stats.avg.toFixed(options.decimals)}</div>
          </div>
        )}
      </div>
    );
  };

  const fields = getNumericFields();

  if (fields.length === 0) {
    return (
      <div className={containerStyle}>
        <div style={{ color: options.textColor }}>No numeric data available</div>
      </div>
    );
  }

  if (options.displayMode === 'single') {
    return (
      <div className={containerStyle}>
        {renderMetric(fields[0], true)}
      </div>
    );
  }

  if (options.displayMode === 'grid') {
    return (
      <div className={gridStyle}>
        {fields.map((field, idx) => (
          <div key={idx} className={metricCardStyle}>
            {renderMetric(field, true)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={listStyle}>
      {fields.map((field, idx) => {
        const value = getValue(field);
        const emoji = getEmoji(value);
        const level = getEmojiLevel(value);
        
        return (
          <div key={idx} className={metricRowStyle}>
            <div style={{ fontSize: options.emojiSize * 0.5 }}>{emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: options.fontSize * 0.8, color: options.textColor, fontWeight: 'bold' }}>
                {field.name}
              </div>
              <div style={{ fontSize: options.fontSize * 0.6, color: options.textColor, opacity: 0.7 }}>
                {value !== null ? value.toFixed(options.decimals) : 'N/A'}
              </div>
            </div>
            {options.showTrend && (
              <div style={{ fontSize: options.fontSize * 0.6, color: options.textColor }}>
                {getTrendEmoji(getTrend(field), options.higherIsBetter)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};