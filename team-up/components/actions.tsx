"use client";

import { useApiMutation } from "@/hooks/use-api-mutations";
import { api } from "@/convex/_generated/api";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffest?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffest,
    id,
    title,
}: ActionProps) => {
    const {mutate, pending} = useApiMutation(api.board.remove);
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
        .then(() => toast.success("Link Copied"))
        .catch(() => toast.error("Failed to Copy Link"))
    } 
    const onDelete = () => {
        mutate({id})
        .then(() => toast.success("Board Deleted"))
        .catch(() => toast.error("Failed to delete board!"));
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffest}
                className="w-60"
            >
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Board
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}