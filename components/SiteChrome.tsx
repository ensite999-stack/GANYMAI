'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Locale, locales, ui } from '@/lib/content'
import { BRAND_NAME } from '@/lib/brand'

export function SiteChrome({children}:{children:React.ReactNode}) {
  const pathname=usePathname()
  const [locale,setLocale] = useState<Locale>('en')
  const [menu,setMenu] = useState(false)
  const [search,setSearch] = useState(false)
  const [dark,setDark] = useState(false)
  const [visible,setVisible] = useState(true)
  const [solid,setSolid] = useState(false)
  const t = useMemo(()=>ui[locale],[locale])

  useEffect(()=>{
    const saved=(localStorage.getItem('ganymai-locale') as Locale|null)
    if(saved && locales.includes(saved)) setLocale(saved)
    setDark(localStorage.getItem('ganymai-theme')==='dark')
  },[])
  useEffect(()=>{ document.documentElement.dataset.theme=dark?'dark':'light'; localStorage.setItem('ganymai-theme',dark?'dark':'light') },[dark])
  useEffect(()=>{ localStorage.setItem('ganymai-locale',locale); document.documentElement.lang=locale },[locale])
  useEffect(()=>{
    let last=window.scrollY
    const onScroll=()=>{ const y=window.scrollY; setSolid(y>32); setVisible(y<80 || y<last); last=y }
    window.addEventListener('scroll',onScroll,{passive:true}); return()=>window.removeEventListener('scroll',onScroll)
  },[])

  if(pathname.startsWith('/studio')) return <>{children}</>

  return <>
    <header className={`topbar ${solid?'solid':''} ${visible?'show':'hide'}`}>
      <button className="logo" aria-label="Go back" onClick={()=>history.length>1?history.back():(location.href='/')}>Γ</button>
      <nav className="desktop-nav"><Link href="/archive">{t.archive}</Link><Link href="/subscribe">{t.subscribe}</Link><Link href="/signup">{t.signup}</Link></nav>
      <div className="top-actions">
        <button onClick={()=>setSearch(v=>!v)}>{t.search}</button>
        <button className="menu-button" aria-label={t.menu} onClick={()=>setMenu(true)}><i/><i/><i/></button>
      </div>
      {search && <div className="search-panel"><input autoFocus placeholder={`${t.search}…`} /><button onClick={()=>setSearch(false)}>×</button></div>}
    </header>

    {menu && <div className="menu-sheet" role="dialog" aria-modal="true">
      <div className="menu-head"><strong>{BRAND_NAME}</strong><button onClick={()=>setMenu(false)}>×</button></div>
      <div className="menu-grid">
        <div className="menu-links"><Link href="/about">{t.about}</Link><Link href="/">{t.essays}</Link><Link className="mobile-only" href="/archive">{t.archive}</Link><Link className="mobile-only" href="/signup">{t.signup}</Link><Link className="mobile-only" href="/subscribe">{t.subscribe}</Link><Link href="/contact">{t.contact}</Link><Link href="/donate">{t.donate}</Link></div>
        <div className="menu-meta"><button onClick={()=>setDark(false)}>{t.light}</button><button onClick={()=>setDark(true)}>{t.dark}</button><div className="locale-row">{locales.map(x=><button className={x===locale?'active':''} key={x} onClick={()=>setLocale(x)}>{x}</button>)}</div><div className="social"><a href="https://facebook.com">Facebook</a><a href="https://x.com">X</a></div></div>
      </div>
    </div>}

    <main>{children}</main>
    <footer><div><div className="footer-mark">Γ</div><h2>{BRAND_NAME}</h2><p>{t.dek}</p><p>{t.motto}</p></div><div><p>{t.categories}</p><p>© 2026 {BRAND_NAME}</p></div></footer>
  </>
}
