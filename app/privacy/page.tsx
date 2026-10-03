import type { Metadata } from 'next'
import { BrandName } from '@/components/BrandName'

export const metadata:Metadata={
  title:'Privacy Policy',
  description:'How Ganymai handles personal information, browser storage, accounts, newsletter data and service providers.',
  alternates:{canonical:'/privacy'}
}

export default function Page(){
  return <section className="text-page legal-page">
    <div className="eyebrow">PRIVACY</div>
    <h1>Privacy policy.</h1>
    <p className="legal-updated">Last updated: 3 October 2026</p>

    <p><BrandName /> is an independent editorial website. This policy explains what information may be collected when you read the site, create or use an account, subscribe, contact us, or use editorial tools.</p>

    <h2>Information we may collect</h2>
    <ul>
      <li><strong>Account information:</strong> identifiers and authentication data needed to sign you in and secure your account.</li>
      <li><strong>Newsletter information:</strong> an email address and related subscription preferences when you choose to subscribe.</li>
      <li><strong>Editorial information:</strong> drafts, article metadata, uploaded media and other material entered through <BrandName /> Studio by authorised users.</li>
      <li><strong>Communications:</strong> information you send when contacting us.</li>
      <li><strong>Technical information:</strong> ordinary hosting, security and request logs generated when the site is delivered.</li>
    </ul>

    <h2>Browser storage</h2>
    <p>The site uses browser storage for functions such as theme preference and local Studio draft recovery. Authentication services may also store session information needed to keep authorised users signed in.</p>

    <h2>How information is used</h2>
    <p>We use information to operate and secure the site, publish and manage editorial material, provide requested subscriptions, respond to enquiries, preserve draft recovery where requested, prevent abuse, and maintain the reliability of the service.</p>

    <h2>Service providers</h2>
    <p><BrandName /> currently relies on infrastructure providers including Vercel for website hosting and delivery, and Supabase for database, authentication and related backend services. These providers may process technical or account information as necessary to provide their services under their own contractual and privacy obligations.</p>

    <h2>Sharing and sale of personal information</h2>
    <p>We do not sell personal information. Information may be disclosed to service providers that help operate the site, when required by law, or when reasonably necessary to protect the security, rights and integrity of the service or its users.</p>

    <h2>Retention</h2>
    <p>Information is retained only for as long as reasonably necessary for the purpose for which it was collected, for security and record-keeping, or as required by applicable law. Local drafts stored in your browser can be removed by clearing the relevant browser storage.</p>

    <h2>International processing</h2>
    <p>Because online infrastructure may operate across countries, information can be processed outside the country where you are located. Where applicable, service providers use legal and contractual safeguards for international transfers.</p>

    <h2>Your choices and rights</h2>
    <p>Depending on where you live, you may have rights to request access, correction, deletion or restriction of certain personal information, object to certain processing, withdraw consent, or lodge a complaint with a relevant data-protection authority. Newsletter recipients may unsubscribe from future messages.</p>

    <h2>Security</h2>
    <p>We use reasonable technical and organisational measures, including access controls and database-level permissions, to reduce the risk of unauthorised access. No internet service can guarantee absolute security.</p>

    <h2>Children</h2>
    <p><BrandName /> is a general-audience editorial publication and is not designed to collect personal information from young children. If you believe a child has provided personal information inappropriately, contact us so it can be reviewed.</p>

    <h2>Changes to this policy</h2>
    <p>We may update this policy when the site, its providers or applicable requirements change. The date at the top of this page shows the latest revision.</p>

    <h2>Contact</h2>
    <p>Privacy enquiries can be sent to <a href="mailto:hello@Ganymai.com">hello@Ganymai.com</a>.</p>
  </section>
}
