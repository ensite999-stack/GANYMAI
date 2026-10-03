import type { Metadata } from 'next'
import { BrandName } from '@/components/BrandName'

export const metadata:Metadata={
  title:'Donation Statement',
  description:'How voluntary support relates to Ganymai editorial independence and donor expectations.',
  alternates:{canonical:'/donation-statement'}
}

export default function Page(){
  return <section className="text-page legal-page">
    <div className="eyebrow">DONATION STATEMENT</div>
    <h1>Donation statement.</h1>
    <p className="legal-updated">Last updated: 3 October 2026</p>

    <p>Voluntary support, if accepted by <BrandName />, is intended to help sustain independent editorial work, publishing infrastructure and access to the publication.</p>

    <h2>Editorial independence</h2>
    <p>A donation does not purchase editorial coverage, favourable treatment, the right to review unpublished work, or influence over conclusions, contributors or publication decisions.</p>

    <h2>No ownership or investment interest</h2>
    <p>Unless an offer explicitly states otherwise, a donation is not an investment, does not create an ownership interest, and does not entitle the donor to a financial return.</p>

    <h2>Payment providers</h2>
    <p>If online donations are enabled, the checkout will identify the payment provider handling the transaction. Payment information may be processed directly by that provider rather than stored by <BrandName />.</p>

    <h2>Transparency and conflicts</h2>
    <p>Material conflicts or sponsorship relationships connected to particular editorial work should be disclosed where appropriate. We may decline or return support where accepting it would create an unacceptable conflict with editorial independence.</p>

    <h2>Questions</h2>
    <p>Questions about donations or editorial independence can be sent to <a href="mailto:hello@Ganymai.com">hello@Ganymai.com</a>.</p>
  </section>
}
