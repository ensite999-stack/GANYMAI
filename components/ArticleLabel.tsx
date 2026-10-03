import type { ReactNode } from 'react'

export type ArticleLabelIcon='bookmark'|'book'|'document'|'eye'|'leaf'

function LabelIcon({type}:{type:ArticleLabelIcon}){
  if(type==='book') return <svg viewBox="0 0 28 26" aria-hidden="true"><path d="M3 4.5c4.2-.9 7.8-.2 11 2.1v16.2c-3.2-2.2-6.8-2.9-11-2V4.5Zm22 0c-4.2-.9-7.8-.2-11 2.1v16.2c3.2-2.2 6.8-2.9 11-2V4.5Z"/><path d="M14 6.6v16.2"/></svg>
  if(type==='document') return <svg viewBox="0 0 24 28" aria-hidden="true"><path d="M5 2.5h9l5 5v18H5v-23Z"/><path d="M14 2.5v5h5M8 13h8M8 17h8"/></svg>
  if(type==='eye') return <svg viewBox="0 0 28 22" aria-hidden="true"><path d="M2 11s4.3-7 12-7 12 7 12 7-4.3 7-12 7S2 11 2 11Z"/><circle cx="14" cy="11" r="3.2"/></svg>
  if(type==='leaf') return <svg viewBox="0 0 26 28" aria-hidden="true"><path d="M22.5 3.5C13.8 3.7 6.6 7.6 4 14.2c-2 5.1 1 9.2 5.2 8.6 6.8-1 11.9-8.4 13.3-19.3Z"/><path d="M5.2 22.4C8 17 12.7 12.5 18.8 8.9"/></svg>
  return <svg viewBox="0 0 24 28" aria-hidden="true"><path d="M4.5 2.5h15v22l-7.5-4.6-7.5 4.6v-22Z"/></svg>
}

export function ArticleLabel({children,className,icon='bookmark'}:{children:ReactNode;className?:string;icon?:ArticleLabelIcon}){
  return <div className={`article-label${className?` ${className}`:''}`}>
    <LabelIcon type={icon}/>
    <span>{children}</span>
  </div>
}
