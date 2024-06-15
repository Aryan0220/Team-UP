"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useApiMutation } from "@/hooks/use-api-mutations";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

export const EmptyBorads = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if(!organization) return;
        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then(() => {
            toast.success("Board Created");
        })
        .catch(() => toast.error("Failed to create board"));
    }
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image
            src="/logo.svg"
            height={140}
            width={140}
            alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board!
            </h2>
            <p className="text-muted-foreground testg-sm mt-2">
                Start by creating a board for you Organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create Board
                </Button>
            </div>
        </div>
    )
}