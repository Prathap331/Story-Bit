
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Crown } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Title only, no logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">YouTube Scripter</span>
          </Link>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center">
                  <Crown className="w-4 h-4 mr-1 text-yellow-500" />
                  Upgrade
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid gap-1">
                      <h3 className="font-medium leading-none">Free Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate up to 5 scripts per month
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <h3 className="font-medium leading-none">Pro Plan - $19/month</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlimited scripts with advanced features
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <h3 className="font-medium leading-none">Enterprise - $49/month</h3>
                      <p className="text-sm text-muted-foreground">
                        Team collaboration and priority support
                      </p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
