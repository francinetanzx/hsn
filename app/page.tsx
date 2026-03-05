"use client";

import { Divider, Typography } from 'antd';
import Game from "./game";

import { Box, Card, CardContent } from "@mui/material";
const { Title, Paragraph, Text, Link } = Typography;

export default function Home() {
  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4ecf7 100%)",
        }}
      >
        <Card
          sx={{
            width: 600,
            padding: 1,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // centers horizontally
            justifyContent: "center", // centers vertically if needed
            textAlign: "center", // centers text inside <p>
            gap: 2, // optional: space between elements
          }}>
            <p style={{ fontSize: "3rem", fontFamily: "PixelRegular" }}>Hello Mr Ho!</p>
            <div>
              <Game />
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
