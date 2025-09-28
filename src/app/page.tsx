'use client';

import { useState, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';

import { 
  Play, 
  Sparkles, 
  CheckCircle, 
  Globe, 
  BarChart3, 
  Target, 
  TrendingUp, 
  FileText,
  Clock,
  Search,
  Users,
  Database,
  TrendingDown,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const AssetIQApp = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const demoSteps = [
    {
      title: "Live Market Intelligence",
      content: "See our Market Research Agent analyze real-time UK property data.",
      image: "🏢",
      stats: "Processing 10,000+ data points",
      action: "Analyzing market data..."
    },
    {
      title: "Deal Discovery", 
      content: "Watch our Deal Sourcing Agent find off-market opportunities.",
      image: "🎯",
      stats: "Found 3 distressed assets",
      action: "Scanning company filings..."
    },
    {
      title: "Financial Modeling",
      content: "See the Data Analytics Agent create a DCF model in 30 seconds.",
      image: "📊",
      stats: "15-year DCF model complete",
      action: "Building financial model..."
    },
    {
      title: "Risk Assessment",
      content: "Watch our Due Diligence Agent flag compliance issues automatically.",
      image: "⚠️",
      stats: "5 portfolio assets flagged for review",
      action: "Checking compliance..."
    }
  ];

  const nextDemoStep = () => {
    if (demoStep < demoSteps.length - 1) {
      setDemoStep(demoStep + 1);
    } else {
      setShowDemo(false);
      setDemoStep(0);
      // After demo, encourage waitlist signup
      setShowWaitlist(true);
    }
  };

  const openWaitlist = () => {
    setShowWaitlist(true);
  };

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (waitlistEmail) {
      try {
        const { data, error } = await supabase
          .from('waitlist')
          .insert([{ email: waitlistEmail }])
        
        if (error) {
          console.error('Error:', error);
          return;
        }
        
        setWaitlistSubmitted(true);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  // Waitlist Modal
  if (showWaitlist) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8">
          {!waitlistSubmitted ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
                  <div className="text-white font-bold text-2xl leading-none">
                    <span className="text-lg">A</span>
                    <span className="text-sm relative -top-1">IQ</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
                <p className="text-gray-600">Be the first to know when AssetIQ launches. Get early access and exclusive updates.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
                
                <button
                  onClick={handleWaitlistSubmit}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
              
              <button
                onClick={() => setShowWaitlist(false)}
                className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm"
              >
                Maybe later
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're on the list!</h3>
              <p className="text-gray-600 mb-4">We'll notify you as soon as AssetIQ is ready for early access.</p>
              <div className="space-y-3">
                <button
                  onClick={openWaitlist}
                  className="w-full bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Join Waitlist - Get Notified
                </button>
                <button
                  onClick={() => setShowWaitlist(false)}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Demo Modal
  if (showDemo) {
    const currentDemoStep = demoSteps[demoStep];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{currentDemoStep.image}</div>
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">{currentDemoStep.title}</h2>
            <p className="text-emerald-700">{currentDemoStep.content}</p>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-50 to-orange-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-emerald-700">Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-orange-600">{currentDemoStep.action}</span>
              </div>
            </div>
            <p className="text-lg font-semibold text-emerald-900">{currentDemoStep.stats}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {demoSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === demoStep ? 'bg-orange-500' : 'bg-emerald-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDemo(false)}
                className="px-4 py-2 text-emerald-600 hover:text-emerald-800"
              >
                Skip Demo
              </button>
              <button
                onClick={nextDemoStep}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
              >
                <span>{demoStep === demoSteps.length - 1 ? 'Join Waitlist' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing Page (Clean Marketing Version)
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-30 backdrop-blur-lg border-b border-orange-300 border-opacity-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-lg leading-none">
                  <span className="text-sm">A</span>
                  <span className="text-xs relative -top-1">IQ</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AssetIQ</h1>
                <p className="text-xs text-orange-200 -mt-1">AI Property Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={openWaitlist}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            The Future of <br />
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Property Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Supercharge your property research, analysis and investment decision making with AI-powered agents that work 24/7 and get smarter with every interaction.
          </p>
          <div className="flex items-center justify-center space-x-4 flex-wrap gap-4">
            <button
              onClick={openWaitlist}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <span>Join Waitlist</span>
            </button>
            <button
              onClick={() => setShowDemo(true)}
              className="border border-orange-300 border-opacity-30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-500 hover:bg-opacity-10 transition-all flex items-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Pain Points Section */}
        <div className="bg-gradient-to-r from-slate-800 to-emerald-800 bg-opacity-60 backdrop-blur-lg rounded-2xl p-8 border border-orange-300 border-opacity-20 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Do These Pain Points Sound Familiar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Hours of Manual Analysis</h4>
                  <p className="text-gray-300">Spending 15-20 hours per week manually analyzing market data, creating DCF models, and building investment presentations.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Search className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Fragmented Research</h4>
                  <p className="text-gray-300">Pulling data from 10+ different sources, cross-referencing yield reports, and trying to spot market trends across multiple platforms.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Endless Meetings</h4>
                  <p className="text-gray-300">Sitting through hours of meetings to present basic market analysis that could be automated.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Database className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Data Scattered Everywhere</h4>
                  <p className="text-gray-300">Hunting through emails, Excel files, and external reports to find that one crucial piece of information you need for a deal.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingDown className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Missing Opportunities</h4>
                  <p className="text-gray-300">By the time you finish your analysis, the best deals are already gone to competitors with faster decision-making processes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Analysis Paralysis</h4>
                  <p className="text-gray-300">Drowning in data but struggling to extract actionable insights quickly enough to make confident investment decisions.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-xl text-orange-300 font-semibold mb-4">
              What if you could reduce all of this to just <span className="text-orange-400">2 hours per week</span>?
            </p>
            <button
              onClick={openWaitlist}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all flex items-center space-x-2 mx-auto"
            >
              <span>Join Waitlist - See How AssetIQ Solves This</span>
            </button>
          </div>
        </div>

        {/* AssetIQ Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">AssetIQ - The Next Generation Solution</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Traditional property analysis tools require constant manual input and deliver static reports. AssetIQ introduces intelligent agents that continuously work, learn, and adapt to transform how property professionals research markets, analyze data, and make investment decisions.
          </p>
        </div>

        {/* AI Agents Section */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 border border-orange-300 border-opacity-20 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Your Real Estate AI Agents</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-emerald-900 bg-opacity-30 backdrop-blur-lg rounded-lg p-6 border border-emerald-400 border-opacity-20 hover:bg-opacity-50 transition-all">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">Market Research Agent</h3>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-200"><strong>What it does:</strong> Watches property markets across the UK</p>
                <p className="text-emerald-200"><strong>How it helps:</strong> Obtain the latest market data on demand and generate reports with ease</p>
                <p className="text-emerald-200"><strong>Example:</strong> "Tell me about the Q2 investment activity in London in the BTR sector"</p>
              </div>
            </div>

            <div className="bg-emerald-900 bg-opacity-30 backdrop-blur-lg rounded-lg p-6 border border-emerald-400 border-opacity-20 hover:bg-opacity-50 transition-all">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">Data Analytics Agent</h3>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-200"><strong>What it does:</strong> Processes Excel files and creates financial models</p>
                <p className="text-emerald-200"><strong>How it helps:</strong> Builds DCF models and analyzes rent rolls automatically</p>
                <p className="text-emerald-200"><strong>Example:</strong> "Uploaded rent roll shows 15% rent increase potential"</p>
              </div>
            </div>

            <div className="bg-emerald-900 bg-opacity-30 backdrop-blur-lg rounded-lg p-6 border border-emerald-400 border-opacity-20 hover:bg-opacity-50 transition-all">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">Deal Sourcing Agent</h3>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-200"><strong>What it does:</strong> Scans Companies House and property listings for opportunities</p>
                <p className="text-emerald-200"><strong>How it helps:</strong> Finds distressed assets and off-market deals</p>
                <p className="text-emerald-200"><strong>Example:</strong> "Found 3 companies in Birmingham filing for administration"</p>
              </div>
            </div>

            <div className="bg-emerald-900 bg-opacity-30 backdrop-blur-lg rounded-lg p-6 border border-emerald-400 border-opacity-20 hover:bg-opacity-50 transition-all">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">Portfolio Manager Agent</h3>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-200"><strong>What it does:</strong> Tracks performance of your existing properties</p>
                <p className="text-emerald-200"><strong>How it helps:</strong> Identifies underperformers and optimization opportunities</p>
                <p className="text-emerald-200"><strong>Example:</strong> "Leeds retail unit underperforming by 1.2% - consider disposal"</p>
              </div>
            </div>

            <div className="bg-emerald-900 bg-opacity-30 backdrop-blur-lg rounded-lg p-6 border border-emerald-400 border-opacity-20 hover:bg-opacity-50 transition-all">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">Due Diligence Agent</h3>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-200"><strong>What it does:</strong> Reviews legal documents and flags issues</p>
                <p className="text-emerald-200"><strong>How it helps:</strong> Spots problems before you complete deals</p>
                <p className="text-emerald-200"><strong>Example:</strong> "EPC rating below target - environmental concern flagged"</p>
              </div>
            </div>

            <div className="bg-emerald-900 bg-opacity-30 backdrop-blur-lg rounded-lg p-6 border border-emerald-400 border-opacity-20 hover:bg-opacity-50 transition-all">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">£</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 text-center">Valuation Agent</h3>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-200"><strong>What it does:</strong> Automatically value properties using comparable sales</p>
                <p className="text-emerald-200"><strong>How it helps:</strong> Instant property appraisals without surveyors</p>
                <p className="text-emerald-200"><strong>Example:</strong> "Similar properties selling for £2.1M-2.4M range"</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-white bg-opacity-6 rounded-xl p-4 backdrop-blur-sm inline-block">
              <p className="text-gray-400 font-semibold text-sm">
                💡 Each agent can chat with you in natural language - just ask prompts like "What's happening in the Manchester office market?"
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            One plan, everything included. No hidden fees, no complexity.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-b from-orange-600 to-red-600 bg-opacity-90 backdrop-blur-lg rounded-xl p-8 border-2 border-orange-400 hover:scale-105 transition-all">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">AssetIQ</h3>
                <p className="text-orange-100 mb-6">Everything you need to transform your property intelligence</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">£299</span>
                  <span className="text-orange-100 text-xl">/month</span>
                </div>
                
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">All AI Agents</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">Unlimited Properties</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">Advanced DCF Modelling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">Deal Sourcing Alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">Portfolio Analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">API Integrations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">File Processing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">Access to New Agents & Updates For Free</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span className="text-white">24/7 Support</span>
                  </div>
                </div>
                
                <button 
                  onClick={openWaitlist}
                  className="w-full bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg mb-4"
                >
                  Join Waitlist - Early Access
                </button>
                
                <p className="text-orange-100 text-sm">
                  Join waitlist for early access and benefits
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-12">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-orange-300 border-opacity-20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What are AI Agents and how do they work?</h3>
              <p className="text-gray-700">Think of AI Agents as your 24/7 research team. They automatically scan property markets, analyse deals, and flag opportunities while you sleep. No manual data entry, no waiting for reports.</p>
            </div>
            
            <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-orange-300 border-opacity-20">
              <h3 className="text-xl font-semibold text-black mb-3">How does AssetIQ compare to traditional property software?</h3>
              <p className="text-gray-700">Most property software makes you do the work. AssetIQ does the work for you. Ask questions like "What's happening in the London office market?" and get instant, current answers.</p>
            </div>
            
            <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-orange-300 border-opacity-20">
              <h3 className="text-xl font-semibold text-black mb-3">What data sources do the AI agents use?</h3>
              <p className="text-gray-700">Our agents connect to major UK property data providers, Companies House, planning applications, your own Excel files and databases, plus web scraping for market intelligence. All data is processed in real-time and cross-referenced for accuracy.</p>
            </div>
            
            <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-orange-300 border-opacity-20">
              <h3 className="text-xl font-semibold text-black mb-3">Is my data secure?</h3>
              <p className="text-gray-700">Yes. We use bank-grade encryption, store data in UK-based servers, and comply with UK GDPR. Your property and business data remains confidential and is never shared with competitors or third parties.</p>
            </div>
            
            <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-orange-300 border-opacity-20">
              <h3 className="text-xl font-semibold text-black mb-3">Can I cancel anytime?</h3>
              <p className="text-gray-700">Absolutely. You can cancel your subscription anytime with 30 days notice. We also offer a 30-day free trial so you can test all features before committing.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-gray-600 border-opacity-30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-sm leading-none">
                  <span className="text-xs">A</span>
                  <span className="text-xs relative -top-0.5">IQ</span>
                </div>
              </div>
              <span className="text-white font-bold">AssetIQ</span>
              <span className="text-gray-400 text-sm">AI-powered property intelligence</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="text-gray-300 hover:text-orange-200 text-sm transition-colors">
                Terms of Service
              </button>
              <span className="text-gray-500 text-sm">© 2025 AssetIQ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <AssetIQApp />;
}