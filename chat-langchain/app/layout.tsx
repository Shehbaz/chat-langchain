import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat Devbox',
  description: 'Chatbot for Devbox',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="flex flex-col p-8 h-full" style={{"background" : "rgb(38, 38, 41)"}}>
          {children}
        </div>
      </body>
    </html>
  )
}
