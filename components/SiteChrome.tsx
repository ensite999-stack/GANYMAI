'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ui } from '@/lib/content'
import { BrandName } from '@/components/BrandName'
import { BrandMark } from '@/components/BrandMark'

export function SiteChrome({children}:{children:React.ReactNode}) {
  const pathname=usePathname()
  const [dark,setDark] = useState(false)
  const [menuMounted,setMenuMounted] = useState(false)
  const [menuOpen,setMenuOpen] = useState(false)
  const [search,setSearch] = useState(false)
  const [visible,setVisible] = useState(true)
  const [solid,setSolid] = useState(false)
  const t = ui.en
  const currentYear = new Date().getFullYear()

  useEffect(()=>{
    setDark(localStorage.getItem('ganymai-theme')==='dark')
  },[])
  useEffect(()=>{
    document.documentElement.dataset.theme=dark?'dark':'light'
    localStorage.setItem('ganymai-theme',dark?'dark':'light')
  },[dark])
  useEffect(()=>{
    let last=window.scrollY
    const onScroll=()=>{ const y=window.scrollY; setSolid(y>32); setVisible(y<80 || y<last); last=y }
    window.addEventListener('scroll',onScroll,{passive:true})
    return()=>window.removeEventListener('scroll',onScroll)
  },[])
  useEffect(()=>{
    if(!menuMounted) return
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') closeMenu() }
    document.body.style.overflow='hidden'
    window.addEventListener('keydown',onKey)
    return()=>{
      document.body.style.overflow=''
      window.removeEventListener('keydown',onKey)
    }
  },[menuMounted])

  function openMenu(){
    setSearch(false)
    setMenuMounted(true)
    requestAnimationFrame(()=>setMenuOpen(true))
  }
  function closeMenu(){
    setMenuOpen(false)
    window.setTimeout(()=>setMenuMounted(false),320)
  }

  if(pathname.startsWith('/studio')) return <>{children}</>

  return <>
    <header className={`topbar ${solid?'solid':''} ${visible?'show':'hide'}`}>
      <button className="logo" aria-label="Go back" onClick={()=>history.length>1?history.back():(location.href='/')}><BrandMark className="brand-mark" /></button>
      <div className="top-actions">
        <button className="search-button" onClick={()=>setSearch(v=>!v)}>{t.search}</button>
        <Link className="desktop-only top-link" href="/subscribe">{t.subscribe}</Link>
        <Link className="desktop-only top-link" href="/archive">{t.archive}</Link>
        <button className="menu-button" aria-label={t.menu} aria-expanded={menuMounted} onClick={openMenu}><i/><i/><i/></button>
      </div>
      {search && <div className="search-panel"><input autoFocus placeholder={`${t.search}…`} /><button onClick={()=>setSearch(false)}>×</button></div>}
    </header>

    {menuMounted && <div className={`menu-layer ${menuOpen?'open':''}`}>
      <button className="menu-backdrop" aria-label={t.closeMenu} onClick={closeMenu}/>
      <aside className="menu-drawer" role="dialog" aria-modal="true" aria-label={t.menu}>
        <div className="menu-head">
          <strong><BrandName /></strong>
          <button className="drawer-close" aria-label={t.closeMenu} onClick={closeMenu}><i/><i/><i/></button>
        </div>
        <nav className="menu-links">
          <Link onClick={closeMenu} href="/about">{t.about}</Link>
          <Link onClick={closeMenu} href="/">{t.essays}</Link>
          <Link className="mobile-only" onClick={closeMenu} href="/subscribe">{t.subscribe}</Link>
          <Link className="mobile-only" onClick={closeMenu} href="/archive">{t.archive}</Link>
          <Link onClick={closeMenu} href="/signup">{t.signup}</Link>
          <Link onClick={closeMenu} href="/contact">{t.contact}</Link>
          <Link onClick={closeMenu} href="/donate">{t.donate}</Link>
        </nav>
        <div className="menu-controls">
          <button className="setting-button" onClick={()=>setDark(v=>!v)}>
            <span>{t.theme}</span><b>{dark?t.dark:t.light}</b>
          </button>
          <div className="social" aria-label="Social links">
            <a className="social-icon" href="https://facebook.com" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 21v-8h2.8l.42-3.12H13.4V7.9c0-.9.27-1.52 1.63-1.52h1.74V3.6c-.3-.04-1.33-.12-2.53-.12-2.5 0-4.22 1.46-4.22 4.15v2.25H7.2V13h2.82v8h3.38Z"/></svg>
            </a>
            <a className="social-icon" href="https://x.com" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5 18.7 20M18.7 4.5 5 20"/></svg>
            </a>
          </div>
        </div>
      </aside>
    </div>}

    <main>{children}</main>
    <footer className="site-footer">
      <div className="footer-brand"><BrandName /></div>
      <p className="footer-motto">{t.motto}</p>
      <nav className="footer-links" aria-label="Footer">
        <Link href="/about">{t.aboutUs}</Link>
        <Link href="/archive">{t.ourArchive}</Link>
        <Link href="/commenting-principles">{t.commentingPrinciples}</Link>
        <Link href="/privacy">{t.privacyPolicy}</Link>
        <Link href="/terms">{t.termsOfUse}</Link>
        <Link href="/accessibility">{t.accessibilityStatement}</Link>
        <Link href="/donation-statement">{t.donationStatement}</Link>
        <Link href="/contact">{t.contactUs}</Link>
      </nav>
      <p className="footer-copyright">© <span suppressHydrationWarning>{currentYear}</span> <BrandName /></p>
    </footer>
  </>
}
