import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createPublicContentClient, sanitizePublishedHtml, type PublicBlock } from '@/lib/publicContent'

export const dynamic='force-dynamic'

export default async function Essay({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params
  const supabase=createPublicContentClient()
  if(!supabase) return notFound()

  const {data:article,error}=await supabase
    .from('articles')
    .select('id,slug,title,author_name,category_id,tags,cover_url,published_on')
    .eq('slug',slug)
    .eq('status','published')
    .maybeSingle()

  if(error||!article) return notFound()

  const [{data:blocks},{data:category}]=await Promise.all([
    supabase.from('article_blocks').select('id,position,block_type,content').eq('article_id',article.id).order('position',{ascending:true}),
    article.category_id
      ?supabase.from('categories').select('name').eq('id',article.category_id).maybeSingle()
      :Promise.resolve({data:null})
  ])

  return <article className="essay-page">
    <header className="essay-head">
      {category?.name&&<span>{category.name}</span>}
      <h1>{article.title}</h1>
      <p className="byline">By {article.author_name}</p>
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
