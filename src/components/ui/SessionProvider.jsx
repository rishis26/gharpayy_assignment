"use client";
import { SessionProvider as P } from "next-auth/react";
export default function SessionProvider({ children }) { return <P>{children}</P>; }
