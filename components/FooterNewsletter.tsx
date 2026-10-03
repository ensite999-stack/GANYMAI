'use client'

import {FormEvent,useState} from 'react'
import Link from 'next/link'
import {createSupabaseBrowserClient} from '@/lib/supabase'

export function FooterNewsletter(){
  const [email,setEmail]=useState('')
  const [frequency,setFrequency]=useState<'daily'|'weekly'>('weekly')
  const [status,setStatus]=useState('')
  const [busy,setBusy]=useState(false)

  async function submit(e:FormEvent){
    e.preventDefault()
    const value=email.trim().toLowerCase()
    if(!/^\S+@\S+\.\S+$/.test(value)){setStatus('Enter a valid email address.');return}
    const supabase=createSupabaseBrowserClient()
    if(!supabase){setStatus('Newsletter service is unavailable.');return}
    setBusy(true)
    setStatus('')
    const {error}=await supabase.from('subscribers').insert({email:value,frequency,locale:'en'})
    setBusy(false)
    if(error){
      if(error.code==='23505') setStatus('This email is already subscribed.')
      else setStatus('Could not subscribe. Please try again.')
      return
    }
    setEmail('')
    setStatus('Subscribed.')
  }

  return <section className="footer-newsletter" aria-labelledby="footer-newsletter-title">
    <h2 id="footer-newsletter-title">Sign up to our newsletter</h2>
    <p>New essays and editorial updates from Ganymai.</p>
    <form onSubmit={submit}>
      <input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address"/>
      <div className="newsletter-frequency" role="group" aria-label="Newsletter frequency">
        <label><input type="radio" name="frequency" checked={frequency==='daily'} onChange={()=>setFrequency('daily')}/> Daily</label>
        <label><input type="radio" name="frequency" checked={frequency==='weekly'} onChange={()=>setFrequency('weekly')}/> Weekly</label>
      </div>
      <button type="submit" disabled={busy}>{busy?'Subscribing…':'Subscribe →'}</button>
    </form>
    {status&&<p className="newsletter-status" aria-live="polite">{status}</p>}
    <Link className="newsletter-privacy" href="/privacy">Read our privacy policy</Link>
  </section>
}
