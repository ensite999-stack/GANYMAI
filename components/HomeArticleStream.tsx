'use client'

import {useState} from 'react'
import Link from 'next/link'
import {ArticleLabel,type ArticleLabelIcon} from '@/components/ArticleLabel'

export type HomeArticleItem={
  id:string
  slug:string
  title:string
  author:string
  label:string
  icon:ArticleLabelIcon
  cover:string|null
  excerpt:string
}

export function HomeArticleStream({articles}:{articles:HomeArticleItem[]}){
  const [visible,setVisible]=useState(Math.min(6,articles.length))
  const shown=articles.slice(0,visible)
  const hasMore=visible<articles.length

  if(!articles.length) return <div className="more-wrap more-wrap-standalone"><Link className="more-button" href="/archive">MORE</Link></div>

  return <section className="home-articles" aria-label="Latest essays">
    <div className="section-rule"><h2>Latest essays</h2></div>
    <div className="home-article-list">
      {shown.map((article,index)=><article className={`home-article-card ${index===0?'lead':''}`} key={article.id}>
        <Link className="home-card-link" href={`/essay/${article.slug}`}>
          {article.cover&&<div className="home-card-cover">
            <img src={article.cover} alt="" loading={index===0?'eager':'lazy'}/>
          </div>}
          <div className="home-card-copy">
            <ArticleLabel icon={article.icon}>{article.label}</ArticleLabel>
            <h2>{article.title}</h2>
            {article.excerpt&&<p className="home-card-dek">{article.excerpt}</p>}
            <p className="home-card-author">{article.author}</p>
          </div>
        </Link>
      </article>)}
    </div>

    <div className="more-wrap">
      {hasMore
        ?<button className="more-button" onClick={()=>setVisible(v=>Math.min(v+4,articles.length))}>MORE</button>
        :<Link className="more-button" href="/archive">MORE</Link>}
    </div>
  </section>
}
