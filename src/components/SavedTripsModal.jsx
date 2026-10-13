import React, { useState, useRef } from "react";
import {
  X,
  Bookmark,
  Trash2,
  Calendar,
  MapPin,
  Download,
  Upload,
  ExternalLink,
  Edit3,
  Check,
  HardDrive,
  Sparkles
} from "lucide-react";
import { localStorageService } from "../services/localStorageService";

export default function SavedTripsModal({
  isOpen,
  onClose,
  savedTrips,
  onLoadTrip,
  onDeleteTrip,
  onUpdateTrips
}) {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleStartEditNote = (trip) => {
    setEditingNoteId(trip.id);
    setNoteText(trip.notes || "");
  };

  const handleSaveNote = (tripId) => {
    localStorageService.updateTripNotes(tripId, noteText.trim());
    setEditingNoteId(null);
    onUpdateTrips();
  };

  const handleCopySummary = (trip) => {
    const text = `🎒 SAVED TRIP: ${trip.destinationName} (${trip.state})
From: ${trip.origin}
Budget: ₹${trip.budget?.toLocaleString("en-IN")} (${trip.activeTier?.toUpperCase() || "SMART"} Tier)
Duration: ${trip.durationDays} Days
${trip.notes ? `\n📝 Notes: ${trip.notes}` : ""}

Planned with YatriAI (100% Local Storage)`;

    navigator.clipboard.writeText(text);
    setCopiedId(trip.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportBackup = () => {
    const jsonStr = localStorageService.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `yatri_saved_trips_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTriggerImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        const result = localStorageService.importBackupJSON(content);
        if (result.success) {
          setImportStatus(`Successfully restored ${result.count} trip(s)!`);
          onUpdateTrips();
        } else {
          setImportStatus(`Import failed: ${result.error}`);
        }
        setTimeout(() => setImportStatus(null), 3500);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClearAll = () => {
    localStorageService.clearAllLocalData();
    onUpdateTrips();
    setConfirmClear(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card saved-trips-modal glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="icon-box-emerald">
              <Bookmark className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex-title-row">
                <h3>My Saved Trips</h3>
                <span className="badge badge-emerald storage-pill">
                  <HardDrive className="w-3 h-3 inline mr-1" />
                  Local Storage
                </span>
              </div>
              <p className="modal-subtitle">
                Trips are stored securely in your browser's local memory. No cloud accounts or Supabase needed.
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Export, Import, Clear */}
        <div className="saved-trips-toolbar">
          <div className="toolbar-left">
            <span className="saved-count-text">
              <strong>{savedTrips.length}</strong> {savedTrips.length === 1 ? "Trip" : "Trips"} Saved
            </span>
          </div>

          <div className="toolbar-actions">
            <button
              className="action-btn-sm"
              onClick={handleExportBackup}
              title="Export all trips as JSON backup file"
              disabled={savedTrips.length === 0}
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export JSON</span>
            </button>

            <button
              className="action-btn-sm"
              onClick={handleTriggerImport}
              title="Import trips from a previous JSON backup file"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Import JSON</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".json"
              onChange={handleFileChange}
            />

            {savedTrips.length > 0 && (
              confirmClear ? (
                <div className="confirm-clear-wrap">
                  <span className="confirm-clear-text">Clear all?</span>
                  <button
                    className="action-btn-sm confirm-danger"
                    onClick={handleClearAll}
                  >
                    Yes
                  </button>
                  <button
                    className="action-btn-sm"
                    onClick={() => setConfirmClear(false)}
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  className="action-btn-sm danger-btn-sm"
                  onClick={() => setConfirmClear(true)}
                  title="Clear all saved trips from local storage"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Clear All</span>
                </button>
              )
            )}
          </div>
        </div>

        {importStatus && (
          <div className="import-status-banner">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{importStatus}</span>
          </div>
        )}

        {/* Modal Body / Trips List */}
        <div className="modal-body saved-trips-list-body">
          {savedTrips.length === 0 ? (
            <div className="empty-saved-state glass-card">
              <div className="empty-icon-wrap">
                <Bookmark className="w-10 h-10 text-emerald-400 opacity-60" />
              </div>
              <h4>No Saved Trips Yet</h4>
              <p>
                When you generate any backpacking itinerary, click the{" "}
                <strong className="text-emerald-400">"Save to My Trips"</strong> button to keep
                it in your browser's Local Storage for offline access!
              </p>
            </div>
          ) : (
            <div className="saved-cards-grid">
              {savedTrips.map((trip) => {
                const isEditing = editingNoteId === trip.id;
                const formattedDate = new Date(trip.savedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                });

                return (
                  <div key={trip.id} className="saved-trip-item-card glass-card">
                    <div className="saved-card-header">
                      <div>
                        <div className="saved-meta-badges">
                          <span className="badge badge-emerald">
                            {trip.activeTier?.toUpperCase() || "SMART"} TIER
                          </span>
                          <span className="badge badge-cyan">{trip.durationDays} Days</span>
                          <span className="saved-date-text">Saved on {formattedDate}</span>
                        </div>
                        <h4 className="saved-trip-title">{trip.destinationName}</h4>
                        <div className="saved-trip-origin">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400 inline mr-1" />
                          <span>Origin: {trip.origin}</span>
                        </div>
                      </div>

                      <div className="saved-trip-price-badge">
                        <span className="rupee">₹</span>
                        <span className="amount">{trip.budget?.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    {/* Student Notes Area */}
                    <div className="saved-notes-section">
                      {isEditing ? (
                        <div className="edit-note-box">
                          <textarea
                            className="note-textarea"
                            rows={2}
                            placeholder="Add your personal notes (e.g., Gang members, bus timings, packing reminders)..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                          />
                          <div className="edit-note-actions">
                            <button
                              className="btn-secondary btn-xs"
                              onClick={() => setEditingNoteId(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn-primary btn-xs"
                              onClick={() => handleSaveNote(trip.id)}
                            >
                              <Check className="w-3 h-3 mr-1" /> Save Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="view-note-box">
                          {trip.notes ? (
                            <p className="saved-note-text">
                              <strong>Notes:</strong> {trip.notes}
                            </p>
                          ) : (
                            <span className="no-note-prompt">No custom notes yet</span>
                          )}
                          <button
                            className="edit-note-btn"
                            onClick={() => handleStartEditNote(trip)}
                            title="Edit notes for this trip"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{trip.notes ? "Edit" : "Add Note"}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="saved-card-actions">
                      <button
                        className="btn-primary load-plan-btn"
                        onClick={() => {
                          onLoadTrip(trip);
                          onClose();
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        <span>Load This Plan</span>
                      </button>

                      <button
                        className="btn-secondary icon-btn-sm"
                        onClick={() => handleCopySummary(trip)}
                        title="Copy summary to clipboard"
                      >
                        {copiedId === trip.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Calendar className="w-4 h-4" />
                        )}
                        <span>{copiedId === trip.id ? "Copied!" : "Summary"}</span>
                      </button>

                      <button
                        className="delete-trip-btn"
                        onClick={() => onDeleteTrip(trip.id)}
                        title="Delete from Local Storage"
                      >
                        <Trash2 className="w-4 h-4 text-rose-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="local-storage-indicator">
            <HardDrive className="w-4 h-4 text-emerald-400" />
            <span>
              All data lives strictly in your browser's HTML5 localStorage.
            </span>
          </div>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
