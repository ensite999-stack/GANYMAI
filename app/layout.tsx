import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/SiteChrome'
import { BrandTitleGuard } from '@/components/BrandTitleGuard'
import { BRAND_NAME } from '@/lib/brand'

const manrope = Manrope({ subsets:['latin'], weight:['700','800'], variable:'--font-brand' })

export const metadata: Metadata = {
  title: BRAND_NAME,
  applicationName: BRAND_NAME,
  description:'Essays on people and the world: philosophy, nature, human rights, environment, society, history and politics.',
  openGraph:{title:BRAND_NAME,description:'Essays on people and the world.'},
  twitter:{title:BRAND_NAME,description:'Essays on people and the world.'}
}

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body className={manrope.variable}><BrandTitleGuard/><SiteChrome>{children}</SiteChrome></body></html>
}
