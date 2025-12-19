import React from "react";

// ✅ Updated path to point to the public folder for Next.js
const websocketLogo = "/assets/images/icons/websocket-logo.png";

const COLORS = {
    connected: "bg-green-500/20",
    connecting: "bg-yellow-500/20",
};

export default function WebsocketIcon({
    status = "connected", // Added default to prevent undefined errors
    size = 40,
    className = "",
    animated = true,
}) {
    const bgColor = COLORS[status] || "bg-gray-500/20";
    const ariaLabel = `WebSocket ${status}`;
    const pulse = status === "connecting" && animated ? "animate-pulse" : "";

    return (
        <span
            role="img"
            aria-label={ariaLabel}
            className={`inline-flex items-center justify-center rounded-full ${bgColor} ${pulse} ${className}`}
            style={{
                width: size,
                height: size,
            }}
        >
            <img
                src={websocketLogo}
                alt="WebSocket Logo"
                className="object-contain w-[70%] h-[70%] brightness-0 invert"
            />
        </span>
    );
}