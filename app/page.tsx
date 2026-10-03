import Link from 'next/link'
import {BrandName} from '@/components/BrandName'
import {HomeArticleStream,type HomeArticleItem} from '@/components/HomeArticleStream'
import {createPublicContentClient,type PublicArticle} from '@/lib/publicContent'

export const dynamic='force-dynamic'

function excerpt(value:string){
  const clean=value.replace(/\s+/g,' ').trim()
  return clean.length>190?`${clean.slice(0,187).trimEnd()}…`:clean
}

export default async function Home(){
  const supabase=createPublicContentClient()
  let articles:PublicArticle[]=[]
  const firstParagraph=new Map<string,string>()

  if(supabase){
    const {data}=await supabase
      .from('articles')
      .select('id,slug,title,author_name,category_id,label_text,label_icon,tags,cover_url,published_on,updated_at')
      .eq('status','published')
      .order('published_on',{ascending:false})
      .order('created_at',{ascending:false})
      .limit(20)

    articles=(data||[]) as PublicArticle[]

    if(articles.length){
      const {data:blocks}=await supabase
        .from('article_blocks')
        .select('article_id,position,content')
        .in('article_id',articles.map(a=>a.id))
        .eq('block_type','paragraph')
        .order('position',{ascending:true})

      for(const block of blocks||[]){
        if(firstParagraph.has(block.article_id)) continue
        const text=typeof block.content?.text==='string'?block.content.text:''
        if(text.trim()) firstParagraph.set(block.article_id,text)
      }
    }
  }

  const streamItems:HomeArticleItem[]=articles.map(article=>({
    id:article.id,
    slug:article.slug,
    title:article.title,
    author:article.author_name,
    label:article.label_text?.trim()||'Essay',
    icon:article.label_icon||'bookmark',
    cover:article.cover_url,
    excerpt:excerpt(firstParagraph.get(article.id)||'')
  }))

  return <>
    <section className="hero">
      <div className="eyebrow"><BrandName /> / ESSAYS</div>
      <h1>People are never outside the world they describe.</h1>
      <p>Clear, vivid writing on the relations that bind a person to nature, power, memory, history and other people.</p>
    </section>

    <section className="manifesto home-manifesto">
      <p><BrandName /> comes from the Ancient Greek <em>γάνυμαι</em>: to brighten up, to be glad. The name is not a promise of optimism. It is a reminder that attention can make the world more vivid.</p>
      <Link href="/about">About <BrandName /> →</Link>
    </section>

    <HomeArticleStream articles={streamItems}/>
  </>
}
