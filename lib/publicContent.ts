import { createClient } from '@supabase/supabase-js'

export type PublicArticle = {
  id:string
  slug:string
  title:string
  author_name:string
  category_id:number|null
  label_text:string|null
  label_icon:'bookmark'|'book'|'document'|'eye'|'leaf'
  tags:string[]
  cover_url:string|null
  published_on:string|null
  updated_at?:string|null
}

export type PublicBlock = {
  id:string
  article_id?:string
  position:number
  block_type:string
  content:Record<string,unknown>
}

export function createPublicContentClient(){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL
  const key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  if(!url||!key) return null
  return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}})
}

function escapeTag(tag:string){
  return tag.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function safeColor(value:string){
  const v=value.trim()
  if(/^#[0-9a-f]{3,8}$/i.test(v)) return v
  if(/^rgba?\([0-9.,%\s]+\)$/i.test(v)) return v
  if(/^hsla?\([0-9.,%\s]+\)$/i.test(v)) return v
  return null
}

export function sanitizePublishedHtml(input:string){
  return input.split(/(<[^>]*>)/g).map(part=>{
    if(!part.startsWith('<')) return part
    if(/^<br\s*\/?\s*>$/i.test(part)) return '<br>'
    const basic=part.match(/^<\s*(\/?)\s*(strong|b|em|i|u)\s*>$/i)
    if(basic) return `<${basic[1]}${basic[2].toLowerCase()}>`
    if(/^<\s*\/\s*span\s*>$/i.test(part)) return '</span>'
    const span=part.match(/^<\s*span\s+style=(["'])(.*?)\1\s*>$/i)
    if(span){
      const safe:string[]=[]
      for(const declaration of span[2].split(';')){
        const [rawKey,...rest]=declaration.split(':')
        const key=rawKey?.trim().toLowerCase()
        const value=rest.join(':').trim()
        if(key==='color'){
          const color=safeColor(value)
          if(color) safe.push(`color:${color}`)
        }
        if(key==='font-size'&&/^(1\.25em|1\.5em|2em)$/.test(value)) safe.push(`font-size:${value}`)
      }
      return safe.length?`<span style="${safe.join(';')}">`:'<span>'
    }
    return escapeTag(part)
  }).join('')
}
