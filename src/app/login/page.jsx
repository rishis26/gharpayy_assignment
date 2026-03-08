"use client";
import { signIn } from "next-auth/react";
export default function Login() {
  return <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center',background:'#0F1C2E'}}>
    <button onClick={()=>signIn('credentials',{email:'admin@gharpayy.com',password:'123',callbackUrl:'/dashboard'})} style={{padding:'10px 20px',cursor:'pointer'}}>Enter CRM Admin</button>
  </div>
}
