
interface SummaryData {
  role: string;
  experience: string;
  firstName?: string;
  lastName?: string;
  location?: string;
}

export const generateLocalAISummary = ({ role, experience, firstName, lastName, location }: SummaryData): string => {
  const summaryTemplates = {
    // Software Engineering
    'Software Engineer': {
      'Entry Level (0-1 years)': [
        `Recent computer science graduate with strong foundation in programming fundamentals and modern development practices. Eager to contribute fresh perspectives and technical skills to software development projects while continuously learning and growing in a collaborative team environment.`,
        `Entry-level software engineer with passion for clean code and problem-solving. Demonstrated ability to learn new technologies quickly and apply theoretical knowledge to real-world projects. Seeking to leverage programming skills and enthusiasm for technology in a dynamic development role.`,
        `Motivated junior developer with solid understanding of software development lifecycle and version control systems. Strong analytical thinking and attention to detail, with experience in multiple programming languages and frameworks gained through academic projects and personal coding initiatives.`
      ],
      'Junior Level (1-3 years)': [
        `Junior software engineer with 2+ years of experience developing scalable web applications using modern frameworks. Proven ability to collaborate effectively in agile environments while delivering high-quality code that meets business requirements and technical specifications.`,
        `Emerging software developer with hands-on experience in full-stack development and database management. Demonstrates strong problem-solving abilities and commitment to writing maintainable, well-documented code. Actively contributes to team success through code reviews and knowledge sharing.`,
        `Software engineer with growing expertise in cloud technologies and microservices architecture. Successfully delivered multiple projects from conception to deployment, showcasing ability to work independently while maintaining strong communication with stakeholders and team members.`
      ],
      'Mid Level (3-5 years)': [
        `Mid-level software engineer with 4+ years of experience architecting and implementing robust software solutions. Skilled in leading small development teams while maintaining high code quality standards and driving technical decision-making for complex projects.`,
        `Experienced software developer specializing in scalable system design and performance optimization. Track record of mentoring junior developers and contributing to technical architecture decisions that support business growth and operational efficiency.`,
        `Versatile software engineer with expertise in multiple technology stacks and proven ability to adapt to evolving project requirements. Successfully bridges technical and business stakeholders to deliver solutions that exceed expectations and drive measurable results.`
      ],
      'Senior Level (5-8 years)': [
        `Senior software engineer with 6+ years of experience leading complex software initiatives and driving technical innovation. Expert in system architecture, performance optimization, and team leadership, with a proven track record of delivering enterprise-scale solutions.`,
        `Accomplished software engineer specializing in distributed systems and cloud architecture. Mentors development teams while establishing best practices for code quality, security, and scalability across multiple product lines and technology platforms.`,
        `Strategic software engineer with deep expertise in modern development methodologies and emerging technologies. Leads technical decision-making processes and collaborates with cross-functional teams to translate business objectives into robust, maintainable software solutions.`
      ],
      'Lead/Principal (8-12 years)': [
        `Principal software engineer with 10+ years of experience architecting enterprise-scale systems and leading high-performance development teams. Drives technical strategy and innovation while establishing engineering best practices that support organizational growth and product excellence.`,
        `Lead software engineer with extensive expertise in system design, performance optimization, and team leadership. Champions technical excellence across multiple product teams while mentoring senior developers and contributing to strategic technology decisions.`,
        `Senior technical leader with proven ability to translate complex business requirements into scalable software architectures. Leads cross-functional initiatives and establishes engineering standards that enable teams to deliver high-quality solutions efficiently and consistently.`
      ],
      'Executive Level (12+ years)': [
        `Executive-level technology leader with 12+ years of experience driving digital transformation and engineering excellence. Builds and scales high-performing engineering organizations while establishing technical vision that aligns with business strategy and market opportunities.`,
        `Senior engineering executive with extensive experience in software architecture, team building, and strategic technology planning. Leads large-scale technical initiatives and fosters innovation culture that delivers competitive advantages and sustainable business growth.`,
        `Technology executive specializing in software engineering leadership and organizational development. Drives technical strategy across enterprise platforms while building engineering capabilities that support rapid scaling and continuous innovation.`
      ]
    },

    // Frontend Development
    'Frontend Developer': {
      'Entry Level (0-1 years)': [
        `Enthusiastic frontend developer with strong foundation in HTML, CSS, and JavaScript. Passionate about creating engaging user experiences and responsive web applications. Eager to contribute creative solutions and modern development practices to dynamic development teams.`,
        `Junior frontend developer with expertise in React and modern CSS frameworks. Demonstrated ability to translate design mockups into interactive, accessible web applications. Committed to writing clean, maintainable code and staying current with frontend technologies.`
      ],
      'Junior Level (1-3 years)': [
        `Frontend developer with 2+ years of experience creating responsive, user-centric web applications. Proficient in React, TypeScript, and modern CSS frameworks, with strong attention to detail and commitment to accessibility standards and performance optimization.`,
        `Skilled frontend developer specializing in component-based architecture and state management. Successfully collaborated with design and backend teams to deliver polished user interfaces that enhance user engagement and support business objectives.`
      ],
      'Mid Level (3-5 years)': [
        `Mid-level frontend developer with expertise in modern JavaScript frameworks and performance optimization. Leads UI/UX implementation initiatives while mentoring junior developers and establishing frontend best practices for scalable web applications.`,
        `Experienced frontend engineer specializing in React ecosystem and component libraries. Proven track record of optimizing application performance and implementing responsive designs that provide exceptional user experiences across devices and platforms.`
      ],
      'Senior Level (5-8 years)': [
        `Senior frontend developer with 6+ years of experience architecting scalable user interfaces and leading frontend development initiatives. Expert in modern JavaScript frameworks, performance optimization, and cross-browser compatibility with strong leadership capabilities.`,
        `Accomplished frontend engineer specializing in complex web applications and user experience optimization. Drives technical decision-making for frontend architecture while collaborating with design teams to create innovative, accessible digital experiences.`
      ],
      'Lead/Principal (8-12 years)': [
        `Principal frontend engineer with 10+ years of experience leading frontend architecture and user experience strategy. Establishes technical standards for modern web applications while mentoring development teams and driving innovation in user interface design.`,
        `Lead frontend developer with extensive expertise in performance optimization, accessibility, and modern development workflows. Shapes frontend technical strategy while building scalable component systems that support rapid feature development.`
      ],
      'Executive Level (12+ years)': [
        `Executive frontend technology leader with 12+ years of experience driving user experience strategy and frontend engineering excellence. Builds high-performing frontend teams while establishing technical vision for digital products and user interfaces.`
      ]
    },

    // Backend Development
    'Backend Developer': {
      'Entry Level (0-1 years)': [
        `Entry-level backend developer with strong foundation in server-side programming and database management. Passionate about building efficient, secure APIs and scalable system architectures. Eager to contribute technical skills to backend development initiatives.`,
        `Junior backend engineer with knowledge of RESTful API design and database optimization. Demonstrates strong problem-solving abilities and commitment to writing secure, maintainable server-side code using modern development frameworks.`
      ],
      'Junior Level (1-3 years)': [
        `Backend developer with 2+ years of experience designing and implementing scalable server-side applications. Proficient in API development, database optimization, and cloud services with focus on security and performance best practices.`,
        `Skilled backend engineer specializing in microservices architecture and data processing systems. Successfully delivered robust server-side solutions while collaborating with frontend teams to create seamless, integrated applications.`
      ],
      'Mid Level (3-5 years)': [
        `Mid-level backend developer with expertise in distributed systems and API architecture. Leads server-side development initiatives while optimizing database performance and implementing security best practices for enterprise applications.`,
        `Experienced backend engineer specializing in cloud infrastructure and scalable system design. Proven track record of building high-performance APIs and data processing pipelines that support business growth and operational efficiency.`
      ],
      'Senior Level (5-8 years)': [
        `Senior backend developer with 6+ years of experience architecting enterprise-scale server-side systems. Expert in microservices, database optimization, and cloud infrastructure with strong leadership in technical decision-making and system design.`,
        `Accomplished backend engineer specializing in high-performance distributed systems and API design. Drives technical architecture decisions while mentoring development teams and establishing backend best practices for scalable applications.`
      ],
      'Lead/Principal (8-12 years)': [
        `Principal backend engineer with 10+ years of experience leading server-side architecture and infrastructure strategy. Establishes technical standards for scalable backend systems while driving innovation in distributed computing and data management.`,
        `Lead backend developer with extensive expertise in system architecture, performance optimization, and team leadership. Shapes backend technical strategy while building robust infrastructure that supports enterprise-scale applications.`
      ],
      'Executive Level (12+ years)': [
        `Executive backend technology leader with 12+ years of experience driving infrastructure strategy and backend engineering excellence. Builds high-performing backend teams while establishing technical vision for scalable, secure systems.`
      ]
    },

    // Add more roles as needed...
    'Product Manager': {
      'Entry Level (0-1 years)': [
        `Emerging product manager with strong analytical skills and passion for user-centered design. Eager to contribute fresh perspectives to product strategy while learning from experienced teams and driving data-driven decision making.`
      ],
      'Junior Level (1-3 years)': [
        `Product manager with 2+ years of experience leading cross-functional teams to deliver user-focused product features. Skilled in market research, user story development, and agile methodologies with strong stakeholder communication abilities.`
      ],
      'Mid Level (3-5 years)': [
        `Mid-level product manager with expertise in product strategy and roadmap development. Successfully launched multiple product initiatives while collaborating with engineering and design teams to deliver solutions that drive user engagement and business growth.`
      ],
      'Senior Level (5-8 years)': [
        `Senior product manager with 6+ years of experience driving product vision and strategic initiatives. Expert in market analysis, user research, and cross-functional leadership with proven track record of launching successful products and features.`
      ],
      'Lead/Principal (8-12 years)': [
        `Principal product manager with 10+ years of experience leading product strategy and organizational product initiatives. Drives product vision across multiple teams while establishing best practices for product development and go-to-market execution.`
      ],
      'Executive Level (12+ years)': [
        `Executive product leader with 12+ years of experience driving product strategy and building high-performing product organizations. Establishes product vision that aligns with business objectives while fostering innovation culture and market leadership.`
      ]
    }
  };

  // Get templates for the role, fallback to Software Engineer if role not found
  const roleTemplates = summaryTemplates[role as keyof typeof summaryTemplates] || summaryTemplates['Software Engineer'];
  
  // Get templates for the experience level, fallback to Junior Level if not found
  const experienceTemplates = roleTemplates[experience as keyof typeof roleTemplates] || roleTemplates['Junior Level (1-3 years)'];
  
  // Select a random template from available options
  const selectedTemplate = experienceTemplates[Math.floor(Math.random() * experienceTemplates.length)];
  
  // If we have personal info, we can customize the template slightly
  if (firstName && lastName) {
    return selectedTemplate.replace(/^(\w)/, `${firstName} ${lastName} is a $1`.toLowerCase());
  }
  
  return selectedTemplate;
};
