"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Building2, Mail, Lock, User, Phone, GraduationCap, Briefcase } from 'lucide-react'
import ParticleBackground from '@/components/three/ParticleBackground'

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState('login')
  const [userType, setUserType] = useState('student')

  const handleSubmit = (e, formType) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(`${formType} form submitted for ${userType}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" 
         style={{ backgroundColor: 'var(--color-background)' }}>
      
      {/* Three.js Background */}
      <ParticleBackground userType={userType} />
      
      {/* Gradient Overlay for better text readability */}
      <div 
        className="fixed inset-0 -z-5"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(3, 7, 18, 0.4) 0%, 
            rgba(3, 7, 18, 0.8) 100%)`
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Header with enhanced styling */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="text-display-md font-bold mb-2 relative z-10" 
                style={{ 
                  fontSize: 'var(--font-size-display-md)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-sans)',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
              The Opportunity Engine
            </h1>
            {/* Animated underline */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-1000"
              style={{ 
                width: '60%',
                background: `linear-gradient(90deg, 
                  ${userType === 'student' ? 'var(--color-primary)' : 'var(--color-secondary)'}, 
                  var(--color-accent))`
              }}
            />
          </div>
          <p className="text-secondary mt-4" 
             style={{ 
               color: 'var(--color-text-secondary)',
               textShadow: '0 2px 10px rgba(0,0,0,0.3)'
             }}>
            Connect, Learn, and Grow Your Career
          </p>
        </div>

        {/* Enhanced Card with better glass morphism */}
        <Card className="backdrop-blur-xl border-opacity-20 shadow-2xl relative overflow-hidden" 
              style={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.3)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(255, 255, 255, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `
              }}>
          
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 opacity-5 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle at 30% 20%, 
                ${userType === 'student' ? 'var(--color-primary)' : 'var(--color-secondary)'} 0%, 
                transparent 50%)`
            }}
          />

          <CardHeader className="text-center pb-4 relative z-10">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setUserType('student')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
                  userType === 'student' 
                    ? 'text-white shadow-lg' 
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{ 
                  backgroundColor: userType === 'student' ? 'var(--color-primary)' : 'transparent',
                  color: userType === 'student' ? 'white' : 'var(--color-text-secondary)',
                  transition: 'var(--transition-base)',
                  boxShadow: userType === 'student' ? '0 10px 25px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                <GraduationCap size={20} />
                <span className="font-medium">Student</span>
              </button>
              <button
                onClick={() => setUserType('recruiter')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
                  userType === 'recruiter' 
                    ? 'text-white shadow-lg' 
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{ 
                  backgroundColor: userType === 'recruiter' ? 'var(--color-secondary)' : 'transparent',
                  color: userType === 'recruiter' ? 'white' : 'var(--color-text-secondary)',
                  transition: 'var(--transition-base)',
                  boxShadow: userType === 'recruiter' ? '0 10px 25px rgba(139, 92, 246, 0.3)' : 'none'
                }}
              >
                <Briefcase size={20} />
                <span className="font-medium">Recruiter</span>
              </button>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6" 
                        style={{ 
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          backdropFilter: 'blur(10px)'
                        }}>
                <TabsTrigger value="login" 
                           className="transition-all duration-300"
                           style={{ 
                             color: 'var(--color-text-secondary)'
                           }}>
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" 
                           className="transition-all duration-300"
                           style={{ 
                             color: 'var(--color-text-secondary)'
                           }}>
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" 
                           style={{ color: 'var(--color-text-primary)' }}>
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 transition-colors" 
                            style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="email"
                        type="email"
                        placeholder={`Enter your ${userType} email`}
                        className="pl-10 transition-all duration-300 hover:border-opacity-50 focus:border-opacity-100"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backdropFilter: 'blur(10px)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" 
                           style={{ color: 'var(--color-text-primary)' }}>
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 transition-colors" 
                            style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 transition-all duration-300 hover:border-opacity-50 focus:border-opacity-100"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backdropFilter: 'blur(10px)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="rounded transition-colors"
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <Label htmlFor="remember" className="text-sm" 
                             style={{ color: 'var(--color-text-secondary)' }}>
                        Remember me
                      </Label>
                    </div>
                    <button type="button" className="text-sm hover:underline transition-all"
                            style={{ 
                              color: 'var(--color-primary)'
                            }}>
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-white font-medium transform hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundColor: userType === 'student' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      boxShadow: `0 10px 25px ${userType === 'student' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`
                    }}
                  >
                    Sign In as {userType === 'student' ? 'Student' : 'Recruiter'}
                  </Button>
                </form>
              </TabsContent>

              {/* Registration Form - Similar enhancements applied */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={(e) => handleSubmit(e, 'register')} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" 
                             style={{ color: 'var(--color-text-primary)' }}>
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4" 
                              style={{ color: 'var(--color-text-muted)' }} />
                        <Input
                          id="firstName"
                          placeholder="First name"
                          className="pl-10 transition-all duration-300"
                          style={{
                            backgroundColor: 'rgba(17, 24, 39, 0.5)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-primary)',
                            backdropFilter: 'blur(10px)'
                          }}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" 
                             style={{ color: 'var(--color-text-primary)' }}>
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        className="transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backdropFilter: 'blur(10px)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" 
                           style={{ color: 'var(--color-text-primary)' }}>
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4" 
                            style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="email"
                        type="email"
                        placeholder={`Enter your ${userType} email`}
                        className="pl-10 transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backdropFilter: 'blur(10px)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" 
                           style={{ color: 'var(--color-text-primary)' }}>
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4" 
                             style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="pl-10 transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backdropFilter: 'blur(10px)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  {userType === 'recruiter' && (
                    <div className="space-y-2">
                      <Label htmlFor="company" 
                             style={{ color: 'var(--color-text-primary)' }}>
                        Company Name
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4" 
                                   style={{ color: 'var(--color-text-muted)' }} />
                        <Input
                          id="company"
                          placeholder="Enter your company name"
                          className="pl-10 transition-all duration-300"
                          style={{
                            backgroundColor: 'rgba(17, 24, 39, 0.5)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-primary)',
                            backdropFilter: 'blur(10px)'
                          }}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password" 
                           style={{ color: 'var(--color-text-primary)' }}>
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4" 
                            style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="pl-10 transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backdropFilter: 'blur(10px)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" 
                           style={{ color: 'var(--color-text-primary)' }}>
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4" 
                            style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10 transition-all duration-300"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.5)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)',
                          backdropFilter: 'blur(10px)'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="terms"
                      type="checkbox"
                      className="rounded"
                      style={{ accentColor: 'var(--color-primary)' }}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm" 
                           style={{ color: 'var(--color-text-secondary)' }}>
                      I agree to the{' '}
                      <button type="button" className="hover:underline transition-all"
                              style={{ color: 'var(--color-primary)' }}>
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="hover:underline transition-all"
                              style={{ color: 'var(--color-primary)' }}>
                        Privacy Policy
                      </button>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-white font-medium transform hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundColor: userType === 'student' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      boxShadow: `0 10px 25px ${userType === 'student' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`
                    }}
                  >
                    Create {userType === 'student' ? 'Student' : 'Recruiter'} Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm" style={{ 
            color: 'var(--color-text-muted)',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
              className="hover:underline font-medium transition-all transform hover:scale-105 inline-block"
              style={{ 
                color: 'var(--color-primary)'
              }}
            >
              {activeTab === 'login' ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}