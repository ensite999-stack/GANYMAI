import type { Metadata } from 'next'
import './globals.css'
import { SiteChrome } from '@/components/SiteChrome'
import { BRAND_NAME } from '@/lib/brand'

export const metadata: Metadata = { title:`${BRAND_NAME} — People and the world`, description:'Essays on people and the world: philosophy, nature, human rights, environment, society, history and politics.' }

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en" translate="no"><head><meta name="google" content="notranslate" /></head><body><SiteChrome>{children}</SiteChrome></body></html>
}
