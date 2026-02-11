"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import MascotPNG from "@assets/mascot.png";
import Image from "next/image";
import { IMAGE_SIZES } from "@ts/image";

declare global {
  interface Window {
    naver: {
      maps: {
        Map: naver.maps.Map;
      };
    };
    navermap_authFailure?: () => void;
  }
}

type Props = {
  className?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
};

export default function NaverMap({
  className,
  center = { lat: 37.509104, lng: 127.0406986 },
  zoom = 17,
}: Props) {
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [ready, setReady] = useState(false);

  const key = process.env.NEXT_PUBLIC_NAVER_MAPS_CLIENT_ID;

  useEffect(() => {
    if (!ready) return;
    if (!mapElRef.current) return;
    if (!window.naver?.maps) return;

    window.navermap_authFailure = () => {
      console.error("Naver Maps auth failure: 도메인/키 설정 확인");
    };

    if (mapRef.current) return;

    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(center.lat - 0.001, center.lng - 0.002),
      new naver.maps.LatLng(center.lat + 0.001, center.lng + 0.002),
    );

    mapRef.current = new window.naver.maps.Map(mapElRef.current, {
      center: new window.naver.maps.LatLng(center.lat, center.lng),
      zoom,
      maxBounds: bounds,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
    });

    const map = mapRef.current;

    new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(center.lat, center.lng),
      icon: {
        content: "<img src='/marker.svg' style='width: 42px; height: 55px;' />",
        size: new naver.maps.Size(42, 55),
        anchor: new naver.maps.Point(21, 55),
      },
    });

    new naver.maps.Polygon({
      map: map,
      paths: [
        [
          new naver.maps.LatLng(37.5091021, 127.0405378),
          new naver.maps.LatLng(37.5091795, 127.0407883),
          new naver.maps.LatLng(37.5090968, 127.0408255),
          new naver.maps.LatLng(37.5090266, 127.0405767),
        ],
      ],
      fillColor: "red",
      fillOpacity: 0.3,
      strokeColor: "red",
      strokeOpacity: 0.6,
      strokeWeight: 2,
    });

    return () => {
      mapRef.current = null;
    };
  }, [ready, center.lat, center.lng, zoom]);

  if (!key) {
    return <div className={className}>NEXT_PUBLIC_NAVER_MAPS_KEY가 없음</div>;
  }

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <Script
        id="naver-maps-sdk"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${key}&language=en`}
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={MascotPNG}
          alt="mascot"
          fill
          sizes={IMAGE_SIZES}
          style={{ objectFit: "contain", padding: "2rem" }}
        />
      </div>
      <div
        ref={mapElRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: ready ? 1 : 0,
          transition: "opacity .2s ease",
        }}
      />
    </div>
  );
}
