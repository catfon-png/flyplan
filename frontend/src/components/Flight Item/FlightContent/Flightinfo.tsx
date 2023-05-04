import React from 'react'

export default function Flightinfo() {
    return (
        <>
            {/* solid content */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <hr
                    style={{
                        border: "none",
                        borderTop: "3px solid black",
                        margin: "0 10px",
                        height: "3px",
                        zIndex: "0",
                        width: "100%",
                    }}
                />
                <span
                    style={{
                        position: "absolute",
                        top: "-5px",
                        left: "0",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: "black",
                    }}
                ></span>
                <span
                    style={{
                        position: "absolute",
                        top: "-5px",
                        right: "0",
                        width: "15px",
                        height: "15px",
                        borderRadius: "50%",
                        backgroundColor: "black",
                    }}
                ></span>
            </div>
            {/* solid content */}
        </>
    )
}
