'use client'

import { useState } from 'react'

export function ArticleShare({title,url}:{title:string;url:string}){
  const [copied,setCopied]=useState(false)

  async function copyLink(){
    try{
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(()=>setCopied(false),1800)
    }catch{
      window.prompt('Copy this link',url)
    }
  }

  async function share(){
    if(navigator.share){
      try{await navigator.share({title,url});return}catch{}
    }
    await copyLink()
  }

  const x=`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedin=`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return <div className="article-share" aria-label="Share this article">
    <span>Share</span>
    <button onClick={share}>Share…</button>
    <a href={x} target="_blank" rel="noopener noreferrer" aria-label="Share on X">X</a>
    <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">LinkedIn</a>
    <button onClick={copyLink}>{copied?'Copied':'Copy link'}</button>
  </div>
}
