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
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ConfirmModel } from "./confirm-model";
import { Button } from "@/components/ui/button";
import { useRenameModel } from "@/store/use-rename-model";


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
    const { onOpen } = useRenameModel();
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
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename Board
                </DropdownMenuItem>
                <ConfirmModel
                    header="Delete Board?"
                    description="This action will delete the board and all of its contents. It can not be reversed."
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button
                    variant="ghost"
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Board
                    </Button>
                </ConfirmModel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}