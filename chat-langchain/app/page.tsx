'use client';

import { ChatWindow } from "../app/components/ChatWindow";
import Navbar from "../app/components/Navbar";
import { ToastContainer } from "react-toastify";

import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <Navbar />
      <ToastContainer />
      <ChatWindow
        apiBaseUrl={process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8081"}
        titleText="Devbox Chat"
        placeholder="What is Oxford scholarship?"
      ></ChatWindow>
    </ChakraProvider>
  );
}
