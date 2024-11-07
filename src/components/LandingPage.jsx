import { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'
import {
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from '../contexts/LanguageContext'

export default function LandingPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: t('form.roles.organizer')
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('users')
        .insert([{ ...formData }])

      if (error) throw error

      toast.success('شكراً لانضمامك إلى قائمة الانتظار!')
      setFormData({ name: '', email: '', role: t('form.roles.organizer') })
    } catch (error) {
      toast.error('حدث خطأ. يرجى المحاولة مرة أخرى.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={"https://ralajaji.github.io/sport.github.io/src/assets/soccer-field.jpg" }
              alt="Soccer Field" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#join-us" 
                  className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-green-600 transition-all hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  {t('hero.joinButton')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 lg:py-32">
          <div className="px-6">
            <h2 className="text-2xl lg:text-4xl font-bold text-center mb-16">{t('howItWorks.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-16 max-w-5xl mx-auto">
              {t('howItWorks.steps').map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300">
                    {index === 0 && <ClipboardDocumentCheckIcon className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />}
                    {index === 1 && <UserGroupIcon className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />}
                    {index === 2 && <CreditCardIcon className="w-8 h-8 lg:w-10 lg:h-10 text-green-600" />}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Core Benefits */}
              <section className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl lg:text-3xl font-bold mb-8">{t('benefits.title')}</h2>
                <div className="space-y-6">
                  {t('benefits.items').map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 text-lg">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Feature Highlights */}
              <section>
                <h2 className="text-2xl lg:text-3xl font-bold mb-8">{t('features.title')}</h2>
                <div className="grid gap-4">
                  {t('features.items').map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-all hover:scale-[1.02] cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">
                          {index === 0 && '📅'}
                          {index === 1 && '💳'}
                          {index === 2 && '📊'}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Join Us Form */}
        <section id="join-us" className="py-20 lg:py-32">
          <div className="max-w-md mx-auto px-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">{t('form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder={t('form.namePlaceholder')}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <select
                    className="w-full  px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option>{t('form.roles.organizer')}</option>
                    <option>{t('form.roles.player')}</option>
                    <option>{t('form.roles.fieldOwner')}</option>
                  </select>
                  <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl font-medium hover:bg-orange-600 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? t('form.loading') : t('form.submitButton')}
                </button>
                <p className="text-sm text-center text-gray-500">
                  {t('form.discount')}
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-8 text-sm text-gray-600">
                <a href="#" className="hover:text-gray-900 transition-colors">{t('footer.privacy')}</a>
                <a href="#" className="hover:text-gray-900 transition-colors">{t('footer.terms')}</a>
                <a href="#" className="hover:text-gray-900 transition-colors">{t('footer.contact')}</a>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
} 