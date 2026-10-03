import type { ReactNode } from 'react'

export function ArticleLabel({children,className}:{children:ReactNode;className?:string}){
  return <div className={`article-label${className?` ${className}`:''}`}>
    <svg viewBox="0 0 24 28" aria-hidden="true">
      <path d="M4.5 2.5h15v22l-7.5-4.6-7.5 4.6v-22Z"/>
    </svg>
    <span>{children}</span>
  </div>
}
