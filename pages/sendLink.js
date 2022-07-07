import React, { useContext, useState } from 'react'
import { MdSecurity } from 'react-icons/md'
import Link from 'next/link'
import Head from 'next/head'
import { VartaContext } from '../context/context'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import ReCAPTCHA from "react-google-recaptcha"
import emailjs from "@emailjs/browser"


const SendLink = () => {
  const { alertSuccess, alertError, generateLink } = useContext(VartaContext)

  const [sending, setSending] = useState(false)
  const [credentials, setCredentials] = useState({ email: '' })

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const onChangeRecaptcha = (captchaValue) => {
    setCredentials({ ...credentials, ['g-recaptcha-response']: captchaValue })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const linkData = await generateLink(credentials.email);
    if(linkData.success){
      await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, {...credentials, name: linkData.data.name, link: `${process.env.NEXT_PUBLIC_API_URL}/resetPassword/${linkData.data.code}`}, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
        .then(function (response) {
            alertSuccess('Successfully sent the link. In case you did not get the Email, please try again.')
            return 
        }, function (error) {
            alertError('Unable to send Email please try again!')
        });
    }
    else{
      alertError(linkData.error)
    }
    setSending(false)
    window.grecaptcha.reset();
  }
  return (
    <>
      <Head>
        <title>Varta | Reset password</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icons/discord.svg" />
      </Head>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className={`max-w-md w-full space-y-3  mx-auto my-auto ${sending ? 'pointer-events-none' : ''}`}>
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={`/icons/discord.svg`}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">Get the reset link to your email</h2>
          </div>
          <form onSubmit={onSubmit} className="mt-2 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  disabled={sending}
                  onChange={onChange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-lg w-full border-none outline-none p-3 h-11/12 resize-none text-white bg-gray-800 mb-2"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="shadow-sm -space-y-px">
              <div className="relative w-full flex justify-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={onChangeRecaptcha}
                />
              </div>
            </div>

            <div>
              <button
                disabled={sending}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <MdSecurity className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" size={24} />
                </span>
                {
                  sending?
                  <AiOutlineLoading3Quarters className='animate-spin' size={24} />
                  :
                  'Send reset link'
                }
              </button>
            </div>
            <div className="text-sm flex justify-between">
              Done with this?
              <Link href="/login">
                <a disabled={sending} className="font-medium text-blue-600 hover:text-blue-700">
                  login here
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SendLink