"use client"
import React, { useState } from 'react'
import SocialMedia from '@/components/social-media'

function ContactPage() {
  const [message, setMessage] = useState<string | undefined>()
  const email = 'byosry@gmail.com'
  const subject = 'Message From Almuerzo Contact Us Section'
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full rounded-md p-8 shadow-md sm:w-96">
        <h1 className="mb-4 text-2xl font-bold">تواصل معنا</h1>

        {/* Email Messaging Form */}
        <form className="mb-10">
          <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
            البريد الالكتروني
          </label>
          <input
            className="w-full rounded-md border border-gray-300 p-2"
            type="email"
            id="email"
            name="email"
            placeholder="اكتب بريدك الالكتروني هنا"
            required
          />

          <label className="mb-2 mt-4 block text-sm font-bold text-gray-700" htmlFor="message">
            الرسالة
          </label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2"
            id="message"
            name="message"
            rows={4}
            placeholder="اكتب رسالتك هنا"
            required
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <a
            type='submit'
            href={`mailto:${email}?subject=${subject}&body=${message}`}
            className="mt-4 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            أرسل الرسالة
          </a>
        </form>

        <hr />

        <p className='mt-10 text-center'>تابعنا على مواقع التواصل الإجتماعي</p>

        {/* Social Media Links */}
        <SocialMedia />
      </div>
    </div>
  )
}

export default ContactPage
