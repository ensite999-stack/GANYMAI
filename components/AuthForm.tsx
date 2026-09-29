'use client'
import {useState} from 'react'
import {createSupabaseBrowserClient} from '@/lib/supabase'

export function AuthForm(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [message,setMessage]=useState('')
  async function act(mode:'signup'|'signin'){
    const supabase=createSupabaseBrowserClient(); if(!supabase){setMessage('Supabase is not configured yet.');return}
    const result=mode==='signup'?await supabase.auth.signUp({email,password}):await supabase.auth.signInWithPassword({email,password})
    setMessage(result.error?result.error.message:(mode==='signup'?'Account created. Check email if confirmation is enabled.':'Signed in.'))
  }
  return <div className="auth-box"><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label><div><button onClick={()=>act('signup')}>Create account</button><button onClick={()=>act('signin')}>Sign in</button></div><p>{message}</p></div>
}
