import { Github, LayoutDashboard, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Tasks", href: "/tasks" },
    { label: "About", href: "/tasks" },
    { label: "Documentation", href: "/tasks" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/AnasDurra", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/anas-durra",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:durra.anaskhalid@gmail.com", label: "Email" },
  ];

  const techStack = ["React", "Tailwind CSS", "TypeScript"];

  return (
    <footer className="bg-gradient-to-br from-background to-gray-200 border-t border-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-lg ring-1 ring-slate-900/10">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 tracking-tight hover:text-slate-700 transition-colors duration-200">
                TaskBoard Pro
              </h3>
            </div>
            <p className="text-textSecondary text-sm leading-relaxed max-w-sm">
              A modern Kanban-style task management solution built with React
              and Tailwind CSS. Organize your work efficiently and boost
              productivity with our intuitive interface.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-base font-semibold text-textPrimary mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-sm text-textSecondary hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-base font-semibold text-textPrimary mb-4">
              Connect With Us
            </h4>
            <div className="flex justify-center gap-2 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-textSecondary">
              Built for technical assessment
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-base font-semibold text-textPrimary mb-4">
              Built With
            </h4>
            <div className="flex flex-col items-center gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 text-xs border border-primary/30 text-primary rounded-full w-fit"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 my-8"></div>

        <div className="flex justify-center items-center">
          <p className="text-xs text-textSecondary text-center">
            © {currentYear} TaskBoard Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
