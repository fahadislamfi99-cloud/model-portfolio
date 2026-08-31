import { ImageResponse } from "next/og";


export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#0E0C0D",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D85E78",
          fontFamily: "serif",
          fontWeight: 400,
          borderRadius: 7,
          border: "1px solid rgba(216, 94, 120, 0.4)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
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
