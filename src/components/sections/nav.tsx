import { Button } from "@/components/ui/button.tsx";
import {
  ArrowLeftEndOnRectangleIcon,
  ShareIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Link } from "@tanstack/react-router";

const Nav = () => {
  return (
    <div className=" shrink-0 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
            <h1 className="font-medium  text-3xl">
              <span className="pr-3">🪽</span>Godtier
            </h1>
          </Link>
        </div>

        {/*right side*/}
        <div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="icon-lg">
                    <UserIcon />
                  </Button>
                }
              />
              <DropdownMenuContent className="p-2">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShareIcon />
                    Share
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <ArrowLeftEndOnRectangleIcon />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
