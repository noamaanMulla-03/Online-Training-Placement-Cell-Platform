"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Building2, Mail, Lock, User, Phone, GraduationCap, Briefcase } from 'lucide-react'

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState('login')
  const [userType, setUserType] = useState('student')

  const handleSubmit = (e, formType) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(`${formType} form submitted for ${userType}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-display-md font-bold mb-2" 
              style={{ 
                fontSize: 'var(--font-size-display-md)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-sans)'
              }}>
            The Opportunity Engine
          </h1>
          <p className="text-secondary" 
             style={{ color: 'var(--color-text-secondary)' }}>
            Connect, Learn, and Grow Your Career
          </p>
        </div>

        <Card className="backdrop-blur-sm border-opacity-20" 
              style={{ 
                backgroundColor: 'var(--color-surface-glass)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--border-radius-lg)'
              }}>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setUserType('student')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  userType === 'student' 
                    ? 'text-white' 
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{ 
                  backgroundColor: userType === 'student' ? 'var(--color-primary)' : 'transparent',
                  color: userType === 'student' ? 'white' : 'var(--color-text-secondary)',
                  transition: 'var(--transition-base)'
                }}
              >
                <GraduationCap size={20} />
                <span>Student</span>
              </button>
              <button
                onClick={() => setUserType('recruiter')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  userType === 'recruiter' 
                    ? 'text-white' 
                    : 'opacity-60 hover:opacity-80'
                }`}
                style={{ 
                  backgroundColor: userType === 'recruiter' ? 'var(--color-secondary)' : 'transparent',
                  color: userType === 'recruiter' ? 'white' : 'var(--color-text-secondary)',
                  transition: 'var(--transition-base)'
                }}
              >
                <Briefcase size={20} />
                <span>Recruiter</span>
              </button>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6" 
                        style={{ backgroundColor: 'var(--color-surface)' }}>
                <TabsTrigger value="login" 
                           style={{ 
                             color: 'var(--color-text-secondary)',
                             transition: 'var(--transition-base)'
                           }}>
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" 
                           style={{ 
                             color: 'var(--color-text-secondary)',
                             transition: 'var(--transition-base)'
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
                      <Mail className="absolute left-3 top-3 h-4 w-4" 
                            style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="email"
                        type="email"
                        placeholder={`Enter your ${userType} email`}
                        className="pl-10"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)'
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
                      <Lock className="absolute left-3 top-3 h-4 w-4" 
                            style={{ color: 'var(--color-text-muted)' }} />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)'
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
                        className="rounded"
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <Label htmlFor="remember" className="text-sm" 
                             style={{ color: 'var(--color-text-secondary)' }}>
                        Remember me
                      </Label>
                    </div>
                    <button type="button" className="text-sm hover:underline"
                            style={{ 
                              color: 'var(--color-primary)',
                              transition: 'var(--transition-short)'
                            }}>
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-white font-medium"
                    style={{
                      backgroundColor: userType === 'student' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      transition: 'var(--transition-base)'
                    }}
                  >
                    Sign In as {userType === 'student' ? 'Student' : 'Recruiter'}
                  </Button>
                </form>
              </TabsContent>

              {/* Registration Form */}
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
                          className="pl-10"
                          style={{
                            backgroundColor: 'var(--color-surface)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-primary)'
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
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)'
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
                        className="pl-10"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)'
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
                        className="pl-10"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)'
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
                          className="pl-10"
                          style={{
                            backgroundColor: 'var(--color-surface)',
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-text-primary)'
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
                        className="pl-10"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)'
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
                        className="pl-10"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text-primary)'
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
                      <button type="button" className="hover:underline"
                              style={{ color: 'var(--color-primary)' }}>
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="hover:underline"
                              style={{ color: 'var(--color-primary)' }}>
                        Privacy Policy
                      </button>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-white font-medium"
                    style={{
                      backgroundColor: userType === 'student' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      transition: 'var(--transition-base)'
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
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
              className="hover:underline font-medium"
              style={{ 
                color: 'var(--color-primary)',
                transition: 'var(--transition-short)'
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