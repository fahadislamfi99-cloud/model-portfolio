import { ImageResponse } from "next/og";


export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 104,
          background: "#0E0C0D",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D85E78",
          fontFamily: "serif",
          fontWeight: 400,
          borderRadius: 36,
          border: "2px solid rgba(216, 94, 120, 0.4)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
        }}
      >
        C
      </div>
    ),
    {
      ...size,
    }
  );
}
