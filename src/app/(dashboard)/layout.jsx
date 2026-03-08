"use client";
import Sidebar from "@/components/layout/Sidebar";
export default function Layout({ children }) {
  return (<div style={{ display:"flex" }}><Sidebar /><main style={{ flex:1, padding:30, height:"100vh", overflowY:"auto" }}>{children}</main></div>);
}
