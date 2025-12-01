import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'
import axios from "axios";
import api from '../api/axios';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    category: '',
    subject: '',
    message: '',
    preferredLanguage: 'hindi'
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // API POST Request
      const response = await api.post(
        "/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      console.log("API Response:", response.data);
  
      setIsSubmitted(true);
  
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          category: "",
          subject: "",
          message: "",
          preferredLanguage: "hindi",
        });
      }, 3000);
  
    } catch (error) {
      console.log("API Error: ", error);
  
      alert("Something went wrong, please try again!");
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'फोन कॉल',
      titleEn: 'Phone Call',
      subtitle: 'तुरंत सहायता',
      info: '+91 98765 43210',
      subInfo: 'सुबह 8:00 से रात 8:00 तक',
      color: 'bg-green-500'
    },
    {
      icon: MessageCircle,
      title: 'व्हाट्सऐप',
      titleEn: 'WhatsApp',
      subtitle: 'चैट सपोर्ट',
      info: '+91 98765 43210',
      subInfo: '24/7 उपलब्ध',
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: 'ईमेल',
      titleEn: 'Email',
      subtitle: 'विस्तृत सहायता',
      info: 'support@ganvshiksha.com',
      subInfo: '24 घंटे में जवाब',
      color: 'bg-purple-500'
    },
    {
      icon: MapPin,
      title: 'कार्यालय',
      titleEn: 'Office',
      subtitle: 'व्यक्तिगत मुलाकात',
      info: 'गाँव शिक्षा केंद्र',
      subInfo: 'सेक्टर 15, नोएडा',
      color: 'bg-orange-500'
    }
  ]

  const faqItems = [
    {
      question: 'क्या यह प्लेटफॉर्म वास्तव में मुफ्त है?',
      questionEn: 'Is this platform really free?',
      answer: 'जी हां, हमारे सभी बुनियादी कोर्स बिल्कुल निःशुल्क हैं। केवल कुछ विशेष एडवांस्ड कोर्स के लिए न्यूनतम शुल्क है।'
    },
    {
      question: 'क्या मैं मोबाइल फोन से पढ़ सकता हूं?',
      questionEn: 'Can I study on mobile phone?',
      answer: 'बिल्कुल! हमारा प्लेटफॉर्म मोबाइल के लिए विशेष रूप से डिज़ाइन किया गया है। आप किसी भी स्मार्टफोन से आसानी से पढ़ सकते हैं।'
    },
    {
      question: 'इंटरनेट धीमा होने पर क्या करें?',
      questionEn: 'What if internet is slow?',
      answer: 'हमने कम इंटरनेट स्पीड को ध्यान में रखते हुए लाइट वर्जन बनाया है। आप ऑफलाइन डाउनलोड भी कर सकते हैं।'
    },
    {
      question: 'शिक्षक से सीधे बात कैसे करें?',
      questionEn: 'How to talk directly with teachers?',
      answer: 'आप लाइव क्लास के दौरान चैट कर सकते हैं, या व्हाट्सऐप पर डायरेक्ट मैसेज भेज सकते हैं।'
    }
  ]

  const categories = [
    'छात्र / Student',
    'अभिभावक / Parent', 
    'शिक्षक / Teacher',
    'स्कूल प्रशासन / School Admin',
    'अन्य / Other'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            हमसे जुड़ें
          </h1>
          <p className="text-xl text-blue-100">
            Get In Touch - आपके सवाल, हमारे जवाब
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100"
              >
                <div className={`w-14 h-14 ${method.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{method.subtitle}</p>
                <p className="text-gray-700 font-semibold text-sm mb-1">{method.info}</p>
                <p className="text-xs text-gray-500">{method.subInfo}</p>
              </div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Send className="text-green-600 mr-3" size={28} />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    संदेश भेजें
                  </h2>
                  <p className="text-sm text-gray-600">Send us a Message</p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-3">संदेश भेजा गया!</h3>
                  <p className="text-gray-600">हमारी टीम जल्दी ही आपसे संपर्क करेगी।</p>
                  <p className="text-sm text-gray-500 mt-1">Our team will contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        नाम / Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="अपना नाम दर्ज करें"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        श्रेणी / Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        required
                      >
                        <option value="">चुनें / Select</option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ईमेल / Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="आपका ईमेल पता"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        मोबाइल / Mobile *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="10 अंकीय मोबाइल नंबर"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      विषय / Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="संदेश का विषय"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      संदेश / Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                      placeholder="अपना संदेश विस्तार से लिखें..."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      पसंदीदा भाषा / Preferred Language
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredLanguage"
                          value="hindi"
                          checked={formData.preferredLanguage === 'hindi'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-gray-700">हिंदी / Hindi</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="preferredLanguage"
                          value="english"
                          checked={formData.preferredLanguage === 'english'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600"
                        />
                        <span className="text-gray-700">English</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    संदेश भेजें / Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                त्वरित सहायता
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2">तुरंत मदद चाहिए?</h4>
                  <p className="text-sm mb-3">व्हाट्सऐप पर मैसेज करें</p>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                    WhatsApp Chat
                  </button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center mb-2">
                    <Phone className="text-blue-600 mr-2" size={20} />
                    <h4 className="font-bold text-blue-800">कॉल करें</h4>
                  </div>
                  <p className="text-blue-700 text-sm mb-2">सुबह 8:00 से रात 8:00 तक</p>
                  <p className="font-bold text-blue-800">+91 98765 43210</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                अक्सर पूछे जाने वाले प्रश्न
              </h3>
              
              <div className="space-y-3">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 last:border-0">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-green-600 mr-2" size={24} />
                <h3 className="text-xl font-bold text-gray-800">
                  सहायता समय
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm">फोन सपोर्ट</span>
                  <span className="text-green-600 font-bold text-sm">8 AM - 8 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm">व्हाट्सऐप</span>
                  <span className="text-green-600 font-bold text-sm">24/7</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 text-sm">ईमेल</span>
                  <span className="text-green-600 font-bold text-sm">24 घंटे</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 text-sm">लाइव चैट</span>
                  <span className="text-green-600 font-bold text-sm">10 AM - 6 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact