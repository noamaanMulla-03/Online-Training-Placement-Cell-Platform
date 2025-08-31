-- =============================================================================
-- The Opportunity Engine - PostgreSQL Schema
-- =============================================================================
-- This script defines the core tables for the application as outlined in
-- Milestone 1.1 of the development roadmap.
--
-- To use this, you can connect to your running PostgreSQL Docker container
-- and execute this script to create the database structure.
-- =============================================================================

-- Create an ENUM type for user roles to ensure data integrity.
CREATE TYPE user_role AS ENUM ('student', 'recruiter', 'admin');

-- Create an ENUM type for job statuses.
CREATE TYPE job_status AS ENUM ('pending_approval', 'approved', 'rejected', 'closed');

-- Table: Companies
-- Stores information about the companies that post jobs.
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    logo_url VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: Users
-- Stores user accounts for all three roles.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    company_id UUID REFERENCES companies(id), -- Nullable, only for recruiters
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: Jobs
-- Stores job postings created by recruiters.
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    status job_status NOT NULL DEFAULT 'pending_approval',
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    posted_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- The recruiter who posted it
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: Courses
-- Stores the training courses available on the platform.
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    content_url VARCHAR(255), -- Link to video, article, etc.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- JOIN TABLES FOR MANY-TO-MANY RELATIONSHIPS
-- =============================================================================

-- Table: student_profiles
-- Stores detailed information specific to students.
CREATE TABLE student_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    graduation_year INT,
    major VARCHAR(255),
    portfolio_url VARCHAR(255),
    resume_url VARCHAR(255),
    generated_story TEXT, -- For AI-generated summary
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: student_skills
-- Associates skills with students.
CREATE TABLE student_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    UNIQUE(user_id, skill_name)
);

-- Table: job_applications
-- Tracks which students have applied to which jobs.
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    application_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'submitted', -- e.g., submitted, under review, interview
    UNIQUE(student_id, job_id)
);

-- Table: student_courses
-- Tracks student enrollment and progress in courses.
CREATE TABLE student_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    progress INT DEFAULT 0, -- Percentage complete
    UNIQUE(student_id, course_id)
);

-- Add indexes for frequently queried columns for performance.
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_status ON jobs(status);
