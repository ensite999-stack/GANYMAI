import { BRAND_NAME } from '@/lib/brand'

export function BrandName({className}:{className?:string}) {
  return <span className={`notranslate brand-name${className?` ${className}`:''}`} translate="no" lang="en">{BRAND_NAME}</span>
}
