"use client";

import { useEffect, useRef } from "react";
import type L from "leaflet";
import clsx from "clsx";

interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  href: string;
}

interface MapViewProps {
  center: { lat: number; lng: number };
  markers?: MapMarker[];
  zoom?: number;
  className?: string;
}

export default function MapView({
  center,
  markers = [],
  zoom = 13,
  className,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return; // already initialized

    let cancelled = false;

    async function init() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !containerRef.current) return;

      // Fix default marker icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current).setView(
        [center.lat, center.lng],
        zoom,
      );
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      markers.forEach((m) => {
        const marker = L.marker([m.lat, m.lng]).addTo(map);
        marker.bindPopup(
          `<a href="${m.href}" style="font-weight:600;color:#0F5E9C">${m.label}</a>`,
        );
      });
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "h-80 w-full rounded-lg border border-border bg-bg",
        className,
      )}
      role="application"
      aria-label="Mappa"
    />
  );
}
