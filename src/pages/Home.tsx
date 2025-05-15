import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { Shield, UserCheck, Database, FileText } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-6 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight mb-4">
                  Secure Access Control for Your Sensitive Content
                </h1>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Manage access to your data and documents with fine-grained controls. Administrators can easily assign permissions while workers access only what they need.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button size="lg" className="font-medium">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative w-96 h-80 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-xl">
                  <div className="absolute -top-4 -left-4 bg-blue-500 rounded-lg p-4 shadow-lg">
                    <Shield size={30} />
                  </div>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Role-Based Access Control</h3>
                      <p className="opacity-80">Separate admin and worker views with precise permissions</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/20 p-4 rounded-lg">
                        <Database size={24} className="mb-2" />
                        <div className="text-sm">Data Containers</div>
                      </div>
                      <div className="bg-white/20 p-4 rounded-lg">
                        <FileText size={24} className="mb-2" />
                        <div className="text-sm">Document Containers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Powerful Features, Simple Interface</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our platform offers comprehensive tools for managing access to your sensitive data while maintaining an intuitive user experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="p-3 bg-blue-100 text-blue-700 rounded-lg inline-block mb-4">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Role-Based Access</h3>
                <p className="text-slate-600">
                  Separate admin and worker views with distinct permissions and capabilities for each role.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-lg inline-block mb-4">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Flexible Containers</h3>
                <p className="text-slate-600">
                  Store and organize both data and documents in secure containers with customizable access controls.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="p-3 bg-green-100 text-green-700 rounded-lg inline-block mb-4">
                  <UserCheck size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Granular Permissions</h3>
                <p className="text-slate-600">
                  Administrators can precisely control which users have access to specific containers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-slate-900 text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join today and experience the perfect balance of security and usability for your team's content management needs.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <Button size="lg" className="px-8">
                  Create Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 border-white/20 hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-800 text-slate-300 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold text-white mb-2">SecureAccess</div>
              <p className="text-slate-400 text-sm">
                Role-based access control made simple
              </p>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} SecureAccess. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;