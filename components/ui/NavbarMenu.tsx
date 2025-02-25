'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { handleSignOut } from '@/app/actions/auth';
import { Menu, X, ShoppingCart, Package, Home, LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';
import { useCart } from '../cartContext';
import ThemeToggle from '@/components/darkmodetoogle'

interface NavbarClientProps {
  session: { user: { name: string; role: string; image?: string } } | null;
}

const NavbarMenu = ({ session }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActivePath = (path: string) => pathname === path;
  if(pathname === "/login" || pathname === "/register") return null;

  const navLinks = [
    { href: '/', icon: Home, label: 'Home' },
    { href: (!session ? '/login' : '/cart'), icon: ShoppingCart, label: 'Cart', badge: totalItems },
    { href: (!session ? '/login' : '/orders'), icon: Package, label: 'Orders' },
    ...(session ? [
      { href: '/prodak', icon: Package, label: 'Products' },
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      ...(session.user.role === 'admin' ? [
        { href: '/user', icon: Users, label: 'Users' },
        { href: '/dashboard/catagory', icon: Settings, label: 'Categories' }
      ] : [])
    ] : [])
  ];

  interface NavLinkProps {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    badge?: number;
  }

  const NavLink = ({ href, icon: Icon, label, badge = 0 }: NavLinkProps) => (
    <Link 
      href={href}
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isActivePath(href) 
          ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
      onClick={() => setIsMenuOpen(false)}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span>{label}</span>
      {badge > 0 && (
        <span className="ml-2 bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              BAZARIO
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}

            {/* Auth Section */}
            {session ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <Link href="/profile" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <Image 
                      src={session.user.image || '/avatar.svg'}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-gray-100 dark:ring-gray-700 transition-transform group-hover:scale-110"
                    />
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 dark:bg-green-500 ring-2 ring-white dark:ring-gray-900" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{session.user.role}</p>
                  </div>
                </Link>
                <ThemeToggle />
                <form action={handleSignOut} className="ml-2">
                  <button 
                    type="submit"
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`
        fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        md:hidden
      `}>
        <div className="h-full overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-2 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          {session && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={session.user.image || '/avatar.svg'}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{session.user.role}</p>
                </div>
                <ThemeToggle />
              </div>
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 md:hidden z-40"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
};

export default NavbarMenu;