import React, { useState } from "react";
import { X, Key, Sparkles, Check, ExternalLink, ShieldCheck } from "lucide-react";

export default function GeminiSettingsModal({
  isOpen,
  onClose,
  apiKey,
  setApiKey
}) {
  const [tempKey, setTempKey] = useState(apiKey || "");
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(tempKey.trim());
    localStorage.setItem("yatri_gemini_key", tempKey.trim());
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setTempKey("");
    setApiKey("");
    localStorage.removeItem("yatri_gemini_key");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="icon-box-emerald">
              <Key className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3>AI Engine & Gemini Settings</h3>
              <p className="modal-subtitle">Configure custom Google Gemini API integration</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="info-box glass-card">
            <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p>
              <strong>Notice:</strong> YatriAI has a built-in intelligent engine loaded with Indian railway fares, HRTC/KSRTC routes, verified youth hostels, and safety warnings that works instantly offline! An API key is completely optional if you want direct access to Google's live Gemini 1.5/2.0 model.
            </p>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="gemini-key-input">
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              id="gemini-key-input"
              className="input-field"
              placeholder="AIzaSy..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
            />
          </div>

          <div className="helper-link-row">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="api-help-link"
            >
              <span>Get a free Gemini API Key from Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="privacy-badge">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Your key is stored only locally in your browser's localStorage. Never sent to any third party server.</span>
          </div>
        </div>

        <div className="modal-footer">
          {tempKey && (
            <button className="btn-secondary clear-btn" onClick={handleClear}>
              Clear Key
            </button>
          )}

          <div className="footer-actions">
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
