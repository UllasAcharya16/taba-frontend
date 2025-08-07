import { ArrowLeft, Linkedin, Mail, Github } from 'lucide-react'
import React from 'react';
import UllasImg from '../assets/Ullas.jpeg';
import ShreyasImg from '../assets/Shreyas.jpg';
import SatvikImg from '../assets/Satvik.jpeg';
import VismayImg from '../assets/Vismay.jpeg';

export default function AboutPage({ onBack }) {
  const teamMembers = [
    {
      name: "Ullas Acharya",
      role: "Team Lead & Backend Developer",
      description: "The analytical brain of the team. Skilled at breaking down complex problems, performing deep research, and devising logical flows for algorithms and architectures. Takes the lead in designing the core problem-solving strategy and ensuring technical soundness in every aspect of the solution.",
      image: UllasImg,
      linkedin: "https://linkedin.com/in/alexchen-ml",
      email: "alex@cookiebyte.tech",
      github: "https://github.com/alexchen-ml"
    },
    {
      name: "Shreyas S Bhatt",
      role: "Research Head & Logical Thinker",
      description: "The coding wizard. Experienced in full-stack development, database design, and cloud platforms. Translates the team's ideas into functional code and ensures smooth integration between frontend, backend, and any third-party APIs or tools. Also responsible for managing version control and deployment pipelines.",
      image: ShreyasImg,
      linkedin: "https://linkedin.com/in/sarah-rodriguez-dev",
      email: "sarah@cookiebyte.tech",
      github: "https://github.com/sarah-rodriguez"
    },
    {
      name: "Satvik S bhat",
      role: "Dashborad Designer & Frontend Developer",
      description: "The creative eye. Focuses on building intuitive user interfaces, ensuring the app is user-friendly, visually appealing, and aligned with accessibility standards. Designs mockups, dashboards, and interactions that make the product easy to use and impactful",
      image: SatvikImg,
      linkedin: "https://linkedin.com/in/marcus-johnson-security",
      email: "marcus@cookiebyte.tech",
      github: "https://github.com/marcus-security"
    },
    {
      name: "Vismay M Shettigar",
      role: "Creative Thinker & Frontend Developer",
      description: "The storyteller and data interpreter. Responsible for analyzing outputs, visualizing data patterns, and creating easy-to-understand insights. Also leads the preparation of presentations, pitch decks, and demo explanations to clearly communicate the problem, solution, and impact.",
      image: VismayImg,
      linkedin: "https://linkedin.com/in/emily-zhang-design",
      email: "emily@cookiebyte.tech",
      github: "https://github.com/emily-zhang-design"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6 tracking-wide">
              Meet Cookie Byte
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're a passionate team of technologists, data scientists, and security experts 
              dedicated to revolutionizing business analytics and fraud detection through 
              cutting-edge AI and machine learning solutions.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-100 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Cookie Byte was founded in 2022 with a simple yet ambitious mission: to make 
                  advanced analytics and fraud detection accessible to businesses of all sizes. 
                  Our name reflects our belief that even the smallest piece of data (a "cookie") 
                  can contain valuable insights when processed with the right algorithms.
                </p>
                <p>
                  Starting as a small team of four passionate technologists, we've grown into 
                  a trusted partner for companies looking to harness the power of their data. 
                  Our TABA platform represents years of research, development, and real-world 
                  testing in fraud detection and business intelligence.
                </p>
                <p>
                  Today, we continue to push the boundaries of what's possible with AI and 
                  machine learning, always keeping our focus on practical, actionable solutions 
                  that drive real business value.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Cookie Byte Team"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">Our Team</h2>
            <p className="text-xl text-gray-400">
              Meet the brilliant minds behind TABA's innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/50"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-600 group-hover:border-gray-500 transition-all duration-300"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-100 group-hover:text-white transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 font-medium">{member.role}</p>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-sm">
                      {member.description}
                    </p>

                    <div className="flex gap-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:scale-110"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-100 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Ready to transform your business with advanced analytics? 
            We'd love to hear from you and discuss how TABA can help your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:team@cookiebyte.tech"
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-100 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              team@cookiebyte.tech
            </a>
            <a
              href="https://linkedin.com/company/cookie-byte"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Linkedin className="w-5 h-5" />
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
