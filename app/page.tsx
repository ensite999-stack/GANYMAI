import Link from 'next/link'
import { ArticleLabel, type ArticleLabelIcon } from '@/components/ArticleLabel'
import { BrandName } from '@/components/BrandName'
import { createPublicContentClient, type PublicArticle } from '@/lib/publicContent'

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
      .limit(8)

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

  return <>
    <section className="hero">
      <div className="eyebrow"><BrandName /> / ESSAYS</div>
      <h1>People are never outside the world they describe.</h1>
      <p>Clear, vivid writing on the relations that bind a person to nature, power, memory, history and other people.</p>
    </section>

    {!!articles.length&&<section className="home-articles" aria-label="Latest essays">
      <div className="section-rule"><h2>Latest essays</h2></div>
      <div className="home-article-list">
        {articles.map((article,index)=><article className={`home-article-card ${index===0?'lead':''}`} key={article.id}>
          <Link className="home-card-link" href={`/essay/${article.slug}`}>
            {article.cover_url&&<div className="home-card-cover">
              <img src={article.cover_url} alt="" loading={index===0?'eager':'lazy'}/>
            </div>}
            <div className="home-card-copy">
              <ArticleLabel icon={(article.label_icon||'bookmark') as ArticleLabelIcon}>
                {article.label_text?.trim()||'Essay'}
              </ArticleLabel>
              <h2>{article.title}</h2>
              {firstParagraph.get(article.id)&&<p className="home-card-dek">{excerpt(firstParagraph.get(article.id)!)}</p>}
              <p className="home-card-author">{article.author_name}</p>
            </div>
          </Link>
        </article>)}
      </div>
    </section>}

    <section className="manifesto home-manifesto">
      <p><BrandName /> comes from the Ancient Greek <em>γάνυμαι</em>: to brighten up, to be glad. The name is not a promise of optimism. It is a reminder that attention can make the world more vivid.</p>
      <Link href="/about">About <BrandName /> →</Link>
    </section>
  </>
}
