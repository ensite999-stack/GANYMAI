import type { Metadata } from 'next'
import Link from 'next/link'
import { createPublicContentClient, type PublicArticle } from '@/lib/publicContent'

export const dynamic='force-dynamic'
export const metadata:Metadata={
  title:'Archive',
  description:'Browse published Ganymai essays.',
  alternates:{canonical:'/archive'}
}

export default async function Archive(){
  const supabase=createPublicContentClient()
  let articles:PublicArticle[]=[]
  if(supabase){
    const {data}=await supabase
      .from('articles')
      .select('id,slug,title,author_name,category_id,label_text,tags,cover_url,published_on,updated_at')
      .eq('status','published')
      .order('published_on',{ascending:false})
      .order('created_at',{ascending:false})
    articles=(data||[]) as PublicArticle[]
  }

  return <section className="text-page archive-page">
    <div className="eyebrow">ARCHIVE</div>
    <h1>Essays</h1>
    {!articles.length
      ?<p className="empty-state">No essays have been published yet.</p>
      :<div className="published-archive">
        {articles.map(article=><article className="archive-item" key={article.id}>
          <div className="archive-date">{article.published_on||'—'}</div>
          <div>
            <h2><Link href={`/essay/${article.slug}`}>{article.title}</Link></h2>
            <p>By {article.author_name}</p>
          </div>
        </article>)}
      </div>}
  </section>
}
