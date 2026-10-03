'use client'

import { useEffect } from 'react'
import { BRAND_NAME } from '@/lib/brand'

export function BrandTitleGuard() {
  useEffect(()=>{
    const restore=()=>{
      if(!document.title.includes(BRAND_NAME)) document.title=BRAND_NAME
    }
    restore()
    const observer=new MutationObserver(restore)
    observer.observe(document.head,{subtree:true,childList:true,characterData:true})
    window.addEventListener('focus',restore)
    document.addEventListener('visibilitychange',restore)
    return()=>{
      observer.disconnect()
      window.removeEventListener('focus',restore)
      document.removeEventListener('visibilitychange',restore)
    }
  },[])
  return null
}
