'use client'
import {useEffect,useMemo,useRef,useState} from 'react'
import {createSupabaseBrowserClient} from '@/lib/supabase'

type Block={id:string,type:'paragraph'|'image',text?:string,url?:string,caption?:string,author?:string,source?:string,fingerprint?:string,collapsed?:boolean}
const id=()=>crypto.randomUUID()

export function StudioEditor(){
  const [title,setTitle]=useState(''); const [author,setAuthor]=useState(''); const [category,setCategory]=useState('Philosophy'); const [tags,setTags]=useState(''); const [cover,setCover]=useState(''); const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [blocks,setBlocks]=useState<Block[]>([{id:id(),type:'paragraph',text:''}]); const [notice,setNotice]=useState('Draft autosaves locally.'); const fileRef=useRef<HTMLInputElement>(null); const [target,setTarget]=useState<string|null>(null)
  useEffect(()=>{const d=localStorage.getItem('ganymai-draft'); if(d){try{const x=JSON.parse(d); setTitle(x.title||''); setAuthor(x.author||''); setCategory(x.category||'Philosophy'); setTags(x.tags||''); setCover(x.cover||''); setDate(x.date||date); setBlocks(x.blocks?.length?x.blocks:blocks)}catch{}}},[])
  useEffect(()=>{const t=setTimeout(()=>localStorage.setItem('ganymai-draft',JSON.stringify({title,author,category,tags,cover,date,blocks})),250); return()=>clearTimeout(t)},[title,author,category,tags,cover,date,blocks])
  const used=useMemo(()=>new Set(blocks.filter(b=>b.type==='image'&&b.url).map(b=>b.url)),[blocks])
  const isDuplicate=(bid:string,url:string)=>blocks.some(b=>b.id!==bid&&b.type==='image'&&b.url===url)
  function addAfter(after:string,type:Block['type']){setBlocks(bs=>{const i=bs.findIndex(b=>b.id===after); const n:Block={id:id(),type,...(type==='paragraph'?{text:''}:{url:'',caption:'',author:'',source:''})}; return [...bs.slice(0,i+1),n,...bs.slice(i+1)]})}
  function patch(bid:string,p:Partial<Block>){setBlocks(bs=>bs.map(b=>b.id===bid?{...b,...p}:b))}
  async function parseInto(bid:string,url:string){ if(isDuplicate(bid,url)){setNotice('Duplicate image blocked: this URL already exists in the article.');return} setNotice('Parsing source…'); try{const r=await fetch('/api/parse-link',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url})}); const m=await r.json(); if(!r.ok) throw new Error(m.error); const image=m.image||url; if(isDuplicate(bid,image)){setNotice('Duplicate image blocked after link parsing.');return} patch(bid,{url:image,author:m.author||'',source:m.site||m.source||new URL(url).hostname,caption:m.title||''}); setNotice('Source metadata parsed. Review attribution before publishing.')}catch(e){setNotice(e instanceof Error?e.message:'Parse failed') } }
  async function upload(bid:string,file:File){
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',await file.arrayBuffer()))).map(x=>x.toString(16).padStart(2,'0')).join('')
    if(blocks.some(b=>b.id!==bid&&b.fingerprint===digest)){setNotice('Duplicate upload blocked: the same file is already in this article.');return}
    const supabase=createSupabaseBrowserClient()
    if(supabase){
      const {data:{user}}=await supabase.auth.getUser()
      if(user){
        const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-'); const path=`${user.id}/${Date.now()}-${safe}`
        const {error}=await supabase.storage.from('media').upload(path,file,{upsert:false,contentType:file.type})
        if(!error){const {data}=supabase.storage.from('media').getPublicUrl(path); patch(bid,{url:data.publicUrl,caption:file.name,source:'Ganymai upload',fingerprint:digest}); setNotice('Image uploaded to Supabase Storage.'); return}
        setNotice(`Upload failed: ${error.message}. Showing a local preview instead.`)
      }
    }
    const u=URL.createObjectURL(file); patch(bid,{url:u,caption:file.name,source:'Local preview',fingerprint:digest}); setNotice('Local preview inserted. Sign in and connect Supabase Storage for persistent uploads.')
  }
  async function publish(){
    const supabase=createSupabaseBrowserClient(); if(!supabase){setNotice('Add Supabase URL and publishable key before publishing.');return}
    const {data:{user},error:userError}=await supabase.auth.getUser(); if(userError||!user){setNotice('Sign in before publishing.');return}
    if(!title.trim()||!author.trim()){setNotice('Title and author are required.');return}
    const slugBase=title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').slice(0,70)||'essay'
    const {data:cat}=await supabase.from('categories').select('id').eq('name',category).maybeSingle()
    const slug=`${slugBase}-${Date.now().toString().slice(-6)}`
    const {data:article,error}=await supabase.from('articles').insert({slug,title,author_name:author,category_id:cat?.id??null,cover_url:cover||null,status:'published',published_on:date,tags:tags.split(',').map(x=>x.trim()).filter(Boolean),created_by:user.id}).select('id').single()
    if(error||!article){setNotice(`Publish failed: ${error?.message||'Could not create article'}`);return}
    const rows=blocks.map((b,position)=>({article_id:article.id,position,block_type:b.type,content:b.type==='paragraph'?{text:b.text||''}:{url:b.url||'',caption:b.caption||'',original_author:b.author||'',source:b.source||'',fingerprint:b.fingerprint||''}}))
    const {error:blockError}=await supabase.from('article_blocks').insert(rows)
    if(blockError){await supabase.from('articles').delete().eq('id',article.id); setNotice(`Publish rolled back: ${blockError.message}`);return}
    setNotice(`Published as ${slug}.`)
  }
  return <div className="studio-shell"><aside><div className="studio-logo">Γ</div><b>Ganymai Studio</b><p>Modular article editor</p><a href="/">← Public site</a></aside><section className="studio-main">
    <div className="studio-top"><div><small>ARTICLE</small><h1>{title||'Untitled draft'}</h1></div><div><button onClick={()=>setNotice('Draft saved locally.')}>Save draft</button><button className="primary" onClick={publish}>Publish</button></div></div>
    <div className="notice">{notice}</div>
    <div className="field-grid"><label>Title<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Article title"/></label><label>Author<input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author"/></label><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{['Philosophy','Nature','Human rights','Environment','Society','History','Politics'].map(x=><option key={x}>{x}</option>)}</select></label><label>Tags<input value={tags} onChange={e=>setTags(e.target.value)} placeholder="world, memory, river"/></label><label className="full">Cover<input value={cover} onChange={e=>setCover(e.target.value)} placeholder="Paste image URL or upload in media block"/></label></div>
    <div className="blocks"><div className="blocks-head"><h2>Body</h2><p>Paragraphs collapse after editing. Insert controls stay beside the current block.</p></div>{blocks.map((b,i)=><div className={`block ${b.collapsed?'collapsed':''}`} key={b.id}>
      <div className="block-index">{String(i+1).padStart(2,'0')}</div>
      <div className="block-content">{b.type==='paragraph'?<><textarea value={b.text||''} onFocus={()=>patch(b.id,{collapsed:false})} onBlur={()=>b.text&&patch(b.id,{collapsed:true})} onChange={e=>patch(b.id,{text:e.target.value})} placeholder="Write a paragraph…"/><button className="fold" onClick={()=>patch(b.id,{collapsed:!b.collapsed})}>{b.collapsed?'Expand':'Fold'}</button></>:<div className="image-block"><input value={b.url||''} onChange={e=>patch(b.id,{url:e.target.value})} placeholder="Image or source URL"/><div className="image-actions"><button onClick={()=>b.url&&parseInto(b.id,b.url)}>Parse link</button><button onClick={()=>{setTarget(b.id);fileRef.current?.click()}}>Upload</button></div>{b.url&&<div className="media-preview"><div>IMAGE PREVIEW</div><small>{b.url}</small></div>}<input value={b.caption||''} onChange={e=>patch(b.id,{caption:e.target.value})} placeholder="Caption"/><div className="split"><input value={b.author||''} onChange={e=>patch(b.id,{author:e.target.value})} placeholder="Original author"/><input value={b.source||''} onChange={e=>patch(b.id,{source:e.target.value})} placeholder="Source"/></div></div>}</div>
      <div className="insert-rail"><button onClick={()=>addAfter(b.id,'paragraph')}>+ Text</button><button onClick={()=>addAfter(b.id,'image')}>+ Image</button></div>
    </div>)}</div>
    <input ref={fileRef} hidden type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0]; if(f&&target) upload(target,f); e.currentTarget.value=''}}/>
    <label className="date-field">Date<input type="date" value={date} onChange={e=>setDate(e.target.value)}/><small>Date stays at the end of the editing flow and at the end of the published article.</small></label>
  </section></div>
}
