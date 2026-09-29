import { NextResponse } from 'next/server'
import dns from 'node:dns/promises'
import net from 'node:net'

function privateIp(ip:string){
  if(net.isIPv4(ip)) return /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip)
  return ip==='::1' || ip.startsWith('fc') || ip.startsWith('fd') || ip.startsWith('fe80:')
}
function meta(html:string, key:string){
  const esc=key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
  const patterns=[new RegExp(`<meta[^>]+(?:property|name)=["']${esc}["'][^>]+content=["']([^"']+)["'][^>]*>`,'i'),new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${esc}["'][^>]*>`,'i')]
  for(const p of patterns){const m=html.match(p); if(m) return m[1]}
  return ''
}
export async function POST(req:Request){
  try{
    const {url}=await req.json(); const u=new URL(url)
    if(!['http:','https:'].includes(u.protocol)) return NextResponse.json({error:'Unsupported protocol'},{status:400})
    const addrs=await dns.lookup(u.hostname,{all:true}); if(addrs.some(x=>privateIp(x.address))) return NextResponse.json({error:'Private network targets are blocked'},{status:400})
    const res=await fetch(u,{redirect:'follow',signal:AbortSignal.timeout(6000),headers:{'user-agent':'GanymaiMetadataBot/1.0'}})
    const type=res.headers.get('content-type')||''
    if(type.startsWith('image/')) return NextResponse.json({kind:'image',image:res.url,source:u.hostname})
    const html=(await res.text()).slice(0,600000)
    return NextResponse.json({kind:'page',title:meta(html,'og:title')||meta(html,'twitter:title'),image:meta(html,'og:image')||meta(html,'twitter:image'),author:meta(html,'author')||meta(html,'article:author')||meta(html,'byl'),site:meta(html,'og:site_name')||u.hostname,canonical:res.url})
  }catch{return NextResponse.json({error:'Could not parse this link'},{status:400})}
}
