import React, { useEffect, useRef } from "react";
import { Calendar, Clock, MapPin, Users, X, Star } from "lucide-react";
import { Event } from "@/interfaces/event";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previousActive?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full sm:max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden focus:outline-none"
        tabIndex={-1}
      >
        {/* Header image */}
        <div className="relative h-40 sm:h-56 bg-gradient-to-br from-teal-400 to-teal-600">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center absolute top-3 right-3 w-9 h-9 rounded-full text-white/80 transition-all duration-200 hover:text-teal-200 hover:bg-white/10 hover:bg-white hover:shadow"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>
          <p className="text-gray-600 mb-4">{event.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <Calendar className="w-4 h-4 mr-2 text-teal-500" />
              <span>
                {new Date(event.date).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 mr-2 text-teal-500" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-teal-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Users className="w-4 h-4 mr-2 text-teal-500" />
              <span>
                {event.currentParticipants}/{event.maxParticipants} participants
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                {event.organizer.avatar ? (
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <span className="text-teal-600 font-bold text-sm">
                    {event.organizer.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {event.organizer.name}
                </p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">
                    {event.organizer.rating}/5
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-teal-600">
                {event.price === 0 ? "Gratuit" : `${event.price}€`}
              </p>
            </div>
          </div>

          {event.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
