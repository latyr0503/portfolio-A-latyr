import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Rocket, Settings2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { getUser, logout } from "@/lib/auth";
import Link from "next/link";
import { Utilisateur } from "@/lib/types";
export default function ComplexDropdownMenu() {
  const router = useRouter();
  const user = getUser() as Utilisateur;

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 ">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground uppercase">
            {user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex flex-col mr-6">
          <p className="text-sm font-medium capitalize">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-72">
        <DropdownMenuItem className="py-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground uppercase">
              {user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-1 flex flex-col">
            <p className="text-sm font-medium capitalize">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex-col items-start">
          <div className="flex items-center gap-1">
            <Rocket className="mr-1 h-[18px] w-[18px]" />
            <span className="font-medium leading-none">Parametre</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Modifier les parametres de votre compte
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-gray-400 cursor-not-allowed">
          <User className="mr-1" /> Invite people
        </DropdownMenuItem>
        <Link
          href={
            user?.role === "ADMIN"  
              ? "/dashboard/admin/settings"
              : "/dashboard/user/settings"
          }
        >
          <DropdownMenuItem className="cursor-pointer">
            <Settings2 className="mr-1" /> Profil
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className=" cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-1" /> Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
