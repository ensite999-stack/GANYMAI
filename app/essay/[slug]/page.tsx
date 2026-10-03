import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArticleLabel } from '@/components/ArticleLabel'
import { ArticleShare } from '@/components/ArticleShare'
import { BRAND_NAME } from '@/lib/brand'
import { createPublicContentClient, sanitizePublishedHtml, type PublicBlock } from '@/lib/publicContent'
import { SITE_URL } from '@/lib/site'

export const dynamic='force-dynamic'

async function getPublishedArticle(slug:string){
  const supabase=createPublicContentClient()
  if(!supabase) return {supabase:null,article:null}
  const {data:article}=await supabase
    .from('articles')
    .select('id,slug,title,author_name,category_id,label_text,tags,cover_url,published_on,updated_at')
    .eq('slug',slug)
    .eq('status','published')
    .maybeSingle()
  return {supabase,article}
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params
  const {supabase,article}=await getPublishedArticle(slug)
  if(!supabase||!article) return {title:'Essay',robots:{index:false,follow:false}}

  const {data:firstBlock}=await supabase
    .from('article_blocks')
    .select('content')
    .eq('article_id',article.id)
    .eq('block_type','paragraph')
    .order('position',{ascending:true})
    .limit(1)
    .maybeSingle()

  const firstText=typeof firstBlock?.content?.text==='string'
    ?firstBlock.content.text.replace(/\s+/g,' ').trim()
    :''
  const description=(firstText||`An essay by ${article.author_name} on ${BRAND_NAME}.`).slice(0,160)
  const canonical=`/essay/${article.slug}`
  const images=article.cover_url?[{url:article.cover_url,alt:article.title}]:undefined

  return {
    title:article.title,
    description,
    authors:[{name:article.author_name}],
    keywords:article.tags||[],
    alternates:{canonical},
    openGraph:{
      type:'article',
      url:canonical,
      siteName:BRAND_NAME,
      title:article.title,
      description,
      publishedTime:article.published_on||undefined,
      modifiedTime:article.updated_at||undefined,
      authors:[article.author_name],
      tags:article.tags||[],
      images
    },
    twitter:{
      card:article.cover_url?'summary_large_image':'summary',
      title:article.title,
      description,
      images:article.cover_url?[article.cover_url]:undefined
    }
  }
}

export default async function Essay({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const {supabase,article}=await getPublishedArticle(slug)
  if(!supabase||!article) return notFound()

  const [{data:blocks},{data:category}]=await Promise.all([
    supabase.from('article_blocks').select('id,position,block_type,content').eq('article_id',article.id).order('position',{ascending:true}),
    article.category_id
      ?supabase.from('categories').select('name').eq('id',article.category_id).maybeSingle()
      :Promise.resolve({data:null})
  ])

  const label=article.label_text?.trim()||(category?.name?`Essay / ${category.name}`:'Essay')
  const url=`${SITE_URL}/essay/${article.slug}`
  const articleJsonLd={
    '@context':'https://schema.org',
    '@type':'Article',
    headline:article.title,
    author:{'@type':'Person',name:article.author_name},
    publisher:{'@type':'Organization',name:BRAND_NAME,url:SITE_URL},
    mainEntityOfPage:url,
    datePublished:article.published_on||undefined,
    dateModified:article.updated_at||article.published_on||undefined,
    articleSection:category?.name||undefined,
    keywords:(article.tags||[]).join(', '),
    image:article.cover_url?[article.cover_url]:undefined
  }

  return <article className="essay-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleJsonLd)}}/>

    <header className="essay-head">
      <ArticleLabel>{label}</ArticleLabel>
      <h1>{article.title}</h1>
      <p className="byline">By {article.author_name}</p>
      <ArticleShare title={article.title} url={url}/>
    </header>

    {article.cover_url&&<div className="published-cover">
      <Image src={article.cover_url} alt="" fill sizes="(max-width: 1100px) 100vw, 1100px" priority/>
    </div>}

    <div className="essay-body">
      {(blocks as PublicBlock[]|null)?.map(block=>{
        const content=block.content||{}
        if(block.block_type==='paragraph'){
          const html=typeof content.html==='string'?sanitizePublishedHtml(content.html):''
          const text=typeof content.text==='string'?content.text:''
          return html
            ?<div className="rich-paragraph" key={block.id} dangerouslySetInnerHTML={{__html:html}}/>
            :<p className="rich-paragraph" key={block.id}>{text}</p>
        }
        if(block.block_type==='image'&&typeof content.url==='string'&&content.url){
          const caption=typeof content.caption==='string'?content.caption:''
          return <figure className="published-figure" key={block.id}>
            <div className="published-image"><Image src={content.url} alt={caption} fill sizes="(max-width: 940px) 100vw, 940px"/></div>
            {caption&&<figcaption>{caption}</figcaption>}
          </figure>
        }
        return null
      })}
      {article.published_on&&<p className="article-date">{article.published_on}</p>}
    </div>
  </article>
}
