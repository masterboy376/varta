import React, { useContext, useState } from 'react'
import { MdSecurity } from 'react-icons/md'
import Link from 'next/link'
import Head from 'next/head'
import { VartaContext } from '../../context/context'
import ReCAPTCHA from "react-google-recaptcha"

const ResetPassword = () => {
  const { resetPassword, router, alertError } = useContext(VartaContext)

  const [changing, setChanging] = useState(false)
  const [credentials, setCredentials] = useState({ password: '', code: '' })
  const [cpassword, setCpassword] = useState()
  const [gRecaptcha, setGRecaptcha] = useState('')

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const onChangeRecaptcha = (captchaValue) => {
    setGRecaptcha(captchaValue)
  }
  const onSubmit = async (e) => {
    console.log(router.query.slug)
    e.preventDefault()
    setChanging(true)
    if (gRecaptcha.length != 0) {
      credentials.password === cpassword ? await resetPassword({...credentials, code:router.query.slug}) : ""
    }
    else {
      alertError("Please verify the captcha!")
    }
    setChanging(false)
    window.grecaptcha.reset();
  }

  return (
    <>
      <Head>
        <title>Varta | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/icons/discord.svg" />
      </Head>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-md w-full space-y-3  mx-auto my-auto">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={`/icons/discord.svg`}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">Set new password</h2>
          </div>
          <form onSubmit={onSubmit} className="mt-2 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={onChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="rounded-xl border hover:border-blue-600 border-gray-800 w-full outline-none p-3 h-11/12 resize-none text-white bg-gray-800 mb-2"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="cpassword" className="sr-only">
                  Confirm password
                </label>
                <input
                  onChange={(e) => { setCpassword(e.target.value) }}
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  required
                  minLength={6}
                  className="rounded-xl border hover:border-blue-600 border-gray-800 w-full outline-none p-3 h-11/12 resize-none text-white bg-gray-800"
                  placeholder="Confirm password"
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
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <MdSecurity className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" size={24} />
                </span>
                Reset password
              </button>
            </div>
            <div className="text-sm flex justify-between">
              Done with this?
              <Link href="/signup">
                <a className="font-medium text-blue-600 hover:text-blue-700">
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

export default ResetPassword

// export async function getStaticProps(context) {
//   context.params.slug
//   return {
//     props: { data: JSON.parse(JSON.stringify(result)) },
//   }
// }