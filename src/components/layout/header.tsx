"use client";

import { ClipboardList, LayoutDashboard, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/tasks", label: "Tasks", icon: ClipboardList },
    // { path: "/about", label: "About", icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center shadow-lg ring-1 ring-slate-900/10">
                  <LayoutDashboard className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 opacity-20 blur-sm -z-10" />
              </div>
              <Link
                to="/tasks"
                className="text-xl font-semibold text-slate-900 tracking-tight hover:text-slate-700 transition-colors duration-200"
              >
                TaskBoard Pro
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        active
                          ? "text-slate-900 bg-slate-100"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      {active && (
                        <div className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-slate-900" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <button className="h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-200 flex items-center justify-center ring-1 ring-slate-900/5 hover:ring-slate-900/10">
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-200 flex items-center justify-center"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            className="fixed top-16 right-4 left-4 bg-white rounded-xl shadow-xl border border-slate-200/60 z-50 md:hidden overflow-hidden"
            id="mobile-menu"
          >
            <div className="p-4">
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 w-full">
                  <User className="h-4 w-4" />
                  Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
