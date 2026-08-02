import { ImageResponse } from "next/og";

export const alt = "Alhijaz Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #000000 0%, #1a1814 55%, #2a2418 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 4,
            background: "#b7a35a",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ddd3b0",
            letterSpacing: -1,
          }}
        >
          Alhijaz Real Estate
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#c1b071",
            letterSpacing: 2,
          }}
        >
          Luxury Properties in Saudi Arabia
        </div>
      </div>
    ),
    size,
  );
}
