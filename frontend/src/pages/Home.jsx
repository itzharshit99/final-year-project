import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "📚",
      title: "मुफ्त पाठ्यक्रम / Free Courses",
      description:
        "सभी विषयों में निःशुल्क शिक्षा / Free education in all subjects",
    },
    {
      icon: "🎯",
      title: "व्यक्तिगत शिक्षा / Personalized Learning",
      description: "आपकी गति के अनुसार सीखें / Learn at your own pace",
    },
    {
      icon: "👥",
      title: "विशेषज्ञ शिक्षक / Expert Teachers",
      description:
        "अनुभवी शिक्षकों से मार्गदर्शन / Guidance from experienced teachers",
    },
    {
      icon: "📱",
      title: "मोबाइल फ्रेंडली / Mobile Friendly",
      description: "कहीं भी, कभी भी सीखें / Learn anywhere, anytime",
    },
  ];

  const subjects = [
    { name: "गणित / Math", icon: "🔢", color: "from-blue-400 to-blue-600" },
    {
      name: "विज्ञान / Science",
      icon: "🧪",
      color: "from-green-400 to-green-600",
    },
    { name: "हिंदी / Hindi", icon: "📖", color: "from-red-400 to-red-600" },
    {
      name: "अंग्रेजी / English",
      icon: "🌍",
      color: "from-purple-400 to-purple-600",
    },
    {
      name: "सामाजिक विज्ञान / Social",
      icon: "🏛️",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "कंप्यूटर / Computer",
      icon: "💻",
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  const testimonials = [
    {
      name: "राज कुमार",
      class: "कक्षा 10",
      message:
        "इस प्लेटफॉर्म से मेरे अंक काफी सुधरे हैं। गाँव में रहकर भी बेहतरीन शिक्षा मिल रही है।",
      village: "ग्राम पंचायत खेड़ी",
    },
    {
      name: "प्रिया शर्मा",
      class: "कक्षा 12",
      message:
        "यहाँ पढ़ाने का तरीका बहुत अच्छा है। मैं अब IIT की तैयारी कर रही हूँ।",
      village: "ग्राम सभा नांदेड़",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-25 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-orange-200 rounded-full opacity-20 animate-bounce delay-700"></div>

        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-30"></div>
      </div>

      <div className="relative">
        

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                    <span className="block">शिक्षा से</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
                      सपनों को पंख
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Give wings to dreams through education
                  </p>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  गाँव के हर बच्चे के लिए गुणवत्तापूर्ण शिक्षा। आधुनिक तकनीक के
                  साथ पारंपरिक मूल्यों को जोड़कर, हम आपके सपनों को साकार बनाने
                  में मदद करते हैं।
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="px-8 py-4 bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-lg">
                    🚀 अभी शुरू करें / Start Now
                  </button>
                  <button className="px-8 py-4 border-2 border-green-500 text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all duration-300 text-lg">
                    📹 डेमो देखें / Watch Demo
                  </button>
                </div>

                <div className="flex items-center space-x-6 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      50K+
                    </div>
                    <div className="text-sm text-gray-600">
                      छात्र / Students
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      1000+
                    </div>
                    <div className="text-sm text-gray-600">गाँव / Villages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      95%
                    </div>
                    <div className="text-sm text-gray-600">
                      सफलता दर / Success
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Image/Animation */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-400 via-blue-400 to-yellow-400 rounded-3xl p-8 transform rotate-6 hover:rotate-3 transition-transform duration-500">
                  <div className="bg-white rounded-2xl p-6 transform -rotate-6 shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800">
                          आज का पाठ / Today's Lesson
                        </h3>
                        <span className="text-2xl">📚</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <span className="text-gray-700">
                            गणित - त्रिकोणमिति
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-700">
                            भौतिक विज्ञान - गति
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <span className="text-gray-700">हिंदी - व्याकरण</span>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-700 font-medium">
                            प्रगति / Progress
                          </span>
                          <span className="text-sm text-green-700 font-bold">
                            75%
                          </span>
                        </div>
                        <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                हमारी विशेषताएं
                <div className="text-xl text-gray-600 mt-2">Our Features</div>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                आधुनिक तकनीक और पारंपरिक शिक्षा का सुंदर मेल
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 ${
                    activeFeature === index
                      ? "border-green-400 bg-green-50"
                      : "border-transparent"
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                विषय चुनें
                <div className="text-xl text-gray-600 mt-2">
                  Choose Your Subject
                </div>
              </h2>
              <p className="text-lg text-gray-600">
                सभी मुख्य विषयों में विशेषज्ञता प्राप्त करें
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => console.log(`Selected ${subject.name}`)}
                >
                  <div
                    className={`bg-gradient-to-br ${subject.color} rounded-2xl p-6 text-white text-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl`}
                  >
                    <div className="text-3xl mb-3">{subject.icon}</div>
                    <h3 className="font-bold text-sm">{subject.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                छात्रों की राय
                <div className="text-xl text-gray-600 mt-2">
                  What Students Say
                </div>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">
                            {testimonial.name}
                          </h4>
                          <p className="text-green-600 text-sm font-medium">
                            {testimonial.class}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {testimonial.village}
                          </p>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 italic leading-relaxed">
                        "{testimonial.message}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              आज ही अपनी शिक्षा यात्रा शुरू करें
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your educational journey today
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90">
              हजारों गाँव के छात्रों के साथ जुड़ें और अपने सपनों को साकार बनाने
              की दिशा में पहला कदम उठाएं। निःशुल्क पंजीकरण, असीमित सीखने की
              संभावनाएं।
            </p>

            <div className="space-y-6">
              <button className="px-12 py-4 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 text-lg">
                🎓 मुफ्त में शुरू करें / Start Free
              </button>

              <div className="flex justify-center items-center space-x-8 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>कोई शुल्क नहीं</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>तुरंत एक्सेस</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✅</span>
                  <span>विशेषज्ञ सहायता</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Home;
