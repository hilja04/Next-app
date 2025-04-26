'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AppBar, Tabs, Tab, Toolbar, Typography, Container } from "@mui/material";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  //Navigation
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Todo App
            </Typography>
            <Tabs value={selectedTab} onChange={handleTabChange} textColor="inherit">
              <Tab label="Todos" component={Link} href="/" />
              <Tab label="Categories" component={Link} href="/categories" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 4 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
